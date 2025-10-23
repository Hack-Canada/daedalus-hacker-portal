import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper className="max-w-screen-lg 3xl:max-w-screen-lg">
      <div className="mb-8">
        {/* Header */}
        <div className="w-fit">
          <Skeleton className="mb-2 h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Form Skeleton */}
      <div className="space-y-6">
        {/* Bio Section */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Hobbies Section */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-44" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-28" />
      </div>
    </PageWrapper>
  );
}
