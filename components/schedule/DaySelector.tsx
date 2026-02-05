import { DAYS } from "./utils/schedule-utils";

interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export function DaySelector({ selectedDay, onDayChange }: DaySelectorProps) {
  return (
    <div className="flex gap-2">
      {DAYS.map((day, index) => (
        <button
          key={day}
          onClick={() => onDayChange(index)}
          className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-all ${
            selectedDay === index
              ? "bg-primary/20 text-primary border border-primary/30"
              : "text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
