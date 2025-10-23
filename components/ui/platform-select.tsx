"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { platformIcons } from "@/config/platforms";
import { cn } from "@/lib/utils";
import { Platform } from "@/lib/validations/profile";

interface PlatformSelectProps {
  value?: Platform;
  onChange: (value: Platform) => void;
  disabled?: boolean;
}

const platformStyles: Record<Platform, string> = {
  github: "hover:bg-[#24292e] hover:text-white",
  linkedin: "hover:bg-[#0077b5] hover:text-white",
  instagram: "hover:bg-[#fbad50] hover:text-black",
  twitch: "hover:bg-[#9146ff] hover:text-white",
  youtube: "hover:bg-[#ff0000] hover:text-white",
  portfolio: "hover:bg-gray-800 hover:text-white",
};

export function PlatformSelect({
  value,
  onChange,
  disabled = false,
}: PlatformSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-2",
          "bg-background text-sm transition-colors",
          value && platformStyles[value],
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <div className="flex items-center gap-2">
          {value &&
            createElement(platformIcons[value], { className: "h-4 w-4" })}
          <span>
            {value
              ? value.charAt(0).toUpperCase() + value.slice(1)
              : "Select platform"}
          </span>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background py-1 shadow-lg">
          {Object.keys(platformIcons).map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => {
                onChange(platform as Platform);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                platformStyles[platform as Platform],
                platform === value && "bg-accent",
              )}
            >
              {createElement(platformIcons[platform as Platform], {
                className: "size-4",
              })}
              <span>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
