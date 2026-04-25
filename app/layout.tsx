import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Kussagra Pathak - Full-Stack Developer & Tech Visionary",
  description: "Full-Stack Developer specializing in Angular, Flutter, and Node.js. Building scalable apps with engineering precision. Explore my portfolio of production-ready software solutions.",
  keywords: ["Full-Stack Developer", "Angular", "Flutter", "Node.js", "Web Development", "Mobile App Development", "TypeScript"],
  authors: [{ name: "Kussagra Pathak" }],
  creator: "Kussagra Pathak",
  publisher: "Kussagra Pathak",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  metadataBase: new URL("https://kussagrapathak.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kussagra Pathak - Full-Stack Developer & Tech Visionary",
    description: "Full-Stack Developer specializing in Angular, Flutter, and Node.js.",
    url: "https://kussagrapathak.in",
    siteName: "Kussagra Pathak Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kussagra Pathak - Full-Stack Developer",
      },
    ],
  },
  alternates: {
    canonical: "https://kussagrapathak.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://kussagrapathak.in" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-white font-sans" suppressHydrationWarning={true}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
