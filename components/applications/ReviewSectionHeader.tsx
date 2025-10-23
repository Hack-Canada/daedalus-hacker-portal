"use client";

interface ReviewSectionHeaderProps {
  title: string;
}

export function ReviewSectionHeader({ title }: ReviewSectionHeaderProps) {
  return (
    <>
      <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
        <h3 className="mb-2 text-lg font-semibold md:text-xl">{title}</h3>
      </div>
      <hr className="mb-4" />
    </>
  );
}
