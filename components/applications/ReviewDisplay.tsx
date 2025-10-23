"use client";

import { UseFormReturn } from "react-hook-form";

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
    <div className="space-y-8 xl:space-y-12">
      <p className="-mt-3 text-textMuted max-md:text-sm md:-mt-6">
        Please review your application carefully before submitting. Note that
        you will not be able to make changes or resubmit your application once
        it has been submitted.
      </p>

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
          value={values.shareResume ? "True" : "False"}
        />
      </ReviewSection>

      <ReviewSection title="Short Answers" columns="1">
        <Field
          label="Are you concerned that AI will take over or impact a career that you were looking forward to pursuing? Why or why not?"
          value={values.shortAnswer1}
        />
        <Field
          label="What inspired you to start participating in hackathons, and what motivates you to dedicate your weekends to them?"
          value={values.shortAnswer2}
        />
      </ReviewSection>

      <ReviewSection title="MLH Agreements" columns="1">
        <MLHStep control={form.control} />
      </ReviewSection>
    </div>
  );
}
