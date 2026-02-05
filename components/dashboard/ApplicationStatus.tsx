import { statusIcons, statusStyles } from "@/config/status";
import { cn } from "@/lib/utils";

import { AcceptedContent } from "./status/AcceptedContent";
import {
  CancelledContent,
  ComingSoonContent,
  NotAppliedContent,
  PendingContent,
  RejectedContent,
  WaitlistedContent,
} from "./status/StatusContent";

interface ApplicationStatusProps {
  status: ApplicationStatus | "coming_soon";
  role: UserRole;
}

export const ApplicationStatus = ({ status, role }: ApplicationStatusProps) => {
  const Icon = statusIcons[status];

  const renderContent = () => {
    switch (status) {
      case "coming_soon":
        return <ComingSoonContent />;
      case "not_applied":
        return <NotAppliedContent />;
      case "pending":
        return <PendingContent />;
      case "accepted":
        return <AcceptedContent role={role} />;
      case "rejected":
        return <RejectedContent />;
      case "waitlisted":
        return <WaitlistedContent />;
      case "cancelled":
        return <CancelledContent />;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm",
        statusStyles[status],
      )}
    >
      <Icon className="absolute right-1 top-1 text-white/30 md:right-2 md:top-2 md:size-8" />
      <div className="relative flex flex-col p-6 md:p-8 xl:p-12">
        {renderContent()}
      </div>
    </div>
  );
};
