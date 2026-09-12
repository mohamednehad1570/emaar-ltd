'use client'

/**
 * components/ui/InfiniteMarquee.tsx
 *
 * Shared infinite marquee track used by ProductsSection and ProjectsSection.
 *
 * Implementation: pure Framer Motion animate — no CSS keyframes, no @keyframes,
 * no CSS custom properties. This avoids all RTL/dir layout conflicts.
 *
 * How the loop works:
 *   - Children are rendered TWICE side by side (total width = 2 × single set)
 *   - x animates from 0 to -(singleSetWidth) for left direction
 *   - x animates from -(singleSetWidth) to 0 for right direction
 *   - repeat: Infinity + repeatType: "loop" makes it seamless
 *   - The track wrapper has dir="ltr" always — direction is handled by x sign
 *
 * Hover: pauses the animation via useAnimationControls.
 */

import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

interface InfiniteMarqueeProps {
  /** Duration in seconds for one full loop */
  duration:    number
  /** 'left' = cards move left (x: 0 → -width), 'right' = opposite */
  direction:   'left' | 'right'
  /** Whether any card is currently hovered — pauses the track */
  paused:      boolean
  children:    React.ReactNode
  /** The children are rendered twice — pass the same children for both copies */
  childrenCopy: React.ReactNode
}

export default function InfiniteMarquee({
  duration,
  direction,
  paused,
  children,
  childrenCopy,
}: InfiniteMarqueeProps) {
  const controls    = useAnimationControls()
  const trackRef    = useRef<HTMLDivElement>(null)
  // Width of a single set of cards — measured after mount
  const [width, setWidth] = useState(0)

  // Measure the width of one set of cards after the DOM renders
  useEffect(() => {
    if (!trackRef.current) return
    // The track contains two identical sets — half the scrollWidth = one set
    const singleWidth = trackRef.current.scrollWidth / 2
    setWidth(singleWidth)
  }, [children])

  // Start or update the animation whenever width, direction, or duration changes
  useEffect(() => {
    if (!width) return

    // x start and end depend on direction
    // left:  0 → -width (cards move left, track moves left)
    // right: -width → 0 (cards move right, track moves right)
    const fromX = direction === 'left' ? 0 : -width
    const toX   = direction === 'left' ? -width : 0

    controls.start({
      x: [fromX, toX],
      transition: {
        duration,
        ease:       'linear',
        repeat:     Infinity,
        repeatType: 'loop',
      },
    })
  }, [width, direction, duration, controls])

  // Pause/resume when hovered state changes
  useEffect(() => {
    if (paused) {
      controls.stop()
    } else if (width) {
      // Resume from wherever the animation stopped
      const fromX = direction === 'left' ? 0 : -width
      const toX   = direction === 'left' ? -width : 0
      controls.start({
        x: [fromX, toX],
        transition: {
          duration,
          ease:       'linear',
          repeat:     Infinity,
          repeatType: 'loop',
        },
      })
    }
  }, [paused, width, direction, duration, controls])

  return (
    // Outer wrapper: overflow-hidden clips the track, dir=ltr always
    // dir=ltr is critical — prevents RTL context from reversing flex layout
    <div className="overflow-hidden w-full" dir="ltr">
      <motion.div
        ref={trackRef}
        // animate via controls — started in useEffect above
        animate={controls}
        // Flex row always LTR — gap-3 matches card spacing in both sections
        className="flex gap-3 w-max"
        // will-change: transform tells browser to promote to GPU layer
        style={{ willChange: 'transform' }}
      >
        {/* First copy */}
        {children}
        {/* Second copy — identical, placed immediately after */}
        {childrenCopy}
      </motion.div>
    </div>
  )
}
