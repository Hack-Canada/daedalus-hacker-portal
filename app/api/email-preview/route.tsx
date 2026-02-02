import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

import WelcomeEmail from "@/components/emails/WelcomeEmail";
import ApplicationSubmittedEmail from "@/components/emails/ApplicationSubmittedEmail";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import HackathonPrepEmail from "@/components/emails/HackathonPrepEmail";

// Block access in production
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const template = searchParams.get("template") || "welcome";
  const format = searchParams.get("format") || "html"; // html or source

  const templates: Record<string, { component: ReactElement; subject: string }> = {
    welcome: {
      component: (
        <WelcomeEmail
          name="John Doe"
          verificationCode="123456"
          verificationUrl="https://app.hackcanada.org/email-verification?token=abc123"
        />
      ),
      subject: "Welcome to Hack Canada!",
    },
    "application-submitted": {
      component: <ApplicationSubmittedEmail name="Jane Smith" />,
      subject: "Application Submitted",
    },
    "reset-password": {
      component: (
        <ResetPasswordEmail
          name="Alex Johnson"
          resetUrl="https://app.hackcanada.org/reset-password?token=xyz789"
        />
      ),
      subject: "Reset Your Password",
    },
    "hackathon-prep": {
      component: (
        <HackathonPrepEmail name="Taylor Davis" userId="user_12345" />
      ),
      subject: "Hackathon Prep",
    },
  };

  const selected = templates[template];
  if (!selected) {
    return NextResponse.json(
      { error: "Template not found", available: Object.keys(templates) },
      { status: 404 }
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
      { error: "Failed to render email", details: String(error) },
      { status: 500 }
    );
  }
}
