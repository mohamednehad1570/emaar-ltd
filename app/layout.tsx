import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageTransition from "@/components/layout/LanguageTransition";
import { getSiteSettings } from "@/lib/sanity/fetch";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch once at layout level — propagated to Header and Footer as props
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <MotionProvider>
          <LanguageProvider>
            <Header whatsappNumber={settings?.whatsappNumber} />
            <LanguageTransition>
              {children}
            </LanguageTransition>
            <Footer
              phone={settings?.phone}
              email={settings?.email}
              whatsappNumber={settings?.whatsappNumber}
            />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
