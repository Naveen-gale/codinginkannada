import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Slightly snappier than 1.2 — reduces the perceived "lag" on lower-end devices
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      // Disable smooth-touch: native momentum scrolling is already GPU-accelerated on mobile
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // Expose lenis instance so Footer's scrollToTop can use it
    window.__lenis = lenis;

    // Sync ScrollTrigger with Lenis scroll events (passive, no extra rAF overhead)
    lenis.on('scroll', ScrollTrigger.update);

    // Use a named ticker function so we can remove the exact same reference on cleanup
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    // Keep lag-smoothing ON (default 500ms / 33ms) — it prevents GSAP from skipping
    // huge frame jumps (tab-switch, background throttling) which would cause stutters.
    // Setting it to 0 disables this protection and can CAUSE lag on slow devices.
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      window.__lenis = null;
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
