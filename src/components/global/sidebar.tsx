"use client";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import {
  BookIcon,
  BotIcon,
  CoinsIcon,
  HomeIcon,
  KeyIcon,
  Layers2Icon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import Logo from "./logo";
import UserAvailableCreditsBadge from "./user-available-credits-badge";

type Props = {};

const routes = [
  {
    href: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: KeyIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
  {
    href: "docs",
    label: "Docs",
    icon: BookIcon,
  },
  {
    href: "contact",
    label: "contact",
    icon: BotIcon,
  },
];

export function MobileSidebar({}: Props) {
  const pathName = usePathname();
  const activePath = pathName.split("/")[1];
  console.log(activePath);
  const [open, setOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="flex items-center justify-between px-2 py-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[280px] p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="flex flex-col gap-3 p-4 border-b border-separate">
                <Logo />
              </SheetHeader>
              <p className="p-2 px-4">
                <UserAvailableCreditsBadge />
              </p>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {routes.map((route) => (
                    <Link
                      onClick={() => setOpen(false)}
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-secondary/50",
                        activePath === route.href
                          ? "bg-primary/15 dark:bg-secondary/60 shadow-sm"
                          : "text-muted-foreground"
                      )}
                    >
                      <route.icon
                        size={18}
                        className={cn(
                          "transition-colors",
                          activePath === route.href
                            ? "text-primary dark:text-white"
                            : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          activePath === route.href
                            ? "text-primary dark:text-white"
                            : "text-muted-foreground"
                        )}
                      >
                        {route.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <SheetFooter className="p-4 border-t border-separate mt-auto gap-3">
                <div className="w-full text-xs text-center text-muted-foreground">
                  Flow Scrape v1.0
                </div>
                <Button className="w-full" variant={"outline"}>
                  <SignOutButton>Logout</SignOutButton>
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

function DesktopSidebar({}: Props) {
  const pathName = usePathname();
  const activePath = pathName === "/" ? "/" : pathName.split("/")[1];

  return (
    <div className="hidden md:flex flex-col h-screen w-[280px] bg-gradient-to-br from-primary/5 to-primary/10 dark:from-secondary/20 dark:to-secondary/40 dark:text-foreground text-muted-foreground border-r border-separate">
      <div className="flex items-center p-6 border-b border-separate">
        <Logo />
      </div>
      <p className="p-2 px-4">
        <UserAvailableCreditsBadge />
      </p>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-secondary/50",
                activePath === route.href
                  ? "bg-primary/15 dark:bg-secondary/60 shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <route.icon
                size={18}
                className={cn(
                  "transition-colors",
                  activePath === route.href
                    ? "text-primary dark:text-white"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "font-medium",
                  activePath === route.href
                    ? "text-primary dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
