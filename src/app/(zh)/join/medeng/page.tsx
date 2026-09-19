import type { Metadata } from "next";
import { RecruitmentTrackPage } from "@/components/recruitment/recruitment-track-page";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "医工交叉招新 · 毫米波方向",
  description: "MICS 课题组医工交叉本科生招新：毫米波雷达无接触生命体征感知方向。",
  alternates: alternatesFor("/join/medeng", "zh"),
};

export default function Page() {
  return <RecruitmentTrackPage lang="zh" trackSlug="mmwave" />;
}
