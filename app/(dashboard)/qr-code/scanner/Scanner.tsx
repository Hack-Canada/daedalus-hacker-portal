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
      <div className="flex flex-col gap-8 rounded-md border-2 border-primary/25 p-4 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primaryLight/50 md:p-6">
        {/* Visual feedback overlay */}
        {scanResult && (
          <div
            className={`absolute -inset-full z-50 animate-flash duration-500 ${
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
            onCheckedChange={(value) => {
              setKeepCameraOn(!!value);
            }}
          />
          <label htmlFor="keep-camera-on" className="text-sm text-textPrimary">
            Keep Camera On
          </label>
        </div>
      </div>
      {selectedEvent && (
        <div className="relative flex flex-col items-center">
          {/* Camera container */}
          <div className="group relative mx-auto w-full max-w-96 rounded-md border-2 border-primary/25 bg-primary/25 p-2 transition-all duration-500">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-md">
              {!hasCameraPermission && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-backgroundMuted p-4 text-center">
                  <AlertCircle className="h-8 w-8 text-error" />
                  <p className="text-sm font-medium text-textPrimary/70">
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
                    "scale-x-100 scale-y-100 rounded-[0px]": isCameraOn,
                  },
                )}
              />
              {hasCameraPermission && (
                <button
                  onClick={handleToggleCamera}
                  className={cn(
                    "flex h-full w-full items-center justify-center bg-backgroundMuted text-lg font-semibold text-textPrimary/70 transition hover:text-textPrimary",
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
        <div className="mt-4 rounded-lg border border-primary/10 bg-primary/5 p-4 text-center">
          <p className="text-lg font-semibold text-textPrimary">
            Successfully scanned:{" "}
            <span className="text-primary">{scannedUserName}</span>
          </p>
        </div>
      )}

      {scanData.length > 0 && (
        <div className="mt-4 md:mt-6">
          <h3 className="mb-4 text-lg font-semibold text-textPrimary">
            User's Check-in History
          </h3>
          <div className="space-y-2">
            {scanData.map((checkIn) => (
              <div
                key={checkIn.id}
                className="flex items-center justify-between gap-4 rounded-md border border-primary/10 bg-primary/5 p-3"
              >
                <div className="flex flex-1 items-center justify-between">
                  <span className="font-medium text-textPrimary">
                    {checkIn.eventName.split("-").join(" ")}
                  </span>
                  <span className="text-sm text-textPrimary/70">
                    {formatDate(checkIn.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleResetEvent(checkIn.userId, checkIn.eventName)
                  }
                  className="text-destructive/70 transition hover:text-destructive"
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
