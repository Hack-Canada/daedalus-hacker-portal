"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const RestoreRSVP = () => {
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    if (!data?.user) {
      toast.error("Failed to restore RSVP. Try refreshing the page.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/rsvp/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data?.user.id }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to restore RSVP");
        }

        toast.success(result.message);
        setShowConfirmation(false);
        router.refresh();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to restore RSVP. Please try again.";
        toast.error(message);
      }
    });
  };

  return (
    <>
      {showConfirmation ? (
        <div className="space-y-2">
          <p className="text-xs text-white/50 md:text-sm">
            Are you sure you want to restore your RSVP? You&apos;ll need to
            complete the RSVP form again to secure your spot.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="cursor-pointer text-xs text-white/50 hover:text-white/70 md:text-sm"
            >
              Cancel
            </button>
            <span className="my-auto h-4 w-0.5 bg-white/30" />
            <button
              type="button"
              onClick={onSubmit}
              disabled={isPending}
              className="group relative cursor-pointer text-xs text-success transition-colors hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              {isPending ? "Restoring..." : "Yes, Restore My RSVP"}
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-green-300 transition-transform group-hover:scale-x-100" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-white/50 md:text-sm">
            Changed your mind? You can restore your RSVP and rejoin the event!
          </p>
          <form>
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="group relative cursor-pointer text-xs text-success transition-colors hover:text-green-300 md:text-sm"
            >
              Restore My RSVP
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-green-300 transition-transform group-hover:scale-x-100" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RestoreRSVP;
