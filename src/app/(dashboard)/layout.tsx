import BreadcrumbHeader from "@/components/global/breadcrumb-header";
import DesktopSidebar, { MobileSidebar } from "@/components/global/sidebar";
import { ModeToggle } from "@/components/global/theme-toggle";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  children: React.ReactNode;
  // params: {
  //   id: string;
  // };
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
};

function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between md:px-6 px-2 py-4 h-[50px]">
          <div className="flex items-center">
            <MobileSidebar />
            <BreadcrumbHeader />
          </div>
          <div className="flex items-center justify-between">
            <ModeToggle />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 py-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
