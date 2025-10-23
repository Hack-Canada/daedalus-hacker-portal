import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Confetti } from "@/components/ui/confetti";

export default function SubmissionSuccess() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100svh-64px)] w-full max-w-5xl flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:min-h-svh xl:px-10">
      <Confetti className="confetti-container pointer-events-none absolute inset-0 h-svh w-full" />

      {/* Main content */}
      <div className="relative text-center md:text-left">
        <div className="pointer-events-none absolute -bottom-28 right-0 size-32 sm:-bottom-16 sm:right-4 sm:size-48 md:-bottom-32 md:left-48 md:size-64 lg:right-44 xl:left-56">
          <Image
            src="/beaver-wave.webp"
            alt="Beaver waving"
            width={256}
            height={256}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-28 left-0 size-32 -scale-x-100 sm:-bottom-16 sm:right-4 sm:size-48 md:hidden">
          <Image
            src="/beaver-wave.webp"
            alt="Beaver waving"
            width={256}
            height={256}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Emoji for all screens */}
        <div className="absolute -top-4 right-4 text-5xl xs:right-12 sm:right-24 sm:text-6xl md:-top-8 md:right-20 md:text-7xl xl:right-12 xl:text-8xl">
          🎉
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4 md:mb-10 xl:mb-12">
          <div className="text-4xl font-bold md:text-5xl xl:text-6xl">
            <div className="bg-gradient-to-r from-blue-400 via-sky-400 to-primary/70 bg-clip-text text-transparent md:w-fit">
              <h1 className="font-rubik">Submitted!</h1>
            </div>
          </div>
          <p className="text-sm text-textMuted sm:text-base md:text-lg xl:text-xl">
            Your response has been saved, keep an eye out on your emails in the
            coming weeks for updates.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:gap-4 md:w-fit md:items-start xl:w-fit">
          <a
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg sm:w-fit sm:px-6 sm:py-2 sm:text-base md:px-8 md:text-lg xl:px-10 xl:py-3"
          >
            <span>Dashboard</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 xl:size-5" />
          </a>
          <Link
            href="/applications/hacker/review"
            className="flex w-full items-center justify-center gap-2 text-textMuted transition-colors duration-200 hover:text-textPrimary max-md:text-sm sm:w-fit xl:mx-auto"
          >
            <ExternalLink className="size-4 xl:size-5" />
            <span>Review Application</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
