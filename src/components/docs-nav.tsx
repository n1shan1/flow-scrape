"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronRight,
  Code,
  FileText,
  Key,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Quick Start",
        href: "/docs/quickstart",
        icon: Rocket,
      },
      {
        title: "Core Concepts",
        href: "/docs/concepts",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "Nodes",
        href: "/docs/nodes",
        icon: Code,
      },
      {
        title: "Examples",
        href: "/docs/examples",
        icon: FileText,
      },
      {
        title: "Credentials",
        href: "/docs/credentials",
        icon: Key,
      },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0">
      <div className="space-y-8">
        {navigation.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2",
                      isActive && "bg-muted"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      {item.title}
                      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
