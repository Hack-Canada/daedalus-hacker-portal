import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Application Cards Skeleton */}
      <div className="flex w-full flex-col gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4 rounded-lg border p-6">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Card Content */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Card Footer */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Back Button Skeleton */}
      <div className="mt-8">
        <Skeleton className="h-10 w-48" />
      </div>
    </PageWrapper>
  );
}
