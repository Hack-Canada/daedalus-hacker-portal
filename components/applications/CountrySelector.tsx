"use client";

import { Control } from "react-hook-form";

import { countries } from "@/lib/data/countries";
import { formatOptions } from "@/lib/utils";
import { AdvancedSelect } from "@/components/ui/advanced-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CountrySelectorProps {
  control: Control<any>;
  name: string;
  label: string;
}

export function CountrySelector({
  control,
  name,
  label = "Country",
}: CountrySelectorProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            <span className="text-error">*</span>
          </FormLabel>
          <FormControl>
            <AdvancedSelect
              name={name}
              value={
                field.value ? { value: field.value, label: field.value } : null
              }
              onChange={field.onChange}
              loadOptions={(inputValue) =>
                Promise.resolve(
                  formatOptions(
                    countries.filter((country) =>
                      country.toLowerCase().includes(inputValue.toLowerCase()),
                    ),
                  ),
                )
              }
              placeholder="Search or select country..."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
