import { db } from "@/lib/db/index";
import { challenges } from "@/lib/db/schema";

await db.insert(challenges).values([
  {
    name: "Eco-Warrior: Collect Trash",
    category: "Misc",
    points: 10,
    difficulty: "easy",
    shortDescription: "Help keep the venue clean!",
    instructions: "Collect 1 kilo of trash and bring it to the logistics desk.",
    hints: ["Check under the beanbags!", "Recyclables count too."],
    qrCode: false,
    submissionInstructions: "An organizer will weigh your bag and verify.",
  },
  {
    name: "LinkedIn Legend: Day 1",
    category: "Social",
    points: 40,
    difficulty: "easy",
    shortDescription: "Talk about what you’re building.",
    instructions:
      "Post on LinkedIn about your project idea and your initial experience at the hackathon.",
    hints: ["Use the event hashtag!", "Photos of your team help."],
    qrCode: false,
    submissionInstructions: "Show your live post to an organizer.",
  },
  {
    name: "LinkedIn Legend: Day 2",
    category: "Social",
    points: 40,
    difficulty: "medium",
    shortDescription: "Discuss challenges and sponsors.",
    instructions:
      "Post on LinkedIn discussing technical hurdles you've faced and your experience with our sponsors.",
    hints: ["Tag the sponsors you mention!"],
    qrCode: false,
    submissionInstructions: "Show your live post to an organizer.",
  },
  {
    name: "LinkedIn Legend: Day 3",
    category: "Social",
    points: 40,
    difficulty: "medium",
    shortDescription: "Reflect and Review.",
    instructions:
      "Reflect on your experience, mention which tracks you entered, and why you chose them.",
    hints: ["Must be completed before the end of the hackathon."],
    qrCode: false,
    submissionInstructions: "Show your live post to an organizer.",
  },
  {
    name: "Workshop Attendee",
    category: "Workshop",
    points: 25,
    difficulty: "easy",
    shortDescription: "Learn something new from our sponsors.",
    instructions: "Attend any official sponsor-led workshop.",
    hints: ["Check the schedule for room locations."],
    qrCode: true,
    submissionInstructions:
      "An organizer will scan your QR code at the end of the session.",
  },
  {
    name: "Fun Event Participation",
    category: "Fun",
    points: 15,
    difficulty: "easy",
    shortDescription: "Take a break and have some fun!",
    instructions:
      "Participate in any 2 scheduled fun events (e.g., Cup Stacking, Gaming).",
    hints: [],
    qrCode: true,
    submissionInstructions: "Get scanned by the event lead.",
  },
  {
    name: "Sponsor Bay Explorer",
    category: "Misc",
    points: 5,
    difficulty: "easy",
    shortDescription: "Visit a sponsor booth.",
    instructions: "Visit a sponsor at their booth and get a digital stamp.",
    hints: ["Ask them about their API or internships!"],
    qrCode: true,
    submissionInstructions: "The sponsor will scan your code.",
  },
  {
    name: "Fun Event Champion",
    category: "Fun",
    points: 30,
    difficulty: "hard",
    shortDescription: "Win a fun event competition.",
    instructions: "Secure 1st place in any of the scheduled fun events.",
    hints: ["Practice makes perfect!"],
    qrCode: false,
    submissionInstructions:
      "The event host will verify your win with the admin team.",
  },
]);
