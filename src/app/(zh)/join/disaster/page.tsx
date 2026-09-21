import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "灾害感知招新 · 通感方向",
  description: "MICS 课题组自然灾害感知本科生招新：通信与感知方向的挑战赛、论文复现与论文汇报任务。",
  alternates: alternatesFor("/join/disaster", "zh"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="zh" />;
}
