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
    <div>
      <ReviewSectionHeader title={title} />
      <ReviewGrid columns={columns}>{children}</ReviewGrid>
    </div>
  );
}
