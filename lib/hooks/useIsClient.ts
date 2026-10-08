/** true after hydration, false during SSR — via useSyncExternalStore, so no setState-in-effect round trip. */

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

export const useIsClient = (): boolean => useSyncExternalStore(noopSubscribe, () => true, () => false);
