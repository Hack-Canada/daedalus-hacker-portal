// app/challenges/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { challenges, challengesSubmitted } from "@/lib/db/schema";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { EmptyPage } from "@/components/EmptyPage";

export default async function ChallengesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  // Fetch all challenges which are enabled
  // And fetch this user's submissions to determine status

  const [challengesData, submissions] = await Promise.all([
    db.select().from(challenges).where(eq(challenges.enabled, true)),
    db
      .select()
      .from(challengesSubmitted)
      .where(eq(challengesSubmitted.userId, currentUser.id)),
  ]);

  const completedMap = new Set(submissions.map((s) => s.challengeId));

  // Determine user's application status to block if needed
  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Challenges"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  // Augment challenges with status
  const challengesWithStatus = challengesData.map((c) => ({
    ...c,
    status: completedMap.has(c.id) ? "completed" : "not_started",
  }));

  // Note: Not sure what the in_progress status should be, so I've dropped it

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challengesWithStatus.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              user={currentUser}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
