'use client';

import { useEffect } from 'react';

export function RevealAnimations() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length === 0) {
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
      {
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => {
      // Check if element is already in viewport on initial load
      const rect = el.getBoundingClientRect();
      const isInitiallyVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

      if (isInitiallyVisible) {
        // Immediately add in-view class for elements already visible
        requestAnimationFrame(() => {
          el.classList.add('in-view');
        });
      } else {
        // Observe elements not yet in viewport
        observer.observe(el);
      }
    });

    return () => {
      revealElements.forEach((el) => {
        observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  return null;
}
