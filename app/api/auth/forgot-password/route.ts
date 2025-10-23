import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { passwordResetTokens } from "@/lib/db/schema";
import { sendResetPasswordEmail } from "@/lib/emails/ses";
import { ForgotPasswordSchema } from "@/lib/validations/forgot-password";

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 2;

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const validatedFields = ForgotPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to the email if an account is registered under it.",
      });
    }

    const { email: validatedEmail } = validatedFields.data;

    const email = validatedEmail.toLowerCase();

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to the email if an account is registered under it.",
      });
    }

    // Check for existing token before starting transaction
    const [existingToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.userId, existingUser.id));

    if (existingToken) {
      const tokenAge = new Date().getTime() - existingToken.createdAt.getTime();

      if (tokenAge < TOKEN_EXPIRATION_TIME) {
        return NextResponse.json({
          success: false,
          message:
            "A password reset link was already sent recently. Please check your email.",
        });
      }

      // Delete expired token
      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    }

    await db.transaction(async (tx) => {
      // Generate a UUID for the reset token
      const token = crypto.randomUUID();

      // Create a new password reset token
      await tx.insert(passwordResetTokens).values({
        token,
        userId: existingUser.id,
        createdAt: new Date(),
      });

      const emailResult = await sendResetPasswordEmail({
        name: existingUser.name,
        email: existingUser.email,
        subject: "Reset your Hack Canada password",
        token,
      });

      if (!emailResult.success) {
        throw new Error("Failed to send reset password email");
      }
    });

    return NextResponse.json({
      success: true,
      message: "A password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Error during password reset request:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
