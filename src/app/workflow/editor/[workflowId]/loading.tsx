import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="h-full min-h-screen w-full flex flex-col items-center justify-center gap-6">
      <Loader2 className="size-20 animate-spin" />
      <p className="text-primary font-bold text-xl">
        Loading workflow editor...
      </p>
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">
          Please wait while we load your workflow editor. This may take a few
          seconds.
        </p>
        <p className="text-muted-foreground text-sm">
          If this takes too long, please check your internet connection or try
          refreshing the page.
        </p>
      </div>
    </div>
  );
}

export default loading;
