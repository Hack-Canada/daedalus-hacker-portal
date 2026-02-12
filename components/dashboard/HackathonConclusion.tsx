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
        What an Incredible Journey! 🎉
      </h2>
      <p className="text-textPrimary/70 mb-6">
        {role === "hacker" &&
          `WOW! Hack Canada ${hackathonYear} was absolutely legendary, and YOU made it happen! 🚀 The projects, the energy, the 3 AM debugging sessions — all unforgettable. We hope you made amazing friends, learned tons, and had the time of your life. Can't wait to see what you build at Hack Canada ${hackathonYear + 1}!`}
        {(role === "organizer" || role === "admin") &&
          `You did it! 🎊 Hack Canada ${hackathonYear} was a massive success thanks to your incredible leadership and countless hours of work. Take a well-deserved break, but get ready — Hack Canada ${hackathonYear + 1} is going to be even more epic!`}
        {role === "volunteer" &&
          `Heroes don't always wear capes — sometimes they wear volunteer badges! 🦸 Your tireless work made Hack Canada ${hackathonYear} run like clockwork. We're so grateful for your amazing energy and hope to have you back for Hack Canada ${hackathonYear + 1}!`}
        {role === "unassigned" &&
          `Thanks for being part of the Hack Canada family! 🍁 While ${hackathonYear}'s adventure has wrapped up, the next one is just around the corner. Stay tuned for Hack Canada ${hackathonYear + 1} — we'd absolutely love to have you join the fun!`}
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
        {eventGalleryUrl ? "Relive the Magic! 📸" : "Photos Coming Soon"}
        <ExternalLink className="size-4" />
      </a>
    </div>
  );
};
