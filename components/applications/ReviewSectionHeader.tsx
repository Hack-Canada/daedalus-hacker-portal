"use client";

interface ReviewSectionHeaderProps {
  title: string;
}

export function ReviewSectionHeader({ title }: ReviewSectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary via-sky-400 to-primaryLight shadow-[0_0_10px_rgba(30,144,255,0.3)]" />
      <h3 className="text-xl font-semibold text-white md:text-2xl">
        {title}
      </h3>
    </div>
  );
}
