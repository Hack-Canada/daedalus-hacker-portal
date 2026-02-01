import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { isFeatureEnabled } from "@/config/phases";
import { getHackerApplicationByUserId } from "@/lib/db/queries/application";
import HackerApplicationForm from "@/components/applications/HackerApplicationForm";
import { EmptyPage } from "@/components/EmptyPage";

export const metadata: Metadata = {
  title: "Hacker Application",
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

  return <HackerApplicationForm existingApplication={existingApplication} />;
};

export default HackerApplicationPage;
