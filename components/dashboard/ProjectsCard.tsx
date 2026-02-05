"use client";

import { ExternalLink, Trophy } from "lucide-react";

import { viewProjectsUrl } from "@/config/site";
import { useHackathonPhase } from "@/hooks/useHackathonPhase";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";
import { hackathonYear } from "@/config/site";

const ProjectsCard = () => {
  const { isFeatureEnabled } = useHackathonPhase();

  // Only show projects card post-event
  if (!isFeatureEnabled("showProjectsCard")) {
    return null;
  }

  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div className="group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,144,255,0.15)]">
        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-white">
            View Projects
          </h2>
          <Trophy className="size-8 text-amber-500" />
        </div>

        <p className="relative z-10 pb-8 text-white/60">
          Explore all the amazing projects submitted during Hack Canada {hackathonYear}!
          See what our talented hackers built and get inspired for future
          hackathons.
        </p>

        <div className="relative z-10 mt-auto flex items-center gap-2">
          <a
            href={viewProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "primary",
              className: "inline-flex items-center gap-2",
            })}
          >
            View Projects
            <ExternalLink className="size-4" />
          </a>
        </div>

        <CardDecorativeElements isLocked={false} />
      </div>
    </div>
  );
};

export default ProjectsCard;
