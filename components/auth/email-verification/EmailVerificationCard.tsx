"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";

export function EmailVerificationCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = async (code: string) => {
    if (!token) {
      setError("Invalid verification link provided.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, token }),
      });

      if (!response.ok) {
        throw new Error("Invalid verification code");
      }

      const data = await response.json();

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardWrapper>
      <div className="space-y-2 text-center">
        <h1 className="font-rubik text-2xl font-semibold text-textPrimary md:text-3xl">
          Verify Your Email
        </h1>
        <p className="text-black/50 max-md:text-sm">
          Enter the 6-digit code sent to your email
        </p>
      </div>
      <div className="space-y-6">
        <InputOTP maxLength={6} onComplete={handleSubmit} disabled={isLoading}>
          <InputOTPGroup className="mx-auto">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="border-textSecondary/70"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <Button
          variant="auth"
          className="w-full text-sm"
          onClick={() => router.push("/email-verification/new-code")}
          disabled={isLoading}
        >
          Need a new code?
        </Button>
      </div>
      <hr className="border-gray-400" />
      <AuthFooter showSignUp={false} showResetPassword={false} />
    </AuthCardWrapper>
  );
}
