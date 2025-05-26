"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/node/task";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { Button } from "@/components/ui/button";
type Props = {};

function TaskMenu({}: Props) {
  return (
    <aside className="w-[300px] min-w-[300px] max-w-[300px] border-r-2 border-separate h-full p-2 px-4 overflow-auto ">
      <Accordion
        defaultValue={["extraction"]}
        type="multiple"
        className="w-full"
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  if (!task) {
    return null; // or handle the case where the task is not found
  }
  const ondragstart = (e: React.DragEvent, taskType: TaskType) => {
    e.dataTransfer.setData("application/reactflow", taskType);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      draggable
      onDragStart={(e) => ondragstart(e, taskType)}
      variant={"secondary"}
      className="flex items-start justify-between gap-2 border w-full"
    >
      <div className="flex items-center gap-2">
        <task.icon className="w-4 h-4 mr-2" />
        {task.label}
      </div>
    </Button>
  );
}
export default TaskMenu;
