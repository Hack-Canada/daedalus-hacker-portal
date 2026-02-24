import { TIME_SLOT_HEIGHT, type TimeSlot } from "./utils/schedule-utils";

interface TimeSlotsColumnProps {
  timeSlots: TimeSlot[];
}

export function TimeSlotsColumn({ timeSlots }: TimeSlotsColumnProps) {
  return (
    <div className="relative">
      {timeSlots.map((slot) => (
        <div
          key={slot.label}
          className={`border-t bg-background transition-colors hover:bg-backgroundMuted ${
            slot.isMajor ? "border-border" : "border-border/30 border-dashed"
          }`}
          style={{ height: TIME_SLOT_HEIGHT }}
        >
          {slot.isMajor && (
            <div className="sticky left-0 mt-1 pr-2 text-right text-sm text-textSecondary">
              {slot.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
