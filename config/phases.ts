/**
 * Hackathon Phase Configuration System
 *
 * This file contains the centralized configuration for all phase-dependent
 * features in the application. Phases are automatically determined based on
 * the current date and configured date boundaries.
 */

// Phase types
export type HackathonPhase =
  | "pre-registration" // Before registration opens
  | "registration-open" // Registration is available
  | "pre-event" // Registration closed, before event starts
  | "during-event" // Event is happening
  | "post-event"; // Event concluded

// Phase dates
export const phaseDates = {
  registrationOpen: new Date("2026-02-01T00:00:00-05:00"),
  registrationClose: new Date("2026-02-28T23:59:59-05:00"),
  eventStart: new Date("2026-03-01T16:30:00-05:00"),
  eventEnd: new Date("2026-03-02T16:00:00-05:00"),
} as const;

// Phase features
export interface PhaseFeatures {
  // Authentication & Registration
  userRegistration: boolean;
  oauthSignIn: boolean;

  // Applications
  applicationSubmission: boolean;
  applicationSaving: boolean;
  applicationViewing: boolean;

  // RSVP
  rsvpAccess: boolean;
  rsvpCancellation: boolean;

  // Dashboard Components
  showApplicationStatus: boolean;
  showHackathonConclusion: boolean;
  showCountdown: boolean;
  showProjectsCard: boolean;
  showHackerPackage: boolean;
  showDiscordInvite: boolean;

  // Check-ins & QR
  qrCodeCheckIns: boolean;
  qrCodeDisplay: boolean;

  // Profile & Updates
  profileUpdates: boolean;

  // Schedule
  scheduleVisible: boolean;

  // Content Messages
  contactMessage: "pre-event" | "during-event" | "post-event";
}

export const phaseFeatures: Record<HackathonPhase, PhaseFeatures> = {
  "pre-registration": {
    // Auth
    userRegistration: false,
    oauthSignIn: false, // Always allow existing users to login

    // Applications
    applicationSubmission: false,
    applicationSaving: false,
    applicationViewing: true,

    // RSVP
    rsvpAccess: false,
    rsvpCancellation: false,

    // Dashboard
    showApplicationStatus: true, // Show "Coming Soon" message
    showHackathonConclusion: false,
    showCountdown: true,
    showProjectsCard: false,
    showHackerPackage: false,
    showDiscordInvite: true,

    // Check-ins
    qrCodeCheckIns: false,
    qrCodeDisplay: false,

    // Profile
    profileUpdates: false,

    // Schedule
    scheduleVisible: true, // Show schedule so potential applicants can see what to expect

    // Messages
    contactMessage: "pre-event",
  },

  "registration-open": {
    // Auth
    userRegistration: true,
    oauthSignIn: true,

    // Applications
    applicationSubmission: true,
    applicationSaving: true,
    applicationViewing: true,

    // RSVP
    rsvpAccess: true,
    rsvpCancellation: true,

    // Dashboard
    showApplicationStatus: true,
    showHackathonConclusion: false,
    showCountdown: true,
    showProjectsCard: false,
    showHackerPackage: false,
    showDiscordInvite: true,

    // Check-ins
    qrCodeCheckIns: false,
    qrCodeDisplay: false,

    // Profile
    profileUpdates: true,

    // Schedule
    scheduleVisible: true,

    // Messages
    contactMessage: "pre-event",
  },

  "pre-event": {
    // Auth
    userRegistration: true,
    oauthSignIn: true, // Always allow existing users to login

    // Applications
    applicationSubmission: false,
    applicationSaving: false,
    applicationViewing: true,

    // RSVP
    rsvpAccess: true, // Batch 3 acceptances need to RSVP during pre-event
    rsvpCancellation: true,

    // Dashboard
    showApplicationStatus: true,
    showHackathonConclusion: false,
    showCountdown: true,
    showProjectsCard: false,
    showHackerPackage: true, // Users need hacker package before event
    showDiscordInvite: true,

    // Check-ins
    qrCodeCheckIns: false,
    qrCodeDisplay: true,

    // Profile
    profileUpdates: true,

    // Schedule
    scheduleVisible: true,

    // Messages
    contactMessage: "pre-event",
  },

  "during-event": {
    // Auth
    userRegistration: false,
    oauthSignIn: true, // Always allow existing users to login

    // Applications
    applicationSubmission: false,
    applicationSaving: false,
    applicationViewing: true,

    // RSVP
    rsvpAccess: false,
    rsvpCancellation: false,

    // Dashboard
    showApplicationStatus: false,
    showHackathonConclusion: false,
    showCountdown: false,
    showProjectsCard: false,
    showHackerPackage: true,
    showDiscordInvite: true,

    // Check-ins
    qrCodeCheckIns: true,
    qrCodeDisplay: true,

    // Profile
    profileUpdates: true, // Allow updates during event (emergency contacts, dietary restrictions)

    // Schedule
    scheduleVisible: true,

    // Messages
    contactMessage: "during-event",
  },

  "post-event": {
    // Auth
    userRegistration: false,
    oauthSignIn: true, // Always allow existing users to login

    // Applications
    applicationSubmission: false,
    applicationSaving: false,
    applicationViewing: true,

    // RSVP
    rsvpAccess: false,
    rsvpCancellation: false,

    // Dashboard
    showApplicationStatus: false,
    showHackathonConclusion: true,
    showCountdown: false,
    showProjectsCard: true,
    showHackerPackage: false,
    showDiscordInvite: true,

    // Check-ins
    qrCodeCheckIns: false,
    qrCodeDisplay: false,

    // Profile
    profileUpdates: false,

    // Schedule
    scheduleVisible: true,

    // Messages
    contactMessage: "post-event",
  },
};

