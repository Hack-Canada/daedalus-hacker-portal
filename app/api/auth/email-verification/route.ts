import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  deleteVerificationTokenById,
  getVerificationTokenById,
} from "@/lib/db/queries/email-verification-tokens";
import { users } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { code, token } = await request.json();

    if (!code || !token) {
      return NextResponse.json({ error: "Code and token are required" });
    }

    // Use transaction for atomic operations
    await db.transaction(async (tx) => {
      // Find the email verification token
      const verificationToken = await getVerificationTokenById(token, tx);

      if (!verificationToken) {
        throw new Error("Invalid or expired token");
      }

      // Verify the code
      if (verificationToken.code !== code) {
        throw new Error("Invalid verification code");
      }

      // Update user's email verification status
      await tx
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.email, verificationToken.email));

      // Delete the email verification token
      await deleteVerificationTokenById(token, tx);
    });

    return NextResponse.json(
      { message: "Email verified successfully. Please sign in." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 },
    );
  }
}
