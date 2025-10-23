import Image from "next/image";
import Link from "next/link";
import { ScanQrCode } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {};

const QrCodeOrganizerActions = ({}: Props) => {
  return (
    <div
      className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-lg border-2 border-info/20 bg-white/50 p-8 transition-all duration-500 hover:border-info/40 hover:shadow-lg"
      role="region"
      aria-label="Volunteer Actions"
    >
      {/* Enhanced layered background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-br from-info/20 via-primary/20 to-info/20 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
        <div className="absolute inset-0 opacity-5 mix-blend-soft-light transition group-hover:opacity-20">
          <Image
            src="/grainy-texture.jpg"
            alt="Grainy texture"
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-textPrimary">
            Volunteer Actions
          </h2>
          <p className="text-sm text-textSecondary">
            Access special features available to volunteers and organizers.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto space-y-4">
        <Link href="/qr-code/scanner" className="block">
          <Button
            className={cn(
              "group relative w-full overflow-hidden border border-info py-6 text-lg",
              "bg-gradient-to-br from-info/10 to-primary/10 hover:from-info/20 hover:to-primary/20 hover:text-blue-50",
              "transition-all duration-500",
            )}
            variant="outline"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-info/30 via-primary/20 to-info/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative flex items-center justify-center gap-2">
              QR Code Scanner
              <ScanQrCode className="size-5 transition-transform duration-300 group-hover:scale-110" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QrCodeOrganizerActions;
