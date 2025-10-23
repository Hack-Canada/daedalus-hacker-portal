"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type CancelRSVPProps = {};

const CancelRSVP = () => {
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    if (!data?.user) {
      toast.error("Failed to cancel. Try refreshing the page.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/rsvp/cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data?.user.id }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to cancel RSVP");
        }

        toast.success(result.message);
        setShowConfirmation(false);
        router.refresh();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to cancel RSVP. Please try again.";
        toast.error(message);
      }
    });
  };

  return (
    <>
      {showConfirmation ? (
        <div className="space-y-2">
          <p className="text-xs text-textMuted md:text-sm">
            Are you sure you want to cancel your acceptance? This action cannot
            be undone.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="hover:text-text text-xs text-success md:text-sm"
            >
              Let's keep it!
            </button>
            <span className="my-auto h-4 w-0.5 bg-textMuted" />
            <button
              type="button"
              onClick={onSubmit}
              disabled={isPending}
              className="group relative text-xs text-primary transition-colors hover:text-primaryDark disabled:opacity-50 md:text-sm"
            >
              {isPending ? "Cancelling..." : "Confirm Cancellation"}
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-primaryDark transition-transform group-hover:scale-x-100" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-textMuted md:text-sm">
            No longer able to attend? You can give your spot to someone on the
            waitlist!{" "}
          </p>
          <form>
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="group relative text-xs text-primary transition-colors hover:text-primaryDark md:text-sm"
            >
              Cancel RSVP
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-primaryDark transition-transform group-hover:scale-x-100" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default CancelRSVP;
