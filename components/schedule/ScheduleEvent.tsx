"use client";

import { ScheduleItem } from "@/config/schedule";
import { cn } from "@/lib/utils";

const eventTypeColors = {
  general: "bg-sky-200/75 hover:bg-sky-300",
  meals: "bg-emerald-200/75 hover:bg-emerald-300",
  ceremonies: "bg-amber-200/75 hover:bg-amber-300",
  workshops: "bg-violet-200/75 hover:bg-violet-300",
  fun: "bg-rose-200/75 hover:bg-rose-300",
};

interface ScheduleEventProps {
  event: ScheduleItem;
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
  // Format time to display
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
    <div style={style} className="absolute p-1">
      <div
        className={cn(
          "mx-auto flex h-full w-full flex-col justify-start gap-1 overflow-hidden rounded-md px-2 py-3 transition-all duration-200 hover:shadow-md",
          eventTypeColors[event.type],
        )}
      >
        <h3 className="truncate text-sm font-medium text-textPrimary">
          {event.name}
        </h3>
        {event.location && (
          <p className="truncate text-xs text-textSecondary">
            {event.location}
          </p>
        )}
        <p className="mt-auto text-xs text-textSecondary">{timeStr}</p>
      </div>
    </div>
  );
}
