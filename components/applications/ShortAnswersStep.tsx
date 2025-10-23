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
              Are you concerned that AI will take over or impact a career that
              you were looking forward to pursuing?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  placeholder="No, AI should be worried about me taking over its career."
                  className="min-h-[150px]"
                />
                <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                  {field.value?.length || 0}/1000
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
              What inspired you to start participating in hackathons, and what
              motivates you to dedicate your weekends to them?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  placeholder="The free food is always a motivator. But I also want to make a difference and change the world."
                  className="min-h-[150px]"
                />
                <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                  {field.value?.length || 0}/1000
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
