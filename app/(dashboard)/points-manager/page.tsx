import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { isOrganizer } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import PageWrapper from "@/components/PageWrapper";
import { PointsManager } from "@/components/points-manager/PointsManager";

export default async function PointsManagerPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (!isOrganizer(currentUser.role)) {
    redirect("/");
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="space-y-2">
          <div className="w-fit bg-linear-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Points Manager</h1>
          </div>
          <p className="text-textMuted max-md:text-sm">
            Search for a hacker and give or take back points.
          </p>
        </div>

        <PointsManager />
      </div>
      <BackButton />
    </PageWrapper>
  );
}
