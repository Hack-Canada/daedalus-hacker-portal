"use client";

import { Heart, Star } from "lucide-react";

import { hackathonYear } from "@/config/site";

interface ThankYouCardProps {
  role: UserRole;
}

export const ThankYouCard = ({ role }: ThankYouCardProps) => {
  const messages: Record<UserRole, string> = {
    hacker: `Your creativity, passion, and late-night coding sessions made Hack Canada ${hackathonYear} absolutely EPIC! 🔥`,
    organizer:
      "You turned a vision into reality! This event wouldn't exist without your amazing leadership! 🌟",
    volunteer:
      "You're the real MVPs! Your energy and dedication kept the magic alive all weekend! 💪",
    admin:
      "The wizard behind the curtain! Your work ensured everything ran flawlessly! 🎩",
    unassigned:
      "Thanks for being part of the Hack Canada community! We can't wait to have you next year! 🍁",
    mentor:
      "Your wisdom and patience helped hackers level up and achieve the impossible! 🧙‍♂️",
    judge:
      "Your sharp eyes and fair judgment crowned our champions! Thanks for being awesome! ⚖️",
  };

  return (
    <div className="border-primary/30 from-primary/10 via-info/5 to-primaryLight/10 relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm md:p-8">
      <div className="flex items-start gap-4">
        <Heart
          className="text-error size-8 animate-pulse"
          fill="currentColor"
        />
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-white">
            You&apos;re Amazing! 💖
          </h3>
          <p className="text-white/60">{messages[role]}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
            <Star className="text-warning size-4" fill="currentColor" />
            <span>
              The adventure continues at Hack Canada {hackathonYear + 1}!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
