import { asc } from "drizzle-orm";

import { db } from "..";
import { schedule, type NewSchedule } from "../schema";

export const getAllScheduleEvents = async () => {
  try {
    const events = await db
      .select()
      .from(schedule)
      .orderBy(asc(schedule.startTime));
    return events;
  } catch (error) {
    console.error("Error fetching schedule events:", error);
    return null;
  }
};

export const createScheduleEvent = async (eventData: NewSchedule) => {
  try {
    const [newEvent] = await db
      .insert(schedule)
      .values(eventData)
      .returning();
    return newEvent;
  } catch (error) {
    console.error("Error creating schedule event:", error);
    return null;
  }
};

export const createManyScheduleEvents = async (eventsData: NewSchedule[]) => {
  try {
    const newEvents = await db
      .insert(schedule)
      .values(eventsData)
      .returning();
    return newEvents;
  } catch (error) {
    console.error("Error creating multiple schedule events:", error);
    return null;
  }
};

export const deleteAllScheduleEvents = async () => {
  try {
    await db.delete(schedule);
    return true;
  } catch (error) {
    console.error("Error deleting all schedule events:", error);
    return false;
  }
};