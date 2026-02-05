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
        <p className="text-white/50 max-md:text-sm">
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
          label="Every project has a story. What problem were you trying to solve, and how does your creation tackle it? Take us behind the scenes, what technologies power it, what obstacles did you face, and what 'aha' moments got you through? Share your links (GitHub, demo, video, etc.) so we can see it in action"
          value={application.shortAnswer1}
        />
        <Field
          label="What would help you most in continuing your project after the hackathon? (e.g., one-on-one meetings with sponsors, mentorship, cloud credits, introductions to investors or partners, additional prizes, incubator access, or technical support)"
          value={application.shortAnswer2}
        />
        <Field
          label='How would you describe your "builder style"? (e.g., The Architect who structures the logic, The Sprinter who writes the code, The Strategist who connects the project to the ecosystem, or The Polymath who fills the gaps)'
          value={application.shortAnswer3}
        />
      </ReviewSection>

      <hr className="border-white/10" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white md:text-xl">
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
