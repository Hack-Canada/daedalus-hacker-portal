"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { isFeatureEnabled } from "@/config/phases";
import { cn } from "@/lib/utils";

type Props = {
  callbackUrl?: string;
};

const OAuthButtons = ({ callbackUrl = "/" }: Props) => {
  const handleOAuthSignIn = (
    e: React.MouseEvent<HTMLButtonElement>,
    provider: "google" | "github",
  ) => {
    e.preventDefault();
    console.log("handleOAuthSignIn", provider);
    // block oauth signin if user registration is disabled
    if (!isFeatureEnabled("userRegistration")) {
      toast.error("User registration is currently disabled.");
      return false;
    }
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex justify-center gap-10">
      <button
        type="button"
        onClick={(e) => handleOAuthSignIn(e, "google")}
        className={cn(
          "bg-backgroundMuted/50 hover:bg-backgroundMuted cursor-pointer rounded-full border p-2 transition-transform hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
          !isFeatureEnabled("oauthSignIn") && "cursor-not-allowed opacity-50",
        )}
        aria-label="Sign in with Google"
      >
        <FcGoogle size={28} />
      </button>

      <button
        type="button"
        onClick={(e) => handleOAuthSignIn(e, "github")}
        className={cn(
          "bg-backgroundMuted/50 hover:bg-backgroundMuted cursor-pointer rounded-full border p-2 transition-transform hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
          !isFeatureEnabled("oauthSignIn") && "cursor-not-allowed opacity-50",
        )}
        aria-label="Sign in with GitHub"
      >
        <FaGithub size={28} />
      </button>
    </div>
  );
};

export default OAuthButtons;
