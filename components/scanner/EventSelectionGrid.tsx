"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Cookie,
  Plus,
  ShoppingBag,
  Trophy,
  Utensils,
} from "lucide-react";

import { cn } from "@/lib/utils";

const eventCategories = {
  main: {
    label: "Main Check-In",
    events: ["hackathon-check-in"],
    icon: CheckCircle2,
    color: "primary",
    description: "Main event check-in - Required before other events",
  },
  challenges: {
    label: "Challenges",
    events: ["challenge"],
    icon: Trophy,
    color: "sky",
    description: "Scan challenge-specific QR codes from participants",
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
    description: "Meal check-ins for participants",
  },
  snacks: {
    label: "Snacks",
    events: ["snack-1", "snack-2", "snack-3", "snack-4", "snack-5"],
    icon: Cookie,
    color: "amber",
    description: "Snack distribution check-ins",
  },
  other: {
    label: "Other Events",
    events: ["extra-1", "extra-2"],
    icon: Plus,
    color: "violet",
    description: "Additional event check-ins",
  },
} as const;

const formatEventName = (event: string) => {
  return event
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function EventSelectionGrid() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-textPrimary">Select Event</h2>
        <p className="text-sm text-textSecondary/80">
          Choose the event you want to check participants into
        </p>
      </div>

      {/* Main Hackathon Check-In */}
      <Link
        href="/scanner/hackathon-check-in"
        className={cn(
          "group relative block w-full overflow-hidden rounded-lg border-2 p-6 text-left transition-all duration-300",
          "border-primary/30 bg-gradient-to-br from-primary/5 to-sky-500/5 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              "bg-primary/20 text-primary group-hover:bg-primary/30",
            )}
          >
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-textPrimary group-hover:text-primary transition-colors">
              HACKATHON CHECK IN
            </h3>
            <p className="text-sm text-textSecondary">
              Main event check-in - Required before other events
            </p>
          </div>
        </div>
      </Link>

      {/* Challenge QR Scanner */}
      <Link
        href="/scanner/challenge"
        className={cn(
          "group relative block w-full overflow-hidden rounded-lg border-2 p-6 text-left transition-all duration-300",
          "border-sky-500/30 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 hover:border-sky-500/50 hover:shadow-md hover:shadow-sky-500/10",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              "bg-sky-500/20 text-sky-600 group-hover:bg-sky-500/30",
            )}
          >
            <Trophy className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-textPrimary group-hover:text-sky-600 transition-colors">
              CHALLENGE SCANNER
            </h3>
            <p className="text-sm text-textSecondary">
              Scan challenge-specific QR codes from participants
            </p>
          </div>
        </div>
      </Link>

      {/* Shop Redemption Scanner */}
      <Link
        href="/scanner/shop-redeem"
        className={cn(
          "group relative block w-full overflow-hidden rounded-lg border-2 p-6 text-left transition-all duration-300",
          "border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-pink-500/5 hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              "bg-rose-500/20 text-rose-600 group-hover:bg-rose-500/30",
            )}
          >
            <ShoppingBag className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-textPrimary group-hover:text-rose-600 transition-colors">
              SHOP REDEMPTION
            </h3>
            <p className="text-sm text-textSecondary">
              Scan shop QR codes to process purchases (Organizers only)
            </p>
          </div>
        </div>
      </Link>

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
            <Link
              key={event}
              href={`/scanner/${event}`}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                "border-border bg-background hover:border-emerald-400 hover:bg-emerald-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    "bg-emerald-500/20 text-emerald-600 group-hover:bg-emerald-500/30",
                  )}
                >
                  <Utensils className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-textPrimary group-hover:text-emerald-600 transition-colors">
                  {formatEventName(event)}
                </span>
              </div>
            </Link>
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
            <Link
              key={event}
              href={`/scanner/${event}`}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                "border-border bg-background hover:border-amber-400 hover:bg-amber-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    "bg-amber-500/20 text-amber-600 group-hover:bg-amber-500/30",
                  )}
                >
                  <Cookie className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-textPrimary group-hover:text-amber-600 transition-colors">
                  {formatEventName(event)}
                </span>
              </div>
            </Link>
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
            <Link
              key={event}
              href={`/scanner/${event}`}
              className={cn(
                "group relative overflow-hidden rounded-lg border p-3 text-left transition-all duration-200",
                "border-border bg-background hover:border-violet-400 hover:bg-violet-500/5",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                    "bg-violet-500/20 text-violet-600 group-hover:bg-violet-500/30",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-textPrimary group-hover:text-violet-600 transition-colors">
                  {formatEventName(event)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
