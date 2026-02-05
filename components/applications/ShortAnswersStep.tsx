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
              Every project has a story. What problem were you trying to solve,
              and how does your creation tackle it? Take us behind the scenes,
              what technologies power it, what obstacles did you face, and what
              &apos;aha&apos; moments got you through? Share your links (GitHub,
              demo, video, etc.) so we can see it in action
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
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
              What would help you most in continuing your project after the
              hackathon? (e.g., one-on-one meetings with sponsors, mentorship,
              cloud credits, introductions to investors or partners, additional
              prizes, incubator access, or technical support)
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  className="min-h-[150px]"
                />
                <span className="text-muted-foreground absolute right-2 bottom-2 text-sm">
                  {field.value?.length || 0}/555
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shortAnswer3"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How would you describe your &quot;builder style&quot;? (e.g., The
              Architect who structures the logic, The Sprinter who writes the
              code, The Strategist who connects the project to the ecosystem, or
              The Polymath who fills the gaps)
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  className="min-h-[150px]"
                />
                <span className="text-muted-foreground absolute right-2 bottom-2 text-sm">
                  {field.value?.length || 0}/555
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
