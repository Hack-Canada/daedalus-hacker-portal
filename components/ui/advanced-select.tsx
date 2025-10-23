"use client";

import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface AdvancedSelectProps {
  name: string;
  value: Option | null;
  onChange: (value: string) => void;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  placeholder?: string;
  isSearchable?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AdvancedSelect({
  name,
  value,
  onChange,
  loadOptions,
  placeholder = "Select an option",
  isSearchable = true,
  disabled = false,
  className,
}: AdvancedSelectProps) {
  return (
    <AsyncSelect
      name={name}
      value={value}
      onChange={(selected: SingleValue<Option>) =>
        onChange(selected?.value || "")
      }
      loadOptions={loadOptions}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isDisabled={disabled}
      defaultOptions
      cacheOptions
      styles={{
        control: (base) => ({
          ...base,
          height: "40px",
          borderRadius: "6px",
          borderColor: "rgba(0, 0, 0, 0.05)",
          background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.05)",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: "#6b7280",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "#3b82f6" : "transparent",
          color: state.isSelected ? "#ffffff" : "#374151",
          "&:hover": {
            backgroundColor: state.isSelected ? "#3b82f6" : "#3b82f640",
            color: state.isSelected ? "#ffffff" : "#000",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "#374151",
        }),
      }}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        className,
      )}
    />
  );
}
