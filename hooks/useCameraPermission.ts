import { useCallback, useEffect, useState } from "react";

export type PermissionState = "prompt" | "granted" | "denied" | "unavailable";

// Helper to detect if we're on Safari/iOS where Permissions API doesn't support camera
const isSafariOrIOS = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return isIOS || isSafari;
};

export const useCameraPermission = () => {
  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt");

  // Check current permission state without requesting
  const checkPermission = useCallback(async () => {
    try {
      // Check if mediaDevices API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState("unavailable");
        return "unavailable";
      }

      // Safari/iOS doesn't support navigator.permissions.query for camera
      // So we skip the permission check and just show "prompt" to let user try
      if (isSafariOrIOS()) {
        setPermissionState("prompt");
        return "prompt";
      }

      // Check if we already have camera permission (Chrome, Firefox, Edge on desktop)
      const permission = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      const state = permission.state as PermissionState;
      setPermissionState(state);
      return state;
    } catch (error) {
      console.error("Camera permission check error:", error);
      // If permissions query fails (e.g., on browsers that don't support it), 
      // assume we need to prompt the user - don't mark as unavailable
      setPermissionState("prompt");
      return "prompt";
    }
  }, []);

  // Manually request camera permission
  const requestPermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState("unavailable");
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // Stop the stream immediately - we just wanted permission
      stream.getTracks().forEach((track) => track.stop());

      setPermissionState("granted");
      return true;
    } catch (error) {
      console.error("Camera permission request error:", error);
      setPermissionState("denied");
      return false;
    }
  }, []);

  // Check permission on mount - with a small delay to ensure browser APIs are ready
  useEffect(() => {
    // Some mobile browsers need a tick before mediaDevices is available
    const timer = setTimeout(() => {
      checkPermission();
    }, 100);
    return () => clearTimeout(timer);
  }, [checkPermission]);

  return {
    permissionState,
    requestPermission,
    checkPermission,
  };
};
