import { cache } from "react";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
} from "./lib/db/queries/email-verification-tokens";
import { getUserById } from "./lib/db/queries/user";
import { sendWelcomeEmail } from "./lib/emails/ses";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      status: ApplicationStatus;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user }): Promise<boolean | string> {
      if (!user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.email) {
        return false;
      }

      // Check email verification status after successful authentication
      if (!existingUser.emailVerified) {
        // Check for existing verification token
        const [existingToken] = await getVerificationTokenByEmail(
          existingUser.email,
        );

        if (existingToken) {
          return `/email-verification?token=${existingToken.id}`;
        }

        // No valid token exists - create a new one
        const { tokenId, code } = await createVerificationToken(
          existingUser.email,
        );

        const result = await sendWelcomeEmail({
          name: existingUser.name,
          email: existingUser.email,
          subject: "Verify your email address for Hack Canada",
          token: tokenId,
          verificationCode: code,
        });

        if (!result.success) {
          console.error("Error sending verification email:", result.error);
          return "Failed to send verification email.";
        }

        return `/email-verification?token=${tokenId}`;
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          session.user.role = token.role as UserRole;
        }

        if (token.status) {
          session.user.status = token.status as ApplicationStatus;
        }

        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role as UserRole | "unassigned";
      token.status = existingUser.applicationStatus as
        | ApplicationStatus
        | "not_applied";

      return token;
    },
  },
  ...authConfig,
});

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session.user;
});
