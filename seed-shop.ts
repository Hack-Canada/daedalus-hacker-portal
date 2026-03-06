import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { db } from "./lib/db/index";
import { shopItems } from "./lib/db/schema";
import crypto from "crypto";

async function seed() {
    await db.insert(shopItems).values({
        id: crypto.randomUUID(),
        itemName: "Daedalus T-Shirt",
        itemDescription: "A stylish t-shirt to show off your hackathon spirit.",
        purchasePrice: 1500,
        image: "https://via.placeholder.com/300x200"
    });
    console.log("Seeded shop items!");
    process.exit();
}

seed();
