import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/PageWrapper";

export default function Loading() {
  return (
    <PageWrapper className="3xl:max-w-screen-2xl max-w-screen-2xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-backgroundMuted p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        {/* Schedule Grid Container */}
        <div className="border-border bg-backgroundMuted rounded-lg border p-4">
          <div className="flex flex-col gap-4">
            {/* Day Selector Tabs */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-20 rounded-lg" />
              ))}
            </div>

            {/* Schedule Grid */}
            <div className="overflow-x-auto">
              <div className="border-border grid min-w-[600px] grid-cols-[100px_1fr] overflow-hidden rounded-lg border xl:grid-cols-[120px_1fr]">
                {/* Time Slots Column */}
                <div className="relative bg-white">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-t border-border bg-white"
                      style={{ height: 60 }}
                    >
                      <div className="mt-2 pr-2 text-right">
                        <Skeleton className="ml-auto h-3 w-12" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Events Grid */}
                <div className="border-border relative border-l bg-white">
                  {/* Time slot grid lines */}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-border bg-backgroundMuted/25 border-t"
                      style={{ height: 60 }}
                    />
                  ))}

                  {/* Sample Event Skeletons */}
                  <div className="absolute inset-0 p-1">
                    {/* Event 1 */}
                    <div
                      className="absolute p-1"
                      style={{
                        top: "60px",
                        height: "120px",
                        left: "0%",
                        width: "100%",
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>

                    {/* Event 2 */}
                    <div
                      className="absolute p-1"
                      style={{
                        top: "240px",
                        height: "90px",
                        left: "0%",
                        width: "50%",
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>

                    {/* Event 3 */}
                    <div
                      className="absolute p-1"
                      style={{
                        top: "240px",
                        height: "90px",
                        left: "50%",
                        width: "50%",
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>

                    {/* Event 4 */}
                    <div
                      className="absolute p-1"
                      style={{
                        top: "420px",
                        height: "180px",
                        left: "0%",
                        width: "100%",
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>

                    {/* Event 5 */}
                    <div
                      className="absolute p-1"
                      style={{
                        top: "660px",
                        height: "60px",
                        left: "0%",
                        width: "75%",
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
