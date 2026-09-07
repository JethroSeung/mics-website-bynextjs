import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import { DirectionPartners } from "@/components/direction-partners";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { t, hrefFor, type Lang } from "@/data/site";
import { getMemberById } from "@/data/members";
import type { ResearchDirection, ResearchFigure } from "@/data/research";

/**
 * 研究方向详情页（zh/en 共享）
 * detail === null → 整页占位态（Phase 1：内容待周末与导师确认 §13-W2）
 * detail 有值 → 概述 + 分节正文 + 编号任务 + 合作侧栏 + 代表成果
 * （medeng 内容迁移自旧站 research-multimodal.html，2026-09-06）
 * 本页为静态展示：无滚动入场动画、无 hover 缩放（导师要求）
 * 负责人邮箱为纯文本展示（成员邮箱不跳转）
 */

/** 配图渲染：figure + img + caption（静止，无任何悬停效果） */
function DetailFigure({
  figure,
  lang,
  imgClassName,
}: {
  figure: ResearchFigure;
  lang: Lang;
  imgClassName: string;
}) {
  return (
    <figure className="mt-4">
      <Image
        src={figure.src}
        alt={t(figure.alt, lang)}
        width={figure.width}
        height={figure.height}
        className={imgClassName}
      />
      <figcaption className="mt-2 text-sm text-body-muted">
        {t(figure.caption, lang)}
      </figcaption>
    </figure>
  );
}

