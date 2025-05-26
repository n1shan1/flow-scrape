import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

function UserWorkflowsSkeleton({}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton className="h-20 w-full" />
      ))}
    </div>
  );
}

export default UserWorkflowsSkeleton;
