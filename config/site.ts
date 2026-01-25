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
  ],
};

export const userRegistrationEnabled: boolean = true;
export const discordInviteUrl: string = "https://example.com/discord";
export const hackathonsCanadaDiscordUrl: string = "https://example.com/discord";

export const viewProjectsUrl: string = "https://example.com/projects";

export const hackerPackageUrl: string = "https://example.com/hacker-package";

export const eventDate = new Date("2026-03-01T16:30:00-05:00");
export const hackerApplicationDeadline = new Date("2026-02-10T23:59:59-05:00");

export const eventGalleryUrl: string = "https://example.com/gallery";
