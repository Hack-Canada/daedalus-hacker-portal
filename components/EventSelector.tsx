import { CheckCircle2, Cookie, Plus, Utensils } from "lucide-react";

import { Event, EVENTS } from "@/config/qr-code";
import { cn } from "@/lib/utils";

interface EventSelectorProps {
  selectedEvent: Event | "";
  onEventChange: (value: string) => void;
}

// Event categories with metadata
const eventCategories = {
  main: {
    label: "Main Check-In",
    events: ["hackathon-check-in"],
    icon: CheckCircle2,
    color: "primary",
  },
  meals: {
    label: "Meals",
    events: [
      "friday-dinner",
      "saturday-breakfast",
      "saturday-lunch",
      "saturday-dinner",
      "sunday-breakfast",
      "sunday-lunch",
    ],
    icon: Utensils,
    color: "emerald",
  },
  snacks: {
    label: "Snacks",
    events: ["snack-1", "snack-2", "snack-3", "snack-4", "snack-5"],
    icon: Cookie,
    color: "amber",
  },
  other: {
    label: "Other Events",
    events: ["extra-1", "extra-2"],
    icon: Plus,
    color: "violet",
  },
} as const;

// Format event name for display
const formatEventName = (event: string) => {
  return event
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function EventSelector({
  selectedEvent,
  onEventChange,
}: EventSelectorProps) {
  const isMainSelected = selectedEvent === "hackathon-check-in";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-textPrimary">Select Event</h2>
        <p className="text-sm text-textSecondary/80">
          Choose the event you want to check participants into
        </p>
      </div>

      {/* Quick Check-In Button */}
      <button
        onClick={() => onEventChange("hackathon-check-in")}
        className={cn(
          "group relative w-full overflow-hidden rounded-lg border-2 p-6 text-left transition-all duration-300",
          isMainSelected
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
            : "border-primary/30 bg-gradient-to-br from-primary/5 to-sky-500/5 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              isMainSelected
                ? "bg-primary text-white shadow-lg"
                : "bg-primary/20 text-primary group-hover:bg-primary/30",
            )}
          >
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3
              className={cn(
                "text-lg font-bold transition-colors",
                isMainSelected ? "text-primary" : "text-textPrimary",
              )}
            >
              HACKATHON CHECK IN
            </h3>
            <p className="text-sm text-textSecondary">Main event check-in</p>
          </div>
          {isMainSelected && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>
      </button>

      {/* Meals Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-emerald-500" />
          <h3 className="font-semibold text-textPrimary">
            {eventCategories.meals.label}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {eventCategories.meals.events.map((event) => (
            <button
              key={event}
              onClick={() => onEventChange(event)}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                selectedEvent === event
                  ? "border-emerald-500 bg-emerald-500/10 shadow-md"
                  : "border-border bg-background hover:border-emerald-400 hover:bg-emerald-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    selectedEvent === event
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-500/20 text-emerald-600 group-hover:bg-emerald-500/30",
                  )}
                >
                  <Utensils className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    selectedEvent === event
                      ? "text-emerald-600"
                      : "text-textPrimary",
                  )}
                >
                  {formatEventName(event)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Snacks Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Cookie className="h-5 w-5 text-amber-500" />
          <h3 className="font-semibold text-textPrimary">
            {eventCategories.snacks.label}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {eventCategories.snacks.events.map((event) => (
            <button
              key={event}
              onClick={() => onEventChange(event)}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                selectedEvent === event
                  ? "border-amber-500 bg-amber-500/10 shadow-md"
                  : "border-border bg-background hover:border-amber-400 hover:bg-amber-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    selectedEvent === event
                      ? "bg-amber-500 text-white"
                      : "bg-amber-500/20 text-amber-600 group-hover:bg-amber-500/30",
                  )}
                >
                  <Cookie className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    selectedEvent === event
                      ? "text-amber-600"
                      : "text-textPrimary",
                  )}
                >
                  {formatEventName(event)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Other Events Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-violet-500" />
          <h3 className="font-semibold text-textPrimary">
            {eventCategories.other.label}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {eventCategories.other.events.map((event) => (
            <button
              key={event}
              onClick={() => onEventChange(event)}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                selectedEvent === event
                  ? "border-violet-500 bg-violet-500/10 shadow-md"
                  : "border-border bg-background hover:border-violet-400 hover:bg-violet-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    selectedEvent === event
                      ? "bg-violet-500 text-white"
                      : "bg-violet-500/20 text-violet-600 group-hover:bg-violet-500/30",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    selectedEvent === event
                      ? "text-violet-600"
                      : "text-textPrimary",
                  )}
                >
                  {formatEventName(event)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
