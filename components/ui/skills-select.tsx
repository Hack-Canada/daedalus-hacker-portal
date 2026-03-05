"use client";

import Select from "react-select";

import { cn } from "@/lib/utils";
import { AVAILABLE_SKILLS } from "@/lib/validations/profile";

interface Option {
  value: string;
  label: string;
}

interface SkillsSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
}

export function SkillsSelect({
  value,
  onChange,
  disabled = false,
  className,
}: SkillsSelectProps) {
  const selected = value
    ? value.map((skill) => ({ value: skill, label: skill }))
    : [];

  const skillOptions = AVAILABLE_SKILLS.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const handleChange = (newValue: readonly Option[]) => {
    if (Array.isArray(newValue) && newValue.length <= 8) {
      const values = newValue.map((item) => item.value);
      onChange(values);
    }
  };

  return (
    <Select
      isMulti
      name="skills"
      value={selected}
      onChange={handleChange}
      options={skillOptions}
      isDisabled={disabled}
      placeholder="Select your skills..."
      noOptionsMessage={() => "No skills found"}
      isSearchable
      isClearable
      classNames={{
        control: () => "min-h-[40px]!",
      }}
      styles={{
        control: (base) => ({
          ...base,
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
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#dbeafe",
          borderRadius: "4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#1e40af",
          padding: "2px 6px",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#1e40af",
          "&:hover": {
            backgroundColor: "#ef4444",
            color: "white",
          },
        }),
      }}
      className={cn(
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        className,
      )}
    />
  );
}
