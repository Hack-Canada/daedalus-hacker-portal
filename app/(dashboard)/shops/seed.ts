import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const dummyItems = [
  {
    itemName: "Additional Stickers",
    itemDescription: "Personalize your gear with extra high-quality stickers.",
    purchasePrice: 25,
    stock: undefined,
  },
  {
    itemName: "Peppero",
    itemDescription:
      "Crunchy biscuit sticks dipped in delicious chocolate coating.",
    purchasePrice: 25,
    stock: 36,
    image:
      "https://haisue.ca/cdn/shop/files/Lotte-Pepero-White-Cookie-NEW.jpg?v=1743470116&width=1214",
  },
  {
    itemName: "Monster Energy Drinks",
    itemDescription: "Fuel your grind and keep the caffeine levels high.",
    purchasePrice: 25,
    stock: 73,
    image:
      "https://voila.ca/images-v3/2d92d19c-0354-49c0-8a91-5260ed0bf531/6544fd59-97a2-4101-b813-11c9b34b3a6e/500x500.jpg",
  },
  {
    itemName: "Full size candy bar",
    itemDescription: "A substantial sugar boost for those late-night sessions.",
    purchasePrice: 25,
    stock: 24,
  },
  {
    itemName: "GIGANTIC Maple Syrup",
    itemDescription: "A massive bottle of liquid gold. Only one available!",
    purchasePrice: 25,
    stock: 1,
    image:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now06948/y/57.jpg",
  },
  {
    itemName: "Microwave Popcorn",
    itemDescription: "The classic movie snack, perfect for a quick break.",
    purchasePrice: 25,
    stock: 44,
    image:
      "https://mydormstore.ca/cdn/shop/files/microwave-popcorn-8264831.png?v=1758608146",
  },
  {
    itemName: "Fruit Roll Ups",
    itemDescription: "Sweet, stretchy, and nostalgic.",
    purchasePrice: 25,
    stock: 210,
    image:
      "https://hips.hearstapps.com/vidthumb/images/delish-watermelon-fruit-roll-ups-still002-1536587662.jpg?crop=0.75xw:1xh;center,top&resize=1200:*",
  },
  {
    itemName: "Sponsor Swag",
    itemDescription: "Exclusive gear provided by our amazing event partners.",
    purchasePrice: 150,
    stock: undefined,
  },
  {
    itemName: "Special Plushie",
    itemDescription:
      "A soft, cuddly companion to keep you company at your desk.",
    purchasePrice: 300,
    stock: 15,
  },
  {
    itemName: "Camera Lego Set",
    itemDescription:
      "Build your own vintage-style camera with this detailed brick set.",
    purchasePrice: 450,
    stock: 5,
    image: "https://toynado.ca/cdn/shop/files/31147b_grande.jpg?v=1732563639",
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
      ...item,
    });
  }

  console.log("Seeded " + dummyItems.length + " shop items successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Failed to seed database:", err);
});
