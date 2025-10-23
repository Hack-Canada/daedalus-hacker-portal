import { z } from "zod";

// Export supported platforms
export const PLATFORM_PLACEHOLDERS: Record<Platform, string> = {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  instagram: "https://instagram.com/username",
  twitch: "https://twitch.tv/username",
  youtube: "https://youtube.com/@channel",
  portfolio: "https://your-website.com",
};

export const SUPPORTED_PLATFORMS = [
  "github",
  "linkedin",
  "instagram",
  "twitch",
  "youtube",
  "portfolio",
] as const;

export type Platform = (typeof SUPPORTED_PLATFORMS)[number];

const platformUrlPatterns: Record<Platform, RegExp> = {
  github:
    /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]{3,100}$/,
  instagram:
    /^https:\/\/(www\.)?instagram\.com\/(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9]\w{3,24}$/,
  youtube:
    /^https:\/\/(www\.)?(youtube\.com\/(c\/|channel\/|user\/|@)[a-zA-Z0-9-_]{3,}|youtube\.com\/@[a-zA-Z0-9-_]{3,})$/,
  portfolio:
    /^https?:\/\/(?:localhost(?::\d{1,5})?|(?:[\w-]+\.)+[\w-]+)(?:\/[\w-./?%&=]*)?$/,
};

export const profileIntegrationSchema = z
  .object({
    platform: z.enum(SUPPORTED_PLATFORMS),
    url: z.string().min(1, "URL is required"),
  })
  .superRefine((data, ctx) => {
    const { platform, url } = data;
    if (!platform || !platformUrlPatterns[platform]) return;

    // First check if it's a valid URL
    try {
      new URL(url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a valid URL",
        path: ["url"],
      });
      return;
    }

    // Check if it matches the correct platform pattern
    const currentPlatformPattern = platformUrlPatterns[platform];
    if (!currentPlatformPattern.test(url)) {
      // Test if it matches any other platform
      const matchedPlatform = Object.entries(platformUrlPatterns).find(
        ([key, pattern]) => key !== platform && pattern.test(url),
      );

      if (matchedPlatform) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `This URL appears to be for ${matchedPlatform[0]}. Please provide a ${platform} URL.
Example: ${PLATFORM_PLACEHOLDERS[platform]}`,
          path: ["url"],
        });
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please provide a valid ${platform} URL.
Example: ${PLATFORM_PLACEHOLDERS[platform]}`,
          path: ["url"],
        });
      }
      return;
    }
  });

export const profileSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(500, { message: "Bio must not exceed 500 characters" })
    .nullable()
    .transform((val) => val || null),
  hobbies: z
    .string()
    .trim()
    .max(200, { message: "Hobbies must not exceed 200 characters in total" })
    .default(""),
  integrations: z
    .array(profileIntegrationSchema)
    .max(5, { message: "You can add up to 5 social integrations" })
    .default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileIntegration = z.infer<typeof profileIntegrationSchema>;
