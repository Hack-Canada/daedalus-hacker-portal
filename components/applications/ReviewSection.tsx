"use client";

import { ReviewGrid } from "./ReviewGrid";
import { ReviewSectionHeader } from "./ReviewSectionHeader";

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
  columns?: "1" | "2";
}

export function ReviewSection({
  title,
  children,
  columns = "2",
}: ReviewSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
      <ReviewSectionHeader title={title} />
      <ReviewGrid columns={columns}>{children}</ReviewGrid>
    </div>
  );
}
