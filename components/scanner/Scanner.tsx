"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, SwitchCamera } from "lucide-react";

import { Event } from "@/config/qr-code";
import { cn, formatDate } from "@/lib/utils";
import { useQRScanner } from "@/hooks/useQRScanner";
import { Checkbox } from "@/components/ui/checkbox";
import { CameraPermissionPrompt } from "./CameraPermissionPrompt";
import { HackathonConfirmDialog } from "./HackathonConfirmDialog";
import { ShopRedeemConfirmDialog } from "./ShopRedeemConfirmDialog";

const STORAGE_KEY_KEEP_CAMERA = "scanner-keep-camera-on";

interface ScannerProps {
  selectedEvent: Event;
}

export function Scanner({ selectedEvent }: ScannerProps) {
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
    availableCameras,
    selectedCameraId,
    switchCamera,
    showConfirmDialog,
    pendingUserData,
    isConfirming,
    confirmHackathonCheckIn,
    cancelHackathonCheckIn,
    showShopRedeemDialog,
    pendingShopRedeem,
    isRedeemingShop,
    confirmShopRedeem,
    cancelShopRedeem,
  } = useQRScanner({
    selectedEvent,
    keepCameraOn,
  });

  // Save keepCameraOn to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KEEP_CAMERA, String(keepCameraOn));
  }, [keepCameraOn]);

  return (
    <>
      {/* Visual feedback overlay */}
      {scanResult && (
        <div
          className={`animate-flash fixed inset-0 z-50 pointer-events-none duration-500 ${
            scanResult === "success" ? "bg-success/30" : "bg-error/30"
          }`}
        />
      )}

      {/* Settings */}
      <div className="border-primary/25 hover:border-primary/50 hover:shadow-primaryLight/50 flex flex-col gap-4 rounded-md border-2 p-4 transition-all duration-500 hover:shadow-2xl md:p-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="keep-camera-on"
            checked={keepCameraOn}
            onCheckedChange={(value: boolean | "indeterminate") => {
              setKeepCameraOn(!!value);
            }}
          />
          <label htmlFor="keep-camera-on" className="text-textPrimary text-sm">
            Keep Camera On After Scan
          </label>
        </div>
      </div>

      {/* Show camera permission prompt if not granted */}
      {permissionState !== "granted" ? (
        <CameraPermissionPrompt
          permissionState={permissionState}
          onRequestPermission={requestPermission}
        />
      ) : (
        <div className="relative flex flex-col items-center gap-4">
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

              {/* Camera switch button - only show when camera is on and multiple cameras available */}
              {isCameraOn && availableCameras.length > 1 && (
                <button
                  onClick={() => {
                    const currentIndex = availableCameras.findIndex(
                      (c) => c.deviceId === selectedCameraId
                    );
                    const nextIndex = (currentIndex + 1) % availableCameras.length;
                    switchCamera(availableCameras[nextIndex].deviceId);
                  }}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                  title="Switch Camera"
                >
                  <SwitchCamera className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Camera selector dropdown - show when multiple cameras available */}
          {availableCameras.length > 1 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-textSecondary">Camera:</span>
              <select
                value={selectedCameraId || ""}
                onChange={(e) => switchCamera(e.target.value)}
                className="rounded-md border border-primary/25 bg-background px-2 py-1 text-textPrimary focus:border-primary focus:outline-none"
              >
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label}
                  </option>
                ))}
              </select>
            </div>
          )}
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

      {/* Hackathon Check-In Confirmation Dialog */}
      {pendingUserData && (
        <HackathonConfirmDialog
          userData={pendingUserData}
          isOpen={showConfirmDialog}
          isLoading={isConfirming}
          onConfirm={confirmHackathonCheckIn}
          onCancel={cancelHackathonCheckIn}
        />
      )}

      {/* Shop Redeem Confirmation Dialog */}
      {pendingShopRedeem && pendingUserData && (
        <ShopRedeemConfirmDialog
          shopData={pendingShopRedeem}
          userData={pendingUserData}
          isOpen={showShopRedeemDialog}
          isLoading={isRedeemingShop}
          onConfirm={confirmShopRedeem}
          onCancel={cancelShopRedeem}
        />
      )}
    </>
  );
}
