"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const mobileNavToggleEvent = "mics:mobile-nav-toggle";

/** 手机端智能吸顶页头：向下滚动隐藏，向上滚动或回到顶部时显示。 */
export function AutoHideHeader({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 559px)");
    let previousY = Math.max(window.scrollY, 0);
    let accumulatedDistance = 0;
    let previousDirection = 0;
    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - previousY;
      const direction = Math.sign(delta);

      if (!mobileQuery.matches || currentY <= 100 || menuOpenRef.current) {
        setHidden(false);
        accumulatedDistance = 0;
        previousDirection = direction;
        previousY = currentY;
        return;
      }

      if (direction !== 0 && direction !== previousDirection) {
        accumulatedDistance = 0;
      }
      accumulatedDistance += Math.abs(delta);

      if (direction > 0 && accumulatedDistance >= 16) {
        setHidden(true);
        accumulatedDistance = 0;
      } else if (direction < 0 && accumulatedDistance >= 8) {
        setHidden(false);
        accumulatedDistance = 0;
      }

      previousDirection = direction;
      previousY = currentY;
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    const handleBreakpointChange = () => {
      previousY = Math.max(window.scrollY, 0);
      accumulatedDistance = 0;
      setHidden(false);
    };

    const handleMobileNavToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      menuOpenRef.current = Boolean(customEvent.detail?.open);
      if (menuOpenRef.current) setHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(mobileNavToggleEvent, handleMobileNavToggle);
    mobileQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(mobileNavToggleEvent, handleMobileNavToggle);
      mobileQuery.removeEventListener("change", handleBreakpointChange);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 border-b border-border/90 bg-background/95 backdrop-blur transition-transform duration-500 ease-out motion-reduce:transition-none supports-[backdrop-filter]:bg-background/80 sm:translate-y-0 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}
