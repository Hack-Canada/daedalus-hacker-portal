"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props = {
  callbackUrl?: string;
};

const OAuthButtons = ({ callbackUrl = "/" }: Props) => {
  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex justify-center gap-10">
      <button
        type="button"
        onClick={() => handleOAuthSignIn("google")}
        className="p-3 rounded-full border hover:bg-gray-100 hover:scale-105 transition-transform hover:shadow-md"
        aria-label="Sign in with Google"
      >
        <FcGoogle size={24} />
      </button>

      <button
        type="button"
        onClick={() => handleOAuthSignIn("github")}
        className="p-3 rounded-full border hover:bg-gray-100 hover:scale-105 transition-transform hover:shadow-md"
        aria-label="Sign in with GitHub"
      >
        <FaGithub size={24} />
      </button>
    </div>
  );
};

export default OAuthButtons;