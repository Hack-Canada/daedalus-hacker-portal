import { cache } from "react";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { isFeatureEnabled } from "./config/phases";
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
    error: "/sign-in",
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
    async signIn({ account, user }) {
      // For OAuth providers (Google, GitHub, etc.)
      if (account?.provider !== "credentials") {
        // Check if this is an existing user or a new OAuth registration
        let isExistingUser = false;
        
        if (user.id) {
          const existingUser = await getUserById(user.id);
          isExistingUser = !!existingUser;
        }
        
        // If not an existing user, check if registration is open
        if (!isExistingUser) {
          if (!isFeatureEnabled("userRegistration")) {
            // In production, allow only @hackcanada.org emails when registration is closed
            if (process.env.NODE_ENV === "production") {
              if (!user.email?.endsWith("@hackcanada.org")) {
                return false; // Block new OAuth registration
              }
            } else {
              // In development, block all new registrations when closed
              return false;
            }
          }
        }
        
        // Existing user or registration is allowed
        return true;
      }

      // From here on: credentials users only
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.email) {
        return false;
      }

      if (!existingUser.emailVerified) {
        const [existingToken] = await getVerificationTokenByEmail(
          existingUser.email,
        );

        if (existingToken) {
          return `/email-verification?token=${existingToken.id}&email=${existingUser.email}`;
        }

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
          return false;
        }

        return `/email-verification?token=${tokenId}&email=${existingUser.email}`;
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
