import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper className="flex h-full items-center bg-center">
      <div className="w-full">
        {/* Step Navigation */}
        <div className="mb-8 flex justify-center gap-4 md:mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="size-12 rounded-full" />
          ))}
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6 space-y-8 md:mb-8">
            {/* Form Section */}
            <div className="space-y-6 md:space-y-10">
              {/* Section Header */}
              <Skeleton className="h-8 w-48" />

              {/* Input Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <hr className="mb-6 border-t-2 md:mb-8" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
