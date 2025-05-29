import Logo from "@/components/global/logo";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import React from "react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 w-full">
      <Logo iconSize={50} fontSize="text-5xl" />
      <Separator className="max-w-xs" />
      <div className="flex flex-col items-center justify-center gap-4 mt-10">
        <Loader2Icon size={16} className="stroke-primary animate-spin" />
        <p className="text-muted-foreground text-md">Setting Up your Account</p>
      </div>
    </div>
  );
}

export default loading;
