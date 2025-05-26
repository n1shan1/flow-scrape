"use client";
import { DeleteWorkflow } from "@/actions/workflows/delete-workflow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
};

function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workflowId,
}: Props) {
  const [enteredText, setEnteredText] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: "delete-workflow" });
      setEnteredText("");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete workflow", {
        id: "delete-workflow",
      });
      setEnteredText("");
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Workflow
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="font-semibold">
              This action cannot be undone. This will permanently delete your
              workflow and remove your data from our servers.
            </span>
            <br />
            <span className="text-pretty">
              To confirm, type:{" "}
              <span className="font-bold text-destructive">{workflowName}</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input onChange={(e) => setEnteredText(e.target.value)} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(workflowId)}
            disabled={enteredText !== workflowName}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
