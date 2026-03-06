import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getHackerApplicationByUserId } from "@/lib/db/queries/application";
import { getUserById } from "@/lib/db/queries/user";
import { checkIns } from "@/lib/db/schema";
import { isVolunteer } from "@/lib/utils";

export interface UserVerifyData {
  userId: string;
  fullName: string;
  email: string;
  age: number | null;
  isUnder18: boolean;
  hasHackathonCheckIn: boolean;
}

const querySchema = z.object({
  userId: z.string().uuid(),
});

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<UserVerifyData>>> {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is authenticated and has volunteer role
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

    // Get userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const validation = querySchema.safeParse({ userId });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID",
          error: validation.error.errors[0].message,
        },
        { status: 400 },
      );
    }

    const validUserId = validation.data.userId;

    // Fetch user details
    const user = await getUserById(validUserId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          error: "Invalid user ID",
        },
        { status: 404 },
      );
    }

    // Fetch hacker application for age
    const application = await getHackerApplicationByUserId(validUserId);

    // Check if user already has hackathon check-in
    const existingCheckIn = await db.query.checkIns.findFirst({
      where: eq(checkIns.userId, validUserId),
    });
    const hasHackathonCheckIn = existingCheckIn?.eventName === "hackathon-check-in";

    const age = application?.age ?? null;
    const isUnder18 = age !== null && age < 18;

    const verifyData: UserVerifyData = {
      userId: validUserId,
      fullName: user.name || "Unknown",
      email: user.email || "No email",
      age,
      isUnder18,
      hasHackathonCheckIn,
    };

    return NextResponse.json({
      success: true,
      message: "User details retrieved",
      data: verifyData,
    });
  } catch (error) {
    console.error("Verify error:", error);

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
