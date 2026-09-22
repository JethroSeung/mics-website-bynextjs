import type { Metadata } from "next";
import { GettingStartedPage } from "@/components/pages/getting-started";
import { alternatesFor } from "@/data/site";

export const metadata: Metadata = {
  title: "New Student Guide",
  description:
    "A practical MICS guide to development environments, Git collaboration, literature search, and AI tools.",
  alternates: alternatesFor("/join/getting-started", "en"),
};

export default function Page() {
  return <GettingStartedPage lang="en" />;
}
