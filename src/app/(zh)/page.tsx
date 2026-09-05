import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/home/hero-slider";
import { ResearchCard } from "@/components/home/research-card";
import { MemberCard } from "@/components/member-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { siteConfig, t } from "@/data/site";
import { members, featuredMembers } from "@/data/members";
import { researchDirections } from "@/data/research";
import { joinConfig } from "@/data/join";

/**
 * 首页（中文）：hero 轮播 → 课题组介绍 → 导师介绍 → 研究方向 → 成员精选 → 招新 CTA
 * 区块编号 01-05（学术成果区块去向待定 §13-W3，暂不展示）
 */
export default function HomePage() {
  const lang = "zh" as const;
  const supervisor = siteConfig.supervisor;

  // 数据统计（课题组介绍区块，随数据文件自动更新）
  const stats = [
    { value: researchDirections.length, label: { zh: "个研究方向", en: "Research Directions" } },
    { value: members.length, label: { zh: "名团队成员", en: "Team Members" } },
    { value: siteConfig.partners.length, label: { zh: "家合作单位", en: "Partners" } },
  ];

  return (
    <>
      <HeroSlider slides={siteConfig.heroSlides} lang={lang} />

      {/* 01 课题组介绍 */}
      <section id="about" aria-labelledby="about-title" className="bg-surface py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="01 / About the Group"
                  title="课题组介绍"
                  titleId="about-title"
                />
                <p className="mt-5 text-lg leading-relaxed font-medium text-primary">
                  {t(siteConfig.about.lead, lang)}
                </p>
                <p className="mt-3 leading-relaxed text-body-secondary">
                  {t(siteConfig.about.note, lang)}
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={t(stat.label, lang)}
                    className="rounded-xl border border-border bg-surface-elevated px-3 py-6 text-center"
                  >
                    <dd className="text-4xl font-bold text-primary">{stat.value}</dd>
                    <dt className="mt-2 text-xs text-body-secondary md:text-sm">
                      {t(stat.label, lang)}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 导师介绍 */}
      <section id="leader" aria-labelledby="leader-title" className="py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
              <Image
                src={supervisor.photo}
                alt={lang === "zh" ? "左益平老师照片" : "Yiping Zuo photo"}
                width={480}
                height={640}
                className="w-full max-w-xs justify-self-center rounded-xl object-cover shadow-card lg:justify-self-start"
              />
              <div>
                <SectionHeading
                  eyebrow="02 / Supervisor"
                  title="导师介绍"
                  titleId="leader-title"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-body">
                    {t(supervisor.name, lang)}
                  </h3>
                  <p className="mt-1 text-sm text-body-secondary">
                    {t(supervisor.title, lang)} · {t(siteConfig.contact.affiliation, lang)}
                  </p>
                </div>
                <dl className="mt-7 flex flex-col gap-6">
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-body-muted uppercase">
                      {lang === "zh" ? "个人简介" : "Profile"}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-body-secondary">
                      {t(supervisor.profile, lang)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-body-muted uppercase">
                      {lang === "zh" ? "研究兴趣" : "Research Interests"}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-body-secondary">
                      {t(supervisor.interests, lang)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    <div>
                      <dt className="text-xs font-semibold tracking-widest text-body-muted uppercase">
                        Email
                      </dt>
                      <dd className="mt-2 text-sm">
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-widest text-body-muted uppercase">
                        {lang === "zh" ? "个人主页" : "Homepage"}
                      </dt>
                      <dd className="mt-2 text-sm">
                        <a
                          href={supervisor.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {t(supervisor.homepageLabel, lang)} ↗
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 研究方向（深色底 + 白色卡片） */}
      <section
        id="research"
        aria-labelledby="research-title"
        className="bg-primary-dark py-section"
      >
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="03 / Research Directions"
              title="研究方向"
              titleId="research-title"
              desc={lang === "zh" ? "点击卡片了解各方向详情。" : "Click a card to view direction details."}
              align="center"
              tone="dark"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {researchDirections.map((direction) => (
                <ResearchCard key={direction.slug} direction={direction} lang={lang} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 团队成员（首页精选） */}
      <section id="team" aria-labelledby="team-title" className="py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="04 / Team Members"
              title="团队成员"
              titleId="team-title"
              desc="首页展示部分课题组成员，完整名单可进入团队成员页面查看。"
              align="center"
            />
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {featuredMembers.map((member) => (
                <MemberCard key={member.id} member={member} lang={lang} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="h-11 px-7">
                <Link href="/team">查看更多成员</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 本科生招新 CTA */}
      <section id="join" aria-labelledby="join-title" className="bg-surface py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                eyebrow="05 / Join Us"
                title="本科生招新"
                titleId="join-title"
              />
              {joinConfig.status === "pending" ? (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary-light px-4 py-1.5 text-sm font-medium text-gold">
                  <span aria-hidden="true">●</span>
                  {t(joinConfig.pendingNote, lang)}
                </p>
              ) : null}
              <p className="mt-5 leading-relaxed text-body-secondary">
                {t(joinConfig.intro, lang)}
              </p>
              <div className="mt-8">
                <Button asChild className="h-11 px-7">
                  <Link href="/join">
                    {lang === "zh" ? "查看详细招新信息" : "View recruitment details"} →
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
