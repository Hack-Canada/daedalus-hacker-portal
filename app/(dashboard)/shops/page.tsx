import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";
import { Coins, Gift, Package, Sparkles } from "lucide-react";

import { db } from "@/lib/db";
import { shopItems, userBalance } from "@/lib/db/schema";
import { BackButton } from "@/components/ui/back-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";

export default async function ShopsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Shop"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  const items = await db.select().from(shopItems);

  const balanceResult = await db
    .select()
    .from(userBalance)
    .where(eq(userBalance.userId, currentUser.id));

  const points = balanceResult.length > 0 ? balanceResult[0].points : 0;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="w-fit bg-linear-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
              <h1 className="font-rubik text-3xl font-bold">Shop</h1>
            </div>
            <p className="text-textMuted max-md:text-sm">
              Spend your challenge points on exclusive rewards and goodies!
            </p>
          </div>

          {/* Points Badge */}
          <div className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-sky-400/10 px-5 py-3 shadow-sm backdrop-blur-sm">
            <div className="rounded-full bg-primary/20 p-1.5">
              <Coins className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-rubik text-xl font-bold text-primary">
                {points}
              </span>
              <span className="text-sm font-medium text-textMuted">points</span>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-sky-400/5 p-16 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Gift className="h-10 w-10 text-primary/60" />
            </div>
            <p className="text-lg font-semibold text-textPrimary">
              No items available yet
            </p>
            <p className="mt-1 text-sm text-textMuted">
              Check back later for awesome rewards!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-slate-800/90 to-slate-900/95 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                {/* Stock Badge - Positioned absolutely */}
                {item.stock !== null && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Package className="h-3 w-3" />
                    <span>{item.stock} left</span>
                  </div>
                )}

                {/* Image Section */}
                {item.image ? (
                  <div className="relative h-40 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-[1]" />
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
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Talk to an Organizer</DialogTitle>
                          <DialogDescription className="pt-2">
                            To redeem{" "}
                            <strong className="text-textPrimary">
                              {item.itemName}
                            </strong>{" "}
                            for{" "}
                            <strong className="text-primary">
                              {item.purchasePrice} points
                            </strong>
                            , please find an organizer who will process your
                            purchase and give you the item!
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <BackButton />
      </div>
    </PageWrapper>
  );
}
