"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";

import { Event } from "@/config/qr-code";
import { cn, formatDate } from "@/lib/utils";
import { useQRScanner } from "@/hooks/useQRScanner";
import { Checkbox } from "@/components/ui/checkbox";
import { EventSelector } from "@/components/EventSelector";

export function Scanner() {
  const [selectedEvent, setSelectedEvent] = useState<Event | "">("");
  const [keepCameraOn, setKeepCameraOn] = useState(false);
  const {
    isCameraOn,
    videoRef,
    handleToggleCamera,
    scanResult,
    hasCameraPermission,
    startingCamera,
    handleResetEvent,
    scanData,
    scannedUserName,
  } = useQRScanner({
    selectedEvent,
    keepCameraOn,
  });

  return (
    <>
      <div className="border-primary/25 hover:border-primary/50 hover:shadow-primaryLight/50 flex flex-col gap-8 rounded-md border-2 p-4 transition-all duration-500 hover:shadow-2xl md:p-6">
        {/* Visual feedback overlay */}
        {scanResult && (
          <div
            className={`animate-flash absolute -inset-full z-50 duration-500 ${
              scanResult === "success" ? "bg-success" : "bg-error"
            }`}
          />
        )}

        <EventSelector
          selectedEvent={selectedEvent}
          onEventChange={(value) => setSelectedEvent(value as Event)}
        />
        <div className="flex items-center gap-2">
          <Checkbox
            id="keep-camera-on"
            checked={keepCameraOn}
            onCheckedChange={(value: boolean | "indeterminate") => {
              setKeepCameraOn(!!value);
            }}
          />
          <label htmlFor="keep-camera-on" className="text-textPrimary text-sm">
            Keep Camera On
          </label>
        </div>
      </div>
      {selectedEvent && (
        <div className="relative flex flex-col items-center">
          {/* Camera container */}
          <div className="group border-primary/25 bg-primary/25 relative mx-auto w-full max-w-96 rounded-md border-2 p-2 transition-all duration-500">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-md">
              {!hasCameraPermission && (
                <div className="bg-backgroundMuted absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <AlertCircle className="text-error h-8 w-8" />
                  <p className="text-textPrimary/70 text-sm font-medium">
                    Camera access is required to scan QR codes. Please enable
                    camera permissions in your browser settings.
                  </p>
                </div>
              )}
              <video
                ref={videoRef}
                style={{
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                className={cn(
                  "absolute inset-0 scale-x-0 scale-y-0 rounded-[50px] bg-black transition-all duration-500",
                  {
                    "scale-x-100 scale-y-100 rounded-none": isCameraOn,
                  },
                )}
              />
              {hasCameraPermission && (
                <button
                  onClick={handleToggleCamera}
                  className={cn(
                    "bg-backgroundMuted text-textPrimary/70 hover:text-textPrimary flex h-full w-full items-center justify-center text-lg font-semibold transition",
                    {
                      "opacity-0": isCameraOn,
                    },
                  )}
                >
                  {startingCamera ? (
                    <Loader2 className="size-8 animate-spin" />
                  ) : !isCameraOn ? (
                    "Turn On Camera"
                  ) : null}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {scannedUserName && (
        <div className="border-primary/10 bg-primary/5 mt-4 rounded-lg border p-4 text-center">
          <p className="text-textPrimary text-lg font-semibold">
            Successfully scanned:{" "}
            <span className="text-primary">{scannedUserName}</span>
          </p>
        </div>
      )}

      {scanData.length > 0 && (
        <div className="mt-4 md:mt-6">
          <h3 className="text-textPrimary mb-4 text-lg font-semibold">
            User&apos;s Check-in History
          </h3>
          <div className="space-y-2">
            {scanData.map((checkIn) => (
              <div
                key={checkIn.id}
                className="border-primary/10 bg-primary/5 flex items-center justify-between gap-4 rounded-md border p-3"
              >
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-textPrimary font-medium">
                    {checkIn.eventName.split("-").join(" ")}
                  </span>
                  <span className="text-textPrimary/70 text-sm">
                    {formatDate(checkIn.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleResetEvent(checkIn.userId, checkIn.eventName)
                  }
                  className="text-destructive/70 hover:text-destructive transition"
                  title="Delete check-in"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
