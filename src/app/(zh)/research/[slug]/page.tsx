import type { Metadata } from "next";
import { ResearchPage } from "@/components/pages/research";
import { t, alternatesFor } from "@/data/site";
import { getDirection, researchDirections, type DirectionSlug } from "@/data/research";

interface ResearchRouteProps {
  params: Promise<{ slug: DirectionSlug }>;
}

/** 静态导出：为每个研究方向生成独立页面（pain / medeng） */
export function generateStaticParams() {
  return researchDirections.map((dir) => ({ slug: dir.slug }));
}

export async function generateMetadata({ params }: ResearchRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const direction = getDirection(slug);
  return {
    title: t(direction.detail?.pageTitle ?? direction.name, "zh"),
    description: t(direction.detail?.pageIntro ?? direction.cardIntro, "zh"),
    alternates: alternatesFor(`/research/${slug}`, "zh"),
  };
}

/** 研究方向详情页（中文）：详见共享组件 pages/research.tsx */
export default async function Page({ params }: ResearchRouteProps) {
  const { slug } = await params;
  return <ResearchPage lang="zh" direction={getDirection(slug)} />;
}
