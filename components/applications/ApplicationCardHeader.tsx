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
      <h2 className="relative z-10 mb-1 flex items-center text-lg font-semibold text-white transition-colors duration-500 group-hover:text-primary md:mb-2 md:text-xl">
        <Icon
          size={24}
          className="mr-3 size-6 text-primary transition duration-500 group-hover:-rotate-[6deg] group-hover:text-primaryLight md:size-7"
        />
        {title}
      </h2>
      <p className="relative z-10 mb-6 text-sm text-white/60">
        {description}
      </p>
    </>
  );
};
