import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

const path = "/join/disaster/communication-computing";

export const metadata: Metadata = {
  title: "Disaster-Sensing Recruitment · AI-Driven Communication and Computing",
  description: "MICS undergraduate recruitment for AI-driven communication and computing, with a systems challenge and in-depth paper presentation route.",
  alternates: alternatesFor(path, "en"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="en" directionSlug="communication-computing" />;
}
