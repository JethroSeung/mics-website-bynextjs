import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { t, hrefFor, type Lang } from "@/data/site";
import { getMemberById } from "@/data/members";
import type { ResearchDirection } from "@/data/research";

/**
 * 研究方向详情页（zh/en 共享）
 * detail === null → 整页占位态（Phase 1：内容待周末与导师确认 §13-W2）
 * detail 有值 → 渲染 heroLead + sections（Phase 2 纯填数据，页面零改动）
 * 负责人邮箱为纯文本展示（成员邮箱不跳转）
 */
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
    overviewTitle: { zh: "方向概述", en: "Overview" },
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
              className="inline-flex items-center gap-1.5 text-base font-medium text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
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

      {/* 负责人卡片（内容 -20%） */}
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
          </Reveal>
        </div>
      </section>

      {/* 正文：detail 双态渲染 */}
      {direction.detail ? (
        <section aria-labelledby="detail-title" className="bg-surface py-14 md:py-16">
          <div className="mx-auto flex w-full max-w-content flex-col gap-12 px-6 md:px-8">
            <Reveal className="zoom-80">
              <SectionHeading
                eyebrow="Overview"
                title={t(copy.overviewTitle, lang)}
                titleId="detail-title"
                desc={t(direction.detail.heroLead, lang)}
              />
            </Reveal>
            {direction.detail.sections.map((section, i) => (
              <Reveal key={i} className="zoom-80">
                <section aria-labelledby={`section-${i}`}>
                  <h3
                    id={`section-${i}`}
                    className="text-2xl font-bold text-primary md:text-3xl"
                  >
                    {t(section.heading, lang)}
                  </h3>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="mt-3 text-base leading-relaxed text-body-secondary md:text-lg">
                      {t(p, lang)}
                    </p>
                  ))}
                  {section.focusItems ? (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {section.focusItems.map((item, k) => (
                        <li key={k} className="flex items-start gap-2.5 text-base text-body-secondary md:text-lg">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                          {t(item, lang)}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section aria-labelledby="pending-title" className="bg-surface py-16 md:py-20">
          <div className="mx-auto w-full max-w-content px-6 md:px-8">
            <Reveal className="zoom-80">
              <div className="mx-auto flex max-w-xl flex-col items-center rounded-xl border border-dashed border-gold/50 bg-primary-light/50 px-8 py-14 text-center">
                <span aria-hidden="true" className="size-3 animate-pulse rounded-full bg-gold" />
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
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
