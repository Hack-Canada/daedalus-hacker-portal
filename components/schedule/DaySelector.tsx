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
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            selectedDay === index
              ? "bg-sky-200 text-sky-950"
              : "text-textSecondary hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
