import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsCost">;

export function GetPhasesTotalCost(phases: Phase[]) {
  return phases.reduce((acc, phase) => acc + Number(phase.creditsCost || 0), 0);
}
