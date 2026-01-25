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
import { hackathonYear } from "@/config/site";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

const ResetPasswordEmail = ({ name, resetUrl }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Hack Canada password</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#1E90FF",
                primaryDark: "#1565C0",
                background: "#FFFFFF",
                backgroundMuted: "#F8FAFC",
                textPrimary: "#1F2937",
                textSecondary: "#4B5563",
                textMuted: "#9CA3AF",
              },
            },
          },
        }}
      >
        <Body className="bg-backgroundMuted">
          <Container className="mx-auto max-w-2xl px-3 py-6">
            <Img
              src="https://i.imgur.com/OBbPUOD.png"
              width={500}
              alt="Hack Canada"
              className="w-full rounded-t-lg"
            />
            <Section className="bg-background rounded-b-lg p-6 shadow-xs">
              <Heading className="text-textPrimary text-2xl font-semibold">
                Password Reset Request
              </Heading>
              <Text className="text-textPrimary mt-4">
                Hi {name}, we received a request to reset your Hack Canada
                password.
              </Text>
              <Hr className="mb-6 border-gray-200" />

              <Section className="bg-primary/5 mb-6 rounded-lg border border-blue-500/10 p-6 text-center shadow-xs">
                <div className="text-center">
                  <Text className="text-textSecondary">
                    Click the button below to reset your password:
                  </Text>
                </div>
                <Button
                  href={resetUrl}
                  className="mb-2 inline-block rounded-lg bg-[#0A1F44] px-8 py-3 text-center font-semibold text-white no-underline transition-all duration-200 hover:brightness-110"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-textMuted mt-8 text-center text-sm">
                ❗ If you didn&apos;t request this password reset, please ignore
                this email. ❗
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
                  Copyright © {hackathonYear} Hack Canada
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

export default ResetPasswordEmail;
