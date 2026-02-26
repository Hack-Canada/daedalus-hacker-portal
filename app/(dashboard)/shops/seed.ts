import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const dummyItems = [
    {
        itemName: "Hack Canada T-Shirt",
        itemDescription: "A stylish premium cotton t-shirt to show off your hackathon spirit.",
        purchasePrice: 1500,
    },
    {
        itemName: "Mechanical Keyboard",
        itemDescription: "Click clack! Upgrade your typing experience with tactile switches.",
        purchasePrice: 5000,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"
    },
    {
        itemName: "Hacker Sticker Pack",
        itemDescription: "Decorate your laptop with exclusive Daedalus and tech stickers.",
        purchasePrice: 200,
    },
    {
        itemName: "Energy Drink",
        itemDescription: "Stay awake and keep coding through the night.",
        purchasePrice: 100,
        image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&q=80"
    },
    {
        itemName: "Rubber Duck",
        itemDescription: "Your new debugging companion. Talk your problems out.",
        purchasePrice: 300,
    },
    {
        itemName: "Wireless Mouse",
        itemDescription: "Smooth, precise, and perfect for design or coding sessions.",
        purchasePrice: 2500,
    },
    {
        itemName: "Noise Cancelling Headphones",
        itemDescription: "Get into the zone and block out all distractions.",
        purchasePrice: 8000,
    },
];

async function seed() {
    const { db } = await import("../../../lib/db/index");
    const { shopItems } = await import("../../../lib/db/schema");

    console.log("Emptying existing shop items...");
    await db.delete(shopItems);

    console.log("Seeding dummy shop items...");
    for (const item of dummyItems) {
        await db.insert(shopItems).values({
            ...item
        });
    }

    console.log("Seeded " + dummyItems.length + " shop items successfully!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Failed to seed database:", err);
});
