import React from "react";
import { LucideIcon } from "lucide-react";

interface ApplicationCardHeaderProps {
  title: React.ReactNode;
  description: string;
  icon: LucideIcon;
}

export const ApplicationCardHeader = ({
  title,
  description,
  icon: Icon,
}: ApplicationCardHeaderProps) => {
  return (
    <>
      <h2 className="mb-1 flex items-center text-lg font-semibold text-gray-800 transition-colors duration-500 group-hover:text-primary dark:text-gray-200 dark:group-hover:text-primaryDark md:mb-2 md:text-xl">
        <Icon
          size={24}
          className="mr-3 size-6 text-primary transition duration-500 group-hover:-rotate-6 group-hover:text-primaryDark md:size-7"
        />
        {title}
      </h2>
      <p className="mb-6 text-sm text-textMuted dark:text-gray-400">
        {description}
      </p>
    </>
  );
};
