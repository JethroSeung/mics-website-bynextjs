import type { Metadata } from "next";
import { TeamPage } from "@/components/pages/team";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "Team Members",
  description:
    "Meet the MICS group: master and undergraduate students with contact information.",
  alternates: alternatesFor("/team", "en"),
};

/** 团队成员页（英文）：详见共享组件 pages/team.tsx */
export default function Page() {
  return <TeamPage lang="en" />;
}
