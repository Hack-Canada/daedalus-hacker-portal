import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex max-h-[500px] min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base text-white shadow-sm ring-offset-[#0a0a0f] placeholder:text-white/40 focus-visible:outline-hidden focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
