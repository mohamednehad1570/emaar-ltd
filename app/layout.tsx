import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMAAR International LLC - Premium uPVC & Aluminum Solutions",
  description: "Leading manufacturer of premium uPVC windows, doors, and aluminum facades in the UAE. ISO certified with 20+ years of excellence.",
  keywords: "uPVC windows, aluminum doors, UAE, Dubai, premium windows, curtain walls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <MotionProvider>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
