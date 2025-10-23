"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { fetcher } from "@/lib/utils";
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from "@/lib/validations/reset-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ResetPasswordParamsProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordParamsProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token,
    },
  });

  const onSubmit = (values: ResetPasswordInput) => {
    try {
      startTransition(async () => {
        if (values.password !== values["confirmPassword"]) {
          setError("Passwords entered must be the same!");
          return;
        }

        const res = await fetcher("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword,
            token,
          }),
        });

        if (res.success) {
          toast.success(
            "Password reset successful. Please sign in with your new password.",
          );
          redirect("/");
        } else {
          toast.error(res.message);
          setError(res.message);
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something bad happened.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                  className="flex h-10 w-full rounded-sm border border-white/50 bg-white/10 px-3 py-2 text-textSecondary shadow-[0_4px_6px] shadow-black/10 backdrop-blur-sm file:font-medium placeholder:text-textMuted focus-visible:outline-none focus-visible:ring focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm new password"
                  className="flex h-10 w-full rounded-sm border border-white/50 bg-white/10 px-3 py-2 text-textSecondary shadow-[0_4px_6px] shadow-black/10 backdrop-blur-sm file:font-medium placeholder:text-textMuted focus-visible:outline-none focus-visible:ring focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="auth"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
