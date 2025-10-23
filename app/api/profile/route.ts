import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";

import { ApiResponse } from "@/types/api";
import { upsertProfile } from "@/lib/db/queries/profile";
import { profileSchema } from "@/lib/validations/profile";

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(userId);

  if (!userRequests || now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(userId, { count: 1, timestamp: now });
    return false;
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userRequests.count += 1;
  return false;
}

export async function PUT(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Authentication required",
          error: "Please sign in to update your profile",
        },
        { status: 401 },
      );
    }

    // Rate limiting check
    if (isRateLimited(user.id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Too many requests",
          error: "Please wait a minute before trying again",
        },
        { status: 429 },
      );
    }

    if (user.role === "unassigned") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "You don't have permission to update your profile",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    // Validate request body
    const validatedFields = profileSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid profile data",
          error: "Validation failed",
        },
        { status: 400 },
      );
    }

    // Create/Update the profile
    await upsertProfile(user.id, validatedFields.data);
    revalidatePath("/profile/edit");

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("[PROFILE_UPDATE]", error);

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("duplicate key")) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            message: "Profile update failed",
            error: "A profile already exists for this user",
          },
          { status: 409 },
        );
      }

      if (error.message.includes("foreign key")) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            message: "Profile update failed",
            error: "Invalid user reference",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
