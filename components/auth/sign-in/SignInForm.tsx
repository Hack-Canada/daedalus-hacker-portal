"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AUTH_ERROR_MESSAGES } from "@/lib/auth-errors";

import { fetcher } from "@/lib/utils";
import { LoginSchema } from "@/lib/validations/login";
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
import {signIn} from "next-auth/react";
import OAuthButtons from "../OAuthButtons";


type Props = {};

const SignInForm = ({ }: Props) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authError = searchParams.get("error");

  useEffect(() => {
    if (!authError) return;

    toast.error(
      AUTH_ERROR_MESSAGES[authError] ??
      AUTH_ERROR_MESSAGES.default
    );



    router.replace("/sign-in");
  }, [authError, router]);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });





  const onSubmit = (values: { email: string; password: string }) => {
    try {
      startTransition(async () => {
        const res = await fetcher<{ redirect?: string }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (res.data?.redirect) {
          // Handle email verification redirect
          toast.info(res.message);
          router.push(res.data.redirect);
        } else if (res.success) {
          window.location.href = "/";
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus={true}
                  placeholder="Enter your email"
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
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <div className="w-full max-w-sm">
        <div className="relative flex items-center gap-2">
          <div className="flex-1" />
          <span className="shrink-0 px-2 text-xs text-muted-foreground uppercase">
            OR
          </span>
          <div className="flex-1" />
        </div>
      </div>
      <OAuthButtons callbackUrl="/" />


    </Form>

  );
};

export default SignInForm;
