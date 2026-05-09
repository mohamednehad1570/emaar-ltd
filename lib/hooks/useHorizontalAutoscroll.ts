import { useEffect, type RefObject } from 'react';

export default function useHorizontalAutoscroll(
    ref: RefObject<HTMLDivElement | null>,
    paused: boolean,
    speed: number = 0.6
): void {
    useEffect(() => {
        const el = ref.current;
        if (!el || paused) return;

        let frame: number;
        let direction = 1;

        const step = () => {
            if (!el) return;
            const max = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= max - 1) direction = -1;
            if (el.scrollLeft <= 0) direction = 1;
            el.scrollLeft += direction * speed;
            frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [ref, paused, speed]);
}
