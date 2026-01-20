import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { ScheduleService } from "@/lib/services/schedule";
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
        message="This feature is only available to participants."
      />
    );
  }

  // Get schedule data with fallback mechanism
  const {
    data: scheduleData,
    source,
    error,
  } = await ScheduleService.getSchedule();

  // Log the data source for debugging
  console.info(`Schedule loaded from: ${source}`);
  if (error) {
    console.error("Schedule service error:", error);
  }

  return (
    <PageWrapper className="3xl:max-w-screen-2xl max-w-screen-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="from-primary to-primary w-fit bg-linear-to-r via-sky-400 bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Event Schedule</h1>
          </div>
          <p className="text-textSecondary">
            All times are in Eastern Time (ET). Events and times are subject to
            change.
          </p>
        </div>

        <ScheduleLegend />
        <div className="border-border bg-backgroundMuted rounded-lg border p-4">
          <ScheduleGrid schedule={scheduleData} />
        </div>
      </div>
    </PageWrapper>
  );
}
