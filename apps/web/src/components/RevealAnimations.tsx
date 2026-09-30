'use client';

import { useEffect } from 'react';

/**
 * Client-side component that triggers reveal animations for elements with data-reveal attribute.
 * Uses IntersectionObserver to add the "in-view" class when elements enter the viewport.
 */
export function RevealAnimations() {
  useEffect(() => {
    // Create intersection observer to trigger reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve once revealed to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Start animation slightly before element fully visible
      }
    );

    // Find all elements with data-reveal attribute
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup observer on unmount
    return () => {
      revealElements.forEach((el) => {
        observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  return null;
}
