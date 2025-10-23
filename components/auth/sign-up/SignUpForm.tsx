"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

type Props = {};

const SignUpForm = ({}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

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
              `/email-verification?token=${res.data.verificationToken}`,
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
          <div className="rounded-md border border-error/50 bg-error/10 p-2">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Enter your name"
                  type="text"
                  className="flex h-10 w-full rounded-sm border border-white/50 bg-white/10 px-3 py-2 text-textSecondary shadow-[0_4px_6px] shadow-black/10 backdrop-blur-sm file:font-medium placeholder:text-textMuted focus-visible:outline-none focus-visible:ring focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
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
                <input
                  {...field}
                  placeholder="Enter your email"
                  type="text"
                  className="flex h-10 w-full rounded-sm border border-white/50 bg-white/10 px-3 py-2 lowercase text-textSecondary shadow-[0_4px_6px] shadow-black/10 backdrop-blur-sm file:font-medium placeholder:capitalize placeholder:text-textMuted focus-visible:outline-none focus-visible:ring focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
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
                <input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
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
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
