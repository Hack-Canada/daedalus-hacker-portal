import { Event, EVENTS } from "@/config/qr-code";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventSelectorProps {
  selectedEvent: Event | "";
  onEventChange: (value: string) => void;
}

export function EventSelector({
  selectedEvent,
  onEventChange,
}: EventSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-textPrimary">Select Event</h2>
        <p className="text-sm text-textSecondary/80">
          Choose the event you want to check participants into
        </p>
      </div>

      <Select value={selectedEvent} onValueChange={onEventChange}>
        <SelectTrigger className="border-primary/20 bg-background/50 backdrop-blur-sm">
          <SelectValue placeholder="Select event for check-in" />
        </SelectTrigger>
        <SelectContent className="max-h-[250px]">
          {EVENTS.map((event) => (
            <SelectItem key={event} value={event}>
              {event
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
