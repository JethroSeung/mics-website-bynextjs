import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/join";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "加入我们",
  description: "加入 MICS 课题组：本科生科研交流、研究生报考与医工交叉及灾害感知方向联系人。",
  alternates: alternatesFor("/join", "zh"),
};

/** 招新页（中文）：详见共享组件 pages/join.tsx */
export default function Page() {
  return <JoinPage lang="zh" />;
}
