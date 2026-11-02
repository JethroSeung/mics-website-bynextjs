import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, Mail, RadioTower } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { disasterApplication } from "@/data/disaster-recruitment";
import { hrefFor, siteConfig, t, type Lang } from "@/data/site";
import { medengApplication, recruitmentAreas } from "@/data/join";

export function JoinPage({ lang }: { lang: Lang }) {
  const copy = {
    back: { zh: "返回首页", en: "Back to home" },
    title: { zh: "加入我们", en: "Join Us" },
    desc: {
      zh: "欢迎对多模态感知、通信与人工智能交叉研究感兴趣的同学了解课题组，与我们交流研究兴趣。",
      en: "Explore our research in multimodal sensing, communication, and AI, and get in touch to discuss your interests.",
    },
    undergraduate: { zh: "本科生科研交流", en: "Undergraduate research enquiries" },
    undergraduateDesc: {
      zh: "欢迎对技术感兴趣，动手能力强且有意愿参与科研的本科生联系下方对应方向负责人。请在邮件中简单介绍自己的个人情况、兴趣、学习情况和希望参与的方向。我们将在邮件中进行回复。",
      en: "Undergraduates with an interest in technology, strong practical skills, and a willingness to participate in research are welcome to email the relevant area contact below. Please briefly introduce yourself, your interests, academic background, and preferred research area. We will reply by email.",
    },
    graduate: { zh: "欢迎报考研究生", en: "Prospective graduate students" },
    graduateDesc: {
      zh: "欢迎有志于计算机，通信，人工智能等领域的同学报考研究生，并提前联系导师交流研究兴趣。具体招生信息以学校当年公布的通知为准。我们期待在南邮见到优秀的各位。",
      en: "We welcome applications for graduate study from students interested in computer science, communication, artificial intelligence, and related fields. Please contact the supervisor in advance to discuss your research interests. Refer to NJUPT’s official admissions notices for the relevant year for specific requirements. We look forward to welcoming talented students like you to NJUPT.",
    },
    contactLabel: { zh: "方向联系人", en: "Area contact" },
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
              {lang === "zh" ? "研究方向与联系人" : "Research areas and contacts"}
            </h2>
            <div className="flex max-w-4xl flex-col gap-8 md:gap-10">
              <div>
                <h3 className="text-lg font-bold text-primary">{t(copy.graduate, lang)}</h3>
                <p className="mt-3 text-base leading-relaxed text-body-secondary">{t(copy.graduateDesc, lang)}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-base">
                  <span>{t(siteConfig.supervisor.name, lang)}</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="break-all text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{t(copy.undergraduate, lang)}</h3>
                <p className="mt-3 text-base leading-relaxed text-body-secondary">{t(copy.undergraduateDesc, lang)}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {recruitmentAreas.map((area, index) => {
                const Icon = index === 0 ? Activity : RadioTower;
                const isDisaster = area.slug === "disaster";
                const application = isDisaster ? disasterApplication : medengApplication;
                const content = (
                  <article id={area.slug} className="scroll-mt-28 flex h-full min-h-[360px] flex-col rounded-2xl border border-border bg-surface-elevated p-7 shadow-card md:p-9">
                    <div className="flex items-start justify-between gap-5">
                      <span className="flex size-14 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <Icon className="size-7" aria-hidden="true" />
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
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={lang === "zh" ? "研究方向" : "Research tracks"}>
                      {area.trackLabels.map((label) => (
                        <li key={t(label, lang)} className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-body-secondary">
                          {t(label, lang)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7">
                      <div className="border-t border-border pt-5">
                        <p className="text-sm text-body-muted">{t(copy.contactLabel, lang)}</p>
                        <p className="mt-2 font-semibold text-body">{t(application.recipient.name, lang)}</p>
                        <a href={`mailto:${application.recipient.email}`} className="mt-2 inline-flex items-start gap-2 text-base text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
                          <Mail className="mt-1 size-4 shrink-0" aria-hidden="true" />
                          <span className="break-all">{application.recipient.email}</span>
                        </a>
                      </div>
                    </div>
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
