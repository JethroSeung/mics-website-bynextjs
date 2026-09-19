import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { ActiveTrackScroller } from "./active-track-scroller";
import { RecruitmentContentController } from "./content-controller";
import { RichContent, type RichNode } from "./rich-content";
import { hrefFor, t, type Lang } from "@/data/site";
import {
  medengApplication,
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

const applicationCopy = {
  eyebrow: { zh: "报名说明", en: "Application Note" },
  required: { zh: "报名必要步骤", en: "Required" },
  title: {
    zh: "作品之外，也请让我们认识一下你",
    en: "Alongside your work, tell us a little about yourself",
  },
  lead: {
    zh: "完成本页任意一项招新任务后，还需要提交一份个人介绍材料；两项都完成才算完成报名。",
    en: "After completing any one task on this page, please also submit a short personal introduction. Both steps are required to complete your application.",
  },
  friendly: {
    zh: "不需要专门制作精美简历，也不要求已有科研、竞赛或项目经历。已有简历可以直接发送；如果暂时没有简历，用几段文字介绍自己的专业年级、兴趣方向、想参与的原因，以及任何愿意分享的经历即可。",
    en: "You do not need a polished résumé or any prior research, competition, or project experience. Send an existing résumé if you have one; otherwise, a few paragraphs about your programme and year, interests, motivation, and anything else you would like to share are perfectly fine.",
  },
  taskItem: {
    zh: "完成本方向的一项招新任务",
    en: "Complete one recruitment task in this track",
  },
  profileItem: {
    zh: "提交简历或文字自我介绍（二选一）",
    en: "Submit either a résumé or a short written introduction",
  },
  directionNote: {
    zh: "任务完成与提交方式以本页要求为准；赛题问题可以联系本方向联系人。",
    en: "Follow this page for task and submission requirements; contact the track representative if you have questions about a task.",
  },
  submissionLabel: { zh: "个人介绍统一投递", en: "Send your introduction to" },
  subjectLabel: { zh: "建议邮件标题", en: "Suggested subject" },
  sidebarTitle: { zh: "报名补充材料", en: "Application material" },
  sidebarMaterial: {
    zh: "简历或文字自我介绍",
    en: "Résumé or written introduction",
  },
  sidebarRequired: { zh: "报名必需", en: "Required" },
  sidebarRecipient: { zh: "统一接收", en: "Send to" },
} as const;

function applicationMailHref(lang: Lang) {
  return `mailto:${medengApplication.recipient.email}?subject=${encodeURIComponent(t(medengApplication.subject, lang))}`;
}

function ApplicationGuide({ lang, trackSlug }: { lang: Lang; trackSlug: RecruitmentTrackSlug }) {
  return (
    <section
      aria-labelledby={`application-guide-${trackSlug}`}
      className="border-y border-border bg-white py-8 md:py-10"
    >
      <div className="w-full max-w-[1100px] px-6">
        <div className="rounded-2xl border border-gold/35 bg-primary-light/35 p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-gold uppercase">
              {t(applicationCopy.eyebrow, lang)}
            </p>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
              {t(applicationCopy.required, lang)}
            </span>
          </div>
          <h2
            id={`application-guide-${trackSlug}`}
            className="mt-3 text-2xl font-bold leading-tight text-primary md:text-3xl"
          >
            {t(applicationCopy.title, lang)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
            {t(applicationCopy.lead, lang)}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <ol className="divide-y divide-border text-base leading-relaxed text-body">
                <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 py-3 first:pt-0">
                  <span className="font-semibold text-gold" aria-hidden="true">01</span>
                  <span>{t(applicationCopy.taskItem, lang)}</span>
                </li>
                <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 py-3 last:pb-0">
                  <span className="font-semibold text-gold" aria-hidden="true">02</span>
                  <span>{t(applicationCopy.profileItem, lang)}</span>
                </li>
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-body-secondary md:text-base">
                {t(applicationCopy.friendly, lang)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body-muted">
                {t(applicationCopy.directionNote, lang)}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-bold tracking-[0.12em] text-gold uppercase">
                {t(applicationCopy.submissionLabel, lang)}
              </p>
              <p className="mt-3 text-lg font-bold text-primary">
                {t(medengApplication.recipient.name, lang)}
              </p>
              <a
                href={applicationMailHref(lang)}
                className="mt-1 inline-flex items-start gap-2 break-all text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {medengApplication.recipient.email}
              </a>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold text-body-muted">
                  {t(applicationCopy.subjectLabel, lang)}
                </p>
                <p className="mt-1 text-sm leading-relaxed font-medium text-body">
                  {t(medengApplication.subject, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationReminder({ lang }: { lang: Lang }) {
  return (
    <div className="border-t border-border pt-6">
      <p className="text-xs font-bold tracking-[0.12em] text-gold uppercase">
        {t(applicationCopy.sidebarTitle, lang)}
      </p>
      <p className="mt-2 text-sm leading-relaxed font-semibold text-body">
        {t(applicationCopy.sidebarMaterial, lang)}
      </p>
      <p className="mt-1 text-xs font-medium text-body-muted">
        {t(applicationCopy.sidebarRequired, lang)}
      </p>
      <p className="mt-5 text-xs font-semibold tracking-wide text-body-muted uppercase">
        {t(applicationCopy.sidebarRecipient, lang)}
      </p>
      <p className="mt-1 text-sm font-semibold text-body">
        {t(medengApplication.recipient.name, lang)}
      </p>
      <a
        href={applicationMailHref(lang)}
        className="mt-1 block break-all text-xs font-semibold leading-relaxed text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
      >
        {medengApplication.recipient.email}
      </a>
    </div>
  );
}

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
  const heroIndex = content.findIndex(
    (node) =>
      typeof node !== "string" &&
      node.tag === "section" &&
      node.attrs.class?.split(/\s+/).includes("pl-hero"),
  );
  if (heroIndex < 0) {
    throw new Error(`招新方向 ${trackSlug} 缺少 Hero 内容`);
  }
  const heroContent = content.slice(0, heroIndex + 1);
  const taskContent = content.slice(heroIndex + 1);

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
          <div className="sticky top-[104px] flex max-h-[calc(100vh-128px)] min-h-[calc(100vh-128px)] flex-col overflow-y-auto pr-1 pb-2">
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
            <div className="mt-auto pt-12">
              <ApplicationReminder lang={lang} />
            </div>
          </div>
        </aside>
        <article
          key={trackSlug}
          className="recruitment-track-enter recruitment-track-shell min-w-0 overflow-hidden border-l border-border/70 bg-white"
        >
          <RecruitmentContentController>
            <div id={`recruitment-track-${trackSlug}`}>
              <RichContent nodes={heroContent} />
              <ApplicationGuide lang={lang} trackSlug={trackSlug} />
              <RichContent nodes={taskContent} />
            </div>
          </RecruitmentContentController>
        </article>
      </div>
    </>
  );
}
