import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/join";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "加入我们",
  description: "MICS 课题组本科生科研招新：医工交叉与灾害感知方向计划。",
  alternates: alternatesFor("/join", "zh"),
};

/** 招新页（中文）：详见共享组件 pages/join.tsx */
export default function Page() {
  return <JoinPage lang="zh" />;
}
