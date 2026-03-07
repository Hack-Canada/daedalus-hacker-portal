import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { and, eq, ilike, or } from "drizzle-orm";

import type { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { userBalance, users } from "@/lib/db/schema";
import { isOrganizer } from "@/lib/utils";

export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
}

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<UserSearchResult[]>>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !isOrganizer(currentUser.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Only organizers and admins can search users",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        message: "Search query too short",
        data: [],
      });
    }

    const pattern = `%${query}%`;

    const results = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        points: userBalance.points,
      })
      .from(users)
      .leftJoin(userBalance, eq(users.id, userBalance.userId))
      .where(
        and(
          or(ilike(users.name, pattern), ilike(users.email, pattern)),
          eq(users.role, "hacker"),
        ),
      )
      .limit(10);

    const data: UserSearchResult[] = results.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role,
      points: r.points ?? 0,
    }));

    return NextResponse.json({
      success: true,
      message: `Found ${data.length} users`,
      data,
    });
  } catch (error) {
    console.error("User search error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
