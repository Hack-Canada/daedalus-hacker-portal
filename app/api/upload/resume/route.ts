import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { ApiResponse } from "@/types/api";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "No file provided",
      },
      { status: 400 },
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "Only PDF files are allowed",
      },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "File size must be less than 5MB",
      },
      { status: 400 },
    );
  }

  const key = `resumes/${Date.now()}-${file.name}`;

  try {
    const buffer = await file.arrayBuffer();

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      }),
    );

    return NextResponse.json<ApiResponse<{ key: string }>>({
      success: true,
      message: "File uploaded successfully",
      data: { key },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to upload file",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { key } = await request.json();

  if (!key) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "Missing required field: key",
      },
      { status: 400 },
    );
  }

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      }),
    );

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to delete file",
      },
      { status: 500 },
    );
  }
}
