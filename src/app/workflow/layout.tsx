import BreadcrumbHeader from "@/components/global/breadcrumb-header";
import Logo from "@/components/global/logo";
import { ModeToggle } from "@/components/global/theme-toggle";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div className="h-screen flex w-full flex-col ">
      {children}
      <Separator />
      <footer className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 justify-between">
          <Logo iconSize={16} fontSize="text-xl" />
          <BreadcrumbHeader clickable />
        </div>
        <ModeToggle />
      </footer>
    </div>
  );
}

export default layout;
