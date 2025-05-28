import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
};

function CustomDialogHeader({
  title,
  subTitle,
  icon,
  iconClassName,
  titleClassName,
  subTitleClassName,
}: Props) {
  const Icon = icon;
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center mb-2 gap-2">
          {Icon && (
            <Icon className={cn("stroke-primary size-10", iconClassName)} />
          )}
          {title && (
            <h2
              className={cn(
                "text-2xl font-semibold text-center text-primary",
                titleClassName
              )}
            >
              {title}
            </h2>
          )}
          {subTitle && (
            <p
              className={cn(
                "text-muted-foreground text-sm text-center",
                subTitleClassName
              )}
            >
              {subTitle}
            </p>
          )}
          <Separator />
        </div>
      </DialogTitle>
    </DialogHeader>
  );
}

export default CustomDialogHeader;
