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
    /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{3,100}\/?$/,
  instagram:
    /^https:\/\/(www\.)?instagram\.com\/(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}\/?$/,
  twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9]\w{3,24}\/?$/,
  youtube:
    /^https:\/\/(www\.)?(youtube\.com\/(c\/|channel\/|user\/|@)[a-zA-Z0-9_-]{3,}|youtube\.com\/@[a-zA-Z0-9_-]{3,})\/?$/,
  portfolio:
    /^https?:\/\/(?:localhost(?::\d{1,5})?|(?:[\w-]+\.)+[\w-]+)(?:\/[\w-./?%&=]*)?$/,
};

export const profileIntegrationSchema = z
  .object({
    platform: z.enum(SUPPORTED_PLATFORMS),
    url: z.string().trim().min(1, "URL is required"),
  })
  .superRefine((data, ctx) => {
    const { platform, url } = data;
    if (!platform || !platformUrlPatterns[platform]) return;

    // First check if it's a valid URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide a valid URL",
        path: ["url"],
      });
      return;
    }

    // Strip query params and fragments for validation (use origin + pathname only)
    const cleanUrl = parsedUrl.origin + parsedUrl.pathname;

    // Check if it matches the correct platform pattern
    const currentPlatformPattern = platformUrlPatterns[platform];
    if (!currentPlatformPattern.test(cleanUrl)) {
      // Test if it matches any other platform
      const matchedPlatform = Object.entries(platformUrlPatterns).find(
        ([key, pattern]) => key !== platform && pattern.test(cleanUrl),
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

export const AVAILABLE_SKILLS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "Swift",
  "Kotlin",
  "React",
  "Vue",
  "Angular",
  "Next.js",
  "Node.js",
  "Django",
  "Flask",
  "Spring",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "AI/LLMs",
  "Data Science",
  "Computer Vision",
  "NLP",
  "Blockchain",
  "Web3",
  "Mobile Dev",
  "iOS",
  "Android",
  "Flutter",
  "React Native",
  "DevOps",
  "Cybersecurity",
  "Game Dev",
  "UI/UX Design",
  "Figma",
  "Hardware/IoT",
  "AR/VR",
] as const;

export type Skill = (typeof AVAILABLE_SKILLS)[number];

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
  skills: z
    .array(z.string())
    .max(8, { message: "You can select up to 8 skills" })
    .default([]),
  askMeAbout: z
    .string()
    .trim()
    .max(100, { message: "Ask me about must not exceed 100 characters" })
    .nullable()
    .transform((val) => val || null),
  integrations: z
    .array(profileIntegrationSchema)
    .max(5, { message: "You can add up to 5 social integrations" })
    .default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileIntegration = z.infer<typeof profileIntegrationSchema>;
