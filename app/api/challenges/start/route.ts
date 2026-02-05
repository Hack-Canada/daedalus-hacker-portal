import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { and, count, eq, sql } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import {
  auditLogs,
  ChallengeInProgress,
  challengesInProgress,
} from "@/lib/db/schema";

interface ChallengeStartRequest {
  userId: string;
  challengeId: string;
}

// Validate request body
const challengeSchema: z.ZodType<ChallengeStartRequest> = z.object({
  userId: z.string().uuid(),
  challengeId: z.string().uuid(),
});

// TODO: Add verification for wether or not the challenge has fallen into deadlines (doesn't affect anything besides perhaps skewing user stats)
export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<ChallengeInProgress>>> {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is authenticated
    if (!currentUser?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Insufficient permissions",
        },
        { status: 401 },
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const { userId, challengeId } = challengeSchema.parse(body);

    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          error: "Invalid user ID",
        },
        { status: 404 },
      );
    }

    if (existingUser.role === "unassigned") {
      // Log the action to report the user
      await db.insert(auditLogs).values({
        userId: currentUser.id,
        action: "create",
        entityType: "challenge_start",
        entityId: existingUser.id,
        metadata: JSON.stringify({
          description: `${existingUser.name.split(" ")[0]} tried to submit a challenge submssion for ${challengeId}`,
          issue: "User does not have an assigned role",
        }),
      });

      return NextResponse.json(
        {
          success: false,
          message: "User does not have an assigned role",
          error: "Invalid user role",
        },
        { status: 400 },
      );
    }

    const submission = await db
      .insert(challengesInProgress)
      .values({
        userId: existingUser.id,
        challengeId: challengeId,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "cool!",
      data: submission[0],
      userName: existingUser.name,
    });
  } catch (error) {
    console.error("Check-in error:", error);

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
