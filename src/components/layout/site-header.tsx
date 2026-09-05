import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { siteConfig, t, type Lang } from "@/data/site";

/**
 * 全站页头：sticky + 双 Logo（NJUPT 校徽 + MICS logo，细竖线分隔）
 * 移动端（≤820px）logo 缩至 32px、文案隐藏，导航收进抽屉
 */
export function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-header w-full max-w-content items-center justify-between gap-4 px-6 md:px-8">
        {/* 双 Logo 品牌区 */}
        <Link
          href="/"
          aria-label={`${siteConfig.shortName} ${t(siteConfig.name, lang)}`}
          className="flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image
            src="/images/njupt-logo.png"
            alt={lang === "zh" ? "南京邮电大学校徽" : "NJUPT emblem"}
            width={32}
            height={32}
            className="size-8 md:size-10"
            priority
          />
          <span aria-hidden="true" className="h-8 w-px bg-border-dark md:h-10" />
          <Image
            src="/images/mics-logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8 md:size-10"
            priority
          />
          <span className="hidden min-w-0 flex-col justify-center sm:flex">
            <strong className="truncate text-base font-bold text-primary">
              {t(siteConfig.name, lang)}
            </strong>
            <small className="truncate text-xs text-body-muted">
              {t(siteConfig.affiliation, lang)}
            </small>
          </span>
        </Link>

        {/* 桌面导航 + 语言切换 / 移动端汉堡 */}
        <div className="flex items-center gap-5">
          <NavLinks lang={lang} />
          <LanguageSwitch />
          <MobileNav lang={lang} />
        </div>
      </div>
    </header>
  );
}
