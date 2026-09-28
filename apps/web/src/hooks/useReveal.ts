import { useEffect } from 'react';

/** Adds `in-view` to [data-reveal] elements on scroll. Safety net: everything is
 *  revealed after 1.2s so no content can stay hidden (e.g. inside sliders). */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    const revealAll = () => els.forEach((el) => el.classList.add('in-view'));

    if (typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    const timer = window.setTimeout(revealAll, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);
}
