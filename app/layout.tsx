import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nestory.in"),
  title: "Nestory — Every property. One beautiful link.",
  description: "Create beautiful, shareable property pages for your clients. Built for brokers and channel partners in India.",
  openGraph: {
    title: "Nestory — Every property. One beautiful link.",
    description: "Beautiful, shareable property pages for brokers and channel partners.",
    images: ["/og-cobalt.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestory — Every property. One beautiful link.",
    description: "Beautiful, shareable property pages for brokers and channel partners.",
    images: ["/og-cobalt.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
