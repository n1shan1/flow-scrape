import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {};

function NotFoundPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-7xl text-primary font-extrabold">404!</h1>
      <p className="text-foreground text-2xl font-bold">
        The page you were looking for, was not found!
      </p>
      <p className="text-foreground/40 text-lg">
        Don&apos;t worry, even the best pages are lost in the vastness of the
        internet.
      </p>
      <Link href={"/home"} className={buttonVariants({ variant: "default" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
