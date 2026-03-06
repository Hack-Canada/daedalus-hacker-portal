import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { shopItems, userBalance } from "@/lib/db/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyPage } from "@/components/EmptyPage";

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

  const balance = await db
    .select()
    .from(userBalance)
    .where(eq(userBalance.userId, currentUser.id));

  return (
    <div className="container mx-auto h-full py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
        <div className="bg-primary text-primary-foreground rounded-md px-4 py-2 font-semibold shadow-sm">
          Points: {balance.length > 0 ? balance[0].points : 0}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-muted/50 text-muted-foreground flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-12">
          <p className="text-lg font-medium">No items available</p>
          <p className="text-sm">Check back later for new rewards!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card text-card-foreground hover:border-primary/20 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
            >
              {item.image ? (
                <div className="bg-muted relative h-48 w-full border-b">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-muted text-muted-foreground relative flex h-48 w-full items-center justify-center border-b">
                  <span className="text-sm font-medium">No Image</span>
                </div>
              )}
              <div className="flex flex-grow flex-col p-5">
                <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
                  {item.itemName}
                </h3>
                {item.itemDescription && (
                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm">
                    {item.itemDescription}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <div className="text-primary text-lg font-bold">
                    {item.purchasePrice}{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                      pts
                    </span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-primary/10 text-primary hover:bg-primary cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-black">
                        Purchase
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Talk to an Organizer</DialogTitle>
                        <DialogDescription>
                          To purchase the{" "}
                          <strong className="text-foreground">
                            {item.itemName}
                          </strong>
                          , please find an organizer to deduct your points and
                          claim your item!
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
    </div>
  );
}
