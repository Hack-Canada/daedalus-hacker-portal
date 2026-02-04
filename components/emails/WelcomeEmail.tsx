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
        <Head />
        <Body style={{ backgroundColor: "#FFF5F5", margin: 0, padding: 0 }}>
          <Container
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              padding: "20px 0",
            }}
          >
            {/* Header Image */}
            <Img
              src="https://hackcanada.org/email-headers/hack_canada_welcom_header.png"
              width="600"
              alt="Welcome to Hack Canada"
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
                  color: "#5D2E46",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: "0 0 16px 0",
                  textAlign: "center",
                }}
              >
                Welcome, {name}! 🎉
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
                Thank you for signing up! Please verify your email address using
                the code below:
              </Text>

              {/* Verification Code Box */}
              <Section
                style={{
                  background:
                    "linear-gradient(135deg, #FFE5EC 0%, #FFF0F5 100%)",
                  border: "2px solid #F8BBD0",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  margin: "0 0 32px 0",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    color: "#5D2E46",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  🔐 Your Verification Code
                </Text>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "2px dashed #F8BBD0",
                    borderRadius: "8px",
                    padding: "20px",
                    margin: "0 auto",
                    maxWidth: "280px",
                  }}
                >
                  <Text
                    style={{
                      color: "#C2185B",
                      fontSize: "36px",
                      fontWeight: "700",
                      letterSpacing: "8px",
                      margin: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {verificationCode}
                  </Text>
                </div>
              </Section>

              {/* CTA Button */}
              <div style={{ textAlign: "center", margin: "0 0 32px 0" }}>
                <Text
                  style={{
                    color: "#6B7280",
                    fontSize: "14px",
                    margin: "0 0 16px 0",
                  }}
                >
                  Click the button below to complete verification:
                </Text>
                <Button
                  href={verificationUrl}
                  style={{
                    backgroundColor: "#5D2E46",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "inline-block",
                    padding: "14px 40px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(93, 46, 70, 0.2)",
                  }}
                >
                  Verify Email Address
                </Button>
              </div>

              {/* Disclaimer */}
              <Section
                style={{
                  backgroundColor: "#FFF9E6",
                  border: "1px solid #FFE082",
                  borderRadius: "8px",
                  padding: "16px",
                  margin: "0 0 32px 0",
                }}
              >
                <Text
                  style={{
                    color: "#F57C00",
                    fontSize: "13px",
                    lineHeight: "20px",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  ⚠️ If you didn&apos;t sign up for Hack Canada, please ignore
                  this email. Your account won&apos;t be created without
                  verification.
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

            {/* Bottom Gradient Accent */}
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg, #F8BBD0 0%, #FFB74D 50%, #CE93D8 100%)",
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

export default WelcomeEmail;
