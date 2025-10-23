import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { hackerApplicationDeadline } from "@/config/site";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json({
    success: true,
    message: "Successfully retrieved the application deadline.",
    data: {
      deadline: hackerApplicationDeadline.toISOString(),
    },
  });
}
