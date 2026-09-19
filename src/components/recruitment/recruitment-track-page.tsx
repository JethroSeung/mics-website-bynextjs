import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ActiveTrackScroller } from "./active-track-scroller";
import { RecruitmentContentController } from "./content-controller";
import { RichContent, type RichNode } from "./rich-content";
import { hrefFor, t, type Lang } from "@/data/site";
import {
  recruitmentTrackPath,
  recruitmentTracks,
  type RecruitmentTrackSlug,
} from "@/data/join";
import mmwaveZh from "@/data/recruitment-content/mmwave.zh";
import mmwaveEn from "@/data/recruitment-content/mmwave.en";
import wifiZh from "@/data/recruitment-content/wifi-csi.zh";
import wifiEn from "@/data/recruitment-content/wifi-csi.en";
import visionZh from "@/data/recruitment-content/computer-vision.zh";
import visionEn from "@/data/recruitment-content/computer-vision.en";
import voiceZh from "@/data/recruitment-content/voice.zh";
import voiceEn from "@/data/recruitment-content/voice.en";
import "@/data/recruitment-content/mmwave.css";
import "@/data/recruitment-content/wifi-csi.css";
import "@/data/recruitment-content/computer-vision.css";
import "@/data/recruitment-content/voice.css";

const contentByTrack = {
  mmwave: { zh: mmwaveZh, en: mmwaveEn },
  "wifi-csi": { zh: wifiZh, en: wifiEn },
  "computer-vision": { zh: visionZh, en: visionEn },
  voice: { zh: voiceZh, en: voiceEn },
} as const;

function TrackLinks({ lang, active }: { lang: Lang; active: RecruitmentTrackSlug }) {
  return (
    <nav aria-label={lang === "zh" ? "医工招新方向" : "Medical-engineering recruitment tracks"}>
      <ul className="flex gap-2 lg:flex-col">
        {recruitmentTracks.map((track, index) => {
          const isActive = track.slug === active;
          return (
            <li key={track.slug} className="shrink-0">
              <Link
                href={hrefFor(recruitmentTrackPath(track.slug), lang)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-max items-center gap-3 rounded-lg border px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring lg:min-w-0 ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-body-secondary hover:border-primary/40 hover:text-primary"
                }`}
              >
                <span className={isActive ? "text-white/70" : "text-gold"}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {t(track.shortTitle, lang)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function RecruitmentTrackPage({
  lang,
  trackSlug,
}: {
  lang: Lang;
  trackSlug: RecruitmentTrackSlug;
}) {
  const content = contentByTrack[trackSlug][lang] as unknown as readonly RichNode[];

  return (
    <>
      {/* 手机端局部导航：返回入口与方向选择合并，避免额外占用一整条页头。 */}
      <div className="border-b border-border bg-white px-6 py-4 lg:hidden">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href={hrefFor("/join", lang)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {lang === "zh" ? "返回招新方向" : "Back to recruitment areas"}
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.12em] text-gold uppercase">
            {lang === "zh" ? (
              <>
                医工招新方向
                <span className="ml-1 font-semibold tracking-normal text-body-muted normal-case">
                  （任选其一即可）
                </span>
              </>
            ) : (
              <>
                Recruitment Tracks
                <span className="ml-1 font-semibold tracking-normal text-body-muted normal-case">
                  (choose one)
                </span>
              </>
            )}
          </p>
        </div>
        <div className="mt-3">
          <ActiveTrackScroller>
            <TrackLinks lang={lang} active={trackSlug} />
          </ActiveTrackScroller>
        </div>
      </div>

      {/* 桌面端采用左锚定双列网格：侧栏靠近视口左侧，正文宽度保持稳定。 */}
      <div className="grid w-full lg:grid-cols-[196px_minmax(0,1fr)] lg:gap-x-6 lg:pl-[clamp(24px,3vw,64px)]">
        <aside className="hidden py-10 lg:block">
          <div className="sticky top-[120px]">
            <Link
              href={hrefFor("/join", lang)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {lang === "zh" ? "返回招新方向" : "Back to recruitment areas"}
            </Link>
            <p className="mt-7 text-xs font-bold tracking-[0.14em] text-gold uppercase">
              {lang === "zh" ? "医工招新方向" : "Recruitment Tracks"}
              <span className="mt-1 block font-semibold tracking-normal text-body-muted normal-case">
                {lang === "zh" ? "（任选其一即可）" : "(choose one)"}
              </span>
            </p>
            <div className="mt-4">
              <TrackLinks lang={lang} active={trackSlug} />
            </div>
          </div>
        </aside>
        <article
          key={trackSlug}
          className="recruitment-track-enter recruitment-track-shell min-w-0 overflow-hidden border-l border-border/70 bg-white"
        >
          <RecruitmentContentController>
            <div id={`recruitment-track-${trackSlug}`}>
              <RichContent nodes={content} />
            </div>
          </RecruitmentContentController>
        </article>
      </div>
    </>
  );
}
