// No 'use client' — pure render, no hooks or browser APIs; works in server and client trees alike.

// next/image provides automatic size optimisation, lazy-loading, and WebP conversion.
import Image from 'next/image';

// cn() = twMerge(clsx()) — merges caller-supplied classes without Tailwind conflicts.
import { cn } from '@/lib/cn';

// ─── Props ────────────────────────────────────────────────────────────────────

interface EmaarLogoProps {
  // Intrinsic pixel size of the logo image (width = height, always square).
  size?: number;
  // When true, renders the company name beside the image; callers may hide it for icon-only contexts.
  showText?: boolean;
  // 'md' = header prominence (#1A1A1A, text-base); 'sm' = footer subdued (#7F8C8D, text-sm).
  textSize?: 'sm' | 'md';
  // Forwarded to the wrapper div so callers can add spacing, positioning, etc.
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

// EmaarLogo — shared logo image + optional wordmark atom.
// Centralises the brand mark so a single update propagates to Header and Footer.
export default function EmaarLogo({
  size = 48,        // 48 px is a comfortable default; Header overrides to 52, Footer to 40.
  showText = true,  // Show text by default — the component is almost always used with a label.
  textSize = 'md',  // Header is 'md'; Footer is 'sm' for visual hierarchy.
  className,        // undefined unless the caller provides additional utility classes.
}: EmaarLogoProps) {
  return (
    // Flex row keeps the image left of the text, matching the existing header / footer layout.
    // gap-3 = 12 px gutter — close enough to feel unified, not so tight it reads as one blob.
    // items-center vertically aligns image and text on their shared midpoint.
    <div className={cn('flex flex-row items-center gap-3', className)}>

      {/* ── Logo image ─────────────────────────────────────────────────────── */}
      {/* src="/emaar-logo.png" — actual brand PNG now in public/; replaces the placeholder SVG approach. */}
      {/* width + height both equal `size` — reserves the correct intrinsic square in the layout. */}
      {/* object-contain keeps the full logo visible inside the box without any cropping. */}
      {/* priority = preload this image; it's above the fold in the header and avoids an LCP penalty. */}
      <Image
        src="/emaar-logo.png"
        alt="Emaar International Industry LLC"
        width={size}
        height={size}
        className="object-contain"
        priority
      />

      {/* ── Company name ───────────────────────────────────────────────────── */}
      {/* Only rendered when showText=true — lets callers show a standalone icon when needed. */}
      {showText && (
        // font-bold = 700 weight, matching the brand wordmark treatment across the site.
        // Cairo is loaded globally in app/layout.tsx — no extra font import needed here.
        // leading-tight prevents double-line runover on narrow containers.
        // text-base (md) / text-sm (sm) controlled by textSize — drives visual hierarchy.
        <span
          className={cn(
            'font-bold leading-tight',
            textSize === 'md' ? 'text-base' : 'text-sm',
          )}
          // Inline style for exact brand colours — CLAUDE.md bars using Tailwind defaults here.
          // #1A1A1A = text-ink-heading (primary heading, maximum legibility on white/off-white).
          // #7F8C8D = text-ink-muted  (subdued, suits the smaller footer wordmark).
          style={{ color: textSize === 'md' ? '#1A1A1A' : '#7F8C8D' }}
        >
          {/* Legal entity name — shown identically in both EN and AR layouts. */}
          {/* The logo image already carries the brand visual; the text is a legibility aid. */}
          Emaar International Industry LLC
        </span>
      )}
    </div>
  );
}
