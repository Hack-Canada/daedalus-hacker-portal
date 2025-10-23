"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { Control, UseFieldArrayReturn, useFormState } from "react-hook-form";

import {
  Platform,
  PLATFORM_PLACEHOLDERS,
  ProfileFormData,
} from "@/lib/validations/profile";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlatformSelect } from "@/components/ui/platform-select";

interface ProfileIntegrationsProps {
  control: Control<ProfileFormData>;
  fieldArray: UseFieldArrayReturn<ProfileFormData, "integrations">;
  isPending: boolean;
}

const MAX_INTEGRATIONS = 5;

export function ProfileIntegrations({
  control,
  fieldArray,
  isPending,
}: ProfileIntegrationsProps) {
  const { fields, append, remove } = fieldArray;
  const { errors } = useFormState({ control });
  const integrationErrors = errors.integrations;

  const addNewPlatform = () => {
    if (fields.length >= MAX_INTEGRATIONS) {
      return;
    }
    append({ platform: "github", url: "" });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const getUrlPlaceholder = (platform: Platform) => {
    return PLATFORM_PLACEHOLDERS[platform] || "https://...";
  };

  return (
    <div className="h-auto rounded-lg border p-2.5 transition-[height] md:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <FormLabel className="text-lg">Social Integrations</FormLabel>
          <FormDescription>
            Connect your social media accounts and websites (max{" "}
            {MAX_INTEGRATIONS})
          </FormDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNewPlatform}
          disabled={isPending || fields.length >= MAX_INTEGRATIONS}
          className="shrink-0 gap-2"
        >
          <PlusCircle className="size-4" />
          Add Platform
        </Button>
      </div>

      {/* <AnimatePresence> */}
      {fields.map((field, index) => (
        <motion.div
          layout
          key={field.id}
          initial={{ opacity: 0, scale: 0.8, height: 0 }}
          animate={{ opacity: 1, scale: 1, height: "auto" }}
          exit={{ opacity: 0, scale: 0.8, height: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            height: { duration: 0.2 },
            layout: { duration: 0.2 },
          }}
          className="mt-4"
        >
          <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <FormField
                control={control}
                name={`integrations.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="flex-[2]">
                    <FormControl>
                      <PlatformSelect
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`integrations.${index}.url`}
                render={({ field }) => (
                  <FormItem className="flex-[3]">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={getUrlPlaceholder(fields[index].platform)}
                        disabled={isPending}
                        className="transition-all focus-visible:ring-1"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemove(index)}
                disabled={isPending}
                className="shrink-0 max-sm:ml-auto"
              >
                <span className="sr-only">Remove platform</span>
                <span className="mr-2 sm:hidden">Remove</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
      {/* </AnimatePresence> */}

      {integrationErrors && (
        <div className="mt-4 space-y-2">
          {typeof integrationErrors === "object" &&
            !Array.isArray(integrationErrors) &&
            integrationErrors.message && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                {integrationErrors.message}
              </div>
            )}
          {Array.isArray(integrationErrors) &&
            integrationErrors.map((error, index) => {
              if (!error) return null;
              return (
                <div
                  key={index}
                  className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive"
                >
                  <div className="font-medium">Platform {index + 1}</div>
                  {error.platform?.message && (
                    <div className="mt-1">
                      Platform: {error.platform.message}
                    </div>
                  )}
                  {error.url?.message && (
                    <div className="mt-1">URL: {error.url.message}</div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
