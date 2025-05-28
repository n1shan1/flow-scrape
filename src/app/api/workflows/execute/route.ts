import { prisma } from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow/status-type";
import parser from "cron-parser";
import { timingSafeEqual } from "crypto";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!isValidSecret(token)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return new Response("Workflow ID is required", { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });

  if (!workflow) {
    return new Response("Workflow not found", { status: 404 });
  }

  const executionPlan = JSON.parse(
    workflow.executionPlan!
  ) as WorkflowExecutionPlan;

  if (!executionPlan) {
    return new Response("Execution plan is empty", { status: 400 });
  }

  try {
    const cron = parser.parseExpression(workflow.cron!, { utc: true });
    const nextRunAt = cron.next().toDate();
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        ExecutionPhase: {
          create: executionPlan.flatMap((phase) =>
            phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.Type].label,
              };
            })
          ),
        },
      },
    });

    await ExecuteWorkflow(execution.id, nextRunAt);
    return new Response("Workflow execution started", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server error", { status: 500 });
  }
}

function isValidSecret(token: string): boolean {
  const API_SECRET = process.env.WORKFLOW_API_SECRET;
  if (!API_SECRET) return false;

  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(API_SECRET));
  } catch (error) {
    return false;
  }
}
