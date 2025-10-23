"use client";

interface ReviewGridProps {
  children: React.ReactNode;
  columns?: "1" | "2";
}

export function ReviewGrid({ children, columns = "2" }: ReviewGridProps) {
  return (
    <div
      className={`grid w-full gap-4 md:gap-6 xl:gap-8 ${columns === "2" ? "sm:grid-cols-2" : ""}`}
    >
      {children}
    </div>
  );
}
