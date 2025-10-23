import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* QR Code Content */}
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="h-64 w-64 rounded-lg" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    </PageWrapper>
  );
}
