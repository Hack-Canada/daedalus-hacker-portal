import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq, sql, and, count } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import {
  pointsBannedUsers,
  pointsTransactions,
  profileVisits,
  userBalance,
} from "@/lib/db/schema";

const VISITS_PER_POINT = 4;

const visitSchema = z.object({
  visitedUserId: z.string().uuid(),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<{ newVisit: boolean; totalVisits: number; pointsAwarded: number }>>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Not authenticated",
        },
        { status: 401 },
      );
    }

    // Only hackers can earn profile visit rewards
    if (currentUser.role !== "hacker") {
      return NextResponse.json(
        {
          success: false,
          message: "Only hackers can earn profile visit rewards",
          error: "Invalid role",
        },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { visitedUserId } = visitSchema.parse(body);

    // Can't visit your own profile for rewards
    if (currentUser.id === visitedUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot earn rewards for visiting your own profile",
          error: "Self-visit not allowed",
        },
        { status: 400 },
      );
    }

    // Check if visited user exists and is a hacker
    const visitedUser = await getUserById(visitedUserId);
    if (!visitedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          error: "Invalid user ID",
        },
        { status: 404 },
      );
    }

    if (visitedUser.role !== "hacker") {
      return NextResponse.json(
        {
          success: false,
          message: "Can only earn rewards for visiting hacker profiles",
          error: "Invalid target role",
        },
        { status: 400 },
      );
    }

    // Check if visitor is banned from earning points
    const [banned] = await db
      .select()
      .from(pointsBannedUsers)
      .where(eq(pointsBannedUsers.userId, currentUser.id));

    if (banned) {
      return NextResponse.json(
        {
          success: false,
          message: "You are banned from earning points",
          error: "User banned",
        },
        { status: 403 },
      );
    }

    // Check if already visited this profile
    const [existingVisit] = await db
      .select()
      .from(profileVisits)
      .where(
        and(
          eq(profileVisits.visitorId, currentUser.id),
          eq(profileVisits.visitedUserId, visitedUserId),
        ),
      );

    if (existingVisit) {
      // Already visited, get current count
      const [visitCount] = await db
        .select({ count: count() })
        .from(profileVisits)
        .where(eq(profileVisits.visitorId, currentUser.id));

      return NextResponse.json({
        success: true,
        message: "Profile already visited",
        data: {
          newVisit: false,
          totalVisits: visitCount.count,
          pointsAwarded: 0,
        },
      });
    }

    // Record new visit and potentially award points
    return await db.transaction(async (tx) => {
      // Insert the new visit
      await tx.insert(profileVisits).values({
        visitorId: currentUser.id,
        visitedUserId,
      });

      // Get new total count
      const [visitCount] = await tx
        .select({ count: count() })
        .from(profileVisits)
        .where(eq(profileVisits.visitorId, currentUser.id));

      const totalVisits = visitCount.count;
      let pointsAwarded = 0;

      // Award 1 point for every VISITS_PER_POINT visits
      if (totalVisits % VISITS_PER_POINT === 0) {
        pointsAwarded = 1;

        // Update user balance
        await tx
          .insert(userBalance)
          .values({
            userId: currentUser.id,
            points: 1,
          })
          .onConflictDoUpdate({
            target: userBalance.userId,
            set: {
              points: sql`${userBalance.points} + 1`,
            },
          });

        // Log the transaction
        await tx.insert(pointsTransactions).values({
          userId: currentUser.id,
          points: 1,
          referenceId: visitedUserId,
          metadata: {
            type: "profile_visit_reward",
            visitCount: totalVisits,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: pointsAwarded > 0
          ? `Profile visit recorded! You earned ${pointsAwarded} point for visiting ${VISITS_PER_POINT} profiles!`
          : `Profile visit recorded! Visit ${VISITS_PER_POINT - (totalVisits % VISITS_PER_POINT)} more profiles to earn a point.`,
        data: {
          newVisit: true,
          totalVisits,
          pointsAwarded,
        },
      });
    });
  } catch (error) {
    console.error("Profile visit error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          error: error.errors[0].message,
        },
        { status: 400 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
