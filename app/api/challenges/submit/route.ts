import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import {
  auditLogs,
  challengesSubmitted,
  ChallengeSubmission,
} from "@/lib/db/schema";
import { isVolunteer } from "@/lib/utils";

interface ChallengeSubmissionRequest {
  userId: string;
  challengeId: string;
}

// Validate request body
const checkInSchema: z.ZodType<ChallengeSubmissionRequest> = z.object({
  userId: z.string().uuid(),
  challengeId: z.string().uuid(),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<ChallengeSubmission>>> {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is authenticated and has admin/organizer role
    if (!currentUser?.id || !isVolunteer(currentUser.role)) {
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
    const { userId, challengeId } = checkInSchema.parse(body);

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
        entityType: "challenge_submission",
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

    // Get all check-ins for the user
    const userChallengeSubmissions =
      await db.query.challengesSubmitted.findMany({
        where: eq(challengesSubmitted.userId, userId),
        orderBy: (challengeSubmission, { desc }) => [
          desc(challengeSubmission.submittedAt),
        ],
      });

    // Check if user has already checked in for this event using the fetched data
    const alreadySubmitted = userChallengeSubmissions.find(
      (submission) => submission.challengeId === challengeId,
    );

    if (alreadySubmitted) {
      return NextResponse.json(
        {
          success: false,
          message: "User already checked in for this event",
          error: "Duplicate check-in",
          data: alreadySubmitted,
        },
        { status: 400 },
      );
    }

    // Create new check-in
    const [newChallengeSubmission] = await db
      .insert(challengesSubmitted)
      .values({
        userId,
        challengeId,
      })
      .returning();

    // Get updated check-ins including the new one

    return NextResponse.json({
      success: true,
      message: "Check-in successful",
      data: newChallengeSubmission,
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
