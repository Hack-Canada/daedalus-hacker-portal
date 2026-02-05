"use client";

import { UseFormReturn } from "react-hook-form";
import { AlertCircle } from "lucide-react";

import { getResumeUrl } from "@/lib/utils";
import { THackerApplicationSubmission } from "@/lib/validations/application";

import { Field } from "./Field";
import { MLHStep } from "./MLHStep";
import { ReviewSection } from "./ReviewSection";

interface ReviewDisplayProps {
  form: UseFormReturn<THackerApplicationSubmission>;
}

export function ReviewDisplay({ form }: ReviewDisplayProps) {
  const values = form.watch();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Warning banner */}
      <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-warning" />
        <p className="text-sm leading-relaxed text-white/70">
          Please review your application carefully before submitting.{" "}
          <span className="font-medium text-warning">
            You will not be able to make changes or resubmit
          </span>{" "}
          once it has been submitted.
        </p>
      </div>

      <ReviewSection title="General Information">
        <Field label="First Name" value={values.firstName} />
        <Field label="Last Name" value={values.lastName} />
        <Field label="Age" value={values.age} />
        <Field
          label="Pronouns"
          value={values.pronouns.value}
          customValue={values.pronouns.customValue}
        />
        <Field label="Email" value={values.email} />
        <Field label="Phone Number" value={values.phoneNumber} />
        <Field label="Gender" value={values.gender} />
        <Field label="Race/Ethnicity" value={values.race} />
        <Field label="Country" value={values.country} />
      </ReviewSection>

      <ReviewSection title="Your Background">
        <Field
          label="School"
          value={values.school.value}
          customValue={values.school.customValue}
        />
        <Field
          label="Major"
          value={values.major.value}
          customValue={values.major.customValue}
        />
        <Field label="Graduation Year" value={values.graduationYear} />
        <Field label="Level of Study" value={values.levelOfStudy} />
        <Field label="Technical Interests" value={values.technicalInterests} />
        <Field label="Hackathons Attended" value={values.hackathonsAttended} />
        <Field label="Github" value={values.github} />
        <Field label="Linkedin" value={values.linkedin} />
        <Field label="Personal Website" value={values.personalWebsite} />
        <Field
          label="Resume"
          value={values.resumeUrl ? getResumeUrl(values.resumeUrl) : undefined}
        />
        <Field
          label="Share resume with sponsors/recruiters"
          value={values.shareResume ? "Yes" : "No"}
        />
      </ReviewSection>

      <ReviewSection title="Short Answers" columns="1">
        <Field
          label="Every project has a story. What problem were you trying to solve, and how does your creation tackle it? Take us behind the scenes, what technologies power it, what obstacles did you face, and what 'aha' moments got you through? Share your links (GitHub, demo, video, etc.) so we can see it in action"
          value={values.shortAnswer1}
          isLongText
        />
        <Field
          label="What would help you most in continuing your project after the hackathon? (e.g., one-on-one meetings with sponsors, mentorship, cloud credits, introductions to investors or partners, additional prizes, incubator access, or technical support)"
          value={values.shortAnswer2}
        />
        <Field
          label='How would you describe your "builder style"? (e.g., The Architect who structures the logic, The Sprinter who writes the code, The Strategist who connects the project to the ecosystem, or The Polymath who fills the gaps)'
          value={values.shortAnswer3}
        />
      </ReviewSection>

      <ReviewSection title="MLH Agreements" columns="1">
        <MLHStep control={form.control} />
      </ReviewSection>
    </div>
  );
}
