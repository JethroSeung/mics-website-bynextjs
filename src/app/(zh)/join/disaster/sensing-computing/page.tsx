import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

const path = "/join/disaster/sensing-computing";

export const metadata: Metadata = {
  title: "灾害感知招新 · 感算方向",
  description: "MICS课题组自然灾害感知本科生招新：感知与计算方向的论文复现与论文汇报任务。",
  alternates: alternatesFor(path, "zh"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="zh" directionSlug="sensing-computing" />;
}
