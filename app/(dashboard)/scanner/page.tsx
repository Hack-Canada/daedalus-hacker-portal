import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { isVolunteer } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import PageWrapper from "@/components/PageWrapper";
import { EventSelectionGrid } from "@/components/scanner/EventSelectionGrid";

export default async function ScannerPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (!isVolunteer(currentUser.role)) {
    redirect("/qr-code");
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="space-y-2">
          <div className="w-fit bg-linear-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">QR Code Scanner</h1>
          </div>
          <p className="text-textMuted max-md:text-sm">
            Select an event below to start scanning participant QR codes.
          </p>
        </div>

        <EventSelectionGrid />
      </div>
      <BackButton />
    </PageWrapper>
  );
}
