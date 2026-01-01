import {
  Frown,
  Hourglass,
  Laugh,
  Loader,
  NotebookPen,
  Smile,
} from "lucide-react";

interface ActionConfig {
  href: string;
  label: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline";
}

interface StatusConfig {
  heading: string;
  description: string;
  primaryAction?: ActionConfig;
  secondaryAction?: ActionConfig;
}

interface AcceptedStatusConfig {
  heading?: never;
  description?: never;
  primaryAction?: never;
  secondaryAction?: never;
  hacker: {
    heading: string;
    description: string;
    primaryAction: ActionConfig;
  };
  default: {
    heading: string;
    description: string;
    primaryAction: ActionConfig;
    secondaryAction: ActionConfig;
  };
}

export const statusStyles = {
  not_applied: "bg-backgroundMuted text-textMuted",
  pending: "bg-primaryLight/10 text-secondaryDark border-primary/50",
  accepted: "bg-backgroundMuted shadow-success/10",
  rejected: "bg-error/5 text-error border-error/50 shadow-error/10",
  waitlisted: "bg-warning/5 text-warning border-warning/50 shadow-warning/10",
  coming_soon: "bg-backgroundMuted text-textMuted border-primary/50",
  cancelled: "bg-error/5 text-error border-error/50 shadow-error/10",
};

export const statusIcons = {
  not_applied: NotebookPen,
  pending: Smile,
  accepted: Laugh,
  rejected: Frown,
  waitlisted: Hourglass,
  coming_soon: Loader,
  cancelled: Frown,
} as const;

export const statusLabels = {
  not_applied: "Not Applied",
  pending: "Applied",
  accepted: "Accepted",
  rejected: "Rejected",
  waitlisted: "Waitlisted",
  coming_soon: "Coming Soon",
  cancelled: "Cancelled RSVP",
} as const;

export const statusConfig: Record<
  Exclude<ApplicationStatus | "coming_soon", "accepted">,
  StatusConfig
> & { accepted: AcceptedStatusConfig } = {
  coming_soon: {
    heading: "Applications Coming Soon",
    description:
      "This feature is not available yet, but it's on the way! Stay tuned for updates.",
    primaryAction: {
      href: "/applications",
      label: "View All Applications",
      variant: "primary",
    },
  },
  not_applied: {
    heading: "Application not submitted",
    description:
      "You haven't submitted a hacker application yet. Click below to begin your hackathon journey!",
    primaryAction: {
      href: "/applications",
      label: "Start Application",
      variant: "primary",
    },
  },
  pending: {
    heading: "Application submitted",
    description:
      "Your application is currently being reviewed by our team. We will notify you as soon as there's an update.",
    primaryAction: {
      href: "/applications/hacker/review",
      label: "Review Application",
      variant: "primary",
    },
    secondaryAction: {
      href: "/applications",
      label: "View All Applications",
      variant: "outline",
    },
  },
  accepted: {
    hacker: {
      heading: "You're in!",
      description:
        "Congrats, you were accepted to Hack Canada! Mark your calendar for February 21st, we are super excited to see you!",
      primaryAction: {
        href: "/applications/hacker/review",
        label: "Review Application",
        variant: "primary",
      },
    },
    default: {
      heading: "Congratulations!",
      description:
        "We're delighted to invite you to Hack Canada! Please complete the form below within 7 days of your acceptance to secure your spot!",
      primaryAction: {
        href: "/rsvp",
        label: "RSVP",
        variant: "primary",
      },
      secondaryAction: {
        href: "/applications/hacker/review",
        label: "Review Application",
        variant: "outline",
      },
    },
  },
  rejected: {
    heading: "You weren't accepted",
    description:
      "Unfortunately, we couldn't accept your application this time. We hope to see you at future events!",
    primaryAction: {
      href: "/applications/hacker/review",
      label: "Review Application",
      variant: "destructive",
    },
    secondaryAction: {
      href: "/applications",
      label: "View All Applications",
      variant: "outline",
    },
  },
  waitlisted: {
    heading: "You're on the waitlist",
    description:
      "You're currently on the waitlist for the hackathon. We'll notify you if a spot becomes available.",
    primaryAction: {
      href: "/applications/hacker/review",
      label: "Review Application",
      variant: "secondary",
    },
    secondaryAction: {
      href: "/applications",
      label: "View All Applications",
      variant: "outline",
    },
  },
  cancelled: {
    heading: "C'mon :((",
    description:
      "You've cancelled your RSVP for the hackathon. We hope to see you next year!",
    primaryAction: {
      href: "/applications/hacker/review",
      label: "Review Application",
      variant: "destructive",
    },
    secondaryAction: {
      href: "/applications",
      label: "View All Applications",
      variant: "outline",
    },
  },
};
