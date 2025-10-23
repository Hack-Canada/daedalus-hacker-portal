import Link from "next/link";

import type { hackerApplications } from "@/lib/db/schema";
import { getResumeUrl } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import { Field } from "./Field";
import { ReviewSection } from "./ReviewSection";
import { StepContentWrapper } from "./StepContentWrapper";

interface ReviewApplicationProps {
  application: typeof hackerApplications.$inferSelect;
}

export function ReviewApplication({ application }: ReviewApplicationProps) {
  return (
    <div className="space-y-8 xl:space-y-12">
      <StepContentWrapper
        title="Review your application"
        className="space-y-2 md:space-y-2 xl:space-y-2"
      >
        <p className="text-textMuted max-md:text-sm">
          An overview of your submitted application is below. You can no longer
          make any changes since the application was already submitted.
        </p>
      </StepContentWrapper>

      <ReviewSection title="General Information">
        <Field label="First Name" value={application.firstName} />
        <Field label="Last Name" value={application.lastName} />
        <Field label="Age" value={application.age?.toString() || ""} />
        <Field label="Pronouns" value={application.pronouns || ""} />
        <Field label="Email" value={application.email} />
        <Field label="Gender" value={application.gender} />
        <Field label="Race/Ethnicity" value={application.race} />
        <Field label="Country" value={application.country} />
      </ReviewSection>

      <ReviewSection title="Your Background">
        <Field label="School" value={application.school} />
        <Field label="Major" value={application.major} />
        <Field label="Graduation Year" value={application.graduationYear} />
        <Field label="Level of Study" value={application.levelOfStudy} />
        <Field
          label="Technical Interests"
          value={application.technicalInterests}
        />
        <Field
          label="Hackathons Attended"
          value={application.hackathonsAttended}
        />
        <Field label="Github" value={application.github} />
        <Field label="Linkedin" value={application.linkedin} />
        <Field label="Personal Website" value={application.personalWebsite} />
        <Field
          label="Resume"
          value={getResumeUrl(application.resumeUrl || "")}
        />
        <Field
          label="Share resume with sponsors/recruiters"
          value={application.shareResume ? "Yes" : "No"}
        />
      </ReviewSection>

      <ReviewSection title="Short Answers" columns="1">
        <Field
          label="Are you concerned that AI will take over or impact a career that you were looking forward to pursuing? Why or why not?"
          value={application.shortAnswer1}
        />
        <Field
          label="What inspired you to start participating in hackathons, and what motivates you to dedicate your weekends to them?"
          value={application.shortAnswer2}
        />
      </ReviewSection>

      <hr />

      <div className="space-y-4">
        <h3 className="text-lg font-medium md:text-xl">
          Interested in anything else?
        </h3>
        <div className="flex gap-2.5 max-xs:flex-col xs:items-center">
          <Link
            href="/applications"
            className={buttonVariants({ variant: "primary" })}
          >
            View All Available Applications
          </Link>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
