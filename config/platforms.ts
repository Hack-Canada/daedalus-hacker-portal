import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitch,
  Youtube,
} from "lucide-react";

import { Platform } from "@/lib/validations/profile";

export const platformIcons: Record<
  Platform,
  React.ComponentType<{ className?: string }>
> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitch: Twitch,
  youtube: Youtube,
  portfolio: Globe,
};
