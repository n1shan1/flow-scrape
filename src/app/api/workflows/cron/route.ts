import { getAppUrl } from "@/lib/helper/app-url";
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow/status-type";

export async function GET(req: Request) {
  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    select: {
      id: true,
    },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: {
        not: null,
      },
      nextRunAt: {
        lte: now,
      },
    },
  });
  console.log(workflows.length, "workflows to run");
  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json({
    message: "Triggered workflows successfully",
    count: workflows.length,
  });
}
function triggerWorkflow(id: string) {
  const triggerAPIUrl = getAppUrl(`api/workflows/execute?workflowId=${id}`);
  console.log("Triggering workflow:", id, "at", triggerAPIUrl);
  fetch(triggerAPIUrl, {
    headers: { Authorization: `Bearer ${process.env.WORKFLOW_API_SECRET!}` },
    cache: "no-store",
  }).catch((error) => {
    console.error("Error triggering workflow:", id, error);
  });
}
