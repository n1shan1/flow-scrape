"use client";
import { createWorkflow } from "@/actions/workflows/create-workflow";
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
import {
  CreateWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/types/workflow/create-workflow-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layers2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = { triggerText?: string };

function CreateWorkflowDialog({ triggerText }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowSchemaType>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(CreateWorkflowSchema),
  });

  const {
    isPending,
    data: newWorkflowData,
    mutate,
  } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow created successfully!", {
        id: "create-workflow",
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create workflow. Please try again.", {
        id: "create-workflow",
      });
    },
  });

  const submitHandler = useCallback(
    (data: CreateWorkflowSchemaType) => {
      try {
        toast.loading("Creating workflow...", {
          id: "create-workflow",
        });
        mutate(data);
        form.reset();
        toast.dismiss("create-workflow");
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
        <Button variant={"default"}>
          {triggerText ? triggerText : "Create Workflow"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subTitle="Add details below to create your Workflow"
        />
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

export default CreateWorkflowDialog;
