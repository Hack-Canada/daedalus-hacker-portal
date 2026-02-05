import type { Metadata } from "next";

import "./globals.css";

import Script from "next/script";
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
      <Script id="clarity-script" strategy="afterInteractive">
        {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vcg0101ac4");`}
      </Script>
    </html>
  );
}
