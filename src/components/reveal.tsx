"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 子项 stagger 延迟（毫秒），映射 CSS --reveal-delay */
  delay?: number;
}

/**
 * 滚动进入动画（需求 §8 第 3 项）：
 * IntersectionObserver 进入视口 10% 时加 .is-visible，一次性触发后 unobserve。
 * CSS 侧（globals.css）负责过渡与 prefers-reduced-motion 降级；
 * 无 JS 时由 html.js 门控保证内容直接可见。
 */
export function Reveal({ children, className, delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 偏好减少动效：直接显示，不注册观察器
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
