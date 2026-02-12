import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { isFeatureEnabled } from "@/config/phases";
import { getHackerApplicationByUserId } from "@/lib/db/queries/application";
import HackerApplicationForm from "@/components/applications/HackerApplicationForm";
import { EmptyPage } from "@/components/EmptyPage";

export const metadata: Metadata = {
  title: "Hacker Application - Apply to Hack Canada",
  description: "Submit your official Hack Canada hacker application. Join 500+ student developers at Canada's premier hackathon. Apply now through the HC hacker portal.",
  keywords: [
    "Hack Canada hacker application",
    "HC hacker application",
    "apply as hacker",
    "hackathon participant application",
    "Hack Canada student application",
  ],
};

const HackerApplicationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    redirect("/sign-up");
  }

  // Phase-based access control
  if (
    !isFeatureEnabled("applicationSubmission") &&
    !isFeatureEnabled("applicationSaving")
  ) {
    return (
      <EmptyPage
        title="Applications Closed"
        message="Hacker applications are currently closed. Check back during the registration period!"
      />
    );
  }

  const existingApplication = await getHackerApplicationByUserId(
    currentUser.id,
  );

  if (currentUser.status !== "not_applied") {
    redirect("/applications/hacker/review");
  }

  return (
    <HackerApplicationForm
      existingApplication={existingApplication}
      userEmail={currentUser.email || ""}
    />
  );
};

export default HackerApplicationPage;
