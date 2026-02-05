import { Download, ExternalLink } from "lucide-react";

import { hackerPackageUrl, hackathonYear } from "@/config/site";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";
import LockedState from "./LockedState";

interface HackerPackageCardProps {
  isLocked: boolean;
}

const HackerPackageCard = ({ isLocked }: HackerPackageCardProps) => {
  // Disable if the card is locked or if the hacker package URL is not set
  const isDisabled = isLocked || hackerPackageUrl === "";

  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-xl border bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ${
          isDisabled 
            ? "border-white/10" 
            : "border-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,144,255,0.15)]"
        }`}
      >
        {isDisabled && (
          <LockedState label={isLocked ? "Participants Only" : "Coming Soon"} />
        )}

        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-white text-2xl font-medium">
            Hacker Package
          </h2>
          <div className="bg-primary/20 flex size-8 items-center justify-center rounded-full">
            <Download
              className={`size-5 ${isDisabled ? "text-white/40" : "text-primary"}`}
            />
          </div>
        </div>

        <p className="relative z-10 text-white/60 pb-2">
          Download your hacker package containing essential information,
          schedule, and resources for Hack Canada {hackathonYear}.
        </p>

        <div className="relative z-10 mt-auto flex items-center gap-2">
          <a
            href={isDisabled ? "" : hackerPackageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={isDisabled}
            className={buttonVariants({
              variant: isDisabled ? "outline" : "default",
              className: `inline-flex items-center gap-2 ${isDisabled ? "pointer-events-none cursor-not-allowed text-white/30! opacity-40 hover:bg-transparent" : ""}`,
            })}
          >
            Get Package
            <ExternalLink className="size-4" />
          </a>
        </div>

        {/* Decorative elements */}
        <CardDecorativeElements isLocked={isDisabled} />
      </div>
    </div>
  );
};

export default HackerPackageCard;
