import { isFeatureEnabled, getEventDate, getApplicationDeadline } from "./phases";

export const hackathonYear = 2026;

export const siteConfig = {
  metadataBase: new URL("https://app.hackcanada.org"),
  title: `Hack Canada ${hackathonYear}`,
  description:
    "Second edition of the hackathon hosted by Hackathons Canada, the biggest hacker community in Canada of 3000+ members.",
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        width: 1500,
        height: 1000,
        alt: `Hack Canada ${hackathonYear}`,
      },
    ],
  },
  keywords: [
    "hackathon",
    "canada",
    "programming",
    "coding",
    "hackers",
    "technology",
    "innovation",
    "hack canada",
    "mlh hackathon",
    "mlh hackathon canada",
    "mlh hackathon canada 2026",
    "waterloo",
    "wilfrid laurier university",
    "laurier",
    "toronto",
  ],
};

// Phase-aware configuration values
// These are computed based on the current hackathon phase
export const userRegistrationEnabled: boolean = isFeatureEnabled("userRegistration");

// URLs and external links
export const discordInviteUrl: string = "https://example.com/discord";
export const hackathonsCanadaDiscordUrl: string = "https://example.com/discord";
export const viewProjectsUrl: string = "https://example.com/projects";
export const hackerPackageUrl: string = "https://example.com/hacker-package";
export const eventGalleryUrl: string = process.env.NEXT_PUBLIC_GALLERY_URL || "";

// Date-based configuration (now sourced from phases.ts)
// Re-export for backwards compatibility
export const eventDate = getEventDate();
export const hackerApplicationDeadline = getApplicationDeadline();
