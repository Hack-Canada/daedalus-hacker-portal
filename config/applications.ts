import { Gavel, Lightbulb, LucideIcon, User } from "lucide-react";

export type Application = {
  title: string;
  href: string;
  status: "open" | "closed" | "coming soon";
  disabled: boolean;
  deadline?: string;
  description: string;
  icon: LucideIcon;
};

export const applications: Application[] = [
  {
    title: "Hacker Applications",
    href: "/applications/hacker",
    status: "open",
    deadline: "February 10th (11:59:59 PM), 2026",
    description: "Submit your application to join as a participant.",
    icon: User,
    disabled: false,
  },
  {
    title: "Mentor Applications",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScCS76RX3C1AvGGFOQ5J69XpoYb6rvdYQ-B0aYxS_GLaf4jmQ/viewform?usp=sf_link",
    status: "coming soon",
    deadline: "February 14th (11:59:59 PM), 2026",
    description: "Apply to mentor participants during the hackathon.",
    icon: Lightbulb,
    disabled: false,
  },
  {
    title: "Judge Applications",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScCS76RX3C1AvGGFOQ5J69XpoYb6rvdYQ-B0aYxS_GLaf4jmQ/viewform?usp=sf_link",
    status: "coming soon",
    description: "Help evaluate and reward the best projects.",
    deadline: "February 14th (11:59:59 PM), 2026",
    icon: Gavel,
    disabled: false,
  },
];
