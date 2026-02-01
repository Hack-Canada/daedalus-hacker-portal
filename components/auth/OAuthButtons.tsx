"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { userRegistrationEnabled } from "@/config/site";

type Props = {
  callbackUrl?: string;
};

const OAuthButtons = ({ callbackUrl = "/" }: Props) => {
  const handleOAuthSignIn = (provider: "google" | "github") => {
    if (!userRegistrationEnabled) {
      toast.error("User registration is currently disabled.");
      return;
    }
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex justify-center gap-10">
      <button
        type="button"
        onClick={() => handleOAuthSignIn("google")}
        className="bg-backgroundMuted/50 hover:bg-backgroundMuted cursor-pointer rounded-full border p-2 transition-transform hover:scale-105 hover:shadow-md"
        aria-label="Sign in with Google"
      >
        <FcGoogle size={28} />
      </button>

      <button
        type="button"
        onClick={() => handleOAuthSignIn("github")}
        className="bg-backgroundMuted/50 hover:bg-backgroundMuted cursor-pointer rounded-full border p-2 transition-transform hover:scale-105 hover:shadow-md"
        aria-label="Sign in with GitHub"
      >
        <FaGithub size={28} />
      </button>
    </div>
  );
};

export default OAuthButtons;
