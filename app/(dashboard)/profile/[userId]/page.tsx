import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { getProfileWithUser } from "@/lib/db/queries/profile";
import { challenges, challengesSubmitted, rsvp } from "@/lib/db/schema";
import { isOrganizer } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import { EmergencyContacts } from "@/components/profile/EmergencyContacts";
import { ProfileAskMeAbout } from "@/components/profile/ProfileAskMeAbout";
import { ProfileChallengePoints } from "@/components/profile/ProfileChallengePoints";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileHobbies } from "@/components/profile/ProfileHobbies";
import { ProfileSkills } from "@/components/profile/ProfileSkills";
import { SocialLinkCard } from "@/components/profile/SocialLinkCard";

export default async function ProfilePage(
  props: {
    params: Promise<{ userId: string }>;
  }
) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const profile = await getProfileWithUser(params.userId);

  let emergencyContactInfo: {
    name: string;
    phone: string;
    relation: string;
  } | null = null;

  if (currentUser?.id && isOrganizer(currentUser?.role)) {
    const result = await db
      .select({
        name: rsvp.emergencyContactName,
        phone: rsvp.emergencyContactPhoneNumber,
        relation: rsvp.relationshipToParticipant,
      })
      .from(rsvp)
      .where(eq(rsvp.userId, params.userId))
      .limit(1);

    if (result.length > 0) {
      emergencyContactInfo = result[0];
    }
  }

  const challengeStats = await db
    .select({
      totalPoints: sql<number>`COALESCE(SUM(${challenges.points}), 0)`,
      completedCount: sql<number>`COUNT(${challengesSubmitted.id})`,
    })
    .from(challengesSubmitted)
    .innerJoin(challenges, eq(challengesSubmitted.challengeId, challenges.id))
    .where(eq(challengesSubmitted.userId, params.userId))
    .then((res) => res[0] || { totalPoints: 0, completedCount: 0 });

  if (!profile?.id) {
    if (currentUser?.role === "unassigned") {
      return (
        <EmptyPage
          title="Unauthorized"
          message="This feature is only available to participants."
        />
      );
    }

    if (currentUser?.id === params.userId) {
      redirect("/profile/edit");
    }

    return (
      <EmptyPage
        title="Profile Not Found"
        message="This user has not created a profile yet."
      />
    );
  }

  const isOwner = currentUser?.id === profile.user.id;

  return (
    <PageWrapper>
      <div className="relative space-y-3">
        <ProfileHeader
          name={profile.user.name.split(" ")[0]}
          role={profile.user.role}
          bio={profile.bio}
          isOwner={isOwner}
        />

        <div className="space-y-3">
          {/* Ask Me About - Conversation Starter */}
          {profile.askMeAbout && (
            <ProfileAskMeAbout topic={profile.askMeAbout} />
          )}

          {/* Challenge Points Display */}
          {challengeStats.completedCount > 0 && (
            <ProfileChallengePoints
              points={challengeStats.totalPoints}
              completedCount={challengeStats.completedCount}
            />
          )}

          {/* Skills & Tech Stack */}
          {profile.skills && profile.skills.length > 0 && (
            <ProfileSkills skills={profile.skills} />
          )}

          {/* Hobbies & Interests */}
          {profile.hobbies && <ProfileHobbies hobbies={profile.hobbies} />}

          {/* Social Links Card */}
          {profile.integrations.length > 0 && (
            <SocialLinkCard integrations={profile.integrations} />
          )}
        </div>

        {/* Emergency Contact Info */}
        {isOrganizer(currentUser?.role as UserRole) && emergencyContactInfo && (
          <EmergencyContacts contact={emergencyContactInfo} />
        )}
        <BackButton />
      </div>
    </PageWrapper>
  );
}
