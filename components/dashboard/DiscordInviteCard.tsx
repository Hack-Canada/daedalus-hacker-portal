import { ExternalLink } from "lucide-react";

import { discordInviteUrl } from "@/config/site";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";
import LockedState from "./LockedState";

interface DiscordInviteCardProps {
  isLocked: boolean;
}

const DiscordInviteCard = ({ isLocked }: DiscordInviteCardProps) => {
  // Disable if the card is locked or if the Discord invite URL is not set
  const isDisabled = isLocked || discordInviteUrl === "";

  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg ${isLocked ? "border-gray-200/50" : "border-border"}`}
      >
        {isDisabled && (
          <LockedState label={isLocked ? "Participants Only" : "Coming Soon"} />
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Discord Community
          </h2>
          {/* Discord SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 127.14 96.36"
            className={`${isDisabled ? "fill-gray-400" : "fill-[#5865F2]"}`}
          >
            <g>
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </g>
          </svg>
        </div>

        <p className="pb-2 text-textMuted">
          Join our Discord server to connect with other hackers and get
          important updates and announcements!
        </p>

        <div className="mt-auto flex items-center gap-2">
          <a
            href={isDisabled ? "" : discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={isDisabled}
            className={buttonVariants({
              variant: isDisabled ? "outline" : "default",
              className: `inline-flex items-center gap-2 ${isDisabled ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent" : ""}`,
            })}
          >
            Join Server
            <ExternalLink className="size-4" />
          </a>
        </div>

        <CardDecorativeElements isLocked={isDisabled} />
      </div>
    </div>
  );
};

export default DiscordInviteCard;
