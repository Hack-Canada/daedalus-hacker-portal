import { Angry } from "lucide-react";

import { statusConfig } from "@/config/status";
import { Confetti } from "@/components/ui/confetti";

import CancelRSVP from "../CancelRSVP";
import { StatusActions } from "./StatusActions";
import { StatusContent } from "./StatusContent";

interface AcceptedContentProps {
  role: UserRole;
}

export const AcceptedContent = ({ role }: AcceptedContentProps) => {
  const config = statusConfig.accepted;

  if (role === "hacker") {
    const { heading, description, primaryAction } = config.hacker;
    return (
      <StatusContent
        status="accepted"
        heading={heading}
        description={description}
        customLabel="Accepted"
        actions={
          <StatusActions primaryAction={primaryAction} className="mb-4" />
        }
      >
        <Confetti className="pointer-events-none absolute inset-0 w-full" />
        <hr className="my-4" />
        <CancelRSVP />
      </StatusContent>
    );
  }

  const { heading, description, primaryAction, secondaryAction } =
    config.default;
  return (
    <StatusContent
      status="accepted"
      heading={heading}
      description={description}
      customLabel="Accepted"
      actions={
        <StatusActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      }
    >
      <hr className="my-4 md:my-6" />
      <p className="mb-6 flex animate-pulse items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/20 px-3 py-2.5 text-center font-semibold text-primary max-md:text-sm">
        😾 Action Required - RSVP 😾
      </p>
      <CancelRSVP />
    </StatusContent>
  );
};
