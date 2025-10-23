import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { passwordResetTokens, users } from "@/lib/db/schema";
import { ResetPasswordSchema } from "@/lib/validations/reset-password";

const RESET_TOKEN_EXPIRY = 60 * 60 * 1000; // 60 minutes in milliseconds

/**
 * Validates and retrieves the user ID associated with a reset token
 */
async function validateResetToken(token: string): Promise<string | null> {
  const results = await db
    .select({ userId: passwordResetTokens.userId })
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, token),
        gt(
          passwordResetTokens.createdAt,
          new Date(Date.now() - RESET_TOKEN_EXPIRY),
        ),
      ),
    );

  return results[0]?.userId ?? null;
}

/**
 * Updates the user's password and deletes the used token
 */
async function updatePasswordAndDeleteToken(
  userId: string,
  token: string,
  hashedPassword: string,
): Promise<void> {
  await db.transaction(async (tx) => {
    // Update user's password
    await tx
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));

    // Delete the used token
    await tx
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
  });
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const validatedFields = ResetPasswordSchema.safeParse(body);
    if (!validatedFields.success) {
      console.error(
        "Error occurred while validating fields",
        validatedFields.error,
      );

      const errorMessage = "Invalid password type or token provided.";

      return NextResponse.json({
        success: false,
        message: errorMessage,
      });
    }

    const { password, token } = validatedFields.data;

    // Validate reset token and get associated user ID
    const userId = await validateResetToken(token);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message:
          "Invalid or expired reset token. Please request a new password reset.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password and delete the used token
    await updatePasswordAndDeleteToken(userId, token, hashedPassword);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error("Password reset error:", error);

    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
