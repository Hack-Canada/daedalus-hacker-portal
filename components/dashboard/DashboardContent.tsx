import { cn } from "@/lib/utils";

import PageWrapper from "../PageWrapper";
import { BackButton } from "../ui/back-button";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";
import DashboardQRCode from "./DashboardQRCode";
import { HackathonConclusion } from "./HackathonConclusion";
import HackathonsCanadaDiscord from "./HackathonsCanadaDiscord";
import ProfileCard from "./ProfileCard";
import ProjectsCard from "./ProjectsCard";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  // Lock everything for unassigned users
  const isLocked = user.role === "unassigned";

  return (
    <PageWrapper className="max-w-screen-xl 2xl:max-w-screen-xl">
      <DashboardHeader userName={user.name || "Hacker"} />
      <div
        className={cn("flex flex-col gap-6 md:gap-8 lg:gap-10", {
          "flex-col-reverse": user.role === "hacker",
        })}
      >
        {/* Application Status commented out post-hackathon */}
        {/* <ApplicationStatus status={user.status} role={user.role} /> */}

        <HackathonConclusion role={user.role} />

        {/* Main Grid Sections */}
        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10">
          <HackathonsCanadaDiscord />
          <ProjectsCard />
        </div>

        {/* Profile Section */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 lg:gap-10">
          <DashboardQRCode isLocked={isLocked} userId={user.id!} />

          {/* Locked for anyone without an assigned role */}
          <ProfileCard isLocked={isLocked} userId={user.id!} />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
        <CountdownSection />
        <ContactSection />
      </div>
      <BackButton label="Back to landing page" href="https://hackcanada.org" />
    </PageWrapper>
  );
};
