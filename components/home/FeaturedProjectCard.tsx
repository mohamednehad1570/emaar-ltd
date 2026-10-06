'use client';

/**
 * components/home/FeaturedProjectCard.tsx
 *
 * Image-led project-type card (Residential / Commercial) with text overlaid
 * at the bottom-start corner. Hover deepens the warm gradient, zooms the
 * image and underlines "Explore" in brand red. Hover utilities are Tailwind
 * (hover-capable devices only); entrance motion lives on the parent motion.li.
 */

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import ImageSlot from '@/components/ui/ImageSlot';
import { useTranslation } from '@/contexts/LanguageContext';
import { HOME_FEATURED_COPY, type FeaturedProject } from '@/lib/data/uiStrings';
import { cn } from '@/lib/cn';

interface FeaturedProjectCardProps {
  project: FeaturedProject;
  /** Reduced motion drops the image zoom — gradient and underline changes stay */
  reduceMotion: boolean;
}

export default function FeaturedProjectCard({ project, reduceMotion }: FeaturedProjectCardProps) {
  const t = useTranslation();
  const label = t(project.label.en, project.label.ar);
  const { explore } = HOME_FEATURED_COPY.projects;

  return (
    <Link
      href={project.href}
      aria-label={`${label} — ${t(project.line.en, project.line.ar)}`}
      className={cn(
        'group relative block overflow-hidden rounded-sm shadow-warm-sm',
        'transition-[scale] duration-300 ease-out active:scale-98',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-material',
      )}
    >
      {/* ── Image ───────────────────────────────────────────── */}
      <div
        className={cn(
          'transition-[scale] duration-400 ease-out',
          !reduceMotion && 'group-hover:scale-103',
        )}
      >
        {/* 16:9 on phone + desktop; 4:3 on tablet where two columns are narrow */}
        <ImageSlot
          src={project.image}
          alt={label}
          ratio="16/9"
          className="rounded-none md:aspect-4/3 lg:aspect-video"
          sizes="(min-width:768px) 50vw, 100vw"
        />
      </div>

      {/* ── Overlay ─────────────────────────────────────────── */}
      {/* Warm ink (45,41,38), never black; fades out by 60% height so the top stays clear.
          Kept even over the blank cream placeholder so the white copy stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-warm-ink/72 to-transparent to-60%" />
      {/* Deeper 0.82 layer crossfades in on hover — opacity is animatable, gradient stops are not */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-warm-ink/82 to-transparent to-60% opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* ── Content ─────────────────────────────────────────── */}
      {/* inset-x-0 + text-start = bottom-start corner in both directions */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-start">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/80">
          {label}
        </p>
        <p className="mt-1 text-base font-bold leading-snug text-white lg:text-2xl">
          {t(project.line.en, project.line.ar)}
        </p>
        {/* min-h-11 keeps a 44px row; explicit text-white beats the global a:hover red */}
        <span className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white">
          <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 group-hover:decoration-brand-red">
            {t(explore.en, explore.ar)}
          </span>
          {/* Mirrored in RTL so it points along the reading direction */}
          <ArrowRight size={16} aria-hidden="true" className="text-white rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
