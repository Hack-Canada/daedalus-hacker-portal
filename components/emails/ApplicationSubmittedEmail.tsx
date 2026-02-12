import {
  Body,
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

interface ApplicationSubmittedEmailProps {
  name: string;
}

const ApplicationSubmittedEmail = ({
  name,
}: ApplicationSubmittedEmailProps) => {
  return (
    <Html>
      <Preview>
        Thanks for applying to Hack Canada! Stay tuned for updates.
      </Preview>
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
            backgroundColor: "#F5F3FF",
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
            {/* Header Image - Updated dimensions for 1500x700 */}
            <Img
              src="https://hackcanada.org/email-headers/hack_canada_thanks_for_applying_header.png"
              width="600"
              alt="Thanks for applying to Hack Canada"
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
                  color: "#5B21B6",
                  fontSize: "28px",
                  fontWeight: "700",
                  margin: "0 0 16px 0",
                  textAlign: "center",
                }}
              >
                Application Submitted! 🎉
              </Heading>

              <Text
                style={{
                  color: "#4B5563",
                  fontSize: "16px",
                  lineHeight: "24px",
                  margin: "0 0 8px 0",
                  textAlign: "center",
                }}
              >
                Hey <strong style={{ color: "#374151" }}>{name}</strong> 🦫
              </Text>

              <Text
                style={{
                  color: "#4B5563",
                  fontSize: "16px",
                  lineHeight: "24px",
                  margin: "0 0 32px 0",
                  textAlign: "center",
                }}
              >
                Thank you for applying to Hack Canada! Your hacker application
                has been successfully submitted and is now under review.
              </Text>

              {/* Info Box - Purple theme matching header */}
              <Section
                style={{
                  // background:
                  //   "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
                  // border: "2px solid #DDD6FE",
                  // borderRadius: "12px",
                  padding: "32px 24px",
                  margin: "0 0 32px 0",
                }}
              >
                <Text
                  style={{
                    color: "#5B21B6",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "0 0 20px 0",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ⭐ What Happens Next?
                </Text>

                <Text
                  style={{
                    color: "#4B5563",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "0 0 16px 0",
                  }}
                >
                  <strong style={{ color: "#6B21A8" }}>
                    📋 Application Review:
                  </strong>
                  <br />
                  Our team is carefully reviewing all applications. Decisions
                  will be sent out after the application period closes.
                </Text>

                <Text
                  style={{
                    color: "#4B5563",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "0 0 16px 0",
                  }}
                >
                  <strong style={{ color: "#6B21A8" }}>
                    📊 Check Your Status:
                  </strong>
                  <br />
                  Track your application status anytime on your dashboard at{" "}
                  <Link
                    href="https://app.hackcanada.org"
                    style={{
                      color: "#7C3AED",
                      textDecoration: "underline",
                    }}
                  >
                    app.hackcanada.org
                  </Link>
                </Text>

                <Text
                  style={{
                    color: "#4B5563",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "0",
                  }}
                >
                  <strong style={{ color: "#6B21A8" }}>
                    📱 Stay Connected:
                  </strong>
                  <br />
                  Follow us on social media for updates, announcements, and
                  sneak peeks of what&apos;s coming!
                </Text>
              </Section>

              {/* Encouragement Box */}
              <Section
                style={{
                  background:
                    "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
                  border: "2px solid #BFDBFE",
                  borderRadius: "12px",
                  padding: "24px",
                  margin: "0 0 32px 0",
                }}
              >
                <Text
                  style={{
                    color: "#1E40AF",
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: 0,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  ✨ We&apos;re excited about your application and can&apos;t
                  wait to potentially see you at Hack Canada {hackathonYear}!
                </Text>
              </Section>

              {/* Contact Info */}
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: "15px",
                  lineHeight: "24px",
                  margin: "0 0 8px 0",
                  textAlign: "center",
                }}
              >
                Have questions or need to update your application?
              </Text>

              <Text
                style={{
                  color: "#6B7280",
                  fontSize: "15px",
                  lineHeight: "24px",
                  margin: "0 0 32px 0",
                  textAlign: "center",
                }}
              >
                Reach out to us at{" "}
                <Link
                  href="mailto:hi@hackcanada.org"
                  style={{
                    color: "#7C3AED",
                    textDecoration: "underline",
                  }}
                >
                  hi@hackcanada.org
                </Link>
              </Text>

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

            {/* Bottom Gradient Accent - Purple theme matching header */}
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg, #A78BFA 0%, #C084FC 33%, #F472B6 66%, #FB923C 100%)",
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

export default ApplicationSubmittedEmail;
