import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { hackerApplications, users } from "@/lib/db/schema";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to restore your RSVP.",
      });
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    if (currentUser.id !== userId) {
      return NextResponse.json({
        success: false,
        message: "You can only restore your own RSVP.",
      });
    }

    if (currentUser.status !== "cancelled") {
      return NextResponse.json({
        success: false,
        message:
          "You can only restore RSVP if you have previously cancelled it.",
      });
    }

    // Update user status back to accepted
    await db.transaction(async (tx) => {
      if (!currentUser.id) {
        throw new Error("User not found");
      }

      await tx
        .update(users)
        .set({
          applicationStatus: "accepted",
        })
        .where(eq(users.id, currentUser.id));

      await tx
        .update(hackerApplications)
        .set({
          internalResult: "accepted",
        })
        .where(eq(hackerApplications.userId, currentUser.id));
    });

    return NextResponse.json({
      success: true,
      message:
        "RSVP restored successfully! Please complete your RSVP to secure your spot.",
    });
  } catch (error) {
    console.error("Error restoring RSVP:", error);
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to restore RSVP. Please try again later or contact us.",
    });
  }
}
