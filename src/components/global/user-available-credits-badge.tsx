"use client";
import { GetAvailableCredits } from "@/actions/billing/get-available-credits";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import ReactCountUp from "./react-count-up-wrapper";
import { buttonVariants } from "../ui/button";

type Props = {};

function UserAvailableCreditsBadge({}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["available-credits"],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: 30 * 1000,
  });
  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 items-center flex justify-center px-4 py-2",
        buttonVariants({ variant: "outline" })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {isLoading && <Loader2Icon size={20} className="animate-spin" />}
        {!isLoading && data && <ReactCountUp value={data} />}
        {!isLoading && data === undefined && "ERROR"}
      </span>
    </Link>
  );
}

export default UserAvailableCreditsBadge;
