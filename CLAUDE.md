# Emaar International Website

## Project
Premium uPVC & aluminum windows/doors manufacturer website (UAE).
Next.js + TypeScript + Tailwind CSS + Framer Motion + Phosphor Icons.

## Skills
Always read these skills before generating any design or code:
- emaar-ui-design-expert
- emaar-fullstack-engineer
- annotated-commands

## Critical rules
1. NO BLUE — zero tolerance for blue or blue derivatives in any color, shadow, border
2. Warm shadows only — rgba(45,41,38,x), NEVER rgba(0,0,0,x)
3. Light mode only — no dark mode
4. Cairo font only — never Inter/Roboto/Arial
5. TypeScript strict — no `any` type
6. Server components first — 'use client' only for interactivity
7. Tailwind semantic tokens — bg-off-white not bg-[#F5F4F0]
8. 44px minimum touch targets
9. Handle all states: loading, empty, error, RTL, mobile
10. Annotate all code with inline comments

## Key colors
- White #FFFFFF, Off-white #F5F4F0, Cream #ECEAE4
- Silver #C0C6CA (flat, shimmer on hover only)
- Red #E74C3C (CTAs), Red dark #C0392B (hover)
- Gold #C9A84C (awards/certs only)
- Text: #1A1A1A headings, #3D3A37 body, #7F8C8D muted
- Borders: #E4E2DC light, #CCCAC4 medium

## File structure
- app/ — routes (App Router)
- components/ui/ — atomic components (Button, Input, Card)
- components/layout/ — Header, Footer, PageTransition
- components/sections/ — page sections (Hero, FeaturedProducts)
- lib/ — utilities, Sanity client, i18n
- contexts/ — React context providers
