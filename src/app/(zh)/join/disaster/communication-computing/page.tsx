import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

const path = "/join/disaster/communication-computing";

export const metadata: Metadata = {
  title: "灾害感知招新 · AI 驱动的通信与计算",
  description: "MICS课题组自然灾害感知本科生招新：AI驱动的通信与计算方向系统赛题与论文精讲。",
  alternates: alternatesFor(path, "zh"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="zh" directionSlug="communication-computing" />;
}
