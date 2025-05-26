import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { waitFor } from "@/lib/waitFor";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Editor from "./_components/editor";

type Props = {
  params: { workflowId: string };
};

async function page({ params }: Props) {
  const wfId = params.workflowId;
  if (!wfId) {
    return (
      <div className="text-center font-bold text-destructive">
        Workflow ID is required
      </div>
    );
  }

  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="text-center font-bold text-destructive">
        You must be logged in to access this page
        <Link href={"/"} className={buttonVariants({ variant: "default" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back to Home
        </Link>
      </div>
    );
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: wfId,
      userId: userId,
    },
  });

  if (!workflow) {
    return (
      <div className="text-center font-bold text-destructive">
        Workflow not found
        <Link href={"/"} className={buttonVariants({ variant: "default" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back to Home
        </Link>
      </div>
    );
  }
  return <Editor workflow={workflow} />;
}

export default page;
