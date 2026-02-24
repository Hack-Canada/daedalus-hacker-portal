"use client";

import { useState, useEffect } from "react";

import type { Schedule } from "@/lib/db/schema";

import { ScheduleThemeProvider } from "./schedule-theme";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleLegend from "./ScheduleLegend";
import { ScheduleThemeToggle } from "./ScheduleThemeToggle";

interface ScheduleViewProps {
  schedule: Schedule[];
}

const STORAGE_KEY = "schedule-theme-mode";

export default function ScheduleView({ schedule }: ScheduleViewProps) {
  const [isLightMode, setIsLightMode] = useState(() => {
    // Only access localStorage on client-side
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "light";
    }
    return false;
  });

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isLightMode ? "light" : "dark");
  }, [isLightMode]);

  return (
    <ScheduleThemeProvider value={isLightMode}>
      <div
        className={`flex flex-col gap-6 rounded-2xl transition-all duration-500 ${
          isLightMode
            ? "schedule-light bg-background p-4 shadow-lg ring-1 ring-border"
            : ""
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="from-primary to-primary w-fit bg-linear-to-r via-sky-400 bg-clip-text text-transparent">
              <h1 className="font-rubik text-3xl font-bold">Event Schedule</h1>
            </div>
            <p className="text-textSecondary">
              All times are in Eastern Time (ET). Events and times are subject to
              change.
            </p>
          </div>
          <ScheduleThemeToggle
            isLightMode={isLightMode}
            onToggle={() => setIsLightMode(!isLightMode)}
          />
        </div>

        <ScheduleLegend />
        <div className="border-border bg-backgroundMuted rounded-lg border p-4">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>
    </ScheduleThemeProvider>
  );
}
