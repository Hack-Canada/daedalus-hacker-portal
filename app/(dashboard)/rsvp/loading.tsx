import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper className="3xl:max-w-screen-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2">
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-4 w-[32rem] max-w-full" />
      </div>

      {/* Form */}
      <div className="border-border space-y-6 rounded-lg sm:border sm:p-6 sm:shadow-xs">
        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Long Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </PageWrapper>
  );
}
