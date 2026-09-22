import type { Metadata } from "next";
import { GettingStartedPage } from "@/components/pages/getting-started";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "新生起步指南",
  description: "面向 MICS 新生的开发环境、Git 协作、论文检索与 AI 工具入门指南。",
  alternates: alternatesFor("/join/getting-started", "zh"),
};

export default function Page() {
  return <GettingStartedPage lang="zh" />;
}
