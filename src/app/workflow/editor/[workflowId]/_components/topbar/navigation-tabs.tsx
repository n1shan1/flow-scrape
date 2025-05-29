"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { workflowId: string };

function NavigationTabs({ workflowId }: Props) {
  const pathName = usePathname();
  const activePath = pathName.split("/")[2];
  console.log(activePath);
  return (
    <Tabs value={activePath} className="w-[400px] capitalize">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger value={"editor"} className="w-full">
            Editor
          </TabsTrigger>
        </Link>
        <Link href={`/workflow/runs/${workflowId}`}>
          <TabsTrigger value={"runs"} className="w-full">
            Runs
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}

export default NavigationTabs;
