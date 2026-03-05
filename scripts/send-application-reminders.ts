#!/usr/bin/env bun
import { render } from "@react-email/render";
import { and, eq, isNull, or } from "drizzle-orm";

import ApplicationReminderEmail from "../components/emails/ApplicationReminderEmail";
import { db } from "../lib/db";
import { hackerApplications, users } from "../lib/db/schema";
import { sendApplicationReminderEmail } from "../lib/emails/ses";

type ReminderRecipient = {
  id: string;
  name: string;
  email: string;
  hasDraft: boolean;
};

async function getIncompleteApplicants(): Promise<ReminderRecipient[]> {
  const results = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      submissionStatus: hackerApplications.submissionStatus,
    })
    .from(users)
    .leftJoin(hackerApplications, eq(users.id, hackerApplications.userId))
    .where(
      and(
        eq(users.applicationStatus, "not_applied"),
        or(
          isNull(hackerApplications.id),
          eq(hackerApplications.submissionStatus, "draft"),
        ),
      ),
    );

  return results.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    hasDraft: r.submissionStatus === "draft",
  }));
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runDemo() {
  console.log("=== DEMO MODE (dry run) ===\n");

  const recipients = await getIncompleteApplicants();

  const notStarted = recipients.filter((r) => !r.hasDraft);
  const drafts = recipients.filter((r) => r.hasDraft);

  console.log(`Total recipients: ${recipients.length}`);
  console.log(`  - Never started application: ${notStarted.length}`);
  console.log(`  - Started but not submitted (draft): ${drafts.length}`);
  console.log();

  if (recipients.length > 0) {
    console.log("Sample recipients (up to 10):");
    recipients.slice(0, 10).forEach((r, i) => {
      console.log(
        `  ${i + 1}. ${r.name} <${r.email}> — ${r.hasDraft ? "draft" : "not started"}`,
      );
    });
    console.log();
  }

  console.log("--- Preview: Not-Started Email ---");
  const notStartedHtml = await render(
    ApplicationReminderEmail({ name: "Demo User", hasDraft: false }),
  );
  console.log(`HTML length: ${notStartedHtml.length} characters`);
  console.log(`Subject: Your Hack Canada application`);
  console.log();

  console.log("--- Preview: Draft Email ---");
  const draftHtml = await render(
    ApplicationReminderEmail({ name: "Demo User", hasDraft: true }),
  );
  console.log(`HTML length: ${draftHtml.length} characters`);
  console.log(`Subject: Quick reminder about your Hack Canada application`);
  console.log();

  console.log("No emails were sent. Use --test or --send to actually send.");
}

async function runTest(testEmails: string[]) {
  console.log("=== TEST MODE ===\n");
  console.log(`Sending to specified test emails: ${testEmails.join(", ")}\n`);

  const allRecipients = await getIncompleteApplicants();
  const matchedRecipients = allRecipients.filter((r) =>
    testEmails.includes(r.email),
  );

  const unmatchedEmails = testEmails.filter(
    (e) => !allRecipients.some((r) => r.email === e),
  );

  if (unmatchedEmails.length > 0) {
    console.log(
      `Warning: These emails are NOT in the incomplete applicant list:`,
    );
    unmatchedEmails.forEach((e) => console.log(`  - ${e}`));

    if (!process.argv.includes("--force-test")) {
      console.log(
        "\nUse --force-test to send to these addresses anyway (as not-started variant).",
      );

      if (matchedRecipients.length === 0) {
        console.log("No matched recipients found. Exiting.");
        return;
      }
    } else {
      unmatchedEmails.forEach((e) => {
        matchedRecipients.push({
          id: "force-test",
          name: e.split("@")[0],
          email: e,
          hasDraft: false,
        });
      });
    }
  }

  console.log(`\nSending to ${matchedRecipients.length} recipient(s)...\n`);

  let success = 0;
  let failed = 0;

  for (const recipient of matchedRecipients) {
    const result = await sendApplicationReminderEmail({
      name: recipient.name,
      email: recipient.email,
      hasDraft: recipient.hasDraft,
    });

    if (result.success) {
      success++;
      console.log(
        `  [OK] ${recipient.email} (${recipient.hasDraft ? "draft" : "not started"})`,
      );
    } else {
      failed++;
      console.log(`  [FAIL] ${recipient.email} — ${result.error}`);
    }

    await sleep(200);
  }

  console.log(`\nDone. Success: ${success}, Failed: ${failed}`);
}

