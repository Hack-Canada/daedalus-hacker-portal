"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileVisitTrackerProps {
  visitedUserId: string;
  visitorRole: string;
  isOwner: boolean;
  visitedUserRole: string;
}

const MIN_TIME_SECONDS = 5;

export function ProfileVisitTracker({
  visitedUserId,
  visitorRole,
  isOwner,
  visitedUserRole,
}: ProfileVisitTrackerProps) {
  const [hasTracked, setHasTracked] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // Only track for hackers visiting other hackers' profiles
    if (isOwner || visitorRole !== "hacker" || visitedUserRole !== "hacker") {
      return;
    }

    // Initialize start time inside useEffect to avoid impure render
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const trackVisit = async () => {
      if (hasTracked) return;

      try {
        const response = await fetch("/api/profile/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitedUserId }),
        });

        const data = await response.json();

        if (data.success && data.data?.newVisit) {
          if (data.data.pointsAwarded > 0) {
            toast.success(data.message);
          }
        }

        setHasTracked(true);
      } catch (error) {
        console.error("Failed to track profile visit:", error);
      }
    };

    // Track interaction with social links
    const handleSocialLinkClick = () => {
      hasInteractedRef.current = true;
      trackVisit();
    };

    // Listen for clicks on social links
    const socialLinks = document.querySelectorAll('a[href^="http"]');
    socialLinks.forEach((link) => {
      link.addEventListener("click", handleSocialLinkClick);
    });

    // Timer to track time spent on page
    const timer = setTimeout(() => {
      trackVisit();
    }, MIN_TIME_SECONDS * 1000);

    // Also track if user scrolls (indicates engagement)
    const handleScroll = () => {
      const startTime = startTimeRef.current;
      if (startTime === null) return;
      const timeSpent = (Date.now() - startTime) / 1000;
      if (timeSpent >= MIN_TIME_SECONDS / 2) {
        trackVisit();
      }
    };

    window.addEventListener("scroll", handleScroll, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      socialLinks.forEach((link) => {
        link.removeEventListener("click", handleSocialLinkClick);
      });
    };
  }, [visitedUserId, visitorRole, isOwner, visitedUserRole, hasTracked]);

  // This component doesn't render anything visible
  return null;
}
