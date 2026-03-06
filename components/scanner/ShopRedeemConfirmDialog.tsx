"use client";

import { Coins, Mail, ShoppingBag, User, X } from "lucide-react";

import type { ShopRedeemData } from "@/hooks/useQRScanner";
import type { UserVerifyData } from "@/app/api/check-ins/verify/route";

interface ShopRedeemConfirmDialogProps {
  shopData: ShopRedeemData;
  userData: UserVerifyData;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ShopRedeemConfirmDialog({
  shopData,
  userData,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: ShopRedeemConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-lg border border-rose-500/25 bg-background p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-textSecondary transition hover:text-textPrimary"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20">
            <ShoppingBag className="h-7 w-7 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-textPrimary">
            Confirm Shop Redemption
          </h2>
          <p className="mt-1 text-sm text-textSecondary">
            This will deduct points from the user&apos;s balance
          </p>
        </div>

        {/* Item Details */}
        <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-textSecondary">Item</p>
              <p className="text-lg font-semibold text-textPrimary">
                {shopData.itemName}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1.5">
              <Coins className="h-4 w-4 text-rose-500" />
              <span className="font-bold text-rose-600">
                {shopData.price} pts
              </span>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3 rounded-lg border border-primary/10 bg-primary/5 p-4">
          {/* Full Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">
                Hacker Name
              </p>
              <p className="text-lg font-semibold text-textPrimary">
                {userData.fullName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-textSecondary">Email</p>
              <p className="text-base text-textPrimary">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-rose-500/25 px-4 py-2.5 font-medium text-textPrimary transition hover:bg-rose-500/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-rose-500 px-4 py-2.5 font-medium text-white transition hover:bg-rose-600 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Confirm Redemption"}
          </button>
        </div>
      </div>
    </div>
  );
}
