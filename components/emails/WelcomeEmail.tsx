import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
  name: string;
  verificationCode: string;
  verificationUrl: string;
}

const WelcomeEmail = ({
  name,
  verificationCode,
  verificationUrl,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {verificationCode} - Your verification code. Welcome to Hack Canada!
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#1E90FF",
                primaryLight: "#87CEEB",
                primaryDark: "#1565C0",
                background: "#F8FAFC",
                backgroundMuted: "#E5E7EB",
                textPrimary: "#1F2937",
                textSecondary: "#4B5563",
                textMuted: "#9CA3AF",
                border: "#E5E7EB",
                success: "#4CAF50",
                error: "#F44336",
              },
            },
          },
        }}
      >
        <Body className="rounded-lg bg-primary/5">
          <Container className="mx-auto max-w-2xl px-4 py-8">
            <Img
              src="https://i.imgur.com/OBbPUOD.png"
              width={500}
              alt="Hack Canada"
              className="w-full rounded-t-lg"
            />
            <Section className="rounded-b-lg bg-background/95 p-6 shadow-lg backdrop-blur-sm">
              <Heading className="text-2xl font-semibold text-textPrimary">
                Welcome, {name}! 🎉
              </Heading>
              <Text
                className="text-textSecondary"
                style={{ marginTop: "-1rem" }}
              >
                Thank you for signing up! Please verify your email address using
                the code below:
              </Text>
              <Hr className="mb-6 border-gray-200" />

              <Section className="mb-4 rounded-lg border border-blue-500/10 bg-primary/5 to-primary/5 p-6 shadow-sm">
                <div className="text-center">
                  <Text className="text-textSecondary">
                    🔐 Your verification code is:
                  </Text>
                  <div className="mt-2 rounded-lg bg-primary/5 px-6 py-4 text-4xl font-bold tracking-wider text-primary">
                    {verificationCode}
                  </div>
                </div>
              </Section>

              <div className="text-center">
                <Text className="mb-4 text-textSecondary">
                  Click the button below to go to the verification page:
                </Text>
                <Button
                  href={verificationUrl}
                  className="inline-block rounded-lg bg-[#0A1F44] px-8 py-3 text-center font-semibold text-white no-underline transition-all duration-200 hover:brightness-110"
                >
                  Verify Email
                </Button>
              </div>

              <Text className="mt-8 text-center text-sm text-textMuted">
                ❗ If you did not sign up for our platform, please ignore this
                email. ❗
              </Text>

              <Hr className="my-6 border-gray-200" />

              {/* Footer */}
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "16px" }}>
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="https://hackcanada.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hack Canada
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="https://app.hackcanada.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dashboard
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="https://discord.gg/wp42amwcWy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="https://www.instagram.com/hackcanada/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="https://www.linkedin.com/company/hack-canada"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                    href="mailto:hello@hackcanada.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </Link>
                </div>
                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: "12px",
                    margin: "8px 0",
                  }}
                >
                  Copyright © 2025 Hack Canada
                </Text>
                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: "12px",
                    margin: "8px 0",
                  }}
                >
                  All rights reserved.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
