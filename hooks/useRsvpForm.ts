"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RsvpFormSchema, RsvpFormValues } from "@/lib/validations/rsvp-form";

export const useRsvpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(RsvpFormSchema),
    defaultValues: {
      emergencyContactName: "",
      relationshipToParticipant: "",
      emergencyContactPhoneNumber: "",
      alternativePhoneNumber: "",
      dietaryRestrictions: {
        value: "None",
        customValue: "",
      },
      tshirtSize: "M",
      agreeToTerms: false,
      mediaConsent: false,
    },
  });

  const onSubmit = (values: RsvpFormValues) => {
    startTransition(async () => {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("You're in! We can't wait to see you!");
      router.push("/");
      router.refresh();
    });
  };

  return {
    form,
    isPending,
    onSubmit,
  };
};
