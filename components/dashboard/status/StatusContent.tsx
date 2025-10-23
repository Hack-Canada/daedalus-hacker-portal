import React from "react";

import { statusConfig } from "@/config/status";

import ApplicationStatusHeader from "../ApplicationStatusHeader";
import { StatusActions } from "./StatusActions";
import { StatusBadge } from "./StatusBadge";

type NonAcceptedStatus = Exclude<ApplicationStatus | "coming_soon", "accepted">;

interface StatusContentProps {
  status: NonAcceptedStatus | "accepted";
  heading?: string;
  description?: string;
  actions?: React.ReactNode;
  customLabel?: string;
  children?: React.ReactNode;
}

const isNonAcceptedStatus = (
  status: ApplicationStatus | "coming_soon",
): status is NonAcceptedStatus => status !== "accepted";

export const StatusContent = ({
  status,
  heading,
  description,
  actions,
  customLabel,
  children,
}: StatusContentProps) => {
  // For non-accepted statuses, we can safely access the config
  const config = isNonAcceptedStatus(status) ? statusConfig[status] : null;

  return (
    <>
      <StatusBadge status={status} customLabel={customLabel} />
      <ApplicationStatusHeader
        heading={heading || (config?.heading ?? "")}
        description={description || (config?.description ?? "")}
        status={status}
      />
      {actions}
      {children}
    </>
  );
};

// Not Applied Status
export const NotAppliedContent = () => {
  const config = statusConfig.not_applied;
  return (
    <StatusContent
      status="not_applied"
      heading={config.heading}
      description={config.description}
      actions={<StatusActions primaryAction={config.primaryAction} />}
    />
  );
};

// Coming Soon Status
export const ComingSoonContent = () => {
  const config = statusConfig.coming_soon;
  return (
    <StatusContent
      status="coming_soon"
      heading={config.heading}
      description={config.description}
      actions={<StatusActions primaryAction={config.primaryAction} />}
    />
  );
};

// Pending Status
export const PendingContent = () => {
  const config = statusConfig.pending;
  return (
    <StatusContent
      status="pending"
      heading={config.heading}
      description={config.description}
      actions={
        <StatusActions
          primaryAction={config.primaryAction}
          secondaryAction={config.secondaryAction}
        />
      }
    />
  );
};

// Rejected Status
export const RejectedContent = () => {
  const config = statusConfig.rejected;
  return (
    <StatusContent
      status="rejected"
      heading={config.heading}
      description={config.description}
      actions={
        <StatusActions
          primaryAction={config.primaryAction}
          secondaryAction={config.secondaryAction}
        />
      }
    />
  );
};

// Waitlisted Status
export const WaitlistedContent = () => {
  const config = statusConfig.waitlisted;
  return (
    <StatusContent
      status="waitlisted"
      heading={config.heading}
      description={config.description}
      actions={
        <StatusActions
          primaryAction={config.primaryAction}
          secondaryAction={config.secondaryAction}
        />
      }
    />
  );
};

// Cancelled Status
export const CancelledContent = () => {
  const config = statusConfig.cancelled;
  return (
    <StatusContent
      status="cancelled"
      heading={config.heading}
      description={config.description}
      actions={
        <StatusActions
          primaryAction={config.primaryAction}
          secondaryAction={config.secondaryAction}
        />
      }
    />
  );
};
