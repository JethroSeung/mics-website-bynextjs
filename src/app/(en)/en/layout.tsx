import type { Metadata } from "next";
import Script from "next/script";
import "../../globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";

import { alternatesFor } from "@/data/site";

/**
 * 英文站根布局（路由组 (en) 下的 en 路径段，路径前缀 /en）。
 * 双根布局模式：与中文站 (zh) 各自拥有独立根布局，以设置 <html lang="en">。
 */
export const metadata: Metadata = {
  title: {
    default: "Multimodal Intelligent Communication and Sensing Group · NJUPT",
    template: "%s · MICS",
  },
  description:
    "Official website of the MICS (Multimodal Intelligent Communication and Sensing) group at the College of Computer Science, NJUPT, presenting research directions, team members and recruitment information.",
  // 首页 hreflang/canonical（子页面各自覆盖）
  alternates: alternatesFor("/", "en"),
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // suppressHydrationWarning：js-flag 脚本在 hydration 前给 <html> 加 js class；
  // body 上抑制浏览器扩展（如翻译插件）注入的属性，均为已知无害差异
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        {/* JS 可用标记：滚动入场动画仅在 JS 可用时隐藏初始态（无 JS 直接可见） */}
        <Script id="js-flag-en" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js")`}
        </Script>
        <SkipLink lang="en" />
        <SiteHeader lang="en" />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter lang="en" />
      </body>
    </html>
  );
}
