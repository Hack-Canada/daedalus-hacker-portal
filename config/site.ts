import { isFeatureEnabled, getEventDate, getApplicationDeadline } from "./phases";

export const hackathonYear = 2026;

export const siteConfig = {
  metadataBase: new URL("https://app.hackcanada.org"),
  title: `Hack Canada ${hackathonYear} - Hacker Portal`,
  description:
    "Official Hack Canada Hacker Portal - Apply to Canada's premier hackathon, manage your application, access your hacker package, and join 500+ innovators. HC Hacker Portal for Hack Canada applications, RSVP, and event registration.",
  openGraph: {
    title: `Hack Canada ${hackathonYear} Hacker Portal | HC Applications`,
    description:
      "Join Hack Canada ${hackathonYear}! Apply through the official hacker portal, submit your hackathon application, and be part of Canada's biggest student hackathon community.",
    type: "website",
    locale: "en_CA",
    siteName: "Hack Canada Hacker Portal",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1500,
        height: 1000,
        alt: `Hack Canada ${hackathonYear} Hacker Portal - Apply Now`,
      },
    ],
  },
  keywords: [
    // Primary brand keywords
    "Hack Canada",
    "Hack Canada Hacker Portal",
    "HC Hacker Portal",
    "Hack Canada Portal",
    "HackCanada",
    
    // Application-focused keywords
    "Hack Canada applications",
    "Hack Canada apps",
    "Hack Canada apply",
    "Hack Canada registration",
    "Hack Canada sign up",
    "HC applications",
    "HC apply",
    
    // Hackathon + location keywords
    "hackathon Canada",
    "Canadian hackathon",
    "Canada hackathon 2026",
    "hackathon Ontario",
    "hackathon Waterloo",
    "hackathon Toronto",
    "Waterloo hackathon",
    "Toronto hackathon",
    
    // University-specific keywords
    "Wilfrid Laurier hackathon",
    "Laurier hackathon",
    "WLU hackathon",
    "university hackathon Canada",
    "student hackathon Canada",
    
    // MLH keywords
    "MLH hackathon",
    "MLH hackathon Canada",
    "MLH Canada",
    "Major League Hacking Canada",
    "MLH member event",
    
    // General hackathon keywords
    "hackathon",
    "coding competition",
    "programming competition",
    "tech hackathon",
    "innovation challenge",
    
    // Activity keywords
    "hackathon registration",
    "hackathon application",
    "apply to hackathon",
    "join hackathon",
    "hackathon portal",
    "hacker dashboard",
    
    // Community keywords
    "Hackathons Canada",
    "Canadian hacker community",
    "student developers Canada",
    
    // Year-specific
    `Hack Canada ${hackathonYear}`,
    `hackathon ${hackathonYear}`,
    `Canada hackathon ${hackathonYear}`,
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  }
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
