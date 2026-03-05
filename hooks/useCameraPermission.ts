import { useCallback, useEffect, useState } from "react";

export type PermissionState = "prompt" | "granted" | "denied" | "unavailable";

export const useCameraPermission = () => {
  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt");

  // Check current permission state without requesting
  const checkPermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState("unavailable");
        return "unavailable";
      }

      // Check if we already have camera permission
      const permission = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      const state = permission.state as PermissionState;
      setPermissionState(state);
      return state;
    } catch (error) {
      console.error("Camera permission check error:", error);
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

  // Check permission on mount
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    permissionState,
    requestPermission,
    checkPermission,
  };
};
