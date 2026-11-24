import type { Metadata } from "next";
import { DisasterRecruitmentPage } from "@/components/recruitment/disaster-recruitment-page";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "Disaster-Sensing Recruitment · Communication-Sensing Track",
  description: "MICS undergraduate recruitment for communication and sensing in natural-disaster scenarios, with a challenge, paper reproduction, and paper presentation routes.",
  alternates: alternatesFor("/join/disaster", "en"),
};

export default function Page() {
  return <DisasterRecruitmentPage lang="en" />;
}
