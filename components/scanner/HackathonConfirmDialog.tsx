"use client";

import { AlertTriangle, CheckCircle2, Mail, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserVerifyData } from "@/app/api/check-ins/verify/route";

interface HackathonConfirmDialogProps {
  userData: UserVerifyData;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function HackathonConfirmDialog({
  userData,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: HackathonConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-lg border border-primary/25 bg-background p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-textSecondary hover:text-textPrimary transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-textPrimary">
            Confirm Hackathon Check-In
          </h2>
          <p className="mt-1 text-sm text-textSecondary">
            Please verify participant identity with government ID
          </p>
        </div>

        {/* User Details */}
        <div className="space-y-4 rounded-lg border border-primary/10 bg-primary/5 p-4">
          {/* Full Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">Full Name</p>
              <p className="text-lg font-semibold text-textPrimary">
                {userData.fullName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">Email</p>
              <p className="text-base text-textPrimary">{userData.email}</p>
            </div>
          </div>

          {/* Age with Under-18 Warning */}
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                userData.isUnder18 ? "bg-amber-500/20" : "bg-primary/20",
              )}
            >
              {userData.isUnder18 ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : (
                <User className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">Age</p>
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "text-lg font-semibold",
                    userData.isUnder18 ? "text-amber-600" : "text-textPrimary",
                  )}
                >
                  {userData.age !== null ? userData.age : "Unknown"}
                </p>
                {userData.isUnder18 && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-600">
                    Minor
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Under-18 Warning */}
        {userData.isUnder18 && (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="font-semibold text-amber-600">
                  Parental Consent Required
                </p>
                <p className="mt-1 text-sm text-amber-600/80">
                  This participant is under 18 years old. Please verify that
                  they have a signed parental consent form before proceeding
                  with check-in.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-primary/25 px-4 py-2.5 font-medium text-textPrimary transition hover:bg-primary/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-medium text-white transition hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? "Checking in..." : "Confirm Check-In"}
          </button>
        </div>
      </div>
    </div>
  );
}
