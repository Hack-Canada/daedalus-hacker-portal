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

  const isOAuthEnabled = isFeatureEnabled("oauthSignIn");

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={(e) => handleOAuthSignIn(e, "google")}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50",
          !isOAuthEnabled && "cursor-not-allowed opacity-50",
        )}
        aria-label="Continue with Google"
        disabled={!isOAuthEnabled}
      >
        <FcGoogle size={22} />
        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        onClick={(e) => handleOAuthSignIn(e, "github")}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50",
          !isOAuthEnabled && "cursor-not-allowed opacity-50",
        )}
        aria-label="Continue with GitHub"
        disabled={!isOAuthEnabled}
      >
        <FaGithub size={22} />
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
};

export default OAuthButtons;
