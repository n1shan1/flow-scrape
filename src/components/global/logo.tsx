import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";

type Props = {
  fontSize?: string;
  iconSize?: number;
};

function Logo({ fontSize = "text-2xl", iconSize }: Props) {
  return (
    <Link
      href={"/"}
      className={cn("font-extrabold text-center gap-2 flex", fontSize)}
    >
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary/60 p-2">
        <SquareDashedMousePointer
          size={iconSize ? iconSize : 20}
          className={cn("stroke-white")}
        />
      </div>
      <div>
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Flow
        </span>
        <span className="text-gray-700 dark:text-stone-300">Scrape</span>
      </div>
    </Link>
  );
}

export default Logo;
