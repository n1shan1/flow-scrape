"use client";
import TooltipWrapper from "@/components/global/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ExecuteButton from "./execute-button";
import NavigationTabs from "./navigation-tabs";
import PublishButton from "./publish-button";
import SaveButton from "./save-button";
import UnpublishButton from "./unpublish-button";
type Props = {
  title: string;
  subTitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
};

function TopBar({
  title,
  subTitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
}: Props) {
  const router = useRouter();

  return (
    <header className="flex px-4 border-b-2 border-separate w-full h-[60px] sticky top-0 bg-background z-10 items-center">
      <div className="flex gap-2 items-center max-w-[300px]">
        <TooltipWrapper content={"Back"}>
          <Button onClick={() => router.back()} variant={"ghost"} size="icon">
            <ChevronLeft className="size-5" />
          </Button>
        </TooltipWrapper>
        <div className="min-w-0">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap font-bold">
            {title}
          </p>
          {subTitle && (
            <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap text-muted-foreground">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <NavigationTabs workflowId={workflowId} />
      </div>

      <div className="flex gap-2 items-center min-w-[200px] justify-end">
        {hideButtons === false && (
          <>
            {isPublished && <UnpublishButton workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveButton workflowId={workflowId} />
                <PublishButton workflowId={workflowId} />
              </>
            )}

            <ExecuteButton workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
}

export default TopBar;
