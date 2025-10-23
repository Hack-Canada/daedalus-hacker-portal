import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getHackerApplicationByUserId } from "@/lib/db/queries/application";
import HackerApplicationForm from "@/components/applications/HackerApplicationForm";

export const metadata: Metadata = {
  title: "Hacker Application",
};

const HackerApplicationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    redirect("/sign-up");
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
