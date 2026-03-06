import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq, sql } from "drizzle-orm";
import { Coins, Gift } from "lucide-react";

import { db } from "@/lib/db";
import { shopItems, shopPurchases, userBalance } from "@/lib/db/schema";
import { BackButton } from "@/components/ui/back-button";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";
import { ShopItemCard } from "@/components/shop/ShopItemCard";

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

  const [items, balanceResult, purchaseCounts] = await Promise.all([
    db.select().from(shopItems),
    db
      .select()
      .from(userBalance)
      .where(eq(userBalance.userId, currentUser.id)),
    db
      .select({
        itemId: shopPurchases.itemId,
        count: sql<number>`count(*)::int`,
      })
      .from(shopPurchases)
      .where(eq(shopPurchases.userId, currentUser.id))
      .groupBy(shopPurchases.itemId),
  ]);

  const points = balanceResult.length > 0 ? balanceResult[0].points : 0;

  const purchaseCountMap = new Map(
    purchaseCounts.map((p) => [p.itemId, p.count]),
  );

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

          {/* Points Badge - Links to history */}
          <Link
            href="/points-history"
            className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-sky-400/10 px-5 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="rounded-full bg-primary/20 p-1.5">
              <Coins className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-rubik text-xl font-bold text-primary">
                {points}
              </span>
              <span className="text-sm font-medium text-textMuted">points</span>
            </div>
          </Link>
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
              <ShopItemCard
                key={item.id}
                item={item}
                userId={currentUser.id}
                purchaseCount={purchaseCountMap.get(item.id) ?? 0}
              />
            ))}
          </div>
        )}

        <BackButton />
      </div>
    </PageWrapper>
  );
}
