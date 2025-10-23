"use client";

import { Control, UseFormWatch } from "react-hook-form";

import { levelsOfStudy } from "@/lib/data/levelsOfStudy";
import { majors } from "@/lib/data/majors";
import { schools } from "@/lib/data/schools";
import { technicalFields } from "@/lib/data/technicalFields";
import { THackerApplicationSubmission } from "@/lib/validations/application";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AdvancedSelect } from "../ui/advanced-select";
import { Checkbox } from "../ui/checkbox";
import { EmojiDisplay } from "./EmojiDisplay";
import { UploadResume } from "./UploadResume";

interface BackgroundEducationStepProps {
  control: Control<THackerApplicationSubmission>;
  watch: UseFormWatch<THackerApplicationSubmission>;
}

export function BackgroundEducationStep({
  control,
  watch,
}: BackgroundEducationStepProps) {
  const major = watch("major");
  const school = watch("school");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="school.value"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                schools
                  .filter((school) =>
                    school.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((school) => ({ value: school, label: school })),
              );
            };

            return (
              <FormItem>
                <FormLabel>
                  School/University<span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="school"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Search for your school/university"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name="major.value"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                majors
                  .filter((major) =>
                    major.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((major) => ({ value: major, label: major })),
              );
            };

            return (
              <FormItem>
                <FormLabel>
                  Major<span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="major"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Search for your major"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      {school?.value === "Other (please specify)" && (
        <FormField
          control={control}
          name="school.customValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                School/University (Other)<span className="text-error">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your school/university" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {major?.value === "Other (please specify)" && (
        <FormField
          control={control}
          name="major.customValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Major (Other)<span className="text-error">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your major" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Graduation Year<span className="text-error">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="levelOfStudy"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                levelsOfStudy
                  .filter((level) =>
                    level.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((level) => ({ value: level, label: level })),
              );
            };

            return (
              <FormItem>
                <FormLabel>
                  Level of Study<span className="text-error">*</span>
                </FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="levelOfStudy"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Select your level of study"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <FormField
        control={control}
        name="technicalInterests"
        render={({ field }) => {
          const selected = field.value ? field.value.split(",") : [];

          const handleChange = (value: string, checked: boolean) => {
            let newSelected = [...selected];
            if (checked) {
              if (newSelected.length < 3) {
                newSelected.push(value);
              }
            } else {
              newSelected = newSelected.filter((v) => v !== value);
            }
            field.onChange(newSelected.join(","));
          };

          return (
            <FormItem>
              <FormLabel>Technical Interests (Select up to 3)</FormLabel>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {technicalFields.map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      id={field}
                      checked={selected.includes(field)}
                      onCheckedChange={(checked) =>
                        handleChange(field, !!checked)
                      }
                      disabled={
                        selected.length >= 3 && !selected.includes(field)
                      }
                    />
                    <label
                      htmlFor={field}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {field}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="hackathonsAttended"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Number of Hackathons Attended<span className="text-error">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input type="number" placeholder="0" {...field} />
                {field.value && (
                  <div className="absolute right-3 top-2 md:right-8 md:top-1.5">
                    <EmojiDisplay count={parseInt(field.value)} />
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/username"
                  className="lowercase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://linkedin.com/in/username"
                  className="lowercase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="personalWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://yourwebsite.com"
                  className="lowercase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <UploadResume control={control} watch={watch} />
    </div>
  );
}
