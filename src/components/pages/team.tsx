import { MemberCard } from "@/components/member-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { t, type Lang } from "@/data/site";
import { getMembersByRole } from "@/data/members";

/**
 * 团队成员页（zh/en 共享）：页头 + 研究生 + 本科生全列表
 * 成员数据单一来源 src/data/members.ts，顺序即数据文件顺序
 */
export function TeamPage({ lang }: { lang: Lang }) {
  const masters = getMembersByRole("master");
  const undergraduates = getMembersByRole("undergraduate");

  const copy = {
    pageTitle: { zh: "团队成员", en: "Team Members" },
    pageDesc: {
      zh: "",
      en: "",
    },
    masterTitle: { zh: "研究生", en: "Master Students" },
    undergraduateTitle: { zh: "本科生", en: "Undergraduate Students" },
    groupCount: {
      zh: (n: number) => `共 ${n} 人，邮箱见下方卡片。`,
      en: (n: number) => `${n} members in total. Emails are shown on the cards.`,
    },
  } as const;

  return (
    <>
      {/* 页头 */}
      <section aria-labelledby="team-page-title" className="bg-surface pt-16 pb-10 md:pt-20 md:pb-12">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <div className="mx-auto max-w-[1152px]">
            <SectionHeading
              eyebrow="Team Members"
              title={t(copy.pageTitle, lang)}
              titleId="team-page-title"
              as="h1"
              desc={t(copy.pageDesc, lang)}
            />
          </div>
        </div>
      </section>

      {/* 研究生 */}
      <section aria-labelledby="master-title" className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="mx-auto max-w-[1152px]">
            <SectionHeading
              eyebrow="Master Students"
              title={t(copy.masterTitle, lang)}
              titleId="master-title"
              desc={copy.groupCount[lang](masters.length)}
            />
            <div className="mx-auto mt-10 grid w-full max-w-[960px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {masters.map((member) => (
                <MemberCard key={member.id} member={member} lang={lang} showEmail />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 本科生 */}
      <section aria-labelledby="undergraduate-title" className="bg-surface py-14 md:py-16">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="mx-auto max-w-[1152px]">
            <SectionHeading
              eyebrow="Undergraduate Students"
              title={t(copy.undergraduateTitle, lang)}
              titleId="undergraduate-title"
              desc={copy.groupCount[lang](undergraduates.length)}
            />
            <div className="mx-auto mt-10 grid w-full max-w-[960px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {undergraduates.map((member) => (
                <MemberCard key={member.id} member={member} lang={lang} showEmail />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
