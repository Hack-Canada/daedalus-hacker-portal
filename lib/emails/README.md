# Email Configuration

This directory contains the email configuration for the application.

## `ses.ts`

This file contains the `sendEmail` function, which is used to send emails using AWS SES and React Email templates.

### `sendEmail` Function

The `sendEmail` function is an asynchronous function that takes the following parameters:

- `to`: The email address of the recipient.
- `subject`: The subject of the email.
- `body`: The HTML content of the email.

```typescript
export const sendEmail = async (to: string, subject: string, body: string) => {
  // ...
};
```

### `sendWelcomeEmail` Function

The `sendWelcomeEmail` function is a convenience function that handles rendering and sending the WelcomeEmail template:

```typescript
export const sendWelcomeEmail = async (
  name: string,
  subject: string,
  email: string,
) => {
  const body = await render(
    WelcomeEmail({
      name,
      verificationCode: "123456",
      verificationUrl: "https://google.com",
    }),
  );

  const result = await sendEmail(email, subject, body);

  return result;
};
```

### Rendering React Email Components

React Email components are rendered using the `render` function from `@react-email/render`. The process involves:

1. Importing the email component
2. Passing the required props to the component
3. Using `await render()` to generate the HTML content

Example:

```typescript
import { render } from "@react-email/render";

import WelcomeEmail from "@/components/emails/WelcomeEmail";

const emailHtml = await render(
  WelcomeEmail({
    name: "John Doe",
    verificationCode: "123456",
    verificationUrl: "https://example.com/verify",
  }),
);
```

The rendered HTML can then be used as the body content for the email.

**Example Usage:**

```typescript
import { sendWelcomeEmail } from "./ses";

const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  try {
    await sendWelcomeEmail(userName, "Welcome to our platform!", userEmail);
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};
```

## `components/emails` Directory

This directory contains the React Email templates. Each file in this directory should export a React component that can be used as an email template.

**Example:**

See `WelcomeEmail.tsx` for an example of an email template.

## Environment Variables

The following environment variables are required for the email functions to work:

- `AWS_SES_REGION`: The AWS region to use for SES.
- `AWS_SES_VERIFIED_EMAIL`: The verified email address to use as the sender.
- `AWS_SES_ACCESS_KEY_ID`: The AWS access key ID for SES authentication.
- `AWS_SES_SECRET_ACCESS_KEY`: The AWS secret access key for SES authentication.

Make sure these environment variables are set in your `.env` file or in your environment.

**Note:** While the AWS SDK can automatically discover credentials through other mechanisms (like shared credentials file or IAM roles), explicitly setting these environment variables ensures:

1. Clear understanding of which credentials are being used
2. Better security through scoped permissions
3. Consistent behavior across different environments
4. Easier debugging and maintenance
