import { ExternalLink } from "lucide-react";

import { eventGalleryUrl } from "@/config/site";
import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

interface HackathonConclusionProps {
  role: string;
}

export const HackathonConclusion = ({ role }: HackathonConclusionProps) => {
  return (
    <div className="relative w-full rounded-md border-2 border-primary/25 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-primary/20 before:via-info/30 before:to-primaryLight/30 before:opacity-75 md:p-8 xl:p-12">
      <h2 className="mb-4 text-2xl font-medium text-textPrimary">
        Hack Canada 2025 Has Concluded
      </h2>
      <p className="mb-6 text-textPrimary/70">
        {role === "hacker" &&
          "Thank you for participating in Hack Canada 2025! Your projects and enthusiasm made this event truly special. We hope you gained valuable experience, made lasting connections, and will join us again for Hack Canada 2026!"}
        {(role === "organizer" || role === "admin") &&
          "Congratulations on successfully organizing Hack Canada 2025! Your hard work and dedication made this event possible. Time to start planning for an even bigger and better Hack Canada 2026!"}
        {role === "volunteer" &&
          "Thank you for volunteering at Hack Canada 2025! Your dedication and hard work helped make this event run smoothly. We truly appreciate your contribution and hope you'll be part of our team again next year!"}
        {role === "unassigned" &&
          "Thank you for your interest in Hack Canada 2025! While this year's event has concluded, we encourage you to stay tuned for updates about Hack Canada 2026. We'd love to have you join us next year!"}
      </p>
      <a
        href={eventGalleryUrl || ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!eventGalleryUrl}
        className={buttonVariants({
          variant: eventGalleryUrl ? "primary" : "outline",
          className: `inline-flex items-center gap-2 ${!eventGalleryUrl ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent" : ""}`,
        })}
      >
        {eventGalleryUrl ? "View Gallery" : "Photos Coming Soon"}
        <ExternalLink className="size-4" />
      </a>
    </div>
  );
};
