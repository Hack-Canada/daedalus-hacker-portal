import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getApplications } from "@/config/applications";
import { getCurrentPhase } from "@/config/phases";
import { hackathonYear } from "@/config/site";
import { BackButton } from "@/components/ui/back-button";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Applications",
};

const ApplicationPage = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const alreadyApplied = user.status !== "not_applied";
  
  // Get phase-aware applications and current phase
  const applications = getApplications();
  const currentPhase = getCurrentPhase();

  return (
    <PageWrapper>
      {applications.some((application) => application.status === "open") ? (
        <ApplicationsOpenHeader />
      ) : (
        <ApplicationsClosedHeader phase={currentPhase} />
      )}
      <div className="flex w-full flex-col gap-6">
        {applications.map((application) => (
          <ApplicationCard
            key={application.title}
            application={application}
            alreadyApplied={
              alreadyApplied && application.title === "Hacker Applications"
            }
          />
        ))}
      </div>
      <BackButton />
    </PageWrapper>
  );
};

const ApplicationsOpenHeader = () => {
  return (
    <>
      <div className="mb-8 space-y-2">
        <div className="from-primary to-primary w-fit bg-linear-to-r via-sky-400 bg-clip-text text-transparent">
          <h1 className="font-rubik text-3xl font-bold">Applications Open</h1>
        </div>
        <p className="text-textMuted max-md:text-sm">
          Hack Canada {hackathonYear} is now open for applications. Submit your
          application before the deadline.
        </p>
      </div>
    </>
  );
};

const ApplicationsClosedHeader = ({ phase }: { phase: string }) => {
  // Dynamic title and message based on phase
  const getHeaderContent = () => {
    switch (phase) {
      case "pre-registration":
        return {
          title: "Applications Coming Soon",
          message: `Applications for Hack Canada ${hackathonYear} will open soon. Check back in mid-January!`,
        };
      case "pre-event":
        return {
          title: "Applications Closed",
          message: `Applications for Hack Canada ${hackathonYear} have closed. Accepted hackers can view their status on the dashboard.`,
        };
      case "during-event":
        return {
          title: "Applications Closed",
          message: `Hack Canada ${hackathonYear} is currently underway! Applications are closed, but stay tuned for next year.`,
        };
      case "post-event":
        return {
          title: "Hackathon Concluded",
          message: `Hack Canada ${hackathonYear} has concluded. Thank you for your interest! Check back next year for Hack Canada ${hackathonYear + 1}.`,
        };
      default:
        return {
          title: "Applications Closed",
          message: `Applications for Hack Canada ${hackathonYear} are currently closed.`,
        };
    }
  };

  const { title, message } = getHeaderContent();

  return (
    <div className="mb-8 space-y-2">
      <div className="from-primary to-primary w-fit bg-linear-to-r via-sky-400 bg-clip-text text-transparent">
        <h1 className="font-rubik text-3xl font-bold">{title}</h1>
      </div>
      <p className="text-textMuted max-md:text-sm">{message}</p>
    </div>
  );
};

export default ApplicationPage;
