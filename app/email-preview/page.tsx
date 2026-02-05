import type { Metadata } from "next";
import { notFound } from "next/navigation";

import EmailPreviewClient from "./EmailPreviewClient";

export const metadata: Metadata = {
  title: "Email Preview",
  robots: { index: false, follow: false },
};

// Block access in production - returns 404
export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <EmailPreviewClient />;
}
