"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Banner } from "@/lib/db/schema";

const DISMISSED_BANNERS_KEY = "dismissed-banners";

const getDismissedBannerIds = (): string[] => {
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
  }
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
  const [visibleBanners, setVisibleBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const dismissedIds = getDismissedBannerIds();
    const filtered = banners.filter((b) => !dismissedIds.includes(b.id));
    setVisibleBanners(filtered);
  }, [banners]);

  const dismissBanner = (id: string) => {
    const dismissedIds = getDismissedBannerIds();
    if (!dismissedIds.includes(id)) {
      dismissedIds.push(id);
      localStorage.setItem(DISMISSED_BANNERS_KEY, JSON.stringify(dismissedIds));
    }
    setVisibleBanners((prev) => prev.filter((b) => b.id !== id));
  };

  if (visibleBanners.length === 0) return null;

  return (
    <div className="w-full">
      {visibleBanners.map((banner) => {
        const bannerType = (banner.type as "info" | "warning" | "success" | "error") || "info";
        const Icon = iconMap[bannerType];

        return (
          <div
            key={banner.id}
            className={cn(bannerVariants({ type: bannerType }))}
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
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100"
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
