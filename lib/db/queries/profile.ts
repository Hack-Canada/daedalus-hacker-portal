import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { profileIntegrations, profiles, users } from "@/lib/db/schema";
import { Platform, ProfileFormData } from "@/lib/validations/profile";

export type ProfileWithUser = {
  id: string;
  bio: string | null;
  hobbies: string | null;
  integrations: {
    platform: Platform;
    url: string;
  }[];
  user: {
    id: string;
    name: string;
    role: string;
  };
};

export async function getProfileWithUser(
  userId: string,
): Promise<ProfileWithUser | null> {
  try {
    const profileResults = await db
      .select({
        id: profiles.id,
        bio: profiles.bio,
        hobbies: profiles.hobbies,
        user: {
          id: users.id,
          name: users.name,
          role: users.role,
        },
      })
      .from(profiles)
      .innerJoin(users, eq(profiles.userId, users.id))
      .where(eq(profiles.userId, userId))
      .execute();

    if (!profileResults[0]) return null;

    const integrationResults = await db
      .select({
        platform: profileIntegrations.platform,
        url: profileIntegrations.url,
      })
      .from(profileIntegrations)
      .where(eq(profileIntegrations.profileId, profileResults[0].id))
      .execute();

    return {
      ...profileResults[0],
      integrations: integrationResults as {
        platform: Platform;
        url: string;
      }[],
    };
  } catch (error) {
    console.error("Error getting profile with user", error);
    return null;
  }
}

export async function upsertProfile(userId: string, data: ProfileFormData) {
  // Start a transaction to handle both profile and integrations
  return await db.transaction(async (tx) => {
    // Insert or update profile first
    const profileResult = await tx
      .insert(profiles)
      .values({
        userId,
        bio: data.bio,
        hobbies: data.hobbies,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: {
          bio: data.bio,
          hobbies: data.hobbies,
          updatedAt: new Date(),
        },
      })
      .returning();

    const profile = profileResult[0];

    // Delete existing integrations for this profile
    await tx
      .delete(profileIntegrations)
      .where(eq(profileIntegrations.profileId, profile.id));

    // Insert new integrations
    if (data.integrations.length > 0) {
      await tx.insert(profileIntegrations).values(
        data.integrations.map((integration) => ({
          profileId: profile.id,
          platform: integration.platform,
          url: integration.url,
        })),
      );
    }
  });
}
