import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/sora";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nestory.in"),
  title: "Nestory AI — Upload everything once. Share one beautiful link.",
  description: "Turn developer brochures, price sheets, floor plans, photos and text into a premium property microsite for your clients.",
  openGraph: {
    title: "Nestory AI — Upload everything once. Share one beautiful link.",
    description: "AI-generated, source-backed property microsites for brokers and channel partners.",
    images: ["/og-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestory AI — Upload everything once. Share one beautiful link.",
    description: "AI-generated, source-backed property microsites for brokers and channel partners.",
    images: ["/og-ai.png"],
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
