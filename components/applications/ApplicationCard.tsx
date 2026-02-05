import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Application } from "@/config/applications";
import { cn } from "@/lib/utils";

import { ApplicationCardHeader } from "./ApplicationCardHeader";
import { ApplicationCardStatus } from "./ApplicationCardStatus";

interface ApplicationCardProps {
  application: Application;
  alreadyApplied: boolean;
}

export const ApplicationCard = ({
  application,
  alreadyApplied = false,
}: ApplicationCardProps) => {
  const {
    title,
    status,
    deadline,
    description,
    icon: Icon,
    disabled,
    href,
  } = application;

  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,144,255,0.15)]",
        disabled && "opacity-60",
        alreadyApplied && "cursor-default border-primary/50",
      )}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-75" />

      {!alreadyApplied && (
        <Link
          href={disabled ? "" : href}
          className={`absolute inset-0 z-20 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          aria-label={`Apply for ${title}`}
        />
      )}
      {alreadyApplied && (
        <div className="pointer-events-none absolute -right-2 -top-2 z-20 rounded-full border border-primary/30 bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
          Applied
        </div>
      )}
      <div className="pointer-events-none relative z-10">
        <ApplicationCardHeader
          title={
            <div className="flex items-center gap-2">
              {title}
              {alreadyApplied && (
                <Check
                  className="size-4 text-primary md:size-5"
                  strokeWidth={3}
                />
              )}
            </div>
          }
          description={description}
          icon={Icon}
        />

        <ApplicationCardStatus status={status} deadline={deadline} />
      </div>

      {alreadyApplied && (
        <div className="relative z-30 mt-4 max-xs:w-full">
          <Link
            href="/applications/hacker/review"
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/20 max-xs:w-full max-xs:justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Review your application
          </Link>
        </div>
      )}
    </div>
  );
};
