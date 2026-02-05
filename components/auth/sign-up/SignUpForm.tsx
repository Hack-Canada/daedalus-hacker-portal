"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_ERROR_MESSAGES } from "@/lib/auth-errors";
import { fetcher } from "@/lib/utils";
import { registerSchema } from "@/lib/validations/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import OAuthButtons from "../OAuthButtons";

type Props = {};

const SignUpForm = ({}: Props) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const authError = searchParams.get("error");

  const router = useRouter();
  useEffect(() => {
    if (!authError) return;

    toast.error(AUTH_ERROR_MESSAGES[authError] ?? AUTH_ERROR_MESSAGES.default);

    router.replace("/sign-in");
  }, [authError, router]);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      startTransition(async () => {
        const res = await fetcher<{ verificationToken?: string }>(
          "/api/auth/register",
          {
            method: "POST",
            body: JSON.stringify(values),
          },
        );

        if (res.success) {
          if (res.data?.verificationToken) {
            router.push(
              `/email-verification?token=${res.data.verificationToken}&email=${values.email}`,
            );
          } else {
            // Handle case where verification was already sent
            toast.info(res.message);
            setError(res.message);
          }
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
        {error && (
          <div className="border-error/50 bg-error/10 rounded-md border p-2">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your name"
                  type="text"
                  className="text-textSecondary placeholder:text-textMuted flex h-10 w-full rounded-sm border border-white/50 bg-white/10 from-white/10 to-white/10 px-3 py-2 shadow-[0_4px_6px] shadow-black/10 backdrop-blur-xs file:font-medium focus-visible:ring-1 focus-visible:ring-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                  autoFocus={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  type="text"
                  className="text-textSecondary placeholder:text-textMuted flex h-10 w-full rounded-sm border border-white/50 bg-white/10 from-white/10 to-white/10 px-3 py-2 lowercase shadow-[0_4px_6px] shadow-black/10 backdrop-blur-xs file:font-medium placeholder:capitalize focus-visible:ring-1 focus-visible:ring-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="pb-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="text-textSecondary placeholder:text-textMuted flex h-10 w-full rounded-sm border border-white/50 bg-white/10 from-white/10 to-white/10 px-3 py-2 shadow-[0_4px_6px] shadow-black/10 backdrop-blur-xs file:font-medium focus-visible:ring-1 focus-visible:ring-white focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="auth"
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="w-full max-w-sm">
        <div className="relative flex items-center gap-2">
          <div className="flex-1" />
          <span className="text-muted-foreground shrink-0 px-2 text-xs uppercase">
            OR
          </span>
          <div className="flex-1" />
        </div>
      </div>
      <OAuthButtons callbackUrl="/" />
    </Form>
  );
};

export default SignUpForm;
