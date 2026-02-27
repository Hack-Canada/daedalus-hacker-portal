"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";

import { Event } from "@/config/qr-code";
import { cn, formatDate } from "@/lib/utils";
import { useQRScanner } from "@/hooks/useQRScanner";
import { Checkbox } from "@/components/ui/checkbox";
import { EventSelector } from "@/components/EventSelector";
import { CameraPermissionPrompt } from "./CameraPermissionPrompt";

const STORAGE_KEY_EVENT = "scanner-selected-event";
const STORAGE_KEY_KEEP_CAMERA = "scanner-keep-camera-on";

export function Scanner() {
  // Initialize state with localStorage values (lazy initialization)
  const [selectedEvent, setSelectedEvent] = useState<Event | "">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_EVENT);
      return (saved as Event) || "";
    }
    return "";
  });

  const [keepCameraOn, setKeepCameraOn] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY_KEEP_CAMERA);
      return saved === "true";
    }
    return false;
  });

  const {
    isCameraOn,
    videoRef,
    handleToggleCamera,
    scanResult,
    permissionState,
    requestPermission,
    startingCamera,
    handleResetEvent,
    scanData,
    scannedUserName,
  } = useQRScanner({
    selectedEvent,
    keepCameraOn,
  });

  // Save selectedEvent to localStorage when it changes
  useEffect(() => {
    if (selectedEvent) {
      localStorage.setItem(STORAGE_KEY_EVENT, selectedEvent);
    }
  }, [selectedEvent]);

  // Save keepCameraOn to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KEEP_CAMERA, String(keepCameraOn));
  }, [keepCameraOn]);

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
        <>
          {/* Show camera permission prompt if not granted */}
          {permissionState !== "granted" ? (
            <CameraPermissionPrompt
              permissionState={permissionState}
              onRequestPermission={requestPermission}
            />
          ) : (
            <div className="relative flex flex-col items-center">
              {/* Camera container */}
              <div className="group relative mx-auto w-full max-w-96 rounded-md border-2 border-primary/25 bg-primary/25 p-2 transition-all duration-500">
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-md">
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
                </div>
              </div>
            </div>
          )}
        </>
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
            User&apos;s Check-in History
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
