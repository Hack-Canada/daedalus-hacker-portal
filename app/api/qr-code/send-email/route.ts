import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { render } from "@react-email/render";
import QRCode from "qrcode";

import { ApiResponse } from "@/types/api";
import { sendEmailWithInlineImages } from "@/lib/emails/ses";
import QRCodeEmail from "@/components/emails/QRCodeEmail";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to send the QR code email.",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 },
      );
    }

    if (currentUser.id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only send QR code to your own email.",
        },
        { status: 403 },
      );
    }

    const profileUrl = `https://app.hackcanada.org/profile/${currentUser.id}`;

    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 250,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    const qrCodeCid = "qrcode-image";
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");

    const htmlBody = await render(
      QRCodeEmail({
        name: currentUser.name?.split(" ")[0] || "Hacker",
        qrCodeSrc: `cid:${qrCodeCid}`,
      }),
    );

    const result = await sendEmailWithInlineImages(
      currentUser.email,
      "Your Hack Canada QR Code",
      htmlBody,
      [
        {
          cid: qrCodeCid,
          base64Data,
          mimeType: "image/png",
        },
      ],
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to send email",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "QR code sent to your email!",
    });
  } catch (error) {
    console.error("Error sending QR code email:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send QR code email.",
      },
      { status: 500 },
    );
  }
}
