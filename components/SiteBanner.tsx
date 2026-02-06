"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

import { Banner } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const DISMISSED_BANNERS_KEY = "dismissed-banners";

const getStoredDismissedIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(DISMISSED_BANNERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const bannerVariants = cva(
  "relative flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium",
  {
    variants: {
      type: {
        info: "bg-primary/90 text-white",
        warning: "bg-secondary/90 text-white",
        success: "bg-green-600/90 text-white",
        error: "bg-error/90 text-white",
      },
    },
    defaultVariants: {
      type: "info",
    },
  },
);

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
};

interface SiteBannerProps extends VariantProps<typeof bannerVariants> {
  banners: Banner[];
}

export function SiteBanner({ banners }: SiteBannerProps) {
  // Track dismissed IDs in state, initialized lazily from localStorage
  const [dismissedIds, setDismissedIds] = useState<string[]>(
    getStoredDismissedIds,
  );

  // Compute visible banners from props and dismissed state
  const visibleBanners = useMemo(
    () => banners.filter((b) => !dismissedIds.includes(b.id)),
    [banners, dismissedIds],
  );

  const dismissBanner = (id: string) => {
    const updated = [...dismissedIds, id];
    localStorage.setItem(DISMISSED_BANNERS_KEY, JSON.stringify(updated));
    setDismissedIds(updated);
  };

  if (visibleBanners.length === 0) return null;

  return (
    <div className="w-full">
      {visibleBanners.map((banner) => {
        const bannerType =
          (banner.type as "info" | "warning" | "success" | "error") || "info";
        const Icon = iconMap[bannerType];

        return (
          <div
            key={banner.id}
            className={cn(bannerVariants({ type: bannerType }) + " z-[50]")}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{banner.message}</span>
            {banner.linkText && banner.linkUrl && (
              <Link
                href={banner.linkUrl}
                className="ml-1 underline underline-offset-2 hover:no-underline"
              >
                {banner.linkText}
              </Link>
            )}
            <button
              onClick={() => dismissBanner(banner.id)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
