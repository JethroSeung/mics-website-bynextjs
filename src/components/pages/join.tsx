import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, RadioTower } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { hrefFor, t, type Lang } from "@/data/site";
import { recruitmentAreas, recruitmentIntro } from "@/data/join";

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
                    {area.status === "open" ? (
                      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-base font-bold text-primary">
                        {t(copy.explore, lang)}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </article>
                );

                return area.status === "open" ? (
                  <Link
                    key={area.slug}
                    href={hrefFor("/join/medeng", lang)}
                    className="group rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={area.slug}>{content}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
