'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    let raf;
    const start = () => {
      if (preference.matches || lenis) return;
      lenis = new Lenis({
        autoRaf: false,
        anchors: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
      });
      raf = time => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add('lenis', 'lenis-smooth');
    };
    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = undefined;
      raf = undefined;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
    const onPreference = () => preference.matches ? stop() : start();
    const onMenuOpen = () => lenis?.stop();
    const onMenuClose = () => lenis?.start();
    const onScrollTo = event => {
      if (!lenis || !event.detail) return;
      lenis.scrollTo(event.detail, { offset: -24, immediate: preference.matches });
    };
    start();
    preference.addEventListener('change', onPreference);
    window.addEventListener('kaysin:menu-open', onMenuOpen);
    window.addEventListener('kaysin:menu-close', onMenuClose);
    window.addEventListener('kaysin:scroll-to', onScrollTo);
    return () => {
      preference.removeEventListener('change', onPreference);
      window.removeEventListener('kaysin:menu-open', onMenuOpen);
      window.removeEventListener('kaysin:menu-close', onMenuClose);
      window.removeEventListener('kaysin:scroll-to', onScrollTo);
      stop();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);
  return null;
}
