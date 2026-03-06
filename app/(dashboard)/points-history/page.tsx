import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { desc, eq } from "drizzle-orm";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Coins,
  ShoppingBag,
  Trophy,
  Users,
} from "lucide-react";

import { db } from "@/lib/db";
import { pointsTransactions, userBalance } from "@/lib/db/schema";
import { cn, formatDate } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import { EmptyPage } from "@/components/EmptyPage";
import PageWrapper from "@/components/PageWrapper";

interface TransactionMetadata {
  type?: "challenge_completion" | "shop_redemption" | "profile_visit_reward";
  challengeName?: string;
  itemName?: string;
  visitCount?: number;
}

export default async function PointsHistoryPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    redirect("/sign-in");
  }

  if (currentUser.role === "unassigned") {
    return (
      <EmptyPage
        title="Points History"
        message="Sorry, this feature is only available to participants."
      />
    );
  }

  const [transactions, balanceResult] = await Promise.all([
    db
      .select()
      .from(pointsTransactions)
      .where(eq(pointsTransactions.userId, currentUser.id))
      .orderBy(desc(pointsTransactions.createdAt)),
    db
      .select()
      .from(userBalance)
      .where(eq(userBalance.userId, currentUser.id)),
  ]);

  const points = balanceResult.length > 0 ? balanceResult[0].points : 0;

  const getTransactionIcon = (metadata: TransactionMetadata | null) => {
    if (metadata?.type === "challenge_completion") {
      return <Trophy className="h-4 w-4 text-emerald-500" />;
    }
    if (metadata?.type === "shop_redemption") {
      return <ShoppingBag className="h-4 w-4 text-rose-500" />;
    }
    if (metadata?.type === "profile_visit_reward") {
      return <Users className="h-4 w-4 text-sky-500" />;
    }
    return <Coins className="h-4 w-4 text-primary" />;
  };

  const getTransactionLabel = (
    metadata: TransactionMetadata | null,
    points: number,
  ) => {
    if (metadata?.type === "challenge_completion") {
      return `Challenge: ${metadata.challengeName || "Unknown"}`;
    }
    if (metadata?.type === "shop_redemption") {
      return `Redeemed: ${metadata.itemName || "Unknown Item"}`;
    }
    if (metadata?.type === "profile_visit_reward") {
      return `Networking Reward (${metadata.visitCount || 0} profiles visited)`;
    }
    return points > 0 ? "Points Earned" : "Points Spent";
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="w-fit bg-linear-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
              <h1 className="font-rubik text-3xl font-bold">Points History</h1>
            </div>
            <p className="text-textMuted max-md:text-sm">
              View your complete points transaction history
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
              <span className="text-sm font-medium text-textMuted">
                current balance
              </span>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-sky-400/5 p-16 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Clock className="h-10 w-10 text-primary/60" />
            </div>
            <p className="text-lg font-semibold text-textPrimary">
              No transactions yet
            </p>
            <p className="mt-1 text-sm text-textMuted">
              Complete challenges or visit the shop to start earning and
              spending points!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const metadata = transaction.metadata as TransactionMetadata | null;
              const isPositive = transaction.points > 0;

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 rounded-lg border border-primary/10 bg-gradient-to-r from-slate-50 to-white p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-sm dark:from-slate-900 dark:to-slate-800"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      isPositive ? "bg-emerald-500/10" : "bg-rose-500/10",
                    )}
                  >
                    {getTransactionIcon(metadata)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-textPrimary truncate">
                      {getTransactionLabel(metadata, transaction.points)}
                    </p>
                    <p className="text-sm text-textMuted">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>

                  {/* Points */}
                  <div
                    className={cn(
                      "flex items-center gap-1 font-rubik text-lg font-bold",
                      isPositive ? "text-emerald-600" : "text-rose-600",
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span>
                      {isPositive ? "+" : ""}
                      {transaction.points}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <BackButton />
      </div>
    </PageWrapper>
  );
}
