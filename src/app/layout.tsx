import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // Stays noindex until the owner approves launch and SITE_INDEXABLE=true.
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // Lets Next.js switch smooth scrolling off during route changes (the CSS
    // sets `scroll-behavior: smooth` for in-page links).
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
