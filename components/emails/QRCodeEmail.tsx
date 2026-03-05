import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
  qrCodeSrc: string;
};

const QRCodeEmail = ({ name, qrCodeSrc }: Props) => {
  return (
    <Html>
      <Preview>Your Hack Canada QR Code</Preview>
      <Head />
      <Body
        style={{
          backgroundColor: "#F9FAFB",
          margin: 0,
          padding: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "20px 0" }}
        >
          <Section
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "40px 32px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Heading
              style={{
                color: "#1E90FF",
                fontSize: "28px",
                fontWeight: "700",
                margin: "0 0 16px 0",
                textAlign: "center" as const,
              }}
            >
              Your QR Code
            </Heading>

            <Text
              style={{
                color: "#4B5563",
                fontSize: "16px",
                lineHeight: "26px",
                margin: "0 0 24px 0",
                textAlign: "center" as const,
              }}
            >
              Hey {name}! Here&apos;s your QR code for Hack Canada. Save this
              email or download the QR code for easy access during check-in.
            </Text>

            <Section
              style={{
                textAlign: "center" as const,
                margin: "0 0 24px 0",
              }}
            >
              <Img
                src={qrCodeSrc}
                width={250}
                height={250}
                alt="Your Hack Canada QR Code"
                style={{
                  margin: "0 auto",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              />
            </Section>

            <Text
              style={{
                color: "#6B7280",
                fontSize: "14px",
                lineHeight: "22px",
                margin: "0 0 16px 0",
                textAlign: "center" as const,
              }}
            >
              Present this QR code at check-in and for any activities during the
              event. You can also access it anytime from your dashboard.
            </Text>

            <Section
              style={{
                backgroundColor: "#F0F9FF",
                borderRadius: "8px",
                padding: "16px",
                margin: "24px 0 0 0",
              }}
            >
              <Text
                style={{
                  color: "#1E40AF",
                  fontSize: "14px",
                  lineHeight: "22px",
                  margin: "0",
                  textAlign: "center" as const,
                }}
              >
                <strong>Tip:</strong> Screenshot this QR code or add it to your
                phone&apos;s photo gallery for quick access!
              </Text>
            </Section>
          </Section>

          <Text
            style={{
              color: "#9CA3AF",
              fontSize: "12px",
              lineHeight: "20px",
              margin: "24px 0 0 0",
              textAlign: "center" as const,
            }}
          >
            Hack Canada | hackcanada.org
            <br />
            2240 University Ave, Waterloo, ON N2K 0G3
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default QRCodeEmail;
