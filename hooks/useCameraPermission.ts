import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCameraPermission = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasCameraPermission(false);
          toast.error(
            "Camera access is not supported on this device or browser",
          );
          return;
        }

        // Check if we already have camera permission
        const permission = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        if (permission.state === "granted") {
          setHasCameraPermission(true);
          return;
        }

        // Only request camera access if we don't have permission
        if (permission.state === "prompt") {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          stream.getTracks().forEach((track) => track.stop());
          setHasCameraPermission(true);
        } else {
          setHasCameraPermission(false);
          toast.error("Camera access is required for scanning QR codes");
        }
      } catch (error) {
        console.error("Camera permission error:", error);
        setHasCameraPermission(false);
        toast.error("Camera access is required for scanning QR codes");
      }
    };

    checkCameraPermission();
  }, []);

  return { hasCameraPermission };
};
