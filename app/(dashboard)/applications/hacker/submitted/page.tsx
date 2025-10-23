import { Metadata } from "next";

import SubmissionSuccess from "@/components/applications/SubmissionSuccess";

export const metadata: Metadata = {
  title: "Application Submitted",
};

export default function HackerApplicationSubmittedPage() {
  return <SubmissionSuccess />;
}
