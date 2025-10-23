"use client";

import CreatableSelect from "react-select/creatable";

import { cn } from "@/lib/utils";

// Predefined hobbies relevant for hackathon participants
export const PREDEFINED_HOBBIES = [
  "Programming",
  "Web Development",
  "Mobile Development",
  "AI/Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "Game Development",
  "Robotics",
  "Data Science",
  "IoT",
  "UI/UX Design",
  "Digital Art",
  "3D Modeling",
  "Gaming",
  "Esports",
  "Entrepreneurship",
  "Startups",
  "Problem Solving",
  "Competitive Programming",
  "Mentoring",
  "Open Source",
  "Tech Communities",
  "Music",
  "Photography",
  "Reading",
  "Writing",
  "Sports",
  "Travel",
];

interface Option {
  value: string;
  label: string;
}

interface HobbiesSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function HobbiesSelect({
  value,
  onChange,
  disabled = false,
  className,
}: HobbiesSelectProps) {
  const selected = value
    ? value.split(",").map((hobby) => ({ value: hobby, label: hobby }))
    : [];

  const predefinedOptions = PREDEFINED_HOBBIES.map((hobby) => ({
    value: hobby,
    label: hobby,
  }));

  const handleChange = (newValue: readonly Option[]) => {
    if (Array.isArray(newValue) && newValue.length <= 5) {
      const values = newValue.map((item) => item.value);
      onChange(values.join(","));
    }
  };

  return (
    <CreatableSelect
      isMulti
      name="hobbies"
      value={selected}
      onChange={handleChange}
      options={predefinedOptions}
      isDisabled={disabled}
      placeholder="Select or add new..."
      noOptionsMessage={() => "Type to create a new hobby"}
      isSearchable
      isClearable
      classNames={{
        control: () => "!min-h-[40px]",
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
          backgroundColor: "#e5e7eb",
          borderRadius: "4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#374151",
          padding: "2px 6px",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#374151",
          "&:hover": {
            backgroundColor: "#ef4444",
            color: "white",
          },
        }),
      }}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        className,
      )}
    />
  );
}
