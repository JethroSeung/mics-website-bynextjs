import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { guideSections, guideSteps, type GuideLinkKind } from "@/data/getting-started";
import { hrefFor, t, type Lang } from "@/data/site";

const kindLabels: Record<GuideLinkKind, { zh: string; en: string }> = {
  official: { zh: "官网", en: "Official" },
  tutorial: { zh: "视频", en: "Video" },
  reference: { zh: "文档", en: "Guide" },
  repository: { zh: "仓库", en: "Repository" },
};

export function GettingStartedPage({ lang }: { lang: Lang }) {
  const copy = {
    back: { zh: "返回加入我们", en: "Back to Join Us" },
    title: { zh: "新生起步指南", en: "New Student Guide" },
    desc: {
      zh: "从配置第一套开发环境开始，逐步学会代码协作、论文检索和负责任地使用 AI。这里不是必装清单，按当前课程或任务选择即可。",
      en: "Start with one development setup, then learn code collaboration, literature search, and responsible AI use. This is not a mandatory install list—choose what your current course or task needs.",
    },
    routeTitle: { zh: "建议从这四步开始", en: "Start with these four steps" },
    routeNote: {
      zh: "不用等到“全部学会”才开始参与项目。先跑通一个最小流程，再在真实任务中逐步补齐。",
      en: "Do not wait until you know everything. Complete one minimal workflow, then learn through real tasks.",
    },
    contents: { zh: "本页目录", en: "On this page" },
    resourceNote: {
      zh: "优先使用官网和官方文档。B站入口用于查找中文演示，请结合发布时间、软件版本和评论区判断是否仍然适用。",
      en: "Prefer official sites and documentation. Bilibili links are Chinese tutorial searches; check dates, software versions, and feedback before following them.",
    },
  } as const;

  return (
    <div className="recruitment-track-enter">
      <section
        aria-labelledby="guide-page-title"
        className="border-b border-primary-dark bg-[image:var(--gradient-primary)] pt-14 pb-12 text-white md:pt-18 md:pb-16"
      >
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <div className="mx-auto max-w-[1152px]">
            <Link
              href={hrefFor("/join", lang)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white/70"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(copy.back, lang)}
            </Link>
            <div className="mt-7 max-w-4xl">
              <SectionHeading
                eyebrow="Getting Started"
                title={t(copy.title, lang)}
                titleId="guide-page-title"
                as="h1"
                desc={t(copy.desc, lang)}
                tone="dark"
              />
            </div>

            <div className="mt-10 md:mt-12">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-white">{t(copy.routeTitle, lang)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                  {t(copy.routeNote, lang)}
                </p>
              </div>

              <ol className="relative mt-8 grid gap-7 md:grid-cols-4 md:gap-0">
                <span
                  className="absolute top-4 bottom-4 left-4 w-px bg-white/30 md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:h-px md:w-auto"
                  aria-hidden="true"
                />
                {guideSteps.map((step, index) => (
                  <li
                    key={t(step, lang)}
                    className="relative grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-4 md:block md:px-4 md:text-center"
                  >
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white text-xs font-bold text-primary shadow-[0_0_0_5px_rgba(255,255,255,0.08)] md:mx-auto">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 font-semibold leading-snug text-white/90 md:mt-4 md:pt-0">
                      {t(step, lang)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-white px-6 py-4 lg:hidden">
        <p className="text-sm font-bold text-primary">{t(copy.contents, lang)}</p>
        <nav aria-label={t(copy.contents, lang)} className="mt-3 overflow-x-auto">
          <ol className="flex min-w-max border-y border-border">
            {guideSections.map((section, index) => (
              <li key={section.id} className="border-r border-border last:border-r-0">
                <a
                  href={`#${section.id}`}
                  className="flex gap-3 px-4 py-3 text-sm text-body-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span className="font-semibold text-gold" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{t(section.title, lang)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <main className="grid w-full lg:grid-cols-[196px_minmax(0,1fr)] lg:gap-x-6 lg:pl-[clamp(24px,3vw,64px)]">
        <aside className="hidden pb-10 lg:block">
          <div className="sticky top-[104px] max-h-[calc(100vh-152px)] overflow-y-auto pt-8 pr-1 pb-2">
            <Link
              href={hrefFor("/join", lang)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(copy.back, lang)}
            </Link>
            <p className="mt-7 text-sm font-bold text-primary">{t(copy.contents, lang)}</p>
            <nav aria-label={t(copy.contents, lang)} className="mt-4">
              <ol className="border-l border-border">
                {guideSections.map((section, index) => (
                  <li key={section.id} className="border-b border-border">
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 px-4 py-3.5 text-sm text-body-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span className="font-semibold text-gold" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{t(section.title, lang)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <article className="min-w-0 border-l border-border/70 bg-white py-14 md:py-20">
          <div className="w-full max-w-[1100px] px-6 md:px-8">
            {guideSections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-32 border-t-2 border-primary pt-7 pb-16 last:pb-0 md:pt-9 md:pb-20"
              >
                <div className="grid gap-3 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-6">
                  <p className="text-base font-semibold text-gold" aria-hidden="true">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 id={`${section.id}-title`} className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                      {t(section.title, lang)}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-body-secondary md:text-lg">
                      {t(section.description, lang)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 md:pl-[6.5rem]">
                  {section.entries.map((entry, entryIndex) => {
                    const isPreface = section.id === "environment" && entryIndex === 0;
                    const stripeIndex = section.id === "environment" ? entryIndex - 1 : entryIndex;
                    const hasMutedBackground = isPreface || stripeIndex % 2 === 1;

                    return (
                      <article
                        key={t(entry.title, lang)}
                        className={`grid gap-3 border-t border-border/60 px-4 py-6 first:border-border-dark md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 md:px-5 md:py-7 ${
                          hasMutedBackground ? "bg-[#fafbfc]" : "bg-white"
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-bold leading-snug text-[#17212b]">
                            {t(entry.title, lang)}
                          </h3>
                          {entry.meta ? (
                            <p className="mt-2 text-xs leading-relaxed text-body-muted">
                              {t(entry.meta, lang)}
                            </p>
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="max-w-3xl text-base leading-relaxed text-body-secondary">
                            {t(entry.summary, lang)}
                          </p>
                          {entry.access ? (
                            <p className="mt-3 border-l-2 border-gold pl-3 text-sm font-semibold leading-relaxed text-primary">
                              {t(entry.access, lang)}
                            </p>
                          ) : null}
                          {entry.note ? (
                            <p className="mt-3 border-l-2 border-gold pl-3 text-sm leading-relaxed text-body-muted">
                              {t(entry.note, lang)}
                            </p>
                          ) : null}
                          {entry.links.length > 0 ? (
                            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                              {entry.links.map((resource) => (
                                <li key={resource.href}>
                                  <a
                                    href={resource.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex items-baseline gap-1.5 text-sm font-semibold text-primary underline decoration-border-dark underline-offset-4 transition-colors hover:text-gold hover:decoration-gold focus-visible:outline-2 focus-visible:outline-ring"
                                  >
                                    <span className="font-normal text-body-muted">
                                      {t(kindLabels[resource.kind], lang)}
                                    </span>
                                    <span>{t(resource.label, lang)}</span>
                                    <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}

                </div>
              </section>
            ))}

            <p className="mt-16 border-t border-border pt-5 text-sm leading-relaxed text-body-muted">
              {t(copy.resourceNote, lang)}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