// ============================================================================
// Phase Detection Logic
// ============================================================================

/**
 * Determines the current hackathon phase based on the current date
 * and configured phase boundaries. Can be overridden with environment variable.
 *
 * @param now - Optional date to use for phase calculation (defaults to current date)
 * @returns The current hackathon phase
 */
export function getCurrentPhase(now: Date = new Date()): HackathonPhase {
  // Check for manual override (for testing/admin purposes)
  if (typeof process !== "undefined" && process.env.FORCE_HACKATHON_PHASE) {
    const forcedPhase = process.env.FORCE_HACKATHON_PHASE as HackathonPhase;
    if (isValidPhase(forcedPhase)) {
      return forcedPhase;
    }
  }

  const currentTime = now.getTime();

  // Before registration opens
  if (currentTime < phaseDates.registrationOpen.getTime()) {
    return "pre-registration";
  }

  // Registration is open
  if (currentTime < phaseDates.registrationClose.getTime()) {
    return "registration-open";
  }

  // After registration closes but before event starts
  if (currentTime < phaseDates.eventStart.getTime()) {
    return "pre-event";
  }

  // During the event
  if (currentTime < phaseDates.eventEnd.getTime()) {
    return "during-event";
  }

  // After the event
  return "post-event";
}

/**
 * Checks if a string is a valid hackathon phase
 */
function isValidPhase(phase: string): phase is HackathonPhase {
  return [
    "pre-registration",
    "registration-open",
    "pre-event",
    "during-event",
    "post-event",
  ].includes(phase);
}

/**
 * Gets the feature flags for a specific phase
 */
export function getPhaseFeatures(phase: HackathonPhase): PhaseFeatures {
  return phaseFeatures[phase];
}

/**
 * Gets the feature flags for the current phase
 */
export function getCurrentPhaseFeatures(): PhaseFeatures {
  const currentPhase = getCurrentPhase();
  return getPhaseFeatures(currentPhase);
}

/**
 * Checks if a specific feature is enabled in the current phase
 */
export function isFeatureEnabled(featureName: keyof PhaseFeatures): boolean {
  const features = getCurrentPhaseFeatures();
  return features[featureName] as boolean;
}

/**
 * Checks if the current phase matches any of the provided phases
 */
export function isPhaseActive(...phases: HackathonPhase[]): boolean {
  const currentPhase = getCurrentPhase();
  return phases.includes(currentPhase);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Gets the application deadline based on the registration close date
 */
export function getApplicationDeadline(): Date {
  return phaseDates.registrationClose;
}

/**
 * Gets the event start date
 */
export function getEventDate(): Date {
  return phaseDates.eventStart;
}

/**
 * Checks if applications are currently open
 */
export function areApplicationsOpen(): boolean {
  return isPhaseActive("registration-open");
}

/**
 * Checks if the event is currently happening
 */
export function isEventActive(): boolean {
  return isPhaseActive("during-event");
}

/**
 * Checks if the event has concluded
 */
export function isEventConcluded(): boolean {
  return isPhaseActive("post-event");
}

// ============================================================================
// Exports
// ============================================================================

export default {
  phaseDates,
  phaseFeatures,
  getCurrentPhase,
  getPhaseFeatures,
  getCurrentPhaseFeatures,
  isFeatureEnabled,
  isPhaseActive,
  getApplicationDeadline,
  getEventDate,
  areApplicationsOpen,
  isEventActive,
  isEventConcluded,
};
