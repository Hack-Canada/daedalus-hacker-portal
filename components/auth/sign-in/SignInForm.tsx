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
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
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


  const callOutToOAuthProvider = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };


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
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-4 mt-4">
        OR
      </div>
      <div className="flex justify-center gap-10  ">
        <button
          onClick={() => callOutToOAuthProvider("google")}
          className="p-3 rounded-full border hover:bg-gray-100 hover:scale-105 transition-transform hover:shadow-md"
        >
          <FcGoogle size={24} />
        </button>

        <button
          onClick={() => callOutToOAuthProvider("github")}
          className="p-3 rounded-full border hover:bg-gray-100 hover:scale-105 transition-transform hover:shadow-md"
        >
          <FaGithub size={24} />

        </button>

      </div>


    </Form>

  );
};

export default SignInForm;
