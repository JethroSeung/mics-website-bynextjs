import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

// 静态导出模式下元路由需显式声明为纯静态
export const dynamic = "force-static";

/** robots.txt：全站允许抓取，声明 sitemap 地址。静态导出时输出 out/robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
