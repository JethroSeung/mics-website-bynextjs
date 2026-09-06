import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { siteConfig, t, hrefFor, type Lang } from "@/data/site";

/**
 * 全站页头：sticky + 双 Logo（NJUPT 校徽 + MICS logo，细竖线分隔）
 * 响应式策略（根字号放大 50% 后按可用宽度渐进展示）：
 * - <560px：logo + 汉堡（语言切换在抽屉内）
 * - ≥560px：显示语言切换；≥820px：品牌名随汉堡菜单展示
 * - ≥1280px：桌面导航替换汉堡；≥1440px：品牌区补充单位副标题
 */
export function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* 内容整体 -10%（2026-09-06 导师反馈）：zoom 挂内层，sticky 外层保持全宽遮底 */}
      <div className="zoom-90 mx-auto flex h-header w-full max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        {/* 双 Logo 品牌区 */}
        <Link
          href={hrefFor("/", lang)}
          aria-label={`${siteConfig.shortName} ${t(siteConfig.name, lang)}`}
          className="flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image
            src="/images/njupt-logo.png"
            alt={lang === "zh" ? "南京邮电大学校徽" : "NJUPT emblem"}
            width={48}
            height={48}
            className="size-8 sm:size-10 lg:size-12"
            priority
          />
          <span aria-hidden="true" className="h-8 w-px bg-border-dark sm:h-10 lg:h-12" />
          <Image
            src="/images/mics-logo.png"
            alt=""
            width={48}
            height={48}
            className="size-8 sm:size-10 lg:size-12"
            priority
          />
          <span className="hidden min-w-0 flex-col justify-center md:flex">
            <strong className="truncate text-base font-bold text-primary">
              {t(siteConfig.name, lang)}
            </strong>
            <small className="hidden truncate text-xs text-body-muted min-[1440px]:block">
              {t(siteConfig.affiliation, lang)}
            </small>
          </span>
        </Link>

        {/* 桌面导航 + 语言切换 / 移动端汉堡 */}
        <div className="flex items-center gap-5">
          <NavLinks lang={lang} />
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <MobileNav lang={lang} />
        </div>
      </div>
    </header>
  );
}
