/**
 * components/ui/LtrText.tsx
 *
 * Bidi island for left-to-right data inside Arabic text: product codes, RAL numbers,
 * phone numbers, dimensions, emails, counters ("2 / 6") and Latin brand names.
 * <bdi dir="ltr"> isolates the run (unicode-bidi: isolate) AND forces its base
 * direction, so "+971 56 666 8273" or "RAL 9016" never reorder around Arabic words and
 * never pull neighbouring punctuation into their run. In English it renders exactly like
 * the plain <span dir="ltr"> it replaces.
 * Elements that are themselves the data (a tel: link) keep dir="ltr" on that element.
 */

import type { ReactNode } from 'react';

export default function LtrText({ children, className }: { children: ReactNode; className?: string }) {
  return <bdi dir="ltr" className={className}>{children}</bdi>;
}
