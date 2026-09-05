import Link from "next/link";
import { ArrowLeft, Mail, University } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { t, siteConfig, hrefFor, type Lang } from "@/data/site";
import { joinConfig } from "@/data/join";

/**
 * 招新页（zh/en 共享，纯展示，无表单无提交 §6）
 * status === "pending" → 渲染"任务待发布"占位（Phase 1）
 * Phase 2 填充 tasks 并切 "open" 后渲染任务卡片列表
 */
export function JoinPage({ lang }: { lang: Lang }) {
  const supervisor = siteConfig.supervisor;

  const copy = {
    backToJoin: { zh: "返回首页招新区块", en: "Back to recruitment section" },
    pageTitle: { zh: "本科生科研招新", en: "Undergraduate Research Recruitment" },
    pageDesc: {
      zh: "诚邀对多模态智能通信与感知技术感兴趣的本科生加入课题组。",
      en: "We welcome undergraduate students interested in multimodal intelligent communication and sensing to join the group.",
    },
    overviewSr: { zh: "招新说明", en: "Recruitment overview" },
    topicsTitle: { zh: "研究题目", en: "Research Topics" },
    topicsPendingDesc: { zh: "招新任务整理中，敬请期待。", en: "Recruitment tasks are being prepared — stay tuned." },
    pendingLead: {
      zh: "研究题目与申请要求发布前，欢迎先通过下方联系方式与导师沟通咨询。",
      en: "Before topics and requirements are published, feel free to contact the supervisor via the details below.",
    },
    taskLabel: { zh: (i: number) => `题目 ${String(i).padStart(2, "0")}`, en: (i: number) => `Topic ${String(i).padStart(2, "0")}` },
    workLabel: { zh: "工作内容", en: "Work" },
    reqLabel: { zh: "申请要求", en: "Requirements" },
    contactTitle: { zh: "申请联系方式", en: "Contact" },
    contactDesc: {
      zh: "请通过邮箱与导师联系，简要介绍个人情况并说明感兴趣的研究题目。",
      en: "Please contact the supervisor by email with a brief introduction and the topic you are interested in.",
    },
    mentorLabel: { zh: (name: string) => `导师：${name}`, en: (name: string) => `Supervisor: ${name}` },
    affiliation: { zh: "所属单位", en: "Affiliation" },
  } as const;

  return (
    <>
      {/* 页头（子页面内容整体 -20%） */}
      <section aria-labelledby="join-page-title" className="bg-surface pt-14 pb-10 md:pt-18 md:pb-12">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <div className="zoom-80">
            <Link
              href={hrefFor("/#join", lang)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(copy.backToJoin, lang)}
            </Link>
            <div className="mt-6">
              <SectionHeading
                eyebrow="Join Our Team"
                title={t(copy.pageTitle, lang)}
                titleId="join-page-title"
                as="h1"
                desc={t(copy.pageDesc, lang)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 招新说明（内容 -20%） */}
      <section aria-labelledby="overview-title" className="py-12 md:py-14">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="zoom-80">
            <h2 id="overview-title" className="sr-only">
              {t(copy.overviewSr, lang)}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-body-secondary md:text-lg">
              {t(joinConfig.intro, lang)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 研究题目：pending 占位 / open 任务列表（内容 -20%） */}
      <section aria-labelledby="topics-title" className="bg-surface py-14 md:py-16">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="zoom-80">
            <SectionHeading
              eyebrow="Topics"
              title={t(copy.topicsTitle, lang)}
              titleId="topics-title"
              desc={joinConfig.status === "pending" ? t(copy.topicsPendingDesc, lang) : undefined}
            />
            {joinConfig.status === "pending" ? (
              <div className="mt-12 flex max-w-xl flex-col items-center rounded-xl border border-dashed border-gold/50 bg-primary-light/50 px-8 py-14 text-center">
                <span aria-hidden="true" className="size-3 animate-pulse rounded-full bg-gold" />
                <p className="mt-6 text-xl font-bold text-primary">
                  {t(joinConfig.pendingNote, lang)}
                </p>
                <p className="mt-3 text-base leading-relaxed text-body-secondary">
                  {t(copy.pendingLead, lang)}
                </p>
              </div>
            ) : (
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {joinConfig.tasks.map((task) => (
                  <article
                    key={task.index}
                    className="rounded-xl border border-border bg-surface-elevated p-7 shadow-card"
                  >
                    <p className="text-sm font-semibold tracking-widest text-gold">
                      {copy.taskLabel[lang](task.index)}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-primary">
                      {t(task.fields.title, lang)}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-body-secondary">
                      {t(task.fields.intro, lang)}
                    </p>
                    <dl className="mt-6 flex flex-col gap-5 text-base">
                      <div>
                        <dt className="font-semibold text-body">{t(copy.workLabel, lang)}</dt>
                        <dd className="mt-1.5 leading-relaxed text-body-secondary">
                          {t(task.fields.work, lang)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-body">{t(copy.reqLabel, lang)}</dt>
                        <dd className="mt-1.5 leading-relaxed text-body-secondary">
                          {t(task.fields.requirements, lang)}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* 联系方式（内容 -20%） */}
      <section aria-labelledby="contact-title" className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="zoom-80">
            <SectionHeading
              eyebrow="Contact"
              title={t(copy.contactTitle, lang)}
              titleId="contact-title"
              desc={t(copy.contactDesc, lang)}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated px-7 py-7 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Mail className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${joinConfig.contactEmail}`}
                    className="mt-1 inline-block text-xl font-bold text-primary break-all transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {joinConfig.contactEmail}
                  </a>
                  <p className="mt-1.5 text-base text-body-secondary">
                    {copy.mentorLabel[lang](t(supervisor.name, lang))}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-elevated px-7 py-7 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <University className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                    {t(copy.affiliation, lang)}
                  </p>
                  <p className="mt-1 text-xl font-bold text-body">
                    {t(siteConfig.contact.affiliation, lang)}
                  </p>
                  <p className="mt-1.5 text-base text-body-secondary">
                    {t(supervisor.title, lang)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
