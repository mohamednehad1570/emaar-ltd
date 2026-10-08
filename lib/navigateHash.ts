/**
 * lib/navigateHash.ts
 *
 * Same-page hash links. Next's <Link> updates history without firing `hashchange`,
 * so hash listeners (e.g. ProjectsGrid) never hear about the new
 * anchor, and the scroll can be swallowed while a menu still holds the body
 * scroll-lock. This helper pushes the hash, notifies listeners, then scrolls once
 * the menu has unmounted. Landing offset comes from `scroll-padding-top` on <html>.
 */

/** Returns true when it handled the click — the caller must then preventDefault(). */
export function followSamePageHash(href: string): boolean {
  const [base, hash] = href.split('#')
  if (!hash || base !== window.location.pathname) return false

  history.pushState(null, '', `#${hash}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))

  // Two frames: the first lets React commit the menu close (and any hash-driven
  // filter change); the second measures after the body scroll-lock has lifted.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }))
  return true
}
