interface EventType {
  type: string;
  label: string;
  color: string;
}

const eventTypes: EventType[] = [
  { type: "general", label: "General", color: "bg-sky-400" },
  { type: "meals", label: "Meals", color: "bg-emerald-400" },
  { type: "ceremonies", label: "Ceremonies", color: "bg-amber-400" },
  { type: "workshops", label: "Workshops", color: "bg-violet-400" },
  { type: "fun", label: "Fun Events", color: "bg-rose-400" },
];

export default function ScheduleLegend() {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-backgroundMuted p-4">
      {eventTypes.map((event) => (
        <div key={event.type} className="flex items-center gap-2">
          <div className={`h-4 w-4 rounded ${event.color}`} />
          <span className="text-sm text-textSecondary">{event.label}</span>
        </div>
      ))}
    </div>
  );
}
