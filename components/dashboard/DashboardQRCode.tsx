import Image from "next/image";
import { QrCode, ScanQrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LockedState from "./LockedState";

interface DashboardQRCodeProps {
  isLocked: boolean;
  userId: string;
}

const DashboardQRCode = ({ isLocked, userId }: DashboardQRCodeProps) => {
  const profileUrl = `https://app.hackcanada.org/profile/${userId}`;

  return (
    <div className="lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-0 rounded-md border-2 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:transition ${
          isLocked
            ? "border-gray-200/50 before:bg-gradient-to-br before:from-primary/15 before:via-info/10 before:to-primaryLight/10 before:opacity-25"
            : "border-primary/15 before:bg-gradient-to-br before:from-primary/10 before:via-info/15 before:to-primaryLight/20 before:opacity-75 hover:border-primary/25 hover:before:opacity-100"
        }`}
      >
        {isLocked && <LockedState label="Participants Only" />}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Your QR Code
          </h2>
          <QrCode className="size-8 transition-transform duration-500 md:size-8" />
        </div>

        <p className="pb-8 text-textPrimary/70">
          Access your unique QR code for event check-ins and sharing your public
          profile!
        </p>

        <div className="mt-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={isLocked}
                variant={isLocked ? "outline" : "primary"}
                className={`inline-flex items-center gap-2 ${
                  isLocked
                    ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent"
                    : ""
                }`}
              >
                View QR Code
                <QrCode className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="group flex max-w-sm flex-col items-center overflow-hidden border border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-info/20 to-primary/30">
                <span className="absolute -top-4 left-20 h-16 w-[500px] -translate-x-40 -rotate-[20deg] border-y border-white/20 bg-white/10 backdrop-blur-[0.5px]" />
                <span className="absolute -bottom-4 -left-4 size-20 rotate-[20deg] rounded-lg bg-primary/15" />
                <span className="absolute -bottom-4 left-2 size-16 rotate-[20deg] rounded-lg bg-primary/15" />
                <span className="absolute inset-x-0 -top-0.5 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <ScanQrCode className="absolute -bottom-2 -right-2 size-16 -rotate-12 text-white opacity-30 transition-transform duration-500 group-hover:-rotate-[30deg]" />
              </div>
              <DialogHeader>
                <DialogTitle className="md:text-xl">Your QR Code</DialogTitle>
              </DialogHeader>
              <div className="relative z-50 mt-4 rounded-lg border bg-white p-2.5 shadow-xl shadow-primary/25 sm:p-4">
                <QRCodeSVG
                  value={profileUrl}
                  size={225}
                  level="H"
                  imageSettings={{
                    src: "/beaver-wave.webp",
                    height: 50,
                    width: 50,
                    excavate: true,
                  }}
                />
              </div>
              <p className="mt-4 text-balance text-center text-sm text-muted-foreground">
                Use this QR code for check-ins and sharing your public profile!
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardQRCode;
