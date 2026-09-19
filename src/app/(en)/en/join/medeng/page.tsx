import type { Metadata } from "next";
import { RecruitmentTrackPage } from "@/components/recruitment/recruitment-track-page";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "Medical-Engineering Recruitment · Millimeter-Wave Track",
  description: "MICS undergraduate recruitment for contactless vital-sign sensing with millimeter-wave radar.",
  alternates: alternatesFor("/join/medeng", "en"),
};

export default function Page() {
  return <RecruitmentTrackPage lang="en" trackSlug="mmwave" />;
}
