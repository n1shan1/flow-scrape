"use server";

import { prisma } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { AppNode } from "@/types/node/app-node";
import { TaskType } from "@/types/node/task";
import {
  CreateWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/types/workflow/create-workflow-schema";
import { WorkflowStatus } from "@/types/workflow/status-type";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";
export const createWorkflow = async (data: CreateWorkflowSchemaType) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { success, error } = CreateWorkflowSchema.safeParse(data);
  if (!success) {
    throw new Error("The form data is not correct.");
  }
  const initialFlow: {
    nodes: AppNode[];
    edges: Edge[];
  } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description || "",
      definition: JSON.stringify(initialFlow),
      status: WorkflowStatus.DRAFT,
    },
  });

  if (!result) {
    throw new Error("Cannot Create the Workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
};
