"use client";
import { DuplicateWorkflow } from "@/actions/workflows/duplicate-workflow";
import CustomDialogHeader from "@/components/global/custom-dialog-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DuplicateWorkflowSchema,
  DuplicateWorkflowSchemaType,
} from "@/types/workflow/duplicate-workflow-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CopyIcon, Layers2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = { triggerText?: string; workflowId: string };

function DuplicateWorkflowDialog({ triggerText, workflowId }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<DuplicateWorkflowSchemaType>({
    defaultValues: {
      workflowId,
      name: "",
      description: "",
    },
    resolver: zodResolver(DuplicateWorkflowSchema),
  });

  const {
    isPending,
    data: newWorkflowData,
    mutate,
  } = useMutation({
    mutationFn: DuplicateWorkflow,
    onSuccess: () => {
      toast.success("Workflow duplicated successfully!", {
        id: "duplicate-workflow",
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to duplicate workflow. Please try again.", {
        id: "duplicate-workflow",
      });
    },
  });

  const submitHandler = useCallback(
    (data: DuplicateWorkflowSchemaType) => {
      try {
        toast.loading("Duplicating workflow...", {
          id: "duplicate-workflow",
        });
        mutate(data);
        form.reset();
        toast.dismiss("duplicate-workflow");
        setOpen(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [mutate]
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className={cn(
            "mt-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100 flex items-center gap-2"
          )}
        >
          <CopyIcon className="size-4 text-muted-foreground cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader icon={Layers2Icon} title="Duplicate Workflow" />
        {/* Form for creating workflow */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Workflow Name
                    <span className="text-sm text-red-600 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter workflow name..." />
                  </FormControl>
                  <FormDescription>
                    Enter a unique name for your workflow
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe what this workflow does..."
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide additional details about this workflow
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Workflow"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DuplicateWorkflowDialog;
