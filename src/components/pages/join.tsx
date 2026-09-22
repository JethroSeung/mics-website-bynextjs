import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, Mail, RadioTower } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { disasterApplication } from "@/data/disaster-recruitment";
import { hrefFor, t, type Lang } from "@/data/site";
import { medengApplication, recruitmentAreas, recruitmentIntro } from "@/data/join";

export function JoinPage({ lang }: { lang: Lang }) {
  const copy = {
    back: { zh: "返回首页招新区块", en: "Back to the homepage recruitment section" },
    title: { zh: "本科生科研招新", en: "Undergraduate Research Recruitment" },
    desc: {
      zh: "先选择你感兴趣的研究方向，再查看具体任务、参与方式与提交要求。",
      en: "Choose a research area first, then review its tasks, participation routes, and submission requirements.",
    },
    open: { zh: "招新开放中", en: "Open now" },
    comingSoon: { zh: "即将开放", en: "Coming soon" },
    explore: { zh: "查看医工交叉招新计划", en: "Explore the medical-engineering plan" },
    exploreDisaster: { zh: "查看灾害感知招新计划", en: "Explore the disaster-sensing plan" },
    requirementsTitle: { zh: "报名需同时完成", en: "Complete both to apply" },
    required: { zh: "报名必需", en: "Required" },
    taskRequirement: {
      zh: "四个方向中任意一项招新任务",
      en: "One recruitment task from any of the four tracks",
    },
    disasterTaskRequirement: {
      zh: "三个方向中任选一项招新任务",
      en: "One recruitment task from any of the three tracks",
    },
    profileRequirement: {
      zh: "简历或文字自我介绍（二选一）",
      en: "A résumé or a short written introduction (either is fine)",
    },
    submissionLabel: { zh: "个人介绍统一投递", en: "Send your introduction to" },
    guideKicker: { zh: "新生指南", en: "New student guide" },
    guideTitle: {
      zh: "第一次配置环境，从这里开始",
      en: "Start here for your first development setup",
    },
    guideDesc: {
      zh: "开发环境、Git 协作、论文检索与 AI 工具，一页理清最常用的起步方法。",
      en: "A concise guide to development environments, Git collaboration, literature search, and AI tools.",
    },
    guideAction: { zh: "阅读起步指南", en: "Read the guide" },
  } as const;

  return (
    <>
      <section aria-labelledby="join-page-title" className="bg-surface pt-14 pb-10 md:pt-18 md:pb-12">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <div className="mx-auto max-w-[1152px]">
            <Link
              href={hrefFor("/#join", lang)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(copy.back, lang)}
            </Link>
            <div className="mt-6">
              <SectionHeading
                eyebrow="Join Our Team"
                title={t(copy.title, lang)}
                titleId="join-page-title"
                as="h1"
                desc={t(copy.desc, lang)}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="join-directions-title" className="py-14 md:py-18">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="mx-auto max-w-[1152px]">
            <h2 id="join-directions-title" className="sr-only">
              {lang === "zh" ? "招新方向" : "Recruitment areas"}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-body-secondary md:text-lg">
              {t(recruitmentIntro, lang)}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {recruitmentAreas.map((area, index) => {
                const Icon = index === 0 ? Activity : RadioTower;
                const isDisaster = area.slug === "disaster";
                const application = isDisaster ? disasterApplication : medengApplication;
                const destination = isDisaster ? "/join/disaster" : "/join/medeng";
                const taskRequirement = isDisaster
                  ? copy.disasterTaskRequirement
                  : copy.taskRequirement;
                const exploreLabel = isDisaster ? copy.exploreDisaster : copy.explore;
                const content = (
                  <article className="flex h-full min-h-[360px] flex-col rounded-2xl border border-border bg-surface-elevated p-7 shadow-card md:p-9">
                    <div className="flex items-start justify-between gap-5">
                      <span className="flex size-14 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <Icon className="size-7" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-gold/40 bg-primary-light px-3 py-1 text-sm font-semibold text-gold">
                        {area.status === "open" ? t(copy.open, lang) : t(copy.comingSoon, lang)}
                      </span>
                    </div>
                    <p className="mt-8 text-xs font-bold tracking-[0.16em] text-gold uppercase">
                      {area.eyebrow}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
                      {t(area.title, lang)}
                    </h3>
                    <p className="mt-5 text-lg leading-relaxed text-body">
                      {t(area.description, lang)}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-body-secondary">
                      {t(area.detail, lang)}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={lang === "zh" ? "招新方向" : "Recruitment tracks"}>
                      {area.trackLabels.map((label) => (
                        <li key={t(label, lang)} className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-body-secondary">
                          {t(label, lang)}
                        </li>
                      ))}
                    </ul>
                    {area.status === "open" ? (
                      <>
                        <div className="mt-6 rounded-xl border border-gold/30 bg-white p-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-bold text-primary">
                              {t(copy.requirementsTitle, lang)}
                            </p>
                            <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-gold">
                              {t(copy.required, lang)}
                            </span>
                          </div>
                          <ol className="mt-3 divide-y divide-border text-sm leading-relaxed text-body-secondary">
                            <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 py-2 first:pt-0">
                              <span className="font-semibold text-gold" aria-hidden="true">01</span>
                              <span>{t(taskRequirement, lang)}</span>
                            </li>
                            <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 py-2 last:pb-0">
                              <span className="font-semibold text-gold" aria-hidden="true">02</span>
                              <span>{t(copy.profileRequirement, lang)}</span>
                            </li>
                          </ol>
                          <div className="mt-4 border-t border-border pt-4">
                            <p className="text-xs font-semibold tracking-wide text-body-muted uppercase">
                              {t(copy.submissionLabel, lang)}
                            </p>
                            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-body">
                              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                              {t(application.recipient.name, lang)}
                              <span aria-hidden="true" className="text-border-dark">·</span>
                              <a
                                href={`mailto:${application.recipient.email}?subject=${encodeURIComponent(t(application.subject, lang))}`}
                                className="break-all text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
                              >
                                {application.recipient.email}
                              </a>
                            </p>
                          </div>
                        </div>
                        <Link
                          href={hrefFor(destination, lang)}
                          className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-base font-bold text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {t(exploreLabel, lang)}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </>
                    ) : null}
                  </article>
                );

                return <div key={area.slug}>{content}</div>;
              })}
            </div>

            <Link
              href={hrefFor("/join/getting-started", lang)}
              className="group mt-12 grid border-y border-border-dark bg-white transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-ring md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center"
            >
              <div className="border-b border-border px-5 py-5 md:border-r md:border-b-0 md:px-6 md:py-7">
                <p className="font-semibold text-gold">{t(copy.guideKicker, lang)}</p>
              </div>
              <div className="px-5 pt-5 pb-3 md:px-8 md:py-7">
                <h2 className="text-xl font-bold text-primary md:text-2xl">
                  {t(copy.guideTitle, lang)}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body-secondary md:text-base">
                  {t(copy.guideDesc, lang)}
                </p>
              </div>
              <div className="flex items-center gap-2 px-5 pt-1 pb-5 text-sm font-bold text-primary md:px-7 md:py-7 md:text-base">
                <span>{t(copy.guideAction, lang)}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
