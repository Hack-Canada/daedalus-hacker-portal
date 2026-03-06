import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/db/queries/user";
import {
  pointsTransactions,
  shopItems,
  ShopPurchase,
  shopPurchases,
  userBalance,
} from "@/lib/db/schema";
import { isOrganizer } from "@/lib/utils";

interface ShopRedeemRequest {
  userId: string;
  itemId: string;
}

const redeemSchema: z.ZodType<ShopRedeemRequest> = z.object({
  userId: z.string().uuid(),
  itemId: z.string().uuid(),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<ShopPurchase>>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !isOrganizer(currentUser.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Only organizers and admins can process shop redemptions",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { userId, itemId } = redeemSchema.parse(body);

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
      const [item] = await tx
        .select()
        .from(shopItems)
        .where(eq(shopItems.id, itemId))
        .for("update");

      if (!item) {
        return NextResponse.json(
          {
            success: false,
            message: "Item not found",
            error: "Invalid item ID",
          },
          { status: 404 },
        );
      }

      if (item.stock !== null && item.stock <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Item is out of stock",
            error: "No stock available",
          },
          { status: 400 },
        );
      }

      const [balance] = await tx
        .select()
        .from(userBalance)
        .where(eq(userBalance.userId, userId));

      const currentPoints = balance?.points ?? 0;

      if (currentPoints < item.purchasePrice) {
        return NextResponse.json(
          {
            success: false,
            message: `Insufficient points. User has ${currentPoints} points but needs ${item.purchasePrice}`,
            error: "Insufficient balance",
          },
          { status: 400 },
        );
      }

      await tx
        .insert(userBalance)
        .values({
          userId,
          points: -item.purchasePrice,
        })
        .onConflictDoUpdate({
          target: userBalance.userId,
          set: {
            points: sql`${userBalance.points} - ${item.purchasePrice}`,
          },
        });

      await tx.insert(pointsTransactions).values({
        userId,
        points: -item.purchasePrice,
        referenceId: itemId,
        metadata: { type: "shop_redemption", itemName: item.itemName },
      });

      if (item.stock !== null) {
        await tx
          .update(shopItems)
          .set({
            stock: sql`${shopItems.stock} - 1`,
          })
          .where(eq(shopItems.id, itemId));
      }

      const [purchase] = await tx
        .insert(shopPurchases)
        .values({
          userId,
          itemId,
          pointsSpent: item.purchasePrice,
        })
        .returning();

      return NextResponse.json({
        success: true,
        message: `Successfully redeemed ${item.itemName} for ${item.purchasePrice} points`,
        data: purchase,
        userName: existingUser.name,
      });
    });
  } catch (error) {
    console.error("Shop redemption error:", error);

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
