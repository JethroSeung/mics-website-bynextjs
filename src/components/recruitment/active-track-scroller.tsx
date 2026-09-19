"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ActiveTrackScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    const active = container?.querySelector<HTMLElement>("[aria-current='page']");
    if (!container || !active) return;
    const left = active.offsetLeft - (container.clientWidth - active.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-[1280px] overflow-x-auto pb-1">
      {children}
    </div>
  );
}
