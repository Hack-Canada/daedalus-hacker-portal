import Link from "next/link";

import { buttonVariants } from "../ui/button";
import { MagicCard } from "../ui/magic-card";

export const UnauthorizedState = () => {
  return (
    <div className="flex min-h-[calc(100svh-64px)] items-center justify-center px-4 lg:min-h-svh">
      <MagicCard
        gradientColor="#87CEEB40"
        className="w-full max-w-md bg-background p-4 shadow-lg md:p-8 xl:p-10"
      >
        <div className="space-y-6 text-center">
          <h1 className="mx-auto w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text font-rubik text-3xl font-extrabold text-transparent">
            Not Logged In
          </h1>
          <p className="text-textMuted max-md:text-sm">
            Please sign in or create an account to continue.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};
