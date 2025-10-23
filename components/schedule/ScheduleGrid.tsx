"use client";

import { useState } from "react";

import { ScheduleItem } from "@/config/schedule";

import { DaySelector } from "./DaySelector";
import { EventsGrid } from "./EventsGrid";
import { TimeSlotsColumn } from "./TimeSlotsColumn";
import {
  calculateEventPositions,
  generateTimeSlots,
  getDayEvents,
} from "./utils/schedule-utils";

interface ScheduleGridProps {
  schedule: ScheduleItem[];
}

export default function ScheduleGrid({ schedule }: ScheduleGridProps) {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Friday, 1 = Saturday, 2 = Sunday
  const timeSlots = generateTimeSlots(selectedDay);
  const dayEvents = getDayEvents(schedule, selectedDay);
  const eventPositions = calculateEventPositions(dayEvents);

  return (
    <div className="flex flex-col gap-4">
      {/* Day selector tabs */}
      <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="grid min-w-[600px] grid-cols-[100px_1fr] overflow-hidden rounded-lg border border-border xl:grid-cols-[120px_1fr]">
          {/* Time slots */}
          <TimeSlotsColumn timeSlots={timeSlots} />

          {/* Events */}
          <EventsGrid
            timeSlots={timeSlots}
            eventPositions={eventPositions}
            selectedDay={selectedDay}
          />
        </div>
      </div>
    </div>
  );
}
