import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { EVENTS, type Event } from "@/config/qr-code";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import { auditLogs, checkIns, type CheckIn } from "@/lib/db/schema";
import { isVolunteer } from "@/lib/utils";

interface CheckInRequest {
  userId: string;
  eventName: Event;
}

// Validate request body
const checkInSchema: z.ZodType<CheckInRequest> = z.object({
  userId: z.string().uuid(),
  eventName: z.enum(EVENTS),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<CheckIn[]>>> {
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
    const { userId, eventName } = checkInSchema.parse(body);

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
        entityType: "check_in",
        entityId: existingUser.id,
        metadata: JSON.stringify({
          eventName,
          description: `${existingUser.name.split(" ")[0]} tried to check in for ${eventName}`,
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
    const userCheckIns = await db.query.checkIns.findMany({
      where: eq(checkIns.userId, userId),
      orderBy: (checkIns, { desc }) => [desc(checkIns.createdAt)],
    });

    // Check if user has already checked in for this event using the fetched data
    const alreadyCheckedIn = userCheckIns.some(
      (checkIn) => checkIn.eventName === eventName,
    );

    if (alreadyCheckedIn) {
      return NextResponse.json(
        {
          success: false,
          message: "User already checked in for this event",
          error: "Duplicate check-in",
          data: userCheckIns,
        },
        { status: 400 },
      );
    }

    // Create new check-in
    const [newCheckIn] = await db
      .insert(checkIns)
      .values({
        userId,
        eventName,
      })
      .returning();

    // Get updated check-ins including the new one
    const updatedCheckIns = [...userCheckIns, newCheckIn];

    return NextResponse.json({
      success: true,
      message: "Check-in successful",
      data: updatedCheckIns,
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

/* DELETE ROUTE */

interface ResetEventRequest {
  userId: string;
  eventName: Event;
}

// Validate request body
const resetEventSchema: z.ZodType<ResetEventRequest> = z.object({
  userId: z.string().uuid(),
  eventName: z.enum(EVENTS),
});

export async function DELETE(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<CheckIn>>> {
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
    const { userId, eventName } = resetEventSchema.parse(body);

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
        action: "delete",
        entityType: "check_in",
        entityId: existingUser.id,
        metadata: JSON.stringify({
          eventName,
          description: `${existingUser.name.split(" ")[0]} tried to reset event for ${eventName}`,
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

    // Check if user has already checked in for this event
    const existingCheckIn = await db.query.checkIns.findFirst({
      where: and(
        eq(checkIns.userId, userId),
        eq(checkIns.eventName, eventName),
      ),
    });

    if (!existingCheckIn) {
      return NextResponse.json(
        {
          success: false,
          message: "User has not checked in for this event",
          error: "No check-in found",
        },
        { status: 400 },
      );
    }

    // Delete the check-in
    await db
      .delete(checkIns)
      .where(
        and(eq(checkIns.userId, userId), eq(checkIns.eventName, eventName)),
      );

    return NextResponse.json({
      success: true,
      message: "Event reset successful",
    });
  } catch (error) {
    console.error("Event reset error:", error);

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
