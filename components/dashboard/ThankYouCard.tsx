"use client";

import { Heart, Star } from "lucide-react";

import { hackathonYear } from "@/config/site";

interface ThankYouCardProps {
  role: UserRole;
}

export const ThankYouCard = ({ role }: ThankYouCardProps) => {
  const messages: Record<UserRole, string> = {
    hacker: `Your creativity and innovation made Hack Canada ${hackathonYear} unforgettable!`,
    organizer: "Your leadership made this event possible!",
    volunteer: "Your dedication kept everything running smoothly!",
    admin: "Your oversight ensured a successful event!",
    unassigned: "Thank you for your interest in Hack Canada!",
    mentor: "Your guidance helped hackers succeed!",
    judge: "Your expertise made the judging process fair and accurate!",
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-info/5 to-primaryLight/10 p-6 backdrop-blur-sm md:p-8">
      <div className="flex items-start gap-4">
        <Heart
          className="text-error size-8 animate-pulse"
          fill="currentColor"
        />
        <div className="flex-1">
          <h3 className="text-white mb-2 text-xl font-semibold">
            Thank You!
          </h3>
          <p className="text-white/60">{messages[role]}</p>
          <div className="text-white/60 mt-4 flex items-center gap-2 text-sm">
            <Star className="text-warning size-4" fill="currentColor" />
            <span>See you at Hack Canada {hackathonYear + 1}!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
