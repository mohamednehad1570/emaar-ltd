import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageTransition from "@/components/layout/LanguageTransition";
import { SITE_SETTINGS } from "@/lib/data/siteSettings";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://emaarupvc.ae'),
  title: {
    default:  'Emaar International — Premium uPVC & Aluminium Windows UAE',
    template: '%s — Emaar International',
  },
  description:
    'UAE manufacturer of premium uPVC and aluminum windows, doors, facades, and glass systems.',
  openGraph: {
    siteName: 'Emaar International',
    locale:   'en_US',
    type:     'website',
  },
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
            {/* Header/Footer keep their contact props so the custom CMS can feed them later */}
            <Header whatsappNumber={SITE_SETTINGS.whatsappNumber} />
            <LanguageTransition>
              {children}
            </LanguageTransition>
            <Footer
              phone={SITE_SETTINGS.phone}
              email={SITE_SETTINGS.emails.info}
              whatsappNumber={SITE_SETTINGS.whatsappNumber}
            />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
