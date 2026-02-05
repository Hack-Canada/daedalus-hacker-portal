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

const questions = [
  {
    name: "shortAnswer1" as const,
    question: "What's the coolest project you've ever built?",
    placeholder:
      "Tell us about it! What does it do, and how does it work under the hood? What technologies did you use, and what technical challenges did you overcome? Drop any links (GitHub, demo, video, etc.) so we can check it out...",
  },
  {
    name: "shortAnswer2" as const,
    question:
      "If you could build absolutely anything, no limits on time, money, or technology, what would you create?",
    placeholder:
      "Dream big. It could be an app, a robot, a mass of spaghetti code that somehow achieves world peace, or something that doesn't even exist yet. We just want to see how your mind works.",
  },
];

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
                  placeholder="Tell us about it! What does it do, and how does it work under the hood? What technologies did you use, and what technical challenges did you overcome? Drop any links (GitHub, demo, video, etc.) so we can check it out..."
                  className="min-h-[150px]"
                />
                <span className="text-muted-foreground absolute right-2 bottom-2 text-sm">
                  {field.value?.length || 0}/2000
                </span>
                <label className="text-base leading-relaxed font-medium text-white/90 md:text-lg">
                  {q.question}
                </label>
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
                  placeholder="Think about what resources, connections, or support would make the biggest impact on your project's future..."
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
                  placeholder="Everyone has their own unique approach to building. What's yours?"
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
