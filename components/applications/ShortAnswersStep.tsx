"use client";

import { Control } from "react-hook-form";

import { THackerApplicationSubmission } from "@/lib/validations/application";
import {
  FormControl,
  FormField,
  FormItem,
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
    <div className="space-y-8 md:space-y-10">
      {questions.map((q, index) => (
        <FormField
          key={q.name}
          control={control}
          name={q.name}
          render={({ field }) => (
            <FormItem className="space-y-3">
              {/* Question number badge */}
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-sm font-bold text-primary shadow-[0_0_15px_rgba(30,144,255,0.2)]">
                  {index + 1}
                </span>
                <label className="text-base font-medium leading-relaxed text-white/90 md:text-lg">
                  {q.question}
                </label>
              </div>

              <FormControl>
                <div className="relative ml-10">
                  <Textarea
                    {...field}
                    placeholder={q.placeholder}
                    className="min-h-[180px] resize-y pb-8 text-base leading-relaxed md:min-h-[200px]"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span
                      className={`text-xs font-medium ${
                        (field.value?.length || 0) > 1800
                          ? "text-amber-400"
                          : "text-white/40"
                      }`}
                    >
                      {field.value?.length || 0}
                      <span className="text-white/25">/2000</span>
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="ml-10" />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
