import { db } from "@/lib/db/index";
import { challenges } from "@/lib/db/schema";

await db.insert(challenges).values([
  {
    name: "Attend ICP Workshop",
    category: "Workshop",
    points: 100,
    difficulty: "easy",
    shortDescription: "Attend the workshop and participate!",
    instructions: "Attend the workshop in room xxx",
    hints: [],
    qrCode: true,
    submissionInstructions: "An organizer will scan the QR Code",
  },
  {
    name: "Make a LinkedIn Post!",
    category: "Misc",
    points: 150,
    difficulty: "easy",
    shortDescription: "Make a post about your experience at Hack Canada",
    instructions: "Post must be: a, b, c",
    hints: [],
    qrCode: false,
    submissionInstructions: "Ask an organizer to verify",
  },
]);
