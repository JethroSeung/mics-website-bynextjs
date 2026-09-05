import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：构建产物为 out/ 目录，可托管于任意静态服务器
  output: "export",
  // 静态导出不支持默认图片优化管线，图片压缩在素材预处理阶段完成
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
