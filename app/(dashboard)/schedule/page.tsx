import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { schedule } from "@/config/schedule";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import ScheduleGrid from "@/components/schedule/ScheduleGrid";
import ScheduleLegend from "@/components/schedule/ScheduleLegend";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Event schedule for Hack Canada",
};

export default async function SchedulePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Schedule Page"
        message="This feature is only available to users with an assigned role."
      />
    );
  }

  return (
    <PageWrapper className="max-w-screen-2xl 3xl:max-w-screen-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Event Schedule</h1>
          </div>
          <p className="text-textSecondary">
            All times are in Eastern Time (ET). Events and times are subject to
            change.
          </p>
        </div>

        <ScheduleLegend />
        <div className="rounded-lg border border-border bg-backgroundMuted p-4">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>
    </PageWrapper>
  );
}
