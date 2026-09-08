"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 语言切换：中文页在根路径，英文页在 /en/*。
 * 依据当前路径自动计算目标语言对应页面路径（/team ↔ /en/team），
 * 语言状态由 pathname 推导，无需传入。
 */
export function LanguageSwitch() {
  const pathname = usePathname() ?? "/";
  const isEn = pathname.startsWith("/en");

  const target = isEn
    ? pathname.replace(/^\/en/, "") || "/"
    : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <Link
      href={target}
      lang={isEn ? "zh-CN" : "en"}
      aria-label={isEn ? "切换到中文" : "Switch to English"}
      className="inline-flex shrink-0 items-center whitespace-nowrap rounded-sm border border-border px-3 py-1 text-sm font-medium tracking-wide text-body-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
    >
      {isEn ? "中文" : "EN"}
    </Link>
  );
}
