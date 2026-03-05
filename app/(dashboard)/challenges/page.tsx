// app/challenges/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { and, eq, gte, isNull, or, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  Challenge,
  challenges,
  challengesInProgress,
  challengesSubmitted,
} from "@/lib/db/schema";
import { BackButton } from "@/components/ui/back-button";
import { ChallengeGrid } from "@/components/challenges/ChallengeGrid";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";

export type ChallengeStatus =
  | "completed"
  | "in_progress"
  | "not_started"
  | "deadline_passed"
  | "not_yet_available";

export type ChallengeWithStatus = Challenge & {
  status: ChallengeStatus;
};

export default async function ChallengesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  // Determine user's application status to block if needed
  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Challenges"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  // Fetch all challenges which are enabled
  // And fetch this user's submissions to determine status

  const [challengesData, submissions, inProgress] = await Promise.all([
    db
      .select()
      .from(challenges)
      .where(
        and(
          eq(challenges.enabled, true),
          or(
            gte(sql`CURRENT_TIMESTAMP`, challenges.showTime),
            isNull(challenges.showTime),
          ),
        ),
      ),
    db
      .select()
      .from(challengesSubmitted)
      .where(eq(challengesSubmitted.userId, currentUser.id)),
    db
      .select()
      .from(challengesInProgress)
      .where(eq(challengesInProgress.userId, currentUser.id)),
  ]);

  const completedSet = new Set(submissions.map((s) => s.challengeId));
  const progressSet = new Set(inProgress.map((s) => s.challengeId));

  // Augment challenges with status
  const now = new Date();
  const challengesWithStatus: ChallengeWithStatus[] = challengesData.map(
    (c) => {
      let status: ChallengeStatus;
      if (completedSet.has(c.id)) {
        status = "completed";
      } else if (c.deadlineEnd && now > c.deadlineEnd) {
        status = "deadline_passed";
      } else if (c.deadlineStart && now < c.deadlineStart) {
        status = "not_yet_available";
      } else if (progressSet.has(c.id)) {
        status = "in_progress";
      } else {
        status = "not_started";
      }

      return {
        ...c,
        status,
      };
    },
  );

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="w-fit bg-linear-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Challenges</h1>
          </div>
          <p className="text-textMuted max-md:text-sm">
            Complete challenges to earn points and unlock rewards. Click a card
            to view full details and submission steps.
          </p>
        </div>

        {/* Challenge Grid */}
        <ChallengeGrid
          challenges={challengesWithStatus}
          currentUser={currentUser}
        />

        <BackButton />
      </div>
    </PageWrapper>
  );
}
