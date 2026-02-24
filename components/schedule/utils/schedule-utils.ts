import { Schedule } from "@/lib/db/schema";

export const DAYS = ["Friday", "Saturday", "Sunday"];
export const TIME_SLOT_HEIGHT = 50; // Height in pixels for each 15-min slot
export const INTERVAL = 15; // 15-minute intervals

export type DayRange = { start: number; end: number };

export type TimeSlot = {
  label: string;
  isMajor: boolean; // true for :00 and :30, false for :15 and :45
};

// Fallback ranges used when no events exist for a day
const FALLBACK_RANGES: Record<string, DayRange> = {
  friday: { start: 16, end: 24 },
  saturday: { start: 8, end: 24 },
  sunday: { start: 8, end: 20 },
};

export function getDynamicDayRange(
  events: Schedule[],
  selectedDay: number,
): DayRange {
  const key =
    selectedDay === 0 ? "friday" : selectedDay === 1 ? "saturday" : "sunday";
  const fallback = FALLBACK_RANGES[key];

  if (events.length === 0) return fallback;

  let earliestHour = 24;
  let latestHour = 0;

  events.forEach((event) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const startHour = start.getHours();
    let endHour = end.getHours();
    const endMinute = end.getMinutes();

    const isSameDay = start.getDate() === end.getDate();
    if (!isSameDay && endHour === 0 && endMinute === 0) {
      endHour = 24;
    }
    if (endMinute > 0) endHour += 1;

    earliestHour = Math.min(earliestHour, startHour);
    latestHour = Math.max(latestHour, endHour);
  });

  return {
    start: Math.max(0, earliestHour - 1),
    end: Math.min(24, latestHour + 1),
  };
}

export function generateTimeSlots(range: DayRange): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = range.start; hour < range.end; hour++) {
    for (let minute = 0; minute < 60; minute += INTERVAL) {
      const hour12 = hour % 12 || 12;
      const period = hour < 12 ? "AM" : "PM";
      slots.push({
        label: `${hour12}:${minute.toString().padStart(2, "0")} ${period}`,
        isMajor: minute % 30 === 0,
      });
    }
  }
  return slots;
}

export interface EventPosition {
  event: Schedule;
  column: number;
  totalColumns: number;
}

export function calculateEventPositions(events: Schedule[]): EventPosition[] {
  const positions: EventPosition[] = [];
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  interface ColumnStatus {
    lastEndTime: number;
    events: Schedule[];
  }

  // Keep track of the end time of events in each column
  const columns: ColumnStatus[] = [];

  sortedEvents.forEach((event) => {
    const eventStart = new Date(event.startTime).getTime();
    const eventEnd = new Date(event.endTime).getTime();

    // Try to find an existing column where this event can fit
    let columnIndex = -1;
    for (let i = 0; i < columns.length; i++) {
      // Check if any event in this column overlaps with current event
      const hasOverlap = columns[i].events.some((existingEvent) => {
        const existingStart = new Date(existingEvent.startTime).getTime();
        const existingEnd = new Date(existingEvent.endTime).getTime();
        return !(eventEnd <= existingStart || eventStart >= existingEnd);
      });

      if (!hasOverlap) {
        columnIndex = i;
        break;
      }
    }

    // If no existing column works, create a new one
    if (columnIndex === -1) {
      columnIndex = columns.length;
      columns.push({
        lastEndTime: 0,
        events: [],
      });
    }

    // Add event to the column
    columns[columnIndex].events.push(event);
    columns[columnIndex].lastEndTime = eventEnd;
  });

  // Create positions for all events
  sortedEvents.forEach((event) => {
    const eventStart = new Date(event.startTime).getTime();
    const eventEnd = new Date(event.endTime).getTime();

    // Find which column this event is in
    let eventColumn = 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].events.includes(event)) {
        eventColumn = i;
        break;
      }
    }

    // Count overlapping columns during this event's time period
    let overlappingColumns = 0;
    columns.forEach((column) => {
      const hasOverlappingEvent = column.events.some((existingEvent) => {
        const existingStart = new Date(existingEvent.startTime).getTime();
        const existingEnd = new Date(existingEvent.endTime).getTime();
        return !(eventEnd <= existingStart || eventStart >= existingEnd);
      });
      if (hasOverlappingEvent) overlappingColumns++;
    });

    // For non-overlapping events, use full width. Otherwise use total columns.
    const totalColumns = overlappingColumns === 1 ? 1 : columns.length;

    positions.push({
      event,
      column: eventColumn,
      totalColumns,
    });
  });

  return positions;
}

export function getEventStyle(
  event: Schedule,
  position: EventPosition,
  dayStartHour: number,
) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  let endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  const isSameDay = startDate.getDate() === endDate.getDate();
  if (!isSameDay && endHour === 0 && endMinute === 0) {
    endHour = 24;
  }

  const slotsPerHour = 60 / INTERVAL;
  const startSlots =
    (startHour - dayStartHour) * slotsPerHour +
    Math.floor(startMinute / INTERVAL);
  const endSlots =
    (endHour - dayStartHour) * slotsPerHour + Math.floor(endMinute / INTERVAL);
  const duration = endSlots - startSlots;

  const columnWidth = 100 / Math.max(1, position.totalColumns);
  const width = `${columnWidth}%`;
  const left = `${position.column * columnWidth}%`;

  return {
    top: `${startSlots * TIME_SLOT_HEIGHT}px`,
    height: `${duration * TIME_SLOT_HEIGHT}px`,
    position: "absolute" as const,
    left,
    width,
    zIndex: 10,
  };
}

export function getDayEvents(schedule: Schedule[], selectedDay: number) {
  return schedule.filter((event) => {
    const eventDate = new Date(event.startTime);
    const day = eventDate.getDay(); // 5 = Friday, 6 = Saturday, 0 = Sunday
    return day === (selectedDay === 2 ? 0 : selectedDay + 5);
  });
}
