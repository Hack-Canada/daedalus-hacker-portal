"use client";

import { Control } from "react-hook-form";

import { THackerApplicationSubmission } from "@/lib/validations/application";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "../ui/textarea";

interface ShortAnswersStepProps {
  control: Control<THackerApplicationSubmission>;
}

export function ShortAnswersStep({ control }: ShortAnswersStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="shortAnswer1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What&apos;s the coolest project you&apos;ve ever built?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  placeholder="Tell us about it! What does it do, and how does it work under the hood? What technologies did you use, and what technical challenges did you overcome? Drop any links (GitHub, demo, video, etc.) so we can check it out..."
                  className="min-h-[150px]"
                />
                <span className="text-muted-foreground absolute right-2 bottom-2 text-sm">
                  {field.value?.length || 0}/2000
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shortAnswer2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              If you could build absolutely anything, no limits on time, money,
              or technology, what would you create?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  placeholder="Dream big. It could be an app, a robot, a mass of spaghetti code that somehow achieves world peace, or something that doesn't even exist yet. We just want to see how your mind works."
                  className="min-h-[150px]"
                />
                <span className="text-muted-foreground absolute right-2 bottom-2 text-sm">
                  {field.value?.length || 0}/2000
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
