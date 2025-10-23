import { and, eq, gt, lt } from "drizzle-orm";

import { db } from "..";
import { generateRandomCode } from "../../utils";
import { emailVerificationTokens } from "../schema";

export async function createVerificationToken(email: string, tx?: any) {
  const verificationCode = generateRandomCode(6);

  const now = new Date();

  let tokenId = "";

  if (!tx) {
    const [token] = await db
      .insert(emailVerificationTokens)
      .values({
        email,
        code: verificationCode,
        createdAt: now,
        expires: new Date(now.getTime() + 1000 * 60 * 60), // 60 minutes
      })
      .returning({ id: emailVerificationTokens.id });

    tokenId = token.id;
  } else {
    const [token] = await tx
      .insert(emailVerificationTokens)
      .values({
        email,
        code: verificationCode,
        createdAt: now,
        expires: new Date(now.getTime() + 1000 * 60 * 60), // 60 minutes
      })
      .returning({ id: emailVerificationTokens.id });

    tokenId = token.id;
  }

  return { tokenId, code: verificationCode };
}

export async function getVerificationTokenByEmail(email: string) {
  const tokens = await db
    .select()
    .from(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.email, email),
        gt(emailVerificationTokens.expires, new Date()),
      ),
    );
  return tokens;
}

export async function getVerificationTokenById(id: string, tx?: any) {
  if (!tx) {
    const token = await db
      .select()
      .from(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.id, id),
          gt(emailVerificationTokens.expires, new Date()),
        ),
      );

    return token[0];
  } else {
    const token = await tx
      .select()
      .from(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.id, id),
          gt(emailVerificationTokens.expires, new Date()),
        ),
      );

    return token[0];
  }
}

export async function deleteExpiredTokens(email: string) {
  return await db
    .delete(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.email, email),
        lt(emailVerificationTokens.expires, new Date()),
      ),
    );
}

export async function deleteVerificationTokenById(id: string, tx?: any) {
  if (!tx) {
    return await db
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.id, id));
  } else {
    return await tx
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.id, id));
  }
}
