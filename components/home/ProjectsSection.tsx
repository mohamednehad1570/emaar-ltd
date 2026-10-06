'use client';

/**
 * components/home/ProjectsSection.tsx
 *
 * Homepage featured projects — two image-led type cards (Residential /
 * Commercial) linking to the /projects anchors. Replaced the marquee; no
 * autoplay, cards cascade in once on scroll.
 */

import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/layout/Container';
import FeaturedHeading from '@/components/home/FeaturedHeading';
import FeaturedProjectCard from '@/components/home/FeaturedProjectCard';
import { FEATURED_PROJECTS, HOME_FEATURED_COPY } from '@/lib/data/uiStrings';
import { featuredGrid, featuredItem, featuredViewport } from '@/lib/motion';

export default function ProjectsSection() {
  // Explicit hook (not just MotionConfig) — it also gates the CSS image zoom in the cards
  const reduce = useReducedMotion() ?? false;
  const copy = HOME_FEATURED_COPY.projects;

  return (
    <section className="bg-surface-white py-24" aria-labelledby="projects-heading">
      <Container>
        <FeaturedHeading id="projects-heading" eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        {/* ── Grid ────────────────────────────────────────────── */}
        {/* Stacked on phones (16px gap); side by side from md (24px gap) */}
        <motion.ul
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
          variants={featuredGrid}
          initial="hidden"
          whileInView="visible"
          viewport={featuredViewport}
        >
          {FEATURED_PROJECTS.map((project) => (
            <motion.li key={project.type} variants={featuredItem(reduce)}>
              <FeaturedProjectCard project={project} reduceMotion={reduce} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
