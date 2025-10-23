import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { MagicCard } from "./ui/magic-card";

interface EmptyPageProps {
  title: string;
  message: string;
  buttonLabel?: string;
}

export const EmptyPage = ({ title, message, buttonLabel }: EmptyPageProps) => {
  return (
    <div className="flex min-h-[calc(100svh-64px)] items-center justify-center px-4 lg:min-h-svh">
      <MagicCard
        gradientColor="#87CEEB40"
        className="w-full max-w-md bg-background p-4 shadow-lg md:p-8 xl:p-10"
      >
        <div className="space-y-4 text-center">
          <h1 className="mx-auto w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text font-rubik text-3xl font-extrabold text-transparent sm:text-4xl">
            {title}
          </h1>
          <p className="pb-2 text-textMuted max-md:text-sm">{message}</p>
          <Link
            href={"/"}
            className={buttonVariants({
              variant: "primary",
              className: "block w-full",
            })}
          >
            {buttonLabel ? buttonLabel : "Back to Dashboard"}
          </Link>
        </div>
      </MagicCard>
    </div>
  );
};
