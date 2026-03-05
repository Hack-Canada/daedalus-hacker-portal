"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Challenge } from "@/lib/db/schema";
import { ChallengeWithStatus } from "@/app/(dashboard)/challenges/page";

import { ChallengeCard } from "./ChallengeCard";

export function ChallengeGrid({
  challenges,
  currentUser,
}: {
  challenges: ChallengeWithStatus[];
  currentUser: User;
}) {
  const [clientChallenges, setClientChallenges] =
    useState<ChallengeWithStatus[]>(challenges);

  // Filter out challenges that cannot be acted upon
  const actionableChallenges = useMemo(
    () =>
      clientChallenges.filter(
        (c) => c.status !== "not_yet_available" && c.status !== "deadline_passed"
      ),
    [clientChallenges]
  );

  // Higher number means appears first
  const priority: { [key: string]: number } = {
    in_progress: 2, // Show in-progress challenges first
    not_started: 1, // Then challenges that can be started
    completed: 0,   // Show completed challenges last
  };

  const sortedChallenges = useMemo(
    () =>
      [...actionableChallenges].sort(
        (a, b) => priority[b.status] - priority[a.status],
      ),
    [actionableChallenges],
  );

  const onStartChallenge = async (challenge: ChallengeWithStatus) => {
    const response = await fetch("/api/challenges/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
        challengeId: challenge.id,
      }),
    });

    if (!response.ok) {
      toast.error("Error syncing challenge start");
      return;
    }

    setClientChallenges((prev) =>
      prev.map((c) =>
        c.id === challenge.id ? { ...c, status: "in_progress" } : c,
      ),
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          user={currentUser}
          onStartChallenge={onStartChallenge}
        />
      ))}
    </div>
  );
}
