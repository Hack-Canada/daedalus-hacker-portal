import type { Metadata } from "next";

import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { siteConfig, hackathonYear, eventDate } from "@/config/site";
import { fredoka, rubik } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  keywords: siteConfig.keywords,
  robots: siteConfig.robots,
  verification: siteConfig.verification,
  alternates: {
    canonical: "https://app.hackcanada.org",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Hack Canada ${hackathonYear}`,
    description: "Canada's premier student hackathon bringing together 500+ innovators, developers, and creators for 36 hours of building, learning, and networking.",
    startDate: eventDate.toISOString(),
    endDate: new Date(eventDate.getTime() + 36 * 60 * 60 * 1000).toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Wilfrid Laurier University",
      address: {
        "@type": "PostalAddress",
        streetAddress: "75 University Ave W",
        addressLocality: "Waterloo",
        addressRegion: "ON",
        postalCode: "N2L 3C5",
        addressCountry: "CA",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Hackathons Canada",
      url: "https://hackcanada.org",
      logo: "https://app.hackcanada.org/logo.webp",
      sameAs: [
        "https://discord.gg/hackathonscanada",
        "https://instagram.com/hackathonscanada",
        "https://linkedin.com/company/hackathons-canada",
      ],
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: "https://app.hackcanada.org/applications",
      validFrom: new Date().toISOString(),
    },
    performer: {
      "@type": "Organization",
      name: "Hackathons Canada",
    },
    image: "https://app.hackcanada.org/opengraph-image.png",
    url: "https://app.hackcanada.org",
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hack Canada Hacker Portal",
    alternateName: ["HC Hacker Portal", "Hack Canada Portal", "HC Portal"],
    url: "https://app.hackcanada.org",
    description: "Official hacker portal for Hack Canada - Apply, manage your application, and access all hackathon resources.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://app.hackcanada.org/applications?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hack Canada",
    alternateName: "HC",
    url: "https://app.hackcanada.org",
    logo: "https://app.hackcanada.org/logo.webp",
    description: "Canada's premier student hackathon and hacker community with 3000+ members across the country.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hi@hackcanada.org",
      contactType: "Customer Service",
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
    sameAs: [
      "https://hackcanada.org",
      "https://discord.gg/hackathonscanada",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <link rel="canonical" href="https://app.hackcanada.org" />
      </head>
      <body className={cn("", fredoka.className, rubik.variable)}>
        <Toaster richColors position="bottom-center" />
        <SessionProvider session={session}>
          <div className="flex h-full min-h-svh flex-col">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
