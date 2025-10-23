import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { toast } from "sonner";

import { Event } from "@/config/qr-code";
import { CheckIn } from "@/lib/db/schema";

import { useCameraPermission } from "./useCameraPermission";

interface UseQRScannerProps {
  selectedEvent: Event | "";
  keepCameraOn: boolean;
}

export const useQRScanner = ({
  selectedEvent,
  keepCameraOn,
}: UseQRScannerProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [startingCamera, setStartingCamera] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(
    null,
  );
  const [lastUserId, setLastUserId] = useState<string | null>(null);
  const [scanData, setScanData] = useState<CheckIn[]>([]);
  const [scannedUserName, setScannedUserName] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const isProcessing = useRef(false);
  const { hasCameraPermission } = useCameraPermission();

  const successAudio = useRef<HTMLAudioElement | null>(null);
  const errorAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    successAudio.current = new Audio("/success.mp3");
    errorAudio.current = new Audio("/error.mp3");
  }, []);

  const playSound = useCallback(async (type: "success" | "error") => {
    try {
      const audio =
        type === "success" ? successAudio.current : errorAudio.current;
      if (audio) {
        audio.currentTime = 0;
        await audio.play();
      }
    } catch (error) {
      console.error(`Failed to play ${type} sound:`, error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (keepCameraOn) return;
    try {
      codeReader.current.reset();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } catch (err) {
      console.error("Error stopping camera:", err);
      toast.error("Failed to stop camera");
    }
  }, [keepCameraOn]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCheckIn = async (userId: string) => {
    try {
      const response = await fetch("/api/check-ins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventName: selectedEvent,
        }),
      });

      const data = await response.json();
      setScanData(data.data || []); // Set scan data regardless of success/failure

      if (!response.ok) {
        throw new Error(data.message || "Failed to check in");
      }

      setScannedUserName(data.userName || "No name found");
      await playSound("success");
      setScanResult("success");
      toast.success("Check-in successful!");
    } catch (error) {
      await playSound("error");
      setScanResult("error");
      toast.error(
        error instanceof Error ? error.message : "Failed to check in",
      );
    } finally {
      stopCamera();
      isProcessing.current = false;
      setTimeout(() => setScanResult(null), 500);
    }
  };

  const handleResetEvent = async (userId?: string, eventName?: string) => {
    const userIdToReset = userId || lastUserId;
    const eventNameToReset = eventName || selectedEvent;

    if (!userIdToReset) {
      toast.error("No user to reset");
      return;
    }

    if (!eventNameToReset) {
      toast.error("No event selected");
      return;
    }

    try {
      const response = await fetch("/api/check-ins", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdToReset,
          eventName: eventNameToReset,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to reset event");
      }

      setScanData([
        ...scanData.filter(
          (checkIn) =>
            checkIn.userId !== userIdToReset &&
            checkIn.eventName !== eventNameToReset,
        ),
      ]);
      setScannedUserName(null);
      toast.success("Event reset successful!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset event",
      );
    }
  };

  const startCamera = async () => {
    setStartingCamera(true);

    if (!selectedEvent) {
      toast.error("Please select an event first");
      return;
    }

    if (!hasCameraPermission) {
      toast.error("Camera access is required for scanning QR codes");
      return;
    }

    let lastScan = new Date("1970-01-01");
    let lastUserIdVar: String = ""; // to prevent double scans of the same user, we need this as react wont re-render in time to prevent double scans

    try {
      // Start the QR code reader directly with constraints
      await codeReader.current.decodeFromVideoDevice(
        null, // Use default device
        videoRef.current,
        async (
          result: { getText(): string } | null,
          error: Error | undefined,
        ) => {
          if (error || !result || isProcessing.current) return;

          const scannedUrl = result.getText();
          const userId = scannedUrl.split("/profile/")[1];

          if (!userId) {
            await playSound("error");
            toast.error("Invalid QR code");
            setScanResult("error");
            setTimeout(() => setScanResult(null), 1000);
            return;
          }

          // prevent double scans of the same user
          if (
            (lastUserId === userId || lastUserIdVar == userId) &&
            new Date().getTime() - lastScan.getTime() < 3000
          ) {
            // 3 seconds between scans of the same user to prevent double scans
            // console.table({ lastUserIdVar, userId, lastScan: lastScan.getTime(), now: new Date().getTime() });
            return;
          }

          lastScan = new Date();
          lastUserIdVar = userId; // Due to the lack of rendering, we need to set this here to prevent double scans
          setLastUserId(userId);

          isProcessing.current = true;
          await handleCheckIn(userId);
        },
      );

      setIsCameraOn(true);
    } catch (err) {
      console.error("Scanner error:", err);
      toast.error(
        "Failed to start camera. Please ensure you have granted camera permissions and try again.",
      );
      setIsCameraOn(false);
    } finally {
      setStartingCamera(false);
    }
  };

  const handleToggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  };
  return {
    isCameraOn,
    videoRef,
    handleToggleCamera,
    scanResult,
    hasCameraPermission,
    startingCamera,
    handleResetEvent,
    scanData,
    scannedUserName,
  };
};
