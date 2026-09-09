import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/home/hero-slider";
import { ResearchCard } from "@/components/home/research-card";
import { MemberCard } from "@/components/member-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { siteConfig, t, hrefFor, type Lang } from "@/data/site";
import { members, featuredMembers } from "@/data/members";
import { researchDirections } from "@/data/research";
import { joinConfig } from "@/data/join";

const platforms = [
  {
    no: "01",
    image: "/images/platform/wifi-csi-intel5300.png",
    name: { zh: "WiFi CSI 采集平台", en: "WiFi CSI Acquisition Platform" },
    description: {
      zh: "基于 Intel 5300 WiFi 网卡获取多子载波幅度与相位信息，适合分析人体活动引起的细粒度信道变化。",
      en: "Uses Intel 5300 WiFi cards to capture subcarrier amplitude and phase data for analyzing fine-grained channel changes caused by human activity.",
    },
  },
  {
    no: "02",
    image: "/images/platform/bfi-capture-r7800-r9000.jpeg",
    name: { zh: "BFI 采集平台", en: "BFI Acquisition Platform" },
    description: {
      zh: "由发射设备、接收节点与嗅探设备协同，捕获商用 WiFi 通信过程中产生的 BFI 数据包。",
      en: "Coordinates transmitters, receiving nodes, and sniffing devices to capture BFI packets generated during commercial WiFi communication.",
    },
  },
  {
    no: "03",
    image: "/images/platform/mmwave-awr1843.png",
    name: { zh: "毫米波雷达平台", en: "Millimeter-Wave Radar Platform" },
    description: {
      zh: "基于 TI AWR1843 77GHz 雷达输出三维点云，为胸腔微动、姿态和步态感知提供高质量原始数据。",
      en: "Uses a TI AWR1843 77 GHz radar to produce 3D point clouds for chest micro-motion, posture, and gait sensing.",
    },
  },
  {
    no: "04",
    image: "/images/platform/turtlebot4-platform.jpeg",
    name: { zh: "TurtleBot4 移动平台", en: "TurtleBot4 Mobile Platform" },
    description: {
      zh: "作为移动验证平台，支持搭载激光雷达、深度相机等传感器，在动态场景下验证多传感器融合算法。",
      en: "Carries LiDAR, depth cameras, and other sensors to validate multisensor fusion algorithms in dynamic environments.",
    },
  },
] as const;

/**
 * 首页（zh/en 共享）：hero 轮播 → 课题组介绍 → 导师介绍 → 研究方向 → 实验平台 → 成员精选 → 招新 CTA
 * 区块编号 01-06（学术成果区块去向待定 §13-W3，暂不展示）
 */
