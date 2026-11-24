import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruitmentTrackPage } from "@/components/recruitment/recruitment-track-page";
import {
  getRecruitmentTrack,
  nestedRecruitmentTrackSlugs,
  type RecruitmentTrackSlug,
} from "@/data/join";
import { alternatesFor, t } from "@/data/site";

type Props = { params: Promise<{ track: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return nestedRecruitmentTrackSlugs.map((track) => ({ track }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: slug } = await params;
  const track = getRecruitmentTrack(slug);
  if (!track || slug === "mmwave") return {};
  return {
    title: `Medical-Engineering Recruitment · ${t(track.shortTitle, "en")}`,
    description: t(track.description, "en"),
    alternates: alternatesFor(`/join/medeng/${slug}`, "en"),
  };
}

export default async function Page({ params }: Props) {
  const { track: slug } = await params;
  const track = getRecruitmentTrack(slug);
  if (!track || slug === "mmwave") notFound();
  return <RecruitmentTrackPage lang="en" trackSlug={track.slug as RecruitmentTrackSlug} />;
}
