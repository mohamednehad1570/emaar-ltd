/** Traps Tab inside `ref` while active, focuses `initial` on open, and returns focus to the opener on close. */

import { useEffect, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  initial?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!active) return;
    // Captured before we move focus, so closing lands back on the thumbnail that opened us
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    // One frame so a portal/AnimatePresence child has mounted before we focus into it
    const raf = requestAnimationFrame(() => (initial?.current ?? focusables()[0])?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = ref.current?.contains(document.activeElement) ?? false;
      // Wrap at both ends; focus that escaped (e.g. a click on the backdrop) is pulled back in
      if (!inside || (e.shiftKey && document.activeElement === first)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [active, ref, initial]);
}
