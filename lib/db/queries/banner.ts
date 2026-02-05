import { and, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "..";
import { banners } from "../schema";

export const getActiveBanners = async () => {
  try {
    const activeBanners = await db
      .select()
      .from(banners)
      .where(
        and(
          eq(banners.isActive, true),
          or(isNull(banners.expiresAt), gt(banners.expiresAt, new Date()))
        )
      );
    return activeBanners;
  } catch (error) {
    console.error("Error fetching active banners:", error);
    return [];
  }
};
