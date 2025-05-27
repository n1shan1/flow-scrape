import TooltipWrapper from "@/components/global/tooltip-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ExecuteButton from "./execute-button";
import SaveButton from "./save-button";
type Props = {
  title: string;
  subTitle?: string;
  workflowId: string;
  hideButtons?: boolean;
};

function TopBar({ title, subTitle, workflowId, hideButtons = false }: Props) {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10 items-center">
      <div className="flex gap-1 flex-1 items-center">
        <TooltipWrapper content={"Back"}>
          <Link
            href={"/workflows"}
            className={buttonVariants({ variant: "ghost" })}
          >
            <ChevronLeft className="size-6" />
          </Link>
        </TooltipWrapper>
        <div>
          <p className="text-ellipsis truncate font-bold">{title}</p>
          {subTitle && (
            <p className="text-xs text-ellipsis text-muted-foreground">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {hideButtons === false && (
          <>
            <SaveButton workflowId={workflowId} />
            <ExecuteButton workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
}

export default TopBar;
