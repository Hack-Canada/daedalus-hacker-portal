import { Skeleton } from "@/components/ui/skeleton";
import AuthCardWrapper from "@/components/auth/AuthCardWrapper";
import AuthFooter from "@/components/auth/AuthFooter";

export default function Loading() {
  return (
    <AuthCardWrapper>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full" />
      </div>

      {/* Footer Skeleton */}
      <hr className="border-gray-400" />
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </AuthCardWrapper>
  );
}
