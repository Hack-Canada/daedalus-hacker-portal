import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { getApplicationDeadline } from "@/config/phases";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  const deadline = getApplicationDeadline();
  
  return NextResponse.json({
    success: true,
    message: "Successfully retrieved the application deadline.",
    data: {
      deadline: deadline.toISOString(),
    },
  });
}
