// app/challenges/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  Challenge,
  challenges,
  challengesInProgress,
  challengesSubmitted,
} from "@/lib/db/schema";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { ChallengeGrid } from "@/components/challenges/ChallengeGrid";
import { EmptyPage } from "@/components/EmptyPage";

export type ChallengeStatus = "completed" | "in_progress" | "not_started";
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
    db.select().from(challenges).where(eq(challenges.enabled, true)),
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
  const challengesWithStatus: ChallengeWithStatus[] = challengesData.map(
    (c) => {
      let status: ChallengeStatus;
      if (completedSet.has(c.id)) {
        status = "completed";
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
    <main className="container space-y-8 py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Challenges</h1>
        <p className="text-muted-foreground text-sm">
          Browse, sort, and filter challenges. Click a card to view full details
          and submission steps.
        </p>
      </section>

      <section className="space-y-4">
        <ChallengeGrid
          challenges={challengesWithStatus}
          currentUser={currentUser}
        />
      </section>
    </main>
  );
}
