import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Application Status */}
      <div className="space-y-4 rounded-lg border p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-6 w-56" />
        </div>
        <Skeleton className="mt-4 h-10 w-32" />
      </div>

      {/* Main Content Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        {/* Countdown Section */}
        <div className="rounded-lg border p-6 md:p-10">
          <Skeleton className="h-8 w-48" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-6">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 rounded-lg border p-6 md:p-10 lg:col-span-2">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
