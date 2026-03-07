import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import {
  PointsTransaction,
  pointsTransactions,
  userBalance,
} from "@/lib/db/schema";
import { isOrganizer } from "@/lib/utils";

const adjustSchema = z.object({
  userId: z.string().uuid(),
  points: z.number().int().min(-500).max(500).refine((v) => v !== 0, {
    message: "Points cannot be zero",
  }),
  reason: z.string().max(200).optional(),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<PointsTransaction>>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !isOrganizer(currentUser.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Only organizers and admins can adjust points",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { userId, points, reason } = adjustSchema.parse(body);

    const targetUser = await getUserById(userId);

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          error: "Invalid user ID",
        },
        { status: 404 },
      );
    }

    if (targetUser.role === "unassigned") {
      return NextResponse.json(
        {
          success: false,
          message: "User does not have an assigned role",
          error: "Invalid user role",
        },
        { status: 400 },
      );
    }

    return await db.transaction(async (tx) => {
      // When removing points, check the user has enough
      if (points < 0) {
        const [balance] = await tx
          .select()
          .from(userBalance)
          .where(eq(userBalance.userId, userId));

        const currentPoints = balance?.points ?? 0;

        if (currentPoints + points < 0) {
          return NextResponse.json(
            {
              success: false,
              message: `Cannot remove ${Math.abs(points)} points. User only has ${currentPoints}`,
              error: "Insufficient balance",
            },
            { status: 400 },
          );
        }
      }

      // Upsert balance
      await tx
        .insert(userBalance)
        .values({ userId, points })
        .onConflictDoUpdate({
          target: userBalance.userId,
          set: {
            points: sql`${userBalance.points} + ${points}`,
          },
        });

      // Log the transaction
      const [transaction] = await tx
        .insert(pointsTransactions)
        .values({
          userId,
          points,
          referenceId: currentUser.id,
          metadata: {
            type: "front_desk_adjustment",
            reason: reason || "Added via front desk",
            adjustedBy: currentUser.name || currentUser.id,
          },
        })
        .returning();

      const action = points > 0 ? "Added" : "Removed";
      const absPoints = Math.abs(points);

      return NextResponse.json({
        success: true,
        message: `${action} ${absPoints} points ${points > 0 ? "to" : "from"} ${targetUser.name}`,
        data: transaction,
        userName: targetUser.name,
      });
    });
  } catch (error) {
    console.error("Points adjustment error:", error);

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
