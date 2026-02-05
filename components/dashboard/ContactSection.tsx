"use client";

import Image from "next/image";
import Link from "next/link";

import { hackathonYear } from "@/config/site";
import { useHackathonPhase } from "@/hooks/useHackathonPhase";

export const ContactSection = () => {
  const { features } = useHackathonPhase();
  const contactMessage = features.contactMessage;

  // Phase-specific messages
  const messages = {
    "pre-event": `Check back in January ${hackathonYear} for updates!`,
    "during-event": "Need help? Reach out to organizers!",
    "post-event": "Thanks for participating! Stay tuned for next year!",
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm md:p-8 xl:p-12">
      <Image
        src="/hills-1.png"
        alt="hills"
        fill
        className="absolute inset-0 -z-10 object-cover opacity-20 blur-sm"
        sizes="200px"
      />

      <span className="absolute top-2 left-2 text-5xl font-light text-white/20 md:text-6xl">
        ?
      </span>

      <div className="relative z-10 space-y-2 px-4">
        <p className="text-xl font-semibold text-white md:text-2xl">Have questions?</p>
        <p className="font-light text-white/60 md:text-lg">
          {messages[contactMessage]}
        </p>
      </div>

      <div className="relative z-10 mt-6 space-y-2.5">
        <Link
          href="https://hackcanada.org"
          target="_blank"
          className="block w-full cursor-pointer rounded-full border-2 border-white/30 px-3 py-2 text-center font-medium text-white transition-all hover:border-primary hover:bg-primary/20 hover:tracking-widest md:text-lg"
        >
          FAQs
        </Link>
        <Link
          href="mailto:hi@hackcanada.org"
          target="_blank"
          className="block w-full cursor-pointer rounded-full border-2 border-white/30 px-3 py-2 text-center font-medium text-white transition-all hover:border-primary hover:bg-primary/20 hover:tracking-widest md:text-lg"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
};
