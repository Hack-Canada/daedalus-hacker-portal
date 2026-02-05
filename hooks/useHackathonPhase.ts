"use client";

import { useMemo } from "react";

import {
  type HackathonPhase,
  type PhaseFeatures,
  getCurrentPhase,
  getCurrentPhaseFeatures,
  isFeatureEnabled as checkFeatureEnabled,
  areApplicationsOpen,
  isEventActive,
  isEventConcluded,
  getApplicationDeadline,
  getEventDate,
} from "@/config/phases";

/**
 * Hook to get the current hackathon phase and related utilities
 * 
 * @example
 * const { phase, features, isFeatureEnabled } = useHackathonPhase();
 * if (isFeatureEnabled("showCountdown")) {
 *   return <CountdownTimer />;
 * }
 */
export function useHackathonPhase() {
  const phase = useMemo(() => getCurrentPhase(), []);
  const features = useMemo(() => getCurrentPhaseFeatures(), []);

  return {
    /** Current hackathon phase */
    phase,
    
    /** All feature flags for the current phase */
    features,
    
    /** Check if a specific feature is enabled */
    isFeatureEnabled: (featureName: keyof PhaseFeatures) =>
      features[featureName] as boolean,
    
    /** Check if current phase matches any of the provided phases */
    isPhase: (...phases: HackathonPhase[]) => phases.includes(phase),
    
    /** Helper: Are applications currently open? */
    areApplicationsOpen: phase === "registration-open",
    
    /** Helper: Is the event currently happening? */
    isEventActive: phase === "during-event",
    
    /** Helper: Has the event concluded? */
    isEventConcluded: phase === "post-event",
  };
}

/**
 * Hook to check if a specific feature is enabled
 * 
 * @example
 * const canRegister = useFeatureFlag("userRegistration");
 * if (!canRegister) {
 *   return <div>Registration closed</div>;
 * }
 */
export function useFeatureFlag(featureName: keyof PhaseFeatures): boolean {
  return useMemo(() => checkFeatureEnabled(featureName), [featureName]);
}

/**
 * Hook to check if current phase matches any of the provided phases
 * 
 * @example
 * const isDuringOrAfter = usePhaseCheck("during-event", "post-event");
 */
export function usePhaseCheck(...phases: HackathonPhase[]): boolean {
  const currentPhase = useMemo(() => getCurrentPhase(), []);
  return phases.includes(currentPhase);
}

/**
 * Hook to get phase-specific configuration values
 */
export function usePhaseConfig() {
  return {
    applicationDeadline: getApplicationDeadline(),
    eventDate: getEventDate(),
    areApplicationsOpen: areApplicationsOpen(),
    isEventActive: isEventActive(),
    isEventConcluded: isEventConcluded(),
  };
}

/**
 * Server-side helper to get the current phase (for use in Server Components)
 * Note: This is not a hook, just exported for convenience
 */
export { getCurrentPhase, getCurrentPhaseFeatures, checkFeatureEnabled };