export function HomePage({ lang }: { lang: Lang }) {
  const supervisor = siteConfig.supervisor;

  const copy = {
    aboutTitle: { zh: "课题组介绍", en: "About the Group" },
    supervisorTitle: { zh: "导师介绍", en: "Supervisor" },
    researchTitle: { zh: "研究方向", en: "Research Directions" },
    researchDesc: {
      zh: "点击卡片了解各方向详情。",
      en: "Click a card to view direction details.",
    },
    platformTitle: { zh: "实验平台", en: "Research Platforms" },
    platformDesc: {
      zh: "四类平台覆盖协议级无线感知、商用 WiFi 反馈信息、三维空间点云和移动场景验证，形成从信道微扰到空间运动的多模态实验链路。",
      en: "Four platforms span protocol-level wireless sensing, commercial WiFi feedback, 3D point clouds, and mobile-scene validation, forming a multimodal pipeline from channel perturbations to spatial motion.",
    },
    teamTitle: { zh: "团队成员", en: "Team Members" },
    teamDesc: {
      zh: "首页展示部分课题组成员，完整名单可进入团队成员页面查看。",
      en: "Selected members are shown here. Visit the team page for the full list.",
    },
    joinTitle: { zh: "本科生招新", en: "Undergraduate Recruitment" },
    viewAllMembers: { zh: "查看更多成员", en: "View all members" },
    viewJoinDetails: { zh: "查看详细招新信息", en: "View recruitment details" },
    profile: { zh: "个人简介", en: "Profile" },
    interests: { zh: "研究兴趣", en: "Research Interests" },
    homepage: { zh: "个人主页", en: "Homepage" },
    supervisorPhotoAlt: { zh: "左益平老师照片", en: "Yiping Zuo photo" },
    statDirections: { zh: "个研究方向", en: "Research Directions" },
    statMembers: { zh: "名团队成员", en: "Team Members" },
    statPartners: { zh: "家合作单位", en: "Partners" },
  } as const;

  // 数据统计（课题组介绍区块，随数据文件自动更新）
  const stats = [
    { value: researchDirections.length, label: copy.statDirections },
    { value: members.length, label: copy.statMembers },
    { value: siteConfig.partners.length, label: copy.statPartners },
  ];

  return (
    <>
      <HeroSlider slides={siteConfig.heroSlides} lang={lang} />

      {/* 01 课题组介绍 */}
      <section id="about" aria-labelledby="about-title" className="bg-surface py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="01 / About the Group"
                  title={t(copy.aboutTitle, lang)}
                  titleId="about-title"
                />
                <p className="mt-6 text-xl leading-relaxed font-medium text-primary md:text-2xl">
                  {t(siteConfig.about.lead, lang)}
                </p>
                <p className="mt-4 text-base leading-relaxed text-body-secondary md:text-lg">
                  {t(siteConfig.about.note, lang)}
                </p>
              </div>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={t(stat.label, lang)}
                    className="rounded-xl border border-border bg-surface-elevated px-4 py-8 text-center"
                  >
                    <dd className="text-5xl font-bold text-primary">{stat.value}</dd>
                    <dt className="mt-3 text-sm text-body-secondary md:text-base">
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
          <Reveal className="mx-auto max-w-[1080px]">
            <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-[100px]">
              {/* 照片右对齐贴住文字列（原 justify-self-start 时列内留白 175px）；
                  图源已裁掉顶部留白（960×1269），人物头部与眉题/标题对齐 */}
              <Image
                src={supervisor.photo}
                alt={t(copy.supervisorPhotoAlt, lang)}
                width={520}
                height={688}
                className="w-full max-w-sm justify-self-center rounded-xl object-cover shadow-card lg:justify-self-end"
              />
              <div>
                <SectionHeading
                  eyebrow="02 / Supervisor"
                  title={t(copy.supervisorTitle, lang)}
                  titleId="leader-title"
                />
                <div className="mt-6">
                  <h3 className="text-3xl font-bold text-body">
                    {t(supervisor.name, lang)}
                  </h3>
                  <p className="mt-1.5 text-base text-body-secondary">
                    {t(supervisor.title, lang)} · {t(siteConfig.contact.affiliation, lang)}
                  </p>
                </div>
                <dl className="mt-8 flex flex-col gap-7">
                  <div>
                    <dt className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                      {t(copy.profile, lang)}
                    </dt>
                    <dd className="mt-2.5 text-base leading-relaxed text-body-secondary md:text-lg">
                      {t(supervisor.profile, lang)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                      {t(copy.interests, lang)}
                    </dt>
                    <dd className="mt-2.5 text-base leading-relaxed text-body-secondary md:text-lg">
                      {t(supervisor.interests, lang)}
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    <div>
                      <dt className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                        Email
                      </dt>
                      <dd className="mt-2.5 text-base md:text-lg">
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="break-all text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold tracking-widest text-body-muted uppercase">
                        {t(copy.homepage, lang)}
                      </dt>
                      <dd className="mt-2.5 text-base md:text-lg">
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
              title={t(copy.researchTitle, lang)}
              titleId="research-title"
              desc={t(copy.researchDesc, lang)}
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

      {/* 04 实验平台（仅首页展示，不设导航或详情页） */}
      <section id="platforms" aria-labelledby="platforms-title" className="bg-surface py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="04 / Research Platforms"
              title={t(copy.platformTitle, lang)}
              titleId="platforms-title"
              desc={t(copy.platformDesc, lang)}
              align="center"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {platforms.map((platform) => (
                <article
                  key={platform.no}
                  className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-card"
                >
                  <div className="relative aspect-[4/3] border-b border-border bg-white">
                    <Image
                      src={platform.image}
                      alt={t(platform.name, lang)}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 560px) 50vw, 100vw"
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="px-5 py-6">
                    <p className="text-sm font-bold tracking-widest text-gold">
                      {platform.no}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-body">
                      {t(platform.name, lang)}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-body-secondary">
                      {t(platform.description, lang)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 团队成员（首页精选） */}
      <section id="team" aria-labelledby="team-title" className="py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal className="mx-auto max-w-[1080px]">
            <SectionHeading
              eyebrow="05 / Team Members"
              title={t(copy.teamTitle, lang)}
              titleId="team-title"
              desc={t(copy.teamDesc, lang)}
              align="center"
            />
            {/* 1040-1280 三列，1280px 起四列；容器宽度保持紧凑，避免成员卡过宽。 */}
            <div className="mx-auto mt-12 grid w-full max-w-[1080px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredMembers.slice(0, 8).map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  lang={lang}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="h-auto min-h-12 px-6 text-center text-base whitespace-normal md:h-12 md:px-8 md:whitespace-nowrap">
                <Link href={hrefFor("/team", lang)}>{t(copy.viewAllMembers, lang)}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 本科生招新 CTA */}
      <section id="join" aria-labelledby="join-title" className="bg-surface py-section">
        <div className="mx-auto w-full max-w-content px-6 md:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                eyebrow="06 / Join Us"
                title={t(copy.joinTitle, lang)}
                titleId="join-title"
              />
              {joinConfig.status === "pending" ? (
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary-light px-5 py-2 text-base font-medium text-gold">
                  <span aria-hidden="true">●</span>
                  {t(joinConfig.pendingNote, lang)}
                </p>
              ) : null}
              <p className="mt-6 text-base leading-relaxed text-body-secondary md:text-lg">
                {t(joinConfig.intro, lang)}
              </p>
              <div className="mt-9">
                <Button asChild className="h-auto min-h-12 px-6 text-center text-base whitespace-normal md:h-12 md:px-8 md:text-lg md:whitespace-nowrap">
                  <Link href={hrefFor("/join", lang)}>
                    {t(copy.viewJoinDetails, lang)} →
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
