import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { researchDirections } from "@/data/research";

// 静态导出模式下元路由需显式声明为纯静态
export const dynamic = "force-static";

/**
 * 站点地图：中英双语 10 页，每页带 hreflang 互指。
 * 静态导出时输出 out/sitemap.xml。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 全站页面路径（中文站路径，英文站自动加 /en 前缀）
  const paths = ["", "/team", "/join", ...researchDirections.map((dir) => `/research/${dir.slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const zhUrl = `${siteUrl}${path}`;
    const enUrl = `${siteUrl}/en${path}`;
    const languages = { "zh-CN": zhUrl, en: enUrl };
    return [
      { url: zhUrl, lastModified, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7, alternates: { languages } },
      { url: enUrl, lastModified, changeFrequency: "monthly", priority: path === "" ? 0.9 : 0.6, alternates: { languages } },
    ];
  });
}
