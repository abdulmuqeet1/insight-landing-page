import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertia-based smooth scrolling. Wheel/drag movement eases and keeps
 * gliding for a moment after the input stops.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Pointer drag-to-scroll with inertia on non-touch devices.
    let dragging = false;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (e.pointerType !== "mouse") return;
      if (target.closest("a,button,input,textarea,select,[role='button'],[data-no-drag]")) return;
      dragging = true;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = lastY - e.clientY;
      lastY = e.clientY;
      lenis.scrollTo(lenis.scroll + delta, { immediate: true });
    };
    const onUp = () => {
      dragging = false;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return null;
}