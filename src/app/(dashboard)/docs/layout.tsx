import React from "react";
import { DocsNav } from "@/components/docs-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 overflow-y-auto border-r md:sticky md:block lg:w-[240px] py-6 px-3">
          <div className="h-full py-2">
            <DocsNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
