import { cn } from "@/lib/utils";

interface ApplicationCardStatusProps {
  status: "open" | "closed" | "coming soon";
  deadline?: string;
}

export const ApplicationCardStatus = ({
  status,
  deadline,
}: ApplicationCardStatusProps) => {
  return (
    <div className="flex gap-2 max-sm:flex-col sm:justify-between">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            status === "open" && "bg-emerald-500",
            status === "closed" && "bg-rose-500",
            status === "coming soon" && "bg-amber-500",
          )}
        />
        <span
          className={cn(
            "text-xs font-medium capitalize md:text-sm",
            status === "open" && "text-emerald-700 dark:text-emerald-400",
            status === "closed" && "text-rose-700 dark:text-rose-400",
            status === "coming soon" && "text-amber-700 dark:text-amber-400",
          )}
        >
          {status}
        </span>
      </div>
      {status === "closed" ? (
        <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-right md:text-sm">
          Hackathon concluded
        </span>
      ) : deadline ? (
        <span className="text-xs text-gray-600 dark:text-gray-400 sm:text-right md:text-sm">
          Deadline: {deadline}
        </span>
      ) : null}
    </div>
  );
};
