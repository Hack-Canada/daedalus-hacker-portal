"use client";

import { AlertCircle, Camera, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PermissionState } from "@/hooks/useCameraPermission";

interface CameraPermissionPromptProps {
  permissionState: PermissionState;
  onRequestPermission: () => Promise<boolean>;
}

export function CameraPermissionPrompt({
  permissionState,
  onRequestPermission,
}: CameraPermissionPromptProps) {
  if (permissionState === "prompt") {
    return (
      <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-sky-500/5 p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <Camera className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-textPrimary">
            Camera Access Required
          </h3>
          <p className="text-textSecondary">
            We need camera access to scan QR codes for check-ins.
          </p>
        </div>
        <Button onClick={onRequestPermission} size="lg" className="min-w-[200px]">
          <Camera className="mr-2 h-5 w-5" />
          Enable Camera Access
        </Button>
      </div>
    );
  }

  if (permissionState === "denied") {
    return (
      <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-error/20 bg-error/5 p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/20">
          <AlertCircle className="h-10 w-10 text-error" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-textPrimary">
            Camera Access Denied
          </h3>
          <p className="text-textSecondary">
            Please enable camera access in your browser settings to use the
            scanner.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4 rounded-lg bg-backgroundMuted p-4 text-left">
          <p className="text-sm font-semibold text-textPrimary">
            How to enable camera access:
          </p>
          <ol className="space-y-2 text-sm text-textSecondary">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>
                Look for the camera icon in your browser&apos;s address bar
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>Click it and select &quot;Allow&quot; for camera access</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Click the retry button below or refresh this page</span>
            </li>
          </ol>
        </div>

        <Button
          onClick={onRequestPermission}
          variant="outline"
          size="lg"
          className="min-w-[200px]"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Retry
        </Button>
      </div>
    );
  }

  if (permissionState === "unavailable") {
    // Check if this is due to non-secure context (HTTP instead of HTTPS)
    const isInsecureContext = typeof window !== "undefined" && !window.isSecureContext;
    
    return (
      <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-error/20 bg-error/5 p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/20">
          <AlertCircle className="h-10 w-10 text-error" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-textPrimary">
            {isInsecureContext ? "Secure Connection Required" : "Camera Not Available"}
          </h3>
          {isInsecureContext ? (
            <>
              <p className="text-textSecondary">
                Camera access requires a secure (HTTPS) connection.
              </p>
              <p className="text-sm text-textMuted">
                Please access this page via HTTPS or use the production site at{" "}
                <a 
                  href="https://app.hackcanada.org" 
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app.hackcanada.org
                </a>
              </p>
            </>
          ) : (
            <>
              <p className="text-textSecondary">
                Camera access is not supported on this device or browser.
              </p>
              <p className="text-sm text-textMuted">
                Please try using a different browser or device with camera support.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // If granted, return null (scanner will show)
  return null;
}
