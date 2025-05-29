import Logo from "@/components/global/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center gap-4">
      <Link
        href={"/home"}
        className={cn(
          "absolute top-12 left-12 flex items-center gap-2",
          buttonVariants({ variant: "ghost", size: "lg" })
        )}
      >
        <ArrowLeft className="size-4" />
        Go Back
      </Link>
      <Logo />
      {children}
    </div>
  );
}

export default layout;
