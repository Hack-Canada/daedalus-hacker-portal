"use client";

import { ScheduleType } from "@/types";

import type { Schedule } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useScheduleLightMode } from "./schedule-theme";

const darkEventColors = {
  general: "bg-sky-500/40 hover:bg-sky-500/50 border-l-2 border-sky-400",
  meals: "bg-emerald-500/40 hover:bg-emerald-500/50 border-l-2 border-emerald-400",
  ceremonies: "bg-amber-500/40 hover:bg-amber-500/50 border-l-2 border-amber-400",
  workshops: "bg-violet-500/40 hover:bg-violet-500/50 border-l-2 border-violet-400",
  fun: "bg-rose-500/40 hover:bg-rose-500/50 border-l-2 border-rose-400",
};

const lightEventColors = {
  general: "bg-sky-100 hover:bg-sky-200 border-l-2 border-sky-400 shadow-sm",
  meals: "bg-emerald-100 hover:bg-emerald-200 border-l-2 border-emerald-400 shadow-sm",
  ceremonies: "bg-amber-100 hover:bg-amber-200 border-l-2 border-amber-400 shadow-sm",
  workshops: "bg-violet-100 hover:bg-violet-200 border-l-2 border-violet-400 shadow-sm",
  fun: "bg-rose-100 hover:bg-rose-200 border-l-2 border-rose-400 shadow-sm",
};

interface ScheduleEventProps {
  event: Schedule;
  style: {
    top: string;
    height: string;
    position: "absolute";
    left: string;
    width: string;
    zIndex: number;
  };
}

export default function ScheduleEvent({ event, style }: ScheduleEventProps) {
  const isLightMode = useScheduleLightMode();
  const eventTypeColors = isLightMode ? lightEventColors : darkEventColors;

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours < 12 ? "AM" : "PM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const timeStr =
    event.customTime || `${formatTime(startTime)} - ${formatTime(endTime)}`;

  return (
    <HoverCard>
      <div style={style} className="group absolute p-1">
        <HoverCardTrigger
          className={cn(
            "mx-auto flex h-full w-full flex-col justify-start gap-1 overflow-hidden rounded-md px-2 py-3 transition-all duration-200 hover:shadow-md",
            eventTypeColors[event.type as ScheduleType],
          )}
        >
          <h3 className="text-textPrimary truncate text-sm font-medium">
            {event.eventName}
          </h3>
          {event.location && (
            <p className="text-textSecondary truncate text-xs">
              {event.location}
            </p>
          )}
          <p className="text-textSecondary mt-auto text-xs">{timeStr}</p>
        </HoverCardTrigger>

        {event.eventDescription && (
          <HoverCardContent
            className="border-border bg-backgroundMuted backdrop-blur-sm"
            side="bottom"
          >
            <p>{event.eventDescription}</p>
          </HoverCardContent>
        )}
      </div>
    </HoverCard>
  );
}
