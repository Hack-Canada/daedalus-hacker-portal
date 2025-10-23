import { ExternalLink, Trophy } from "lucide-react";

import { viewProjectsUrl } from "@/config/site";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";

const ProjectsCard = () => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div className="group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border border-border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            View Projects
          </h2>
          <Trophy className="size-8 text-amber-500" />
        </div>

        <p className="pb-8 text-textMuted">
          Explore all the amazing projects submitted during Hack Canada 2025!
          See what our talented hackers built and get inspired for future
          hackathons.
        </p>

        <div className="mt-auto flex items-center gap-2">
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
