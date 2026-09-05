import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/join";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Undergraduate research recruitment of the MICS group: topics, requirements and contact information.",
  alternates: alternatesFor("/join", "en"),
};

/** 招新页（英文）：详见共享组件 pages/join.tsx */
export default function Page() {
  return <JoinPage lang="en" />;
}
