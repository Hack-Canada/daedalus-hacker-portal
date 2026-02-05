import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";

import { ApiResponse } from "@/types/api";
import {
  checkPhoneNumberExists,
  createOrUpdateApplication,
  submitApplication,
} from "@/lib/db/queries/application";
import { sendApplicationSubmittedEmail } from "@/lib/emails/ses";
import { HackerApplicationSubmissionSchema } from "@/lib/validations/application";
import { isFeatureEnabled } from "@/config/phases";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to submit an application",
      });
    }

    const body = await req.json();

    if (currentUser.role !== "unassigned") {
      return NextResponse.json({
        success: false,
        message:
          "You must not have received a decision to submit an application",
      });
    }

    // Check if application submission is allowed based on current phase
    if (!isFeatureEnabled("applicationSubmission")) {
      return NextResponse.json({
        success: false,
        message: "Application submissions are not available at this time",
      });
    }

    const validatedFields = HackerApplicationSubmissionSchema.safeParse(body);

    if (!validatedFields.success) {
      const errorMessages = Object.values(
        validatedFields.error.flatten().fieldErrors,
      )
        .flat()
        .join(", ");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application data",
          error: errorMessages,
        },
        { status: 400 },
      );
    }

    const { data } = validatedFields;

    // Check if phone number is already in use by another user
    const phoneExists = await checkPhoneNumberExists(
      data.phoneNumber,
      currentUser.id,
    );
    if (phoneExists) {
      return NextResponse.json(
        {
          success: false,
          message: "This phone number is already registered with another account.",
        },
        { status: 400 },
      );
    }

    // Convert string fields to numbers
    const age = parseInt(data.age);
    const graduationYear = parseInt(data.graduationYear);

    // Convert object fields to strings
    const pronouns = data.pronouns.customValue || data.pronouns.value;
    const school = data.school.customValue || data.school.value;
    const major = data.major.customValue || data.major.value;

    // Create new application data from validated input
    // SECURITY: Always use the authenticated user's email, never trust the form input
    const applicationData = {
      userId: currentUser.id,
      firstName: data.firstName,
      lastName: data.lastName,
      age,
      pronouns,
      email: currentUser.email?.toLowerCase() || "",
      phoneNumber: data.phoneNumber,
      github: data.github,
      linkedin: data.linkedin,
      personalWebsite: data.personalWebsite,
      resumeUrl: data.resumeUrl,
      shareResume: data.shareResume,
      school,
      major,
      levelOfStudy: data.levelOfStudy,
      graduationYear,
      gender: data.gender,
      race: data.race,
      country: data.country,
      shortAnswer1: data.shortAnswer1,
      shortAnswer2: data.shortAnswer2,
      shortAnswer3: data.shortAnswer3,
      technicalInterests: data.technicalInterests,
      hackathonsAttended: data.hackathonsAttended,
      mlhCheckbox1: data.mlhCheckbox1,
      mlhCheckbox2: data.mlhCheckbox2,
      mlhCheckbox3: data.mlhCheckbox3,
      submissionStatus: "submitted",
    };

    // Check that the deadline has not passed
    const url = new URL(req.url);
    const response = await fetch(`${url.origin}/api/application/deadline`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch application deadline",
      });
    }

    const {
      data: { deadline },
    } = await response.json();

    if (!deadline) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch application deadline",
      });
    }

    if (new Date() > new Date(deadline)) {
      return NextResponse.json({
        success: false,
        message: "The deadline to submit your application has passed",
      });
    }

    // First create/update the application
    const createResult = await createOrUpdateApplication(applicationData);
    if (!createResult.success) {
      console.error("Create/Update Application Error:", createResult.errors);
      return NextResponse.json({
        success: false,
        message: "Failed to create application. Please try again.",
      });
    }

    // Then submit the application
    if (!createResult.data) {
      return NextResponse.json({
        success: false,
        message: "Failed to create application data. Please try again.",
      });
    }

    const updatedApplication = await submitApplication(createResult.data);

    if (!updatedApplication.success) {
      console.error(
        "Error submitting application: ",
        updatedApplication.errors,
      );
      return NextResponse.json({
        success: false,
        message: "Failed to submit application. Please try again.",
      });
    }

    // Send confirmation email
    await sendApplicationSubmittedEmail({
      name: data.firstName,
      email: currentUser.email || data.email,
      subject: "Thanks for applying to Hack Canada!",
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to submit application. Please try again.",
    });
  }
}