async function runSend() {
  if (!process.argv.includes("--confirm")) {
    console.log("=== PRODUCTION SEND MODE ===\n");
    console.log(
      "ERROR: You must pass --confirm to actually send to all recipients.",
    );
    console.log(
      "Example: NODE_ENV=production bun run scripts/send-application-reminders.ts --send --confirm",
    );
    console.log("\nRun with --demo first to see who would receive emails.");
    process.exit(1);
  }

  console.log("=== PRODUCTION SEND MODE (confirmed) ===\n");

  const recipients = await getIncompleteApplicants();

  const notStarted = recipients.filter((r) => !r.hasDraft);
  const drafts = recipients.filter((r) => r.hasDraft);

  console.log(`Total recipients: ${recipients.length}`);
  console.log(`  - Never started: ${notStarted.length}`);
  console.log(`  - Draft: ${drafts.length}`);
  console.log();

  let success = 0;
  let failed = 0;
  const failedEmails: string[] = [];

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];

    const result = await sendApplicationReminderEmail({
      name: recipient.name,
      email: recipient.email,
      hasDraft: recipient.hasDraft,
    });

    if (result.success) {
      success++;
    } else {
      failed++;
      failedEmails.push(recipient.email);
    }

    if ((i + 1) % 25 === 0 || i === recipients.length - 1) {
      console.log(
        `Progress: ${i + 1}/${recipients.length} (success: ${success}, failed: ${failed})`,
      );
    }

    await sleep(200);
  }

  console.log("\n=== SEND COMPLETE ===");
  console.log(`Total: ${recipients.length}`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);

  if (failedEmails.length > 0) {
    console.log("\nFailed emails:");
    failedEmails.forEach((e) => console.log(`  - ${e}`));
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Application Reminder Email Script

NOTE: Run with NODE_ENV=production to avoid React dev-mode warnings in Bun.

Usage: NODE_ENV=production bun run scripts/send-application-reminders.ts [mode] [options]

Modes:
  --demo, -d              Dry run — show recipient counts, sample data, and preview email (no emails sent)
  --test <emails>         Send only to the specified comma-separated email addresses
  --send --confirm        Send to ALL incomplete applicants (requires --confirm as safety gate)

Options:
  --force-test            When using --test, send to addresses even if they aren't in the incomplete applicant list
  --help, -h              Show this help message

Examples:
  NODE_ENV=production bun run scripts/send-application-reminders.ts --demo
  NODE_ENV=production bun run scripts/send-application-reminders.ts --test you@example.com,friend@example.com
  NODE_ENV=production bun run scripts/send-application-reminders.ts --test outsider@example.com --force-test
  NODE_ENV=production bun run scripts/send-application-reminders.ts --send --confirm
    `);
    process.exit(0);
  }

  if (args.includes("--demo") || args.includes("-d")) {
    await runDemo();
  } else if (args.includes("--test")) {
    const testIndex = args.indexOf("--test");
    const emailsArg = args[testIndex + 1];

    if (!emailsArg || emailsArg.startsWith("--")) {
      console.error(
        "Error: --test requires a comma-separated list of email addresses.",
      );
      console.error("Example: --test you@example.com,friend@example.com");
      process.exit(1);
    }

    const testEmails = emailsArg.split(",").map((e) => e.trim());
    await runTest(testEmails);
  } else if (args.includes("--send")) {
    await runSend();
  } else {
    console.log("No mode specified. Use --help for usage information.");
    console.log(
      "Quick start: NODE_ENV=production bun run scripts/send-application-reminders.ts --demo",
    );
    process.exit(1);
  }

  process.exit(0);
}

process.on("SIGINT", () => {
  console.log("\nScript interrupted");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nScript terminated");
  process.exit(0);
});

main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
