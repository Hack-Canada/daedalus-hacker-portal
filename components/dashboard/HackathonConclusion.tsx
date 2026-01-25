import { ExternalLink } from "lucide-react";

import { eventGalleryUrl, hackathonYear } from "@/config/site";

import { buttonVariants } from "../ui/button";

interface HackathonConclusionProps {
  role: string;
}

export const HackathonConclusion = ({ role }: HackathonConclusionProps) => {
  return (
    <div className="border-primary/25 before:from-primary/20 before:via-info/30 before:to-primaryLight/30 relative w-full rounded-md border-2 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:opacity-75 md:p-8 xl:p-12">
      <h2 className="text-textPrimary mb-4 text-2xl font-medium">
        Hack Canada {hackathonYear} Has Concluded
      </h2>
      <p className="text-textPrimary/70 mb-6">
        {role === "hacker" &&
          `Thank you for participating in Hack Canada ${hackathonYear}! Your projects and enthusiasm made this event truly special. We hope you gained valuable experience, made lasting connections, and will join us again for Hack Canad a ${hackathonYear + 1} next year!`}
        {(role === "organizer" || role === "admin") &&
          `Congratulations on successfully organizing Hack Canada ${hackathonYear}! Your hard work and dedication made this event possible. Time to start planning for an even bigger and better Hack Canada ${hackathonYear + 1} next year!`}
        {role === "volunteer" &&
          `Thank you for volunteering at Hack Canada ${hackathonYear}! Your dedication and hard work helped make this event run smoothly. We truly appreciate your contribution and hope you'll be part of our team again next year!`}
        {role === "unassigned" &&
          `Thank you for your interest in Hack Canada ${hackathonYear}! While this year's event has concluded, we encourage you to stay tuned for updates about Hack Canada ${hackathonYear + 1}. We'd love to have you join us next year!`}
      </p>
      <a
        href={eventGalleryUrl || ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!eventGalleryUrl}
        className={buttonVariants({
          variant: eventGalleryUrl ? "primary" : "outline",
          className: `inline-flex items-center gap-2 ${!eventGalleryUrl ? "pointer-events-none cursor-not-allowed text-gray-400! opacity-40 hover:bg-transparent" : ""}`,
        })}
      >
        {eventGalleryUrl ? "View Gallery" : "Photos Coming Soon"}
        <ExternalLink className="size-4" />
      </a>
    </div>
  );
};
