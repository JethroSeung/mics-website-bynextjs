import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig, t, hrefFor } from "@/data/site";

export const metadata: Metadata = {
  // 注：Next 静态导出对 /404 路由强制使用 layout 默认 title，页面 title 不生效（noindex 正常生效）
  title: "页面未找到",
  robots: { index: false },
};

/**
 * 404 页：静态导出约定路由 /404 → out/404.html，
 * GitHub Pages / Netlify 等托管平台自动将其作为 404 响应页。
 * 放在 (zh) 组内用中文根布局渲染（默认语言，任意语言访客均可识别返回）。
 */
export default function NotFoundPage() {
  const lang = "zh" as const;
  const links = [
    { label: { zh: "研究方向", en: "Research" }, href: "/#research" },
    { label: { zh: "团队成员", en: "Team" }, href: "/team" },
    { label: { zh: "加入我们", en: "Join Us" }, href: "/join" },
  ];

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center md:py-32">
      <p className="text-7xl font-bold tracking-tight text-primary md:text-8xl">404</p>
      <h1 className="mt-6 text-2xl font-bold text-body md:text-3xl">
        页面不存在或已被移动
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-body-secondary md:text-lg">
        你访问的地址可能已变更。可以从下方入口继续浏览，或返回首页查看课题组介绍。
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="h-12 px-8 text-base">
          <Link href="/">返回首页</Link>
        </Button>
        {links.map((link) => (
          <Button key={link.href} asChild variant="outline" className="h-12 px-7 text-base">
            <Link href={hrefFor(link.href, lang)}>{t(link.label, lang)}</Link>
          </Button>
        ))}
      </div>
      <p className="mt-10 text-sm text-body-muted">
        {t(siteConfig.name, lang)} · {t(siteConfig.affiliation, lang)}
      </p>
    </section>
  );
}
