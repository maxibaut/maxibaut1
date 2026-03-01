import { useRef, useState, useEffect } from 'react';

/**
 * Delays loading an iframe until it scrolls into the viewport.
 * Returns a ref to attach to a wrapper element, and a boolean indicating
 * whether the iframe source should be set.
 */
export function useLazyIframe(rootMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}
