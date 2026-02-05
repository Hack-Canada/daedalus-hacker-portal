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
      <Preview>Reset your Hack Canada password securely</Preview>
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
        <Head />
        <Body
          style={{
            backgroundColor: "#F0F4F8",
            margin: 0,
            padding: 0,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <Container
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              padding: "20px 0",
            }}
          >
            {/* Header Image */}
            <Img
              src="https://hackcanada.org/email-headers/hack_canada_password_reset_header.png"
              width="600"
              alt="Password Reset - Hack Canada"
              style={{
                width: "100%",
                maxWidth: "600px",
                height: "auto",
                display: "block",
                borderRadius: "12px 12px 0 0",
              }}
            />

            {/* Main Content Section */}
            <Section
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "0 0 12px 12px",
                padding: "40px 32px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Greeting */}
              <Heading
                style={{
                  color: "#475569",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: "0 0 16px 0",
                  textAlign: "center",
                }}
              >
                Password Reset Request 🔐
              </Heading>

              <Text
                style={{
                  color: "#4B5563",
                  fontSize: "16px",
                  lineHeight: "24px",
                  margin: "0 0 32px 0",
                  textAlign: "center",
                }}
              >
                Hi <strong style={{ color: "#374151" }}>{name}</strong>, we
                received a request to reset your Hack Canada password. No
                worries, we&apos;ve got you covered!
              </Text>

              {/* Reset Button Box */}
              <Section
                style={{
                  background:
                    "linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%)",
                  border: "2px solid #BAE6FD",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  margin: "0 0 32px 0",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    color: "#0C4A6E",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 20px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  🔑 Secure Password Reset
                </Text>

                <Button
                  href={resetUrl}
                  style={{
                    backgroundColor: "#475569",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "inline-block",
                    padding: "14px 40px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(71, 85, 105, 0.2)",
                  }}
                >
                  Reset My Password
                </Button>

                <Text
                  style={{
                    color: "#64748B",
                    fontSize: "13px",
                    lineHeight: "20px",
                    margin: "16px 0 0 0",
                  }}
                >
                  This link will expire in 1 hour for security
                </Text>
              </Section>

              {/* Security Info Box */}
              <Section
                style={{
                  background:
                    "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                  border: "2px solid #FCD34D",
                  borderRadius: "12px",
                  padding: "24px",
                  margin: "0 0 32px 0",
                }}
              >
                <Text
                  style={{
                    color: "#78350F",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 12px 0",
                  }}
                >
                  🛡️ Security Tips:
                </Text>
                <Text
                  style={{
                    color: "#92400E",
                    fontSize: "14px",
                    lineHeight: "22px",
                    margin: "0 0 8px 0",
                  }}
                >
                  • Choose a strong, unique password
                </Text>
                <Text
                  style={{
                    color: "#92400E",
                    fontSize: "14px",
                    lineHeight: "22px",
                    margin: "0 0 8px 0",
                  }}
                >
                  • Never share your password with anyone
                </Text>
                <Text
                  style={{
                    color: "#92400E",
                    fontSize: "14px",
                    lineHeight: "22px",
                    margin: "0",
                  }}
                >
                  • Enable two-factor authentication when available
                </Text>
              </Section>

              {/* Disclaimer */}
              <Section
                style={{
                  backgroundColor: "#FEE2E2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  padding: "16px",
                  margin: "0 0 32px 0",
                }}
              >
                <Text
                  style={{
                    color: "#991B1B",
                    fontSize: "13px",
                    lineHeight: "20px",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  ⚠️ If you didn&apos;t request this password reset, please
                  ignore this email and your password will remain unchanged.
                  Consider updating your password if you&apos;re concerned about
                  your account security.
                </Text>
              </Section>

              <Hr
                style={{
                  border: "none",
                  borderTop: "1px solid #E5E7EB",
                  margin: "32px 0",
                }}
              />

              {/* Footer */}
              <div style={{ textAlign: "center" }}>
                {/* Social Links */}
                <div style={{ marginBottom: "20px" }}>
                  <Link
                    href="https://hackcanada.org"
                    target="_blank"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    Website
                  </Link>
                  <span style={{ color: "#D1D5DB" }}>•</span>
                  <Link
                    href="https://app.hackcanada.org"
                    target="_blank"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    Dashboard
                  </Link>
                  <span style={{ color: "#D1D5DB" }}>•</span>
                  <Link
                    href="https://discord.gg/wp42amwcWy"
                    target="_blank"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    Discord
                  </Link>
                  <span style={{ color: "#D1D5DB" }}>•</span>
                  <Link
                    href="https://www.instagram.com/hackcanada/"
                    target="_blank"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    Instagram
                  </Link>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <Link
                    href="https://www.linkedin.com/company/hack-canada"
                    target="_blank"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    LinkedIn
                  </Link>
                  <span style={{ color: "#D1D5DB" }}>•</span>
                  <Link
                    href="mailto:hi@hackcanada.org"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      textDecoration: "none",
                      margin: "0 8px",
                    }}
                  >
                    Contact Us
                  </Link>
                </div>

                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: "12px",
                    lineHeight: "18px",
                    margin: "8px 0",
                  }}
                >
                  © {hackathonYear} Hack Canada. All rights reserved.
                </Text>

                <Text
                  style={{
                    color: "#D1D5DB",
                    fontSize: "11px",
                    lineHeight: "16px",
                    margin: "8px 0 0 0",
                  }}
                >
                  Building the future, one hack at a time 🍁
                </Text>
              </div>
            </Section>

            {/* Bottom Gradient Accent - Cool blue/gray theme */}
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg, #BAE6FD 0%, #93C5FD 33%, #60A5FA 66%, #3B82F6 100%)",
                borderRadius: "0 0 12px 12px",
                marginTop: "-4px",
              }}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
