import type { Metadata } from "next";
import { TeamPage } from "@/components/pages/team";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "团队成员",
  description: "MICS 课题组成员列表：研究生与本科生的研究方向与联系方式。",
  alternates: alternatesFor("/team", "zh"),
};

/** 团队成员页（中文）：详见共享组件 pages/team.tsx */
export default function Page() {
  return <TeamPage lang="zh" />;
}