export function ResearchPage({
  lang,
  direction,
}: {
  lang: Lang;
  direction: ResearchDirection;
}) {
  const lead = getMemberById(direction.leadMemberId);
  if (!lead) {
    throw new Error(`研究方向 ${direction.slug} 负责人缺失：${direction.leadMemberId}`);
  }

  const copy = {
    back: { zh: "返回研究方向", en: "Back to research directions" },
    leadLabel: { zh: "方向负责人", en: "Direction Lead" },
    leadSr: { zh: "方向负责人", en: "Direction Lead" },
    masterRole: { zh: "研究生", en: "Master Student" },
    undergradRole: { zh: "本科生", en: "Undergraduate Student" },
    emailLabel: { zh: "邮箱：", en: "Email: " },
    pending: { zh: "To be updated" as const, en: "To be updated" as const },
    kicker: { zh: "研究方向", en: "Research Direction" },
    authorsLabel: { zh: "Authors：", en: "Authors: " },
    viewPaper: { zh: "查看论文", en: "View paper" },
    pendingTitle: { zh: "方向详情整理中", en: "Details in Preparation" },
    pendingDesc: {
      zh: "该方向的详细研究内容、研究计划与进展正在整理中，稍后发布。如需了解，欢迎通过上方邮箱与负责人联系。",
      en: "Detailed research content, plans and progress are being prepared. Feel free to contact the lead via email above.",
    },
  } as const;

  return (
    <>
      {/* 页头：返回 + 方向名（子页面内容整体 -20%） */}
      <section aria-labelledby="direction-title" className="bg-surface pt-14 pb-10 md:pt-18 md:pb-12">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <div className="zoom-80">
            <Link
              href={hrefFor("/#research", lang)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-body-secondary focus-visible:outline-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(copy.back, lang)}
            </Link>
            <div className="mt-6">
              <SectionHeading
                eyebrow={`Research Direction ${String(direction.order).padStart(2, "0")}`}
                title={t(direction.name, lang)}
                titleId="direction-title"
                as="h1"
                desc={t(direction.cardIntro, lang)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 负责人卡片（内容 -20%，滚动淡入） */}
      <section aria-labelledby="lead-title" className="py-12 md:py-14">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="zoom-80">
            <h2 id="lead-title" className="sr-only">
              {t(copy.leadSr, lang)}
            </h2>
            <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-surface-elevated px-7 py-7 shadow-card sm:flex-row sm:items-center md:px-8">
              <Image
                src={lead.photo}
                alt={`${t(lead.name, lang)} photo`}
                width={112}
                height={112}
                className="size-24 rounded-lg object-cover md:size-28"
              />
              <div>
                <p className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                  {t(copy.leadLabel, lang)}
                </p>
                <p className="mt-1.5 text-2xl font-bold text-body">
                  {t(lead.name, lang)}
                  <span className="ml-3 text-base font-normal text-body-secondary">
                    {lead.role === "master"
                      ? t(copy.masterRole, lang)
                      : t(copy.undergradRole, lang)}
                  </span>
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-base text-body-secondary">
                  <Mail className="size-4.5 shrink-0 text-gold" aria-hidden="true" />
                  {lead.email ?? copy.pending[lang]}
                </p>
              </div>
            </div>

            <DirectionPartners
              partnerIds={direction.partnerIds}
              lang={lang}
              variant="detail"
            />
          </Reveal>
        </div>
      </section>

      {/* 正文：detail 双态渲染 */}
      {direction.detail ? (
        <section aria-labelledby="detail-title" className="bg-surface py-14 md:py-16">
          {/* 正文窄容器：视觉 880px 对齐旧站 news-container（976 - padding 96 = 880 = zoom 内 1100） */}
          <div className="mx-auto w-full max-w-[976px] px-6 md:px-8">
            <div className="zoom-80">
              {/* 概述（旧站 news-header：kicker + 大标题 + 导语 + 重点任务摘要框） */}
              <Reveal>
                <header className="border-b border-border pb-8 md:pb-9">
                  <p className="text-sm font-bold tracking-widest text-gold uppercase">
                    {t(copy.kicker, lang)}
                  </p>
                  <h2
                    id="detail-title"
                    className="mt-3 text-3xl font-bold leading-tight text-primary [overflow-wrap:anywhere] md:text-4xl"
                  >
                    {t(direction.detail.overviewTitle, lang)}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-body-secondary md:text-lg">
                    {t(direction.detail.heroLead, lang)}
                  </p>
                  {/* 重点任务摘要框（旧站 news-summary：左竖线强调） */}
                  <div className="mt-7 rounded-r-xl border-l-4 border-gold bg-primary-light/40 px-6 py-5">
                    <p className="text-xs font-bold tracking-widest text-primary uppercase">
                      {t(direction.detail.summary.label, lang)}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-body">
                      {t(direction.detail.summary.text, lang)}
                    </p>
                  </div>
                </header>
              </Reveal>

              {/* 分节正文（行业背景 / 研究方向 / 未来方向） */}
              {direction.detail.sections.map((section, i) => (
                <Reveal key={i}>
                  <section
                    aria-labelledby={`section-${i}`}
                    className="border-b border-border py-9 md:py-10"
                  >
                  <h3
                    id={`section-${i}`}
                    className="text-2xl font-bold text-primary md:text-3xl"
                  >
                    {t(section.heading, lang)}
                  </h3>
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="mt-3 text-base leading-relaxed text-body-secondary md:text-lg"
                    >
                      {t(p, lang)}
                    </p>
                  ))}

                  {/* 编号任务列表（旧站 focus-list：编号 + 标题 + 多段） */}
                  {section.focusList ? (
                    <div className="mt-6 flex flex-col">
                      {section.focusList.map((item, k) => (
                        <div
                          key={k}
                          className="grid gap-3 border-t border-border py-6 first:border-t-2 first:border-primary sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6"
                        >
                          <span
                            aria-hidden="true"
                            className="text-3xl font-bold leading-none text-gold"
                          >
                            {item.no}
                          </span>
                          <div>
                            <h4 className="text-xl font-bold text-body md:text-2xl">
                              {t(item.title, lang)}
                            </h4>
                            {item.paragraphs.map((p, j) => (
                              <p
                                key={j}
                                className="mt-2.5 text-base leading-relaxed text-body-secondary md:text-lg"
                              >
                                {t(p, lang)}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* 侧栏注记（旧站 news-note：医工交叉合作 + 配图） */}
                  {section.aside ? (
                    <aside className="mt-6 rounded-r-xl border-l-4 border-gold bg-surface-elevated px-6 py-5 md:px-7">
                      <h4 className="text-base font-bold text-primary md:text-lg">
                        {t(section.aside.title, lang)}
                      </h4>
                      <p className="mt-2 text-base leading-relaxed text-body-secondary md:text-lg">
                        {t(section.aside.paragraph, lang)}
                      </p>
                      {section.aside.figure ? (
                        <DetailFigure
                          figure={section.aside.figure}
                          lang={lang}
                          imgClassName="aspect-video w-full rounded-lg border border-border object-cover"
                        />
                      ) : null}
                    </aside>
                  ) : null}
                  </section>
                </Reveal>
              ))}

              {/* 代表成果（旧站 publication-list：编号 + 标题/作者/venue/链接/配图） */}
              <Reveal>
                <section aria-labelledby="publications-title" className="py-9 md:py-10">
                <h3
                  id="publications-title"
                  className="text-2xl font-bold text-primary md:text-3xl"
                >
                  {lang === "zh" ? "代表成果" : "Representative works"}
                </h3>
                <div className="mt-2 flex flex-col">
                  {direction.detail.publications.map((pub, k) => (
                    <article
                      key={k}
                      className="grid gap-3 border-t border-border py-7 first:border-t-2 first:border-primary sm:grid-cols-[54px_minmax(0,1fr)] sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-1 text-sm font-bold tracking-widest text-primary"
                      >
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold leading-snug text-foreground [overflow-wrap:anywhere] md:text-xl">
                          {t(pub.title, lang)}
                        </h4>
                        {pub.authors ? (
                          <p className="mt-2 text-sm leading-relaxed text-body-secondary [overflow-wrap:anywhere]">
                            {t(copy.authorsLabel, lang)}
                            {pub.authors}
                          </p>
                        ) : null}
                        <p className="mt-1 text-sm text-body-muted [overflow-wrap:anywhere]">
                          {t(pub.meta, lang)}
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-body-secondary md:text-lg">
                          {t(pub.description, lang)}
                        </p>
                        {pub.link ? (
                          <p className="mt-3">
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                            >
                              {t(copy.viewPaper, lang)}
                            </a>
                          </p>
                        ) : null}
                        {pub.figure ? (
                          <DetailFigure
                            figure={pub.figure}
                            lang={lang}
                            /* 限高裁剪对齐旧站 publication-media（视觉高约 420px） */
                            imgClassName="aspect-[21/10] w-full rounded-lg border border-border object-cover"
                          />
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
                </section>
              </Reveal>
            </div>
          </div>
        </section>
      ) : (
        <section aria-labelledby="pending-title" className="bg-surface py-16 md:py-20">
          <div className="mx-auto w-full max-w-content px-6 md:px-8">
            <div className="zoom-80">
              <div className="mx-auto flex max-w-xl flex-col items-center rounded-xl border border-dashed border-gold/50 bg-primary-light/50 px-8 py-14 text-center">
                <span aria-hidden="true" className="size-3 rounded-full bg-gold" />
                <h2
                  id="pending-title"
                  className="mt-6 text-2xl font-bold text-primary md:text-3xl"
                >
                  {t(copy.pendingTitle, lang)}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-body-secondary md:text-lg">
                  {t(copy.pendingDesc, lang)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
