import type { Metadata } from "next";

import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { siteConfig } from "@/config/site";
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn("", fredoka.className, rubik.variable)}>
        <Toaster richColors position="bottom-center" />
        <SessionProvider session={session}>
          <div className="flex h-full min-h-svh flex-col">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
