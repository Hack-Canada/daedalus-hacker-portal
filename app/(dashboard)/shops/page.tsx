import { db } from "@/lib/db";
import { shopItems } from "@/lib/db/schema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default async function ShopsPage() {
    const items = await db.select().from(shopItems);

    // Dummy points
    const dummyPoints = 500;

    return (
        <div className="container mx-auto py-8 h-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold shadow-sm">
                    Points: {dummyPoints}
                </div>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/50 text-muted-foreground w-full">
                    <p className="text-lg font-medium">No items available</p>
                    <p className="text-sm">Check back later for new rewards!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="border rounded-xl shadow-sm bg-card text-card-foreground flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
                            {item.image ? (
                                <div className="relative w-full h-48 bg-muted border-b">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.image} alt={item.itemName} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="relative w-full h-48 bg-muted border-b flex items-center justify-center text-muted-foreground">
                                    <span className="text-sm font-medium">No Image</span>
                                </div>
                            )}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg line-clamp-1 mb-1">{item.itemName}</h3>
                                {item.itemDescription && (
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{item.itemDescription}</p>
                                )}
                                <div className="mt-auto pt-4 border-t flex items-center justify-between">
                                    <div className="font-bold text-lg text-primary">
                                        {item.purchasePrice} <span className="text-sm font-normal text-muted-foreground">pts</span>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="cursor-pointer bg-primary/10 text-primary hover:bg-primary hover:text-black px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                Purchase
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Talk to an Organizer</DialogTitle>
                                                <DialogDescription>
                                                    To purchase the <strong className="text-foreground">{item.itemName}</strong>, please find an organizer to deduct your points and claim your item!
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
