// app/challenges/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { db } from "@/lib/db";
import { challenges } from "@/lib/db/schema";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { ChallengesDataTable } from "@/components/challenges/ChallengeDataTable";
import { EmptyPage } from "@/components/EmptyPage";

import { columns } from "./columns";

export default async function ChallengesPage() {
  const currentUser = await getCurrentUser();

  const challenges_data = await db.select().from(challenges);

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="QR Code Page"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  return (
    <main className="container space-y-8 py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Challenges</h1>
        <p className="text-sm text-muted-foreground">
          Browse, sort, and filter challenges. Click a card to view full details
          and submission steps.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">List view</h2>
        <ChallengesDataTable
          columns={columns}
          data={challenges_data}
          user={currentUser}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Card view</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challenges_data.map((challenge) => (
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
