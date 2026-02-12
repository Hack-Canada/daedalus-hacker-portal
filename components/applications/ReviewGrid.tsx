"use client";

interface ReviewGridProps {
  children: React.ReactNode;
  columns?: "1" | "2";
}

export function ReviewGrid({ children, columns = "2" }: ReviewGridProps) {
  return (
    <div
      className={`grid w-full ${
        columns === "2"
          ? "gap-x-6 gap-y-5 sm:grid-cols-2 md:gap-x-8 md:gap-y-6"
          : "gap-6 md:gap-8"
      }`}
    >
      {children}
    </div>
  );
}
