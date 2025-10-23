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

interface ApplicationSubmittedEmailProps {
  name: string;
}

const ApplicationSubmittedEmail = ({
  name,
}: ApplicationSubmittedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for applying to Hack Canada!</Preview>
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
          <Container className="mx-auto max-w-[42rem] px-3 py-6">
            <Img
              src="https://i.imgur.com/pjSy91v.png"
              width={500}
              alt="Hack Canada"
              className="w-full rounded-t-lg"
            />
            <Section className="rounded-b-lg bg-background p-6 shadow-sm">
              <Heading className="text-2xl font-semibold text-textPrimary">
                Thanks for applying! 🎉
              </Heading>
              <Text className="mt-4 text-textPrimary">Hello {name} 🦫</Text>
              <Text className="mt-2 text-textPrimary">
                Thank you for applying to Hack Canada! Your hacker application
                has been successfully submitted.
              </Text>
              <Hr className="my-6 border-gray-200" />

              <Section className="mb-6 rounded-lg border border-blue-500/10 bg-primary/5 p-6">
                <Text className="text-textSecondary">
                  Please note that application decisions will not be sent out
                  until after applications close. Our team is working hard on
                  reviewing all the applications and decisions will be released
                  as soon as possible.
                </Text>
                <Text className="mt-4 text-textSecondary">
                  Your current application status is also available on your
                  dashboard in the application platform at{" "}
                  <Link
                    href="mailto:hello@hackcanada.org"
                    className="text-primary hover:text-primaryDark"
                  >
                    https://app.hackcanada.org
                  </Link>
                  .
                </Text>
                <Text className="mt-4 text-textSecondary">
                  In the meantime, keep an eye out on our social media platforms
                  for any updates or changes to the application process or our
                  hackathon schedule.
                </Text>
              </Section>

              <Text className="mt-6 text-textPrimary">
                If you have any questions or concerns, please email us at{" "}
                <Link
                  href="mailto:hello@hackcanada.org"
                  className="text-primary hover:text-primaryDark"
                >
                  hello@hackcanada.org
                </Link>
                , or reach out via our socials.
              </Text>

              <Text className="mt-2 text-sm text-textMuted">
                We look forward to seeing you at Hack Canada!
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

export default ApplicationSubmittedEmail;
