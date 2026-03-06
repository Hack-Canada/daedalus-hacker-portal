"use client";

import { Coins, Package, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import type { ShopItem } from "@/lib/db/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ShopItemCardProps {
  item: ShopItem;
  userId: string;
  purchaseCount?: number;
}

export function ShopItemCard({
  item,
  userId,
  purchaseCount = 0,
}: ShopItemCardProps) {
  const qrPayload = JSON.stringify({
    type: "shop-redeem",
    userId,
    itemId: item.id,
    itemName: item.itemName,
    price: item.purchasePrice,
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-slate-800/90 to-slate-900/95 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
      {/* Stock Badge - Positioned absolutely */}
      {item.stock !== null && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Package className="h-3 w-3" />
          <span>{item.stock} left</span>
        </div>
      )}

      {/* Purchase Count Badge */}
      {purchaseCount > 0 && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <span>Owned x{purchaseCount}</span>
        </div>
      )}

      {/* Image Section */}
      {item.image ? (
        <div className="relative h-40 w-full overflow-hidden">
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-900/60 to-transparent" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.itemName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="relative flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary/20 via-slate-800 to-sky-500/20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.3),transparent_50%)]" />
          </div>
          <div className="relative rounded-full bg-white/10 p-4 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-primary/80" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-1.5 line-clamp-1 text-base font-semibold text-white">
          {item.itemName}
        </h3>
        <p className="mb-4 line-clamp-2 min-h-[2.5rem] flex-grow text-sm leading-relaxed text-slate-400">
          {item.itemDescription || "A special reward awaits you!"}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="font-rubik text-lg font-bold text-white">
              {item.purchasePrice}
            </span>
            <span className="text-xs text-slate-500">pts</span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-gradient-to-r from-primary to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95">
                Redeem
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Redeem {item.itemName}
                </DialogTitle>
                <DialogDescription className="pt-2 text-center">
                  Show this QR code to an organizer to complete your purchase.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center gap-4 py-4">
                {/* QR Code */}
                <div className="rounded-xl border bg-white p-4 shadow-lg">
                  <QRCodeSVG
                    value={qrPayload}
                    size={200}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                {/* Item Details */}
                <div className="w-full space-y-2 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Item
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {item.itemName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Price
                    </span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="font-bold text-primary">
                        {item.purchasePrice} pts
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-slate-500">
                  The organizer will scan this code to deduct points and give
                  you the item.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
