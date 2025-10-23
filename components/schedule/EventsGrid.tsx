import ScheduleEvent from "./ScheduleEvent";
import {
  EventPosition,
  getEventStyle,
  TIME_SLOT_HEIGHT,
} from "./utils/schedule-utils";

interface EventsGridProps {
  timeSlots: string[];
  eventPositions: EventPosition[];
  selectedDay: number;
}

export function EventsGrid({
  timeSlots,
  eventPositions,
  selectedDay,
}: EventsGridProps) {
  return (
    <div className="relative border-l border-border bg-white">
      {/* Time slot grid lines */}
      {timeSlots.map((time) => (
        <div
          key={time}
          className="border-t border-border bg-backgroundMuted/25 transition-colors hover:bg-backgroundMuted"
          style={{ height: TIME_SLOT_HEIGHT }}
        />
      ))}

      {/* Events */}
      {eventPositions.map(({ event, column, totalColumns }) => (
        <ScheduleEvent
          key={`${event.name}-${event.startTime}`}
          event={event}
          style={getEventStyle(
            event,
            { event, column, totalColumns },
            selectedDay,
          )}
        />
      ))}
    </div>
  );
}
