import { RemoveWorkflowSchedule } from "@/actions/workflows/remove-workflow-schedule";
import { UpdateWorkflowCron } from "@/actions/workflows/update-workflow-cron";
import CustomDialogHeader from "@/components/global/custom-dialog-header";
import TooltipWrapper from "@/components/global/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import parser from "cron-parser";
import cronstrue from "cronstrue";
import { CalendarIcon, ClockIcon, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type Props = { workflowId: string; cronJob: string | null };

function SchedulerDialog({ workflowId, cronJob }: Props) {
  const [cron, setCron] = useState(cronJob || "");
  const [validCron, setValidCron] = useState(false);
  const [open, setOpen] = useState(false);
  const [readableCron, setReadableCron] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (!cron.trim()) {
      setValidCron(false);
      setValidationError("Please enter a cron expression");
      return;
    }

    // Basic cron pattern validation
    const cronRegex =
      /^(\*|[0-9,\-*/]+)\s+(\*|[0-9,\-*/]+)\s+(\*|[0-9,\-*/]+)\s+(\*|[0-9,\-*/]+)\s+(\*|[0-9,\-*/]+)$/;
    if (!cronRegex.test(cron)) {
      setValidCron(false);
      setValidationError(
        "Invalid cron format. Expected: minute hour day month weekday"
      );
      return;
    }

    try {
      parser.parseExpression(cron);
      const humanCronString = cronstrue.toString(cron);
      setValidCron(true);
      setValidationError("");
      setReadableCron(humanCronString);
    } catch (error) {
      setValidCron(false);
      setValidationError("Invalid cron expression");
    }
  }, [cron]);

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success("Workflow scheduled successfully.", { id: "cron" });
    },
    onError: () => {
      toast.error("Error scheduling workflow!", { id: "cron" });
    },
  });
  const removeMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success("Workflow scheduled removed successfully.", { id: "cron" });
    },
    onError: () => {
      toast.error("Error removing workflow!", { id: "cron" });
    },
  });

  const workflowValidCron = cronJob && cronJob.length > 0;
  const readableSavedCron = workflowValidCron && cronstrue.toString(cronJob!);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className={cn(
            "text-sm p-0 h-auto text-orange-500",
            workflowValidCron && "text-primary"
          )}
        >
          {workflowValidCron && (
            <div className="flex items-center gap-2 cursor-pointer">
              <ClockIcon />
              {readableSavedCron}
            </div>
          )}
          {!workflowValidCron && (
            <div className="flex items-center gap-2 cursor-pointer">
              <TriangleAlert className="size-3" /> Set Schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule Workflow Execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Specify the Cron Expression to schedule the periodic workflow
            execution.
            <br />
            All times are in UTC.
          </p>
          <div className="flex items-center gap-2">
            <Input
              value={cron}
              onChange={(e) => setCron(e.target.value)}
              placeholder="Eg: * * * * *"
              className={!workflowValidCron && cron ? "border-destructive" : ""}
            />{" "}
            {workflowValidCron && (
              <TooltipWrapper side="right" content="Remove current schedule">
                <DialogClose asChild>
                  <div>
                    <Button
                      className="border-destructive hover:bg-destructive/10 text-destructive"
                      disabled={mutation.isPending || removeMutation.isPending}
                      variant={"outline"}
                      size={"default"}
                      onClick={() => {
                        toast.loading("Removing current schedule...", {
                          id: "cron",
                        });
                        removeMutation.mutate(workflowId);
                        setOpen(false);
                      }}
                    >
                      <X className="size-4 text-destructive" />
                    </Button>
                  </div>
                </DialogClose>
              </TooltipWrapper>
            )}
          </div>
          <div
            className={cn(
              "bg-accent rounded-md p-4 border text-sm",
              validCron
                ? "border-primary text-primary"
                : "border-destructive text-destructive"
            )}
          >
            {validCron ? readableCron : validationError}
          </div>
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={mutation.isPending}
              onClick={() => {
                toast.loading("Scheduling workflow...", {
                  id: "cron",
                });
                mutation.mutate({
                  id: workflowId,
                  cron,
                });
                setOpen(false);
              }}
              className="w-full"
              variant={"default"}
            >
              Schedule
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulerDialog;
