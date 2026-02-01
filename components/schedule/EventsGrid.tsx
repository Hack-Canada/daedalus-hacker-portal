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
    <div className="border-border relative border-l bg-white">
      {/* Time slot grid lines */}
      {timeSlots.map((time) => (
        <div
          key={time}
          className="border-border bg-backgroundMuted/25 hover:bg-backgroundMuted border-t transition-colors"
          style={{ height: TIME_SLOT_HEIGHT }}
        />
      ))}

      {/* Events */}
      {eventPositions.map(({ event, column, totalColumns }) => (
        <ScheduleEvent
          key={event.id}
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
