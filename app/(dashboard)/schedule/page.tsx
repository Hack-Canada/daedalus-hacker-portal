import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { ScheduleService } from "@/lib/services/schedule";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import ScheduleView from "@/components/schedule/ScheduleView";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Event schedule for Hack Canada",
};

export default async function SchedulePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  const {
    data: scheduleData,
    source,
    error,
  } = await ScheduleService.getSchedule();

  console.info(`Schedule loaded from: ${source}`);
  if (error) {
    console.error("Schedule service error:", error);
  }

  return (
    <PageWrapper className="3xl:max-w-screen-2xl max-w-screen-2xl">
      <ScheduleView schedule={scheduleData} />
    </PageWrapper>
  );
}
