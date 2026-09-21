import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

const path = "/join/disaster/sensing-computing";

export const metadata: Metadata = {
  title: "Disaster-Sensing Recruitment · Sensing-Computing Track",
  description: "MICS undergraduate recruitment for sensing and computing in natural-disaster scenarios, with paper reproduction and presentation routes.",
  alternates: alternatesFor(path, "en"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="en" directionSlug="sensing-computing" />;
}
