"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { useRef } from "react";

function activateTab(root: HTMLElement, tab: HTMLElement) {
  const tablist = tab.closest<HTMLElement>("[role='tablist']");
  const panelId = tab.getAttribute("aria-controls");
  if (!tablist || !panelId) return;

  tablist.querySelectorAll<HTMLElement>("[role='tab']").forEach((item) => {
    item.setAttribute("aria-selected", String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
    const controlledId = item.getAttribute("aria-controls");
    if (!controlledId) return;
    const panel = root.querySelector<HTMLElement>(`#${CSS.escape(controlledId)}`);
    if (!panel) return;
    panel.hidden = item !== tab;
    panel.classList.toggle("pl-enter", item === tab);
  });
}

export function RecruitmentContentController({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  function tabFromTarget(target: EventTarget | null) {
    return target instanceof Element ? target.closest<HTMLElement>("[role='tab']") : null;
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const tab = tabFromTarget(event.target);
    if (tab && rootRef.current?.contains(tab)) activateTab(rootRef.current, tab);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tab = tabFromTarget(event.target);
    const root = rootRef.current;
    if (!tab || !root) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateTab(root, tab);
      return;
    }

    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tablist = tab.closest<HTMLElement>("[role='tablist']");
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll<HTMLElement>("[role='tab']"));
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex < 0) return;

    event.preventDefault();
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    activateTab(root, tabs[nextIndex]);
    tabs[nextIndex].focus();
  }

  return (
    <div ref={rootRef} onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}
