import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";

import {
  emailTemplates,
  getTemplateById,
  getTemplateIds,
} from "@/lib/emails/templates";

// Block access in production
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const templateId =
    searchParams.get("template") || emailTemplates[0]?.id || "welcome";
  const format = searchParams.get("format") || "html"; // html or source

  const selected = getTemplateById(templateId);

  if (!selected) {
    return NextResponse.json(
      { error: "Template not found", available: getTemplateIds() },
      { status: 404 },
    );
  }

  try {
    const html = await render(selected.component);
    if (format === "source") {
      return NextResponse.json({ html, subject: selected.subject });
    }

    // Return HTML directly for iframe viewing
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Email render error:", error);
    return NextResponse.json(
      {
        error: "Failed to render email",
        details: error instanceof Error ? error.message : String(error),
        template: templateId,
      },
      { status: 500 },
    );
  }
}
