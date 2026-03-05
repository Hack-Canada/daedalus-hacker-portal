import {
  Flame,
  Github,
  Instagram,
  LinkedinIcon,
  Radio,
  Snowflake,
  Youtube,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Platform } from "@/lib/validations/profile";

const platformIcons: Record<Platform, React.ReactNode> = {
  github: (
    <Github className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110 group-hover/card:rotate-[20deg]" />
  ),
  linkedin: (
    <LinkedinIcon className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110 group-hover/card:-rotate-[12deg]" />
  ),
  instagram: (
    <Instagram className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110 group-hover/card:rotate-45" />
  ),
  youtube: (
    <Youtube className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110 group-hover/card:text-red-400" />
  ),
  twitch: (
    <Radio className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110" />
  ),
  portfolio: (
    <Flame className="size-6 transition-all duration-300 ease-out group-hover/card:scale-110 group-hover/card:text-orange-400" />
  ),
};

const platformGradients: Record<Platform, string> = {
  github: "from-white/8 to-white/4 hover:from-white/12 hover:to-white/8",
  linkedin: "from-blue-500/15 to-blue-600/8 hover:from-blue-500/25 hover:to-blue-600/15",
  instagram: "from-fuchsia-500/15 to-purple-600/8 hover:from-fuchsia-500/25 hover:to-purple-600/15",
  youtube: "from-red-500/15 to-red-600/8 hover:from-red-500/25 hover:to-red-600/15",
  twitch: "from-purple-500/15 to-violet-600/8 hover:from-purple-500/25 hover:to-violet-600/15",
  portfolio: "from-orange-500/15 to-amber-600/8 hover:from-orange-500/25 hover:to-amber-600/15",
};

const platformBorders: Record<Platform, string> = {
  github: "border-white/10 hover:border-white/20",
  linkedin: "border-blue-500/20 hover:border-blue-400/40",
  instagram: "border-fuchsia-500/20 hover:border-fuchsia-400/40",
  youtube: "border-red-500/20 hover:border-red-400/40",
  twitch: "border-purple-500/20 hover:border-purple-400/40",
  portfolio: "border-orange-500/20 hover:border-orange-400/40",
};

const platformTextColors: Record<Platform, string> = {
  github: "text-textSecondary group-hover/card:text-white",
  linkedin: "text-textSecondary group-hover/card:text-blue-400",
  instagram: "text-textSecondary group-hover/card:text-fuchsia-400",
  youtube: "text-textSecondary group-hover/card:text-red-400",
  twitch: "text-textSecondary group-hover/card:text-purple-400",
  portfolio: "text-textSecondary group-hover/card:text-orange-400",
};

interface Integration {
  platform: Platform;
  url: string;
}

interface SocialLinkCardProps {
  integrations: Integration[];
}

export function SocialLinkCard({ integrations }: SocialLinkCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
      role="region"
      aria-label="Social Media Links"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,144,255,0.06),transparent_60%)]" />
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
          <Snowflake
            strokeWidth={2}
            className="size-4 text-primary transition-transform duration-500 group-hover:rotate-90"
          />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary/70">
          Connect With Me
        </h2>
      </div>

      {/* Grid of social links */}
      <div
        className={cn("grid gap-2.5", {
          "grid-cols-1": integrations.length === 1,
          "grid-cols-2": integrations.length === 2,
          "grid-cols-3": integrations.length === 3 || integrations.length === 6,
          "grid-cols-2 sm:grid-cols-4": integrations.length === 4,
          "grid-cols-2 sm:grid-cols-3": integrations.length === 5,
        })}
      >
        {integrations.map((integration, index) => (
          <a
            key={integration.platform}
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/card flex cursor-pointer items-center gap-3 rounded-lg border bg-linear-to-br px-4 py-3",
              "animate-fadeIn transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
              platformGradients[integration.platform],
              platformBorders[integration.platform],
              platformTextColors[integration.platform],
            )}
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "backwards",
            }}
            aria-label={`Connect on ${integration.platform}`}
          >
            {platformIcons[integration.platform]}
            <span className="text-sm font-medium capitalize">
              {integration.platform}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
