import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { QRCodeSVG } from "qrcode.react";

import { cn, isVolunteer } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import QrCodeOrganizerActions from "@/components/QrCodeOrganizerActions";

export default async function QRCodePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="QR Code Page"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  const profileUrl = `https://app.hackcanada.org/profile/${currentUser.id}`;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Your QR Code</h1>
          </div>
          <p className="text-textMuted max-md:text-sm">
            Use this QR code for event check-ins and sharing your public
            profile!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* QR Code Section */}
          <div className="lg:col-span-3">
            <div
              className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-lg border border-primary/20 bg-white/50 p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-lg md:p-8"
              role="region"
              aria-label="QR Code Display"
            >
              <div className="pointer-events-none absolute inset-0 -z-10">
                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-info/30 via-primaryLight/30 to-primary/30 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

                {/* Mesh gradient pattern */}
                <div className="absolute inset-0 opacity-0 mix-blend-normal transition-all duration-700 group-hover:opacity-80">
                  <div className="absolute inset-0 bg-[radial-gradient(at_70%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(at_30%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_80%_50%,rgba(59,130,246,0.25),transparent_25%)]" />
                </div>

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-5 mix-blend-soft-light transition group-hover:opacity-20">
                  <Image
                    src="/grainy-texture.jpg"
                    alt="Grainy texture"
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* QR Code Content */}
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={cn(
                      "relative z-10 overflow-hidden rounded-xl border bg-white p-4 shadow-lg md:p-6",
                      "transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25",
                      "group-hover:border-primary/40",
                    )}
                  >
                    {/* Subtle animated background */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 animate-[pulse_3s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
                    </div>

                    <QRCodeSVG
                      value={profileUrl}
                      size={225}
                      level="H"
                      imageSettings={{
                        src: "/beaver-wave.webp",
                        height: 60,
                        width: 60,
                        excavate: true,
                      }}
                    />
                  </div>

                  <div className="max-w-md text-center">
                    <p className="text-sm text-textSecondary transition-colors duration-300 group-hover:text-textPrimary md:text-base">
                      Screenshot and save this QR code to your device for quick
                      and easy access during the event. You&apos;ll need it for
                      check-ins and other activities!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isVolunteer(currentUser.role) && (
            <div className="lg:col-span-2">
              <QrCodeOrganizerActions />
            </div>
          )}
        </div>
      </div>
      <BackButton />
    </PageWrapper>
  );
}
