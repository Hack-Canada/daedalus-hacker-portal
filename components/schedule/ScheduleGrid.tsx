"use client";

import { useState } from "react";

import type { Schedule } from "@/lib/db/schema";

import { DaySelector } from "./DaySelector";
import { EventsGrid } from "./EventsGrid";
import { TimeSlotsColumn } from "./TimeSlotsColumn";
import {
  calculateEventPositions,
  generateTimeSlots,
  getDayEvents,
  getDynamicDayRange,
} from "./utils/schedule-utils";

interface ScheduleGridProps {
  schedule: Schedule[];
}

export default function ScheduleGrid({ schedule }: ScheduleGridProps) {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Friday, 1 = Saturday, 2 = Sunday
  const dayEvents = getDayEvents(schedule, selectedDay);
  const dayRange = getDynamicDayRange(dayEvents, selectedDay);
  const timeSlots = generateTimeSlots(dayRange);
  const eventPositions = calculateEventPositions(dayEvents);

  return (
    <div className="flex flex-col gap-4">
      {/* Day selector tabs */}
      <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="border-border grid min-w-[600px] grid-cols-[100px_1fr] overflow-hidden rounded-lg border xl:grid-cols-[120px_1fr]">
          {/* Time slots */}
          <TimeSlotsColumn timeSlots={timeSlots} />

          {/* Events */}
          <EventsGrid
            timeSlots={timeSlots}
            eventPositions={eventPositions}
            dayStartHour={dayRange.start}
          />
        </div>
      </div>
    </div>
  );
}
