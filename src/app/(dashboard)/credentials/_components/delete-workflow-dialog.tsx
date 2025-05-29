"use client";

import { DeleteCredential } from "@/actions/credentials/delete-credential";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  name: string;
};

function DeleteCredentialDialog({ name }: Props) {
  const [enteredText, setEnteredText] = useState("");
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success("Credential deleted successfully", {
        id: "delete-credential",
      });
      setEnteredText("");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete credential", {
        id: "delete-credential",
      });
      setEnteredText("");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <TrashIcon size={18} className="stroke-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete Credential
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="font-semibold">
              This action cannot be undone. This will permanently delete your
              credential and remove your data from our servers.
            </span>
            <br />
            <span className="text-pretty">
              To confirm, type:{" "}
              <span className="font-bold text-destructive">{name}</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input onChange={(e) => setEnteredText(e.target.value)} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(name)}
            disabled={enteredText !== name}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCredentialDialog;
