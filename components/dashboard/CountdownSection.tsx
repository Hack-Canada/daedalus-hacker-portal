"use client";

import Image from "next/image";

import { eventDate } from "@/config/site";

import { CountdownTimer } from "../ui/CountdownTimer";
import { Snowflakes } from "../ui/Snowflakes";

export const CountdownSection = () => {
  return (
    <div className="relative overflow-hidden rounded-md border border-gray-300 p-4 shadow-sm md:p-8 lg:col-span-2 xl:p-12">
      <Snowflakes />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <CountdownTimer targetDate={eventDate} />

        {/* Bottom left decorative section */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative size-20 sm:h-20 sm:w-20">
            <Image
              src="/beaver-wave.webp"
              alt="Beaver mascot"
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-rubik font-bold text-textPrimary md:text-lg">
              The countdown ends!
            </p>
            <p className="md:text-lg">
              <span className="text-textSecondary">
                Hope to see you next year!
              </span>{" "}
              ⛰
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
