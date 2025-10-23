import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { hackerApplications, rsvp, users } from "@/lib/db/schema";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to cancel your RSVP.",
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
        message: "You can only cancel your own RSVP.",
      });
    }

    if (currentUser.status !== "accepted") {
      return NextResponse.json({
        success: false,
        message: "You must have been accepted to cancel your acceptance.",
      });
    }

    // Update user status
    await db.transaction(async (tx) => {
      if (!currentUser.id) {
        throw new Error("User not found");
      }

      await tx
        .update(users)
        .set({
          role: "unassigned",
          rsvpAt: new Date(0), // Set to Unix epoch time
          applicationStatus: "cancelled",
        })
        .where(eq(users.id, currentUser.id));

      await tx
        .update(hackerApplications)
        .set({
          internalResult: "cancelled",
        })
        .where(eq(hackerApplications.userId, currentUser.id));

      // Delete rsvp info
      await tx.delete(rsvp).where(eq(rsvp.userId, currentUser.id));
    });

    return NextResponse.json({
      success: true,
      message: "RSVP cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling RSVP:", error);
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to cancel. Please try again later or contact us.",
    });
  }
}
