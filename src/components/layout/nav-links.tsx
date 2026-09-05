"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, t, type Lang, type NavItem } from "@/data/site";

/** 桌面端主导航：当前路由高亮（aria-current） */
export function NavLinks({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";

  const isActive = (item: NavItem) =>
    item.href === "/"
      ? pathname === "/" || pathname === ""
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <nav aria-label={lang === "zh" ? "主要导航" : "Primary"} className="hidden md:flex md:items-center md:gap-7">
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item) ? "page" : undefined}
          className={`relative text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
            isActive(item)
              ? "text-primary"
              : "text-body-secondary hover:text-primary"
          }`}
        >
          {t(item.label, lang)}
          {/* 当前项下划线（金色强调） */}
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-gold transition-opacity ${
              isActive(item) ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
