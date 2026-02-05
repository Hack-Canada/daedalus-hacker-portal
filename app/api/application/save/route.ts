import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";

import { ApiResponse } from "@/types/api";
import {
  checkPhoneNumberExists,
  createOrUpdateApplication,
} from "@/lib/db/queries/application";
import { HackerApplicationDraftSchema } from "@/lib/validations/application";
import { isFeatureEnabled } from "@/config/phases";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to save an application",
      });
    }

    const body = await req.json();

    if (currentUser.role !== "unassigned") {
      return NextResponse.json({
        success: false,
        message:
          "You must not have submitted or been accepted to save an application",
      });
    }

    // Check if application saving is allowed based on current phase
    if (!isFeatureEnabled("applicationSaving")) {
      return NextResponse.json({
        success: false,
        message: "Application saving is not available at this time",
      });
    }

    const validationResult = HackerApplicationDraftSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Invalid application data", validationResult.error);

      const errorMessages = Object.values(
        validationResult.error.flatten().fieldErrors,
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

    // Check if phone number is already in use by another user (only if provided)
    if (validationResult.data.phoneNumber) {
      const phoneExists = await checkPhoneNumberExists(
        validationResult.data.phoneNumber,
        currentUser.id,
      );
      if (phoneExists) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This phone number is already registered with another account.",
          },
          { status: 400 },
        );
      }
    }

    // Convert string fields to numbers
    const age = validationResult.data.age
      ? parseInt(validationResult.data.age)
      : null;
    const graduationYear = validationResult.data.graduationYear
      ? parseInt(validationResult.data.graduationYear)
      : null;

    // SECURITY: Always use the authenticated user's email, never trust the form input
    const applicationData = {
      ...validationResult.data,
      email: currentUser.email?.toLowerCase() || "",
      phoneNumber: validationResult.data.phoneNumber,
      age,
      graduationYear,
      pronouns:
        validationResult.data.pronouns.customValue ||
        validationResult.data.pronouns.value,
      school:
        validationResult.data.school.customValue ||
        validationResult.data.school.value,
      major:
        validationResult.data.major.customValue ||
        validationResult.data.major.value,
      shortAnswer1: validationResult.data.shortAnswer1,
      shortAnswer2: validationResult.data.shortAnswer2,
      shortAnswer3: validationResult.data.shortAnswer3,
      userId: currentUser.id,
      submissionStatus: "draft",
    };

    // Check that the deadline has not passed
    const url = new URL(req.url);
    const response = await fetch(`${url.origin}/api/application/deadline`, {
      next: { revalidate: 5 * 60 }, // Cache for 5m
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
        message: "The deadline to save your application has passed",
      });
    }

    const updatedApplication = await createOrUpdateApplication(applicationData);
    if (!updatedApplication.success) {
      return NextResponse.json({
        success: false,
        message: "Failed to save application. Please try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Application saved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to save application. Please try again.",
    });
  }
}
