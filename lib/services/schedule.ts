import { schedule as staticSchedule } from "@/config/schedule";
import { getAllScheduleEvents } from "@/lib/db/queries/schedule";
import { Schedule } from "@/lib/db/schema";

/**
 * Unified schedule service that provides fallback mechanism
 * Priority: Database -> Static Config
 */
export class ScheduleService {
  /**
   * Get schedule data with fallback mechanism
   * @returns Promise<Schedule[]> - Unified schedule data
   */
  static async getSchedule(): Promise<{
    data: Schedule[];
    source: "database" | "static";
    error?: string;
  }> {
    try {
      // Try to fetch from database first
      const dbSchedule = await getAllScheduleEvents();

      if (dbSchedule && dbSchedule.length > 0) {
        return {
          data: dbSchedule,
          source: "database",
        };
      }

      // Fall back to static config if DB is empty
      console.info("Database schedule is empty, falling back to static config");
      const staticData = this.transformStaticToSchedule(staticSchedule);

      return {
        data: staticData,
        source: "static",
      };
    } catch (error) {
      // Fall back to static config on error
      console.error("Failed to fetch schedule from database:", error);
      const staticData = this.transformStaticToSchedule(staticSchedule);

      return {
        data: staticData,
        source: "static",
        error:
          error instanceof Error ? error.message : "Unknown database error",
      };
    }
  }

  /**
   * Transform static schedule data to match DB Schedule type
   * @param staticData - Static schedule configuration
   * @returns Schedule[] - Transformed data matching DB schema
   */
  private static transformStaticToSchedule(
    staticData: typeof staticSchedule,
  ): Schedule[] {
    return staticData.map((event) => ({
      id: event.id,
      eventName: event.eventName,
      eventDescription: event.eventDescription ?? null,
      type: event.type,
      location: event.location ?? null,
      startTime: event.startTime,
      endTime: event.endTime,
      customTime: event.customTime ?? null,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }));
  }

  /**
   * Get schedule for a specific day
   * @param selectedDay - Day index (5 = Friday, 6 = Saturday, 0 = Sunday)
   * @returns Promise<Schedule[]> - Filtered schedule data
   */
  static async getScheduleForDay(selectedDay: number): Promise<{
    data: Schedule[];
    source: "database" | "static";
    error?: string;
  }> {
    const result = await this.getSchedule();

    const dayEvents = result.data.filter((event) => {
      const eventDate = new Date(event.startTime);
      const day = eventDate.getDay(); // 5 = Friday, 6 = Saturday, 0 = Sunday
      return day === selectedDay;
    });

    return {
      ...result,
      data: dayEvents,
    };
  }
}
