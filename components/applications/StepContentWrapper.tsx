"use client";

import { cn } from "@/lib/utils";

interface StepContentWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function StepContentWrapper({
  title,
  children,
  className,
}: StepContentWrapperProps) {
  return (
    <div className={cn("space-y-4 md:space-y-6 xl:space-y-8", className)}>
      <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
        <h1 className="font-rubik text-3xl font-semibold md:text-4xl">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
