"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/node/task";
import { CoinsIcon } from "lucide-react";
import React from "react";
type Props = {};

function TaskMenu({ }: Props) {
  return (
    <aside className="w-[300px] min-w-[300px] max-w-[300px] border-r-2 border-separate h-full p-2 px-4 overflow-auto ">
      <Accordion
        defaultValue={[
          "extraction",
          "interactions",
          "timing",
          "results",
          "storage",
        ]}
        type="multiple"
        className="w-full"
      >
        <AccordionItem value="interactions">
          <AccordionTrigger className="font-bold">
            User Interactions
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
            <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
            <TaskMenuBtn taskType={TaskType.NAVIGATE_URL} />
            <TaskMenuBtn taskType={TaskType.SCROLL_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="storage">
          <AccordionTrigger className="font-bold">
            Data Storage
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON} />
            <TaskMenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timing">
          <AccordionTrigger className="font-bold">
            Timing Controls
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="results">
          <AccordionTrigger className="font-bold">
            Result Delivery
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
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
      className="flex items-center justify-between gap-2 border w-full"
    >
      <div className="flex items-center gap-2">
        <task.icon className="w-4 h-4 mr-2" />
        {task.label}
      </div>
      <Badge className="gap-1 flex items-center justify-end" variant={"outline"} >
        <CoinsIcon size={10} />
        {task.credits}
      </Badge>
    </Button>
  );
}
export default TaskMenu;
