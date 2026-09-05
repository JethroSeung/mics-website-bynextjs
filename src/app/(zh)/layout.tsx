import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";

/**
 * 中文站根布局（路由组 (zh)，路径前缀为 /）。
 * 采用双根布局模式：英文站 app/en/ 拥有独立根布局以设置 <html lang="en">。
 */
export const metadata: Metadata = {
  title: {
    default: "多模态智能通信与感知课题组 · 南京邮电大学",
    template: "%s · MICS",
  },
  description:
    "南京邮电大学计算机学院多模态智能通信与感知（MICS）课题组官方网站，展示研究方向、团队成员与招新信息。",
};

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        {/* JS 可用标记：滚动入场动画仅在 JS 可用时隐藏初始态（无 JS 直接可见） */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js")`}
        </Script>
        <SkipLink lang="zh" />
        <SiteHeader lang="zh" />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter lang="zh" />
      </body>
    </html>
  );
}
