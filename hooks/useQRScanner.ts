import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { toast } from "sonner";

import { Event } from "@/config/qr-code";
import { CheckIn } from "@/lib/db/schema";
import type { UserVerifyData } from "@/app/api/check-ins/verify/route";

import { useCameraPermission } from "./useCameraPermission";

export interface CameraDevice {
  deviceId: string;
  label: string;
}

interface UseQRScannerProps {
  selectedEvent: Event | "";
  keepCameraOn: boolean;
}

const STORAGE_KEY_CAMERA = "scanner-selected-camera";

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
  const [availableCameras, setAvailableCameras] = useState<CameraDevice[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY_CAMERA);
    }
    return null;
  });
  
  // Hackathon confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [pendingUserData, setPendingUserData] = useState<UserVerifyData | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const isProcessing = useRef(false);
  const { permissionState, requestPermission } = useCameraPermission();

  // List available cameras on mount or when permission is granted
  useEffect(() => {
    const listCameras = async () => {
      if (permissionState !== "granted") return;
      
      try {
        const devices = await codeReader.current.listVideoInputDevices();
        const cameras: CameraDevice[] = devices.map((device, index) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${index + 1}`,
        }));
        setAvailableCameras(cameras);
        
        // If no camera is selected yet, select the first one (usually back camera on mobile)
        if (!selectedCameraId && cameras.length > 0) {
          // Try to find a back camera (usually contains "back" or "environment" in label)
          const backCamera = cameras.find(
            (c) => c.label.toLowerCase().includes("back") || 
                   c.label.toLowerCase().includes("environment")
          );
          const defaultCamera = backCamera || cameras[0];
          setSelectedCameraId(defaultCamera.deviceId);
          localStorage.setItem(STORAGE_KEY_CAMERA, defaultCamera.deviceId);
        }
      } catch (error) {
        console.error("Failed to list cameras:", error);
      }
    };

    listCameras();
  }, [permissionState, selectedCameraId]);

  // Save selected camera to localStorage
  const handleCameraChange = useCallback((deviceId: string) => {
    setSelectedCameraId(deviceId);
    localStorage.setItem(STORAGE_KEY_CAMERA, deviceId);
  }, []);

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

  const stopCamera = useCallback((force = false) => {
    if (keepCameraOn && !force) return;
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

  // Fetch user details for hackathon check-in verification
  const verifyUserForHackathon = async (userId: string): Promise<UserVerifyData | null> => {
    try {
      const response = await fetch(`/api/check-ins/verify?userId=${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to verify user");
      }
      
      return data.data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to verify user",
      );
      return null;
    }
  };

  // Handle the actual check-in (called after confirmation for hackathon, directly for others)
  const performCheckIn = async (userId: string, showFeedback = true) => {
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
      setScanData(data.data || []);

      if (!response.ok) {
        throw new Error(data.message || "Failed to check in");
      }

      setScannedUserName(data.userName || "No name found");
      if (showFeedback) {
        await playSound("success");
        setScanResult("success");
        toast.success("Check-in successful!");
      }
      return true;
    } catch (error) {
      if (showFeedback) {
        await playSound("error");
        setScanResult("error");
        toast.error(
          error instanceof Error ? error.message : "Failed to check in",
        );
      }
      return false;
    } finally {
      if (showFeedback) {
        stopCamera();
        isProcessing.current = false;
        setTimeout(() => setScanResult(null), 500);
      }
    }
  };

  // Handle check-in flow (with confirmation for hackathon)
  const handleCheckIn = async (userId: string) => {
    // For hackathon check-in, show confirmation dialog first
    if (selectedEvent === "hackathon-check-in") {
      const userData = await verifyUserForHackathon(userId);
      if (userData) {
        setPendingUserId(userId);
        setPendingUserData(userData);
        setShowConfirmDialog(true);
        // Keep camera paused but don't fully stop - user might cancel
        codeReader.current.reset();
      } else {
        await playSound("error");
        setScanResult("error");
        stopCamera();
        isProcessing.current = false;
        setTimeout(() => setScanResult(null), 500);
      }
      return;
    }

    // For other events, proceed directly
    await performCheckIn(userId);
  };

  // Confirm hackathon check-in from dialog
  const confirmHackathonCheckIn = async () => {
    if (!pendingUserId) return;
    
    setIsConfirming(true);
    const success = await performCheckIn(pendingUserId, false);
    
    if (success) {
      await playSound("success");
      setScanResult("success");
      toast.success("Check-in successful!");
    } else {
      await playSound("error");
      setScanResult("error");
    }
    
    setShowConfirmDialog(false);
    setPendingUserId(null);
    setPendingUserData(null);
    setIsConfirming(false);
    stopCamera();
    isProcessing.current = false;
    setTimeout(() => setScanResult(null), 500);
  };

  // Cancel hackathon check-in from dialog
  const cancelHackathonCheckIn = () => {
    setShowConfirmDialog(false);
    setPendingUserId(null);
    setPendingUserData(null);
    isProcessing.current = false;
    // Optionally restart camera for another scan
    if (keepCameraOn) {
      startCamera();
    } else {
      stopCamera(true);
    }
  };

  const handleChallengeSubmission = async (userData: {
    userId: string;
    challengeId: string;
  }) => {
    try {
      const response = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
          challengeId: userData.challengeId,
        }),
      });

      const data = await response.json();
      setScanData([]); // Set scan data to nothing as it is a challenge check in

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit challenge");
      }

      setScannedUserName(data.userName || "No name found");
      await playSound("success");
      setScanResult("success");
      toast.success("Challenge submission successful!");
    } catch (error) {
      await playSound("error");
      setScanResult("error");
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to process challenge submission",
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
      setStartingCamera(false);
      return;
    }

    if (permissionState !== "granted") {
      toast.error("Camera access is required for scanning QR codes");
      setStartingCamera(false);
      return;
    }

    let lastScan = new Date("1970-01-01");
    let lastUserIdVar: String = ""; // to prevent double scans of the same user, we need this as react wont re-render in time to prevent double scans

    try {
      // Start the QR code reader with the selected camera
      await codeReader.current.decodeFromVideoDevice(
        selectedCameraId, // Use selected camera or null for default
        videoRef.current,
        async (
          result: { getText(): string } | null,
          error: Error | undefined,
        ) => {
          if (error || !result || isProcessing.current) return;

          const scannedText = result.getText();
          console.log(scannedText);
          let userId: string | undefined;
          let challengeId: string | undefined;

          // Determine QR code type
          if (scannedText.startsWith("https://app.hackcanada.org/profile/")) {
            // Regular profile URL
            userId = scannedText.split("/profile/")[1];
          } else {
            // JSON QR code (for challenges)
            try {
              const parsed = JSON.parse(scannedText);
              userId = parsed.userId;
              challengeId = parsed.challengeId;
            } catch (e) {
              console.error("Failed to parse QR code JSON:", e);
            }
          }

          if (!userId) {
            await playSound("error");
            toast.error("Invalid QR code");
            setScanResult("error");
            setTimeout(() => setScanResult(null), 1000);
            return;
          }

          // Validate challenge-specific requirements
          if (selectedEvent === "challenge") {
            if (!challengeId) {
              await playSound("error");
              toast.error(
                "Please scan the challenge-specific QR code, not the profile QR code",
              );
              setScanResult("error");
              setTimeout(() => setScanResult(null), 1000);
              return;
            }
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
          if (selectedEvent === "challenge") {
            await handleChallengeSubmission({
              userId,
              challengeId: challengeId!,
            });
          } else {
            await handleCheckIn(userId);
          }
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
      stopCamera(true);
    } else {
      await startCamera();
    }
  };

  // Switch camera - stop current and restart with new camera
  const switchCamera = useCallback(async (deviceId: string) => {
    handleCameraChange(deviceId);
    if (isCameraOn) {
      stopCamera(true);
      // Small delay to ensure camera is fully stopped
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [isCameraOn, stopCamera, handleCameraChange]);

  return {
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
    // Hackathon confirmation dialog
    showConfirmDialog,
    pendingUserData,
    isConfirming,
    confirmHackathonCheckIn,
    cancelHackathonCheckIn,
  };
};
