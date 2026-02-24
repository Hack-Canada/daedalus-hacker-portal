import ScheduleEvent from "./ScheduleEvent";
import {
  EventPosition,
  getEventStyle,
  TIME_SLOT_HEIGHT,
  type TimeSlot,
} from "./utils/schedule-utils";

interface EventsGridProps {
  timeSlots: TimeSlot[];
  eventPositions: EventPosition[];
  dayStartHour: number;
}

export function EventsGrid({
  timeSlots,
  eventPositions,
  dayStartHour,
}: EventsGridProps) {
  return (
    <div className="border-border relative border-l bg-background">
      {/* Time slot grid lines */}
      {timeSlots.map((slot) => (
        <div
          key={slot.label}
          className={`border-t transition-colors ${
            slot.isMajor
              ? "border-border bg-backgroundMuted/25 hover:bg-backgroundMuted"
              : "border-border/30 border-dashed"
          }`}
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
            dayStartHour,
          )}
        />
      ))}
    </div>
  );
}
