#!/usr/bin/env bun
import { schedule } from "../config/schedule";
import {
  createManyScheduleEvents,
  deleteAllScheduleEvents,
  getAllScheduleEvents,
} from "../lib/db/queries/schedule";
import type { NewSchedule, Schedule } from "../lib/db/schema";

interface MigrationOptions {
  dryRun?: boolean;
  backup?: boolean;
  force?: boolean;
}

/**
 * Migration script to populate database with static schedule data
 * Includes backup and rollback functionality
 */
class ScheduleMigration {
  private backupData: Schedule[] = [];

  async migrate(options: MigrationOptions = {}) {
    const { dryRun = false, backup = true, force = false } = options;

    console.log("Starting schedule migration to database...");
    console.log(`Options: dryRun=${dryRun}, backup=${backup}, force=${force}`);

    try {
      // Check if database already has data
      const existingData = await getAllScheduleEvents();

      if (existingData && existingData.length > 0 && !force) {
        console.log(
          `Database already contains ${existingData.length} schedule events`,
        );
        console.log("Use --force flag to overwrite existing data");
        return false;
      }

      // Create backup if requested
      if (backup && existingData && existingData.length > 0) {
        console.log("Creating backup of existing data...");
        this.backupData = existingData;
        console.log(`Backup created with ${this.backupData.length} events`);
      }

      // Transform static data to database format
      const scheduleEvents: NewSchedule[] = schedule.map((event) => ({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        type: event.type,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        customTime: event.customTime,
      }));

      console.log(`Prepared ${scheduleEvents.length} events for migration`);

      if (dryRun) {
        console.log("DRY RUN - No changes will be made");
        this.logSampleEvents(scheduleEvents);
        return true;
      }

      // Clear existing data if force is enabled
      if (force && existingData && existingData.length > 0) {
        console.log("Clearing existing schedule data...");
        const deleteResult = await deleteAllScheduleEvents();

        if (!deleteResult) {
          console.error("Failed to clear existing schedule data");
          return false;
        }

        console.log("Existing schedule data cleared");
      }

      // Insert new data
      console.log("Inserting schedule events...");
      const result = await createManyScheduleEvents(scheduleEvents);

      if (!result) {
        console.error("Failed to insert schedule events");

        // Attempt rollback if we have backup data
        if (this.backupData.length > 0) {
          console.log("Attempting rollback...");
          await this.rollback();
        }

        return false;
      }

      console.log(`Successfully migrated ${result.length} schedule events`);
      console.log("Migration completed successfully!");

      this.logSampleEvents(result);

      return true;
    } catch (error) {
      console.error("Migration failed:", error);

      // Attempt rollback if we have backup data
      if (this.backupData.length > 0) {
        console.log("Attempting rollback...");
        await this.rollback();
      }

      return false;
    }
  }

  async rollback(): Promise<boolean> {
    if (this.backupData.length === 0) {
      console.log("No backup data available for rollback");
      return false;
    }

    try {
      console.log(
        `Rolling back to ${this.backupData.length} backed up events...`,
      );

      // Clear current data
      await deleteAllScheduleEvents();

      // Restore backup data
      const backupEvents: NewSchedule[] = this.backupData.map((event) => ({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        type: event.type,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        customTime: event.customTime,
      }));

      const result = await createManyScheduleEvents(backupEvents);

      if (result) {
        console.log("Rollback successful");
        return true;
      } else {
        console.error("Rollback failed");
        return false;
      }
    } catch (error) {
      console.error("Rollback failed:", error);
      return false;
    }
  }

  private logSampleEvents(events: (NewSchedule | Schedule)[], limit = 3) {
    console.log("\nSample events:");
    events.slice(0, limit).forEach((event, index) => {
      console.log(`  ${index + 1}. ${event.eventName} (${event.type})`);
      console.log(
        `     ${event.startTime.toISOString()} - ${event.endTime.toISOString()}`,
      );
      if (event.location) console.log(`     Location: ${event.location}`);
      if (event.customTime)
        console.log(`     Custom time: ${event.customTime}`);
    });

    if (events.length > limit) {
      console.log(`     ... and ${events.length - limit} more events`);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options: MigrationOptions = {
    dryRun: args.includes("--dry-run") || args.includes("-d"),
    backup: !args.includes("--no-backup"),
    force: args.includes("--force") || args.includes("-f"),
  };

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Schedule Migration Tool

Usage: bun run scripts/migrate-schedule-to-db.ts [options]

Options:
  --dry-run, -d     Show what would be migrated without making changes
  --force, -f       Overwrite existing database data
  --no-backup       Skip creating backup of existing data
  --help, -h        Show this help message

Examples:
  bun run scripts/migrate-schedule-to-db.ts --dry-run
  bun run scripts/migrate-schedule-to-db.ts --force
  bun run scripts/migrate-schedule-to-db.ts --no-backup --force
    `);
    process.exit(0);
  }

  const migration = new ScheduleMigration();
  const success = await migration.migrate(options);

  process.exit(success ? 0 : 1);
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nMigration interrupted");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nMigration terminated");
  process.exit(0);
});

// Run the migration if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Migration script failed:", error);
    process.exit(1);
  });
}

export { ScheduleMigration };
