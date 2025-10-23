import { SendEmailCommandInput, SES } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import ApplicationSubmittedEmail from "@/components/emails/ApplicationSubmittedEmail";
import HackathonPrepEmail from "@/components/emails/HackathonPrepEmail";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

const ses = new SES({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || "",
  },
});

type SendEmailResult = {
  success: boolean;
  error?: string;
};

export const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  from?: string,
): Promise<SendEmailResult> => {
  const params: SendEmailCommandInput = {
    Source: from || process.env.AWS_SES_VERIFIED_EMAIL || "",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
        Text: {
          Charset: "UTF-8",
          Data: body.replace(/<[^>]+>/g, ""),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  try {
    await ses.sendEmail(params);
    return { success: true };
  } catch (error) {
    console.error("Error sending email with SES:", error);
    return {
      success: false,
      error: "Something went wrong. Email could not be sent.",
    };
  }
};

type WelcomeEmailProps = {
  name: string;
  email: string;
  subject: string;
  verificationCode: string;
  token: string;
};

export const sendWelcomeEmail = async (data: WelcomeEmailProps) => {
  const { name, email, subject, verificationCode, token } = data;

  const body = await render(
    WelcomeEmail({
      name,
      verificationCode,
      verificationUrl:
        process.env.NODE_ENV === "production"
          ? `https://app.hackcanada.org/email-verification?token=${token}`
          : `http://localhost:3000/email-verification?token=${token}`,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};

type ResetPasswordEmailProps = {
  name: string;
  email: string;
  subject: string;
  token: string;
};

export const sendResetPasswordEmail = async (data: ResetPasswordEmailProps) => {
  const { name, email, subject, token } = data;

  const resetUrl =
    process.env.NODE_ENV === "production"
      ? `https://app.hackcanada.org/reset-password/${token}`
      : `http://localhost:3000/reset-password/${token}`;

  const body = await render(
    ResetPasswordEmail({
      name,
      resetUrl,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};

type ApplicationSubmittedEmailProps = {
  name: string;
  email: string;
  subject: string;
};

export const sendApplicationSubmittedEmail = async (
  data: ApplicationSubmittedEmailProps,
) => {
  const { name, email, subject } = data;

  const body = await render(
    ApplicationSubmittedEmail({
      name,
    }),
  );

  const result = await sendEmail(
    email,
    subject,
    body,
    process.env.AWS_SES_NO_REPLY_EMAIL,
  );

  return result;
};

type HackathonPrepEmailProps = {
  name: string;
  email: string;
  userId: string;
};

const createHackathonPrepTextVersion = (name: string) => `
Hello ${name}!

HACK CANADA EVENT DETAILS AND CHECK-IN INFORMATION

We're getting closer to the big day! Here's everything you need to know about Hack Canada at Wilfrid Laurier University this weekend.

LOCATION & CHECK-IN DETAILS
--------------------------
CHECK-IN TIME:
Friday, February 21st, 4:30 PM — 6:30 PM
Note: If you're running late, message us in #ask-an-organizer on Discord or find an organizer at the event.

VENUE ADDRESS:
Lazaridis School of Business and Economics
64 University Ave W, Waterloo, ON N2L 3C7
Note: Overnight parking is not permitted. For parking information, visit: https://www.wlu.ca/information-for/visiting-laurier/parking.html

WHAT TO BRING:
-------------
- Valid Photo ID (required for check-in)
- Laptop & charger
- Any other devices or hardware you plan to use
- Toiletries & any medication you need
- Comfortable clothes and a light jacket
- Sleeping bag/blanket if you plan to rest
- Water bottle

IMPORTANT LINKS:
--------------
- Hacker Package: https://torpid-tuesday-6d4.notion.site/Hack-Canada-Hacker-Package-1805d88c3a21800198e9e0731d94dc3f
- Discord Server: https://discord.gg/6sHskEpdpb
- Event Schedule: https://docs.google.com/spreadsheets/d/1AVNb3k0e6ly5n9tv4BI1HLt_JrkNqfgZ3L1vhcU0vso/edit
- Hacker Dashboard: https://app.hackcanada.org
- Project Submissions: https://dorahacks.io/hackathon/hackcanada/detail

Questions? Email us at hello@hackcanada.org or message us on Discord.

See you soon!
- Hack Canada Team

--
Hack Canada | https://hackcanada.org
64 University Ave W, Waterloo, ON N2L 3C7
To unsubscribe, visit: https://app.hackcanada.org/unsubscribe`;

export const sendHackathonPrepEmail = async (data: HackathonPrepEmailProps) => {
  const { name, email, userId } = data;

  const htmlBody = await render(
    HackathonPrepEmail({
      name,
      userId,
    }),
  );

  const textBody = createHackathonPrepTextVersion(name);

  const params: SendEmailCommandInput = {
    Source: `Hack Canada <${process.env.AWS_SES_NO_REPLY_EMAIL!}>` || "",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hack Canada Event Details and Check-in Information",
      },
    },
  };

  try {
    await ses.sendEmail(params);
    return { success: true };
  } catch (error) {
    console.error("Error sending email with SES:", error);
    return {
      success: false,
      error: "Something went wrong. Email could not be sent.",
    };
  }
};
