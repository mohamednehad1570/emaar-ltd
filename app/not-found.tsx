/**
 * app/not-found.tsx
 *
 * Rendered by Next.js App Router whenever a route has no match.
 * Server Component — no 'use client' needed; no interactivity required.
 *
 * The root layout (app/layout.tsx) already wraps this page in
 * LanguageProvider + Header + Footer, so those are NOT imported here.
 * Adding them again would duplicate the site shell.
 *
 * Design rules (CLAUDE.md):
 *   • bg-off-white — primary page background
 *   • brand-red     — 404 display number
 *   • Cairo via font-cairo — loaded globally, applies to all text
 *   • Warm shadows and brand tokens only
 */

import Link from 'next/link';
import { House, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: '404 — Page Not Found | EMAAR International',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">

        {/* 404 display number — brand-red, extrabold Cairo */}
        <p className="text-[9rem] md:text-[11rem] font-extrabold font-cairo leading-none text-brand-red select-none mb-2">
          404
        </p>

        {/* Red accent line — same pattern as section headings */}
        <div className="h-1 w-20 bg-brand-red rounded-full mx-auto mb-8" />

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold font-cairo text-brand-dark mb-4">
          Page Not Found
        </h1>

        {/* Body copy */}
        <p className="text-text-body text-lg leading-relaxed max-w-sm mx-auto mb-10">
          This page doesn&apos;t exist or has been moved. Let us help you find what you&apos;re looking for.
        </p>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary — solid red, same as site CTA buttons */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-brand-red hover:bg-brand-red-dark text-white font-bold transition-colors duration-200 shadow-warm-red min-h-[52px]"
          >
            <House size={20} weight="fill" />
            Back to Home
          </Link>

          {/* Secondary — white pill, warm border */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-white text-brand-dark font-semibold border border-border-medium hover:border-brand-silver transition-colors duration-200 shadow-warm-md min-h-[52px]"
          >
            Contact Us
            <ArrowRight size={18} weight="bold" />
          </Link>

        </div>
      </div>
    </div>
  );
}
