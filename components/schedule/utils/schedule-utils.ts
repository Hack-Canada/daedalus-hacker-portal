import { ScheduleItem } from "@/config/schedule";

export const DAYS = ["Friday", "Saturday", "Sunday"];
export const TIME_SLOT_HEIGHT = 60; // Height in pixels for each 15-min slot
export const INTERVAL = 15; // 15-minute intervals

// Time ranges for each day
export const DAY_RANGES = {
  friday: { start: 16, end: 24 }, // 4 PM to 12 AM
  saturday: { start: 0, end: 24 }, // 12 AM to 12 AM
  sunday: { start: 0, end: 20 }, // 12 AM to 8 PM
} as const;

export function generateTimeSlots(selectedDay: number) {
  const slots = [];
  const range =
    selectedDay === 0
      ? DAY_RANGES.friday
      : selectedDay === 1
        ? DAY_RANGES.saturday
        : DAY_RANGES.sunday;

  for (let hour = range.start; hour < range.end; hour++) {
    for (let minute = 0; minute < 60; minute += INTERVAL) {
      // Format hour in 12-hour format with AM/PM
      const hour12 = hour % 12 || 12;
      const period = hour < 12 ? "AM" : "PM";
      slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
    }
  }
  return slots;
}

export interface EventPosition {
  event: ScheduleItem;
  column: number;
  totalColumns: number;
}

export function calculateEventPositions(
  events: ScheduleItem[],
): EventPosition[] {
  const positions: EventPosition[] = [];
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  interface ColumnStatus {
    lastEndTime: number;
    events: ScheduleItem[];
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
  event: ScheduleItem,
  position: EventPosition,
  selectedDay: number,
) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  // Calculate start and end positions
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  let endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  // Get the day's start hour
  const dayStartHour =
    selectedDay === 0
      ? DAY_RANGES.friday.start
      : selectedDay === 1
        ? DAY_RANGES.saturday.start
        : DAY_RANGES.sunday.start;

  // Handle midnight events
  const isSameDay = startDate.getDate() === endDate.getDate();
  if (!isSameDay && endHour === 0 && endMinute === 0) {
    // Event ends at midnight of next day, treat as end of current day
    endHour = 24;
  }

  // Adjust for day's start time
  const startSlots =
    (startHour - dayStartHour) * 4 + Math.floor(startMinute / 15);
  const endSlots = (endHour - dayStartHour) * 4 + Math.floor(endMinute / 15);
  const duration = endSlots - startSlots;

  // Calculate width based on number of overlapping events
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

export function getDayEvents(schedule: ScheduleItem[], selectedDay: number) {
  return schedule.filter((event) => {
    const eventDate = new Date(event.startTime);
    const day = eventDate.getDay(); // 5 = Friday, 6 = Saturday, 0 = Sunday
    return day === (selectedDay === 2 ? 0 : selectedDay + 5);
  });
}
