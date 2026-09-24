import Link from "next/link";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { ActiveTrackScroller } from "./active-track-scroller";
import { RecruitmentContentController } from "./content-controller";
import {
  communicationSensingChallenge,
  communicationSensingPresentationPapers,
  communicationSensingReproductionPapers,
  disasterApplication,
  disasterDirectionPath,
  disasterDirections,
  type DisasterPaper,
  type PublishedDisasterDirectionSlug,
} from "@/data/disaster-recruitment";
import {
  sensingComputingOrientation,
  sensingComputingAvailabilityNote,
  sensingComputingPresentationPapers,
  sensingComputingReproductionPapers,
  sensingComputingSubmission,
} from "@/data/sensing-computing-recruitment";
import {
  communicationComputingAvailabilityNote,
  communicationComputingChallenge,
  communicationComputingPaperSubmission,
  communicationComputingPapers,
  communicationComputingPrimer,
} from "@/data/communication-computing-recruitment";
import { hrefFor, t, type Lang, type Localized } from "@/data/site";

const copy = {
  back: { zh: "返回招新方向", en: "Back to recruitment areas" },
  directionHeading: { zh: "灾害招新方向", en: "Disaster Recruitment Tracks" },
  openNote: { zh: "（任选其一即可）", en: "All three tracks are open" },
  preparing: { zh: "整理中", en: "Preparing" },
  lead: { zh: "方向负责人", en: "Track lead" },
  heroEyebrow: { zh: "自然灾害 · 通感方向", en: "Natural Disasters · Communication-Sensing" },
  heroTitle: { zh: "通信与感知方向招新", en: "Communication and Sensing Recruitment" },
  heroLead: {
    zh: "让通信基站在传输信息之外，也能感知山区环境变化，为自然灾害监测与韧性通信提供新的技术路径。",
    en: "Enable communication infrastructure to sense environmental changes in mountainous areas while carrying data, opening new paths for disaster monitoring and resilient communications.",
  },
  backgroundTitle: { zh: "研究背景", en: "Research Background" },
  background: {
    zh: [
      "课题组关注自然灾害场景下的通感算一体化研究，探索如何利用现有电信基站、通信波形和无线传播信息，在提供通信服务的同时，对山区重点区域进行环境感知与状态监测。",
      "山区的山脊、植被、建筑物和移动障碍物会改变无线信号传播路径；灾害发生前后还可能出现覆盖下降、基站失联和供电不足。研究这些问题，需要结合无线通信、信号处理、三维建模与智能算法。",
    ],
    en: [
      "The group studies integrated communication, sensing, and computing for natural disasters. We explore how existing cellular infrastructure, communication waveforms, and propagation information can monitor critical mountain environments while continuing to provide communication services.",
      "Ridges, vegetation, buildings, and moving obstacles reshape wireless propagation. Coverage degradation, disconnected base stations, and limited power may also occur around a disaster. Addressing these problems requires wireless communications, signal processing, 3D modelling, and intelligent algorithms.",
    ],
  },
  applicationEyebrow: { zh: "报名说明", en: "Application Note" },
  required: { zh: "报名必要步骤", en: "Required" },
  applicationTitle: {
    zh: "完成任务，也让我们认识一下你",
    en: "Complete a task and tell us a little about yourself",
  },
  applicationLead: {
    zh: "完成本页任意一项招新任务后，还需要提交一份个人介绍材料；两项都完成才算完成报名。",
    en: "Complete any one recruitment task on this page and submit a short personal introduction. Both steps are required to complete your application.",
  },
  taskItem: { zh: "完成本方向的一项招新任务", en: "Complete one recruitment task in this track" },
  profileItem: { zh: "提交简历或文字自我介绍（二选一）", en: "Submit either a résumé or a short written introduction" },
  friendly: {
    zh: "不需要专门制作精美简历，也不要求已有科研、竞赛或项目经历。已有简历可以直接发送；如果暂时没有，用几段文字介绍自己的专业年级、兴趣方向、参与原因和愿意分享的经历即可。",
    en: "You do not need a polished résumé or prior research, competition, or project experience. Send an existing résumé if you have one; otherwise, a few paragraphs about your programme, year, interests, motivation, and any experience you would like to share are enough.",
  },
  submissionLabel: { zh: "个人介绍统一投递", en: "Send your introduction to" },
  subjectLabel: { zh: "建议邮件标题", en: "Suggested subject" },
  sidebarTitle: { zh: "报名补充材料", en: "Application material" },
  sidebarMaterial: { zh: "简历或文字自我介绍", en: "Résumé or written introduction" },
  sidebarRequired: { zh: "报名必需", en: "Required" },
  sidebarRecipient: { zh: "统一接收", en: "Send to" },
  selectorEyebrow: { zh: "01 / 参与方式", en: "01 / Participation Routes" },
  selectorTitle: { zh: "选择招新任务", en: "Choose Your Recruitment Task" },
  selectorLead: {
    zh: "挑战赛、论文复现和论文汇报考察不同能力。请根据自己的基础和兴趣选择其中一项完成。",
    en: "The challenge, paper reproduction, and paper presentation assess different strengths. Choose one that fits your interests and background.",
  },
  challenge: { zh: "挑战赛", en: "Challenge" },
  challengeDesc: { zh: "搭建山区无线数字孪生", en: "Build a mountain wireless digital twin" },
  reproduction: { zh: "论文复现", en: "Paper Reproduction" },
  reproductionDesc: { zh: "从三篇论文中选择一篇", en: "Choose one of three papers" },
  presentation: { zh: "论文汇报", en: "Paper Presentation" },
  presentationDesc: { zh: "从四篇论文中选择一篇", en: "Choose one of four papers" },
  criteria: { zh: "评分标准", en: "Evaluation Criteria" },
  resources: { zh: "公开资源", en: "Open Resources" },
  submission: { zh: "提交验收标准", en: "Submission Requirements" },
  reproductionTitle: { zh: "选择一篇论文完成复现", en: "Choose One Paper to Reproduce" },
  presentationTitle: { zh: "选择一篇论文完成汇报", en: "Choose One Paper to Present" },
  expand: { zh: "查看摘要与任务要求", en: "View summary and requirements" },
  taskRequirements: { zh: "任务要求", en: "Task Requirements" },
  reproductionSubmission: {
    zh: [
      "提交代码仓库链接、环境配置、运行说明和复现实验报告。",
      "提交关键指标、参数表、可视化图像与误差分析。",
      "准备 20 分钟线下汇报，说明论文方法、复现过程、实验结果和改进方向。",
    ],
    en: [
      "Submit a code repository, environment configuration, run instructions, and reproduction report.",
      "Provide key metrics, parameter tables, visualisations, and error analysis.",
      "Prepare a 20-minute on-site presentation on the method, reproduction process, results, and possible improvements.",
    ],
  },
  presentationSubmission: {
    zh: [
      "通过统一邮箱提交论文汇报 PPT，内容应包含背景、方法流程、核心实验、结论与个人理解。",
      "完成 20 分钟线下现场汇报，并回答方法细节相关问题。",
    ],
    en: [
      "Email your presentation slides, covering the background, method pipeline, core experiments, conclusions, and your own understanding.",
      "Give a 20-minute on-site presentation and answer questions about the method.",
    ],
  },
  taskSubmissionLabel: { zh: "任务成果提交", en: "Task submission" },
  taskSubmissionLead: {
    zh: "完成任务后，请将成果发送给本方向负责人。简历或文字自我介绍仍统一发送给杨承轩。",
    en: "Send the completed task to the track lead. Continue to send your résumé or written introduction to Chengxuan Yang.",
  },
  taskRecipient: { zh: "方向负责人", en: "Track lead" },
  schedulePending: { zh: "时间安排", en: "Schedule" },
  directionLead: { zh: "本方向负责人", en: "Track lead" },
  sensingOverviewEyebrow: { zh: "开始之前", en: "Before you begin" },
  sensingOverviewTitle: { zh: "先找到适合自己的切入点", en: "Find a practical starting point" },
  sensingTopics: { zh: "四类研究问题", en: "Four problem areas" },
  sensingPreparation: { zh: "最低准备", en: "Minimum preparation" },
  sensingSelection: { zh: "怎么选题", en: "How to choose" },
  starterGuide: { zh: "查看新生起步指南", en: "Open the beginner guide" },
  computingPrimerEyebrow: { zh: "本方向的核心任务", en: "The core task" },
  observedState: { zh: "系统看到什么", en: "What the system observes" },
  orchestrator: { zh: "模型选择与通信调度", en: "Model selection and communication policy" },
  availableActions: { zh: "系统决定什么", en: "What the system decides" },
  evaluationOutputs: { zh: "系统需要评价什么", en: "What the system evaluates" },
  systemChallenge: { zh: "通信与计算协同挑战", en: "Communication-Computing Coordination Challenge" },
  systemChallengeDesc: { zh: "设计多模型智能系统，并决定何时通信", en: "Design a multi-model system that decides when to communicate" },
  paperStudy: { zh: "论文精讲", en: "Paper Study" },
  paperStudyDesc: { zh: "从四篇论文中选择一篇", en: "Choose one of four papers" },
  technicalRoutes: { zh: "你可以怎样组织这套系统？", en: "How can you organise the system?" },
  datasetTitle: { zh: "数据与实验起点", en: "Data and experimental starting point" },
  minimumTitle: { zh: "最低完成要求", en: "Minimum requirements" },
  simulationTitle: { zh: "系统每个时间步如何运行", en: "How the system runs at each time step" },
  systemResults: { zh: "运行结束后需要统计", en: "What to measure after the run" },
  weakLinkTitle: { zh: "模拟弱连接或丢包", en: "Simulating weak connectivity or packet loss" },
  dataContent: { zh: "数据包含什么", en: "What the data contain" },
  dataCode: { zh: "读取数据并按时间划分", en: "Load and split the data chronologically" },
  environmentTitle: { zh: "推荐开发环境", en: "Recommended development environment" },
  requiredTools: { zh: "基础方案", en: "Basic solution" },
  optionalTools: { zh: "按需增加", en: "Optional additions" },
  furtherTitle: { zh: "完成基础系统后，可以继续思考", en: "Questions to explore after the basic system" },
} as const;

const directionPageCopy = {
  "communication-sensing": {
    heroEyebrow: copy.heroEyebrow,
    heroTitle: copy.heroTitle,
    heroLead: copy.heroLead,
    background: copy.background,
    applicationSubject: {
      zh: "MICS自然灾害招新-通感-姓名-学号",
      en: "MICS Disaster Recruitment - Communication-Sensing - Name - Student ID",
    },
    taskSubject: {
      zh: "MICS自然灾害招新-通感任务-姓名-学号",
      en: "MICS Disaster Recruitment - Communication-Sensing Task - Name - Student ID",
    },
  },
  "sensing-computing": {
    heroEyebrow: { zh: "自然灾害 · 感算方向", en: "Natural Disasters · Sensing-Computing" },
    heroTitle: { zh: "感知与计算方向招新", en: "Sensing and Computing Recruitment" },
    heroLead: {
      zh: "从降雨、滑坡和泥石流数据中提取可信信息，让智能计算服务于灾害识别、预测与快速制图。",
      en: "Extract reliable information from rainfall, landslide, and debris-flow data so intelligent computing can support disaster recognition, forecasting, and rapid mapping.",
    },
    background: {
      zh: [
        "自然灾害监测会产生无线信道、位移时序、遥感影像、降雨与事件编目等多源数据。感算方向关注如何清洗、建模和解释这些数据，把观测转化为可验证的分类、预测与制图结果。",
        "本次考核设置论文复现与论文汇报两类任务，覆盖降雨强度分类、滑坡位移预测、高分辨率滑坡制图和震后泥石流分析。两类任务并列，可根据基础与兴趣选择其中一项。",
      ],
      en: [
        "Disaster monitoring produces heterogeneous data such as wireless channels, displacement time series, remote-sensing imagery, rainfall records, and event inventories. This track focuses on cleaning, modelling, and interpreting those observations for verifiable classification, forecasting, and mapping.",
        "The assessment offers paper reproduction and paper presentation routes covering rainfall classification, landslide displacement forecasting, high-resolution landslide mapping, and post-earthquake debris-flow analysis. Choose one task that fits your interests and background.",
      ],
    },
    applicationSubject: {
      zh: "MICS自然灾害招新-感算-姓名-学号",
      en: "MICS Disaster Recruitment - Sensing-Computing - Name - Student ID",
    },
    taskSubject: {
      zh: "MICS自然灾害招新-感算任务-姓名-学号",
      en: "MICS Disaster Recruitment - Sensing-Computing Task - Name - Student ID",
    },
  },
  "communication-computing": {
    heroEyebrow: { zh: "自然灾害 · 通算方向", en: "Natural Disasters · Communication-Computing" },
    heroTitle: { zh: "AI 驱动的通信与计算方向招新", en: "AI-Driven Communication and Computing Recruitment" },
    heroLead: {
      zh: "让智能系统在有限带宽、算力与能源下，决定使用什么模型、交换什么信息，以及什么时候值得通信。",
      en: "Design intelligent systems that decide which model to use, what information to exchange, and when communication is worthwhile under limited bandwidth, compute, and energy.",
    },
    background: {
      zh: [
        "偏远地区的长期监测节点需要持续理解环境，但上传每一条数据会消耗带宽与能源，在弱连接时也未必可靠；与此同时，始终调用最复杂的模型同样会浪费计算资源。",
        "通算方向研究智能如何分布在设备、边缘与网络之间。重点不是追求单个模型的最高精度，而是让多个能力和成本不同的模型互相协作，并与通信过程联合决策。",
      ],
      en: [
        "Remote monitoring nodes must understand their environment continuously, yet uploading every sample consumes bandwidth and energy and may be unreliable under weak connectivity. Always invoking the most complex model also wastes compute.",
        "This track studies how intelligence is distributed across devices, edges, and networks. The goal is not the best standalone model, but collaboration among models with different capabilities and costs together with communication decisions.",
      ],
    },
    applicationSubject: {
      zh: "MICS自然灾害招新-通算-姓名-学号",
      en: "MICS Disaster Recruitment - Communication-Computing - Name - Student ID",
    },
    taskSubject: {
      zh: "MICS自然灾害招新-通算任务-姓名-学号",
      en: "MICS Disaster Recruitment - Communication-Computing Task - Name - Student ID",
    },
  },
} as const;

function applicationMailHref(lang: Lang, directionSlug: PublishedDisasterDirectionSlug) {
  const subject = directionPageCopy[directionSlug].applicationSubject;
  return `mailto:${disasterApplication.recipient.email}?subject=${encodeURIComponent(t(subject, lang))}`;
}

function taskMailHref(lang: Lang, directionSlug: PublishedDisasterDirectionSlug) {
  const direction = disasterDirections.find((item) => item.slug === directionSlug);
  if (!direction) throw new Error(`灾害招新方向不存在：${directionSlug}`);
  const subject = directionPageCopy[directionSlug].taskSubject;
  return `mailto:${direction.contact.email}?subject=${encodeURIComponent(t(subject, lang))}`;
}

function NumberedList({ items, lang }: { items: readonly Localized[]; lang: Lang }) {
  return (
    <ol className="divide-y divide-border">
      {items.map((item, index) => (
        <li
          key={`${index}-${t(item, lang)}`}
          className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3 text-sm leading-relaxed text-body-secondary first:pt-0 last:pb-0 md:text-base"
        >
          <span className="font-semibold text-gold" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{t(item, lang)}</span>
        </li>
      ))}
    </ol>
  );
}

function DirectionLinks({
  lang,
  active,
}: {
  lang: Lang;
  active: PublishedDisasterDirectionSlug;
}) {
  return (
    <nav aria-label={t(copy.directionHeading, lang)}>
      <ul className="flex gap-2 lg:flex-col">
        {disasterDirections.map((direction, index) => {
          const isActive = direction.slug === active;
          const content = (
            <>
              <span className={isActive ? "text-white/70" : "text-gold"}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block leading-relaxed">
                  {t(direction.navigationTitle, lang)}{" "}
                  <span className="whitespace-nowrap">/ {t(direction.shortTitle, lang)}</span>
                </span>
                {direction.status === "preparing" ? (
                  <span className="mt-0.5 block text-[10px] font-medium text-body-muted">
                    {t(direction.contact.name, lang)} · {t(copy.preparing, lang)}
                  </span>
                ) : null}
              </span>
            </>
          );

          return (
            <li key={direction.slug} className="shrink-0">
              {direction.status === "open" ? (
                <Link
                  href={hrefFor(disasterDirectionPath(direction.slug), lang)}
                  aria-current={direction.slug === active ? "page" : undefined}
                  className={`flex min-w-max items-center gap-3 rounded-lg border px-3 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring lg:min-w-0 ${
                    isActive
                      ? "border-[var(--track-color)] bg-[var(--track-color)] text-white"
                      : "border-border bg-white text-body-secondary transition-colors hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {content}
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex min-w-max cursor-default items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3 text-sm font-semibold text-body-secondary lg:min-w-0"
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ApplicationReminder({
  lang,
  directionSlug,
}: {
  lang: Lang;
  directionSlug: PublishedDisasterDirectionSlug;
}) {
  return (
    <div className="border-t border-border pt-6">
      <p className="text-xs font-bold tracking-[0.12em] text-gold uppercase">
        {t(copy.sidebarTitle, lang)}
      </p>
      <p className="mt-2 text-sm leading-relaxed font-semibold text-body">
        {t(copy.sidebarMaterial, lang)}
      </p>
      <p className="mt-1 text-xs font-medium text-body-muted">{t(copy.sidebarRequired, lang)}</p>
      <p className="mt-5 text-xs font-semibold tracking-wide text-body-muted uppercase">
        {t(copy.sidebarRecipient, lang)}
      </p>
      <p className="mt-1 text-sm font-semibold text-body">
        {t(disasterApplication.recipient.name, lang)}
      </p>
      <a
        href={applicationMailHref(lang, directionSlug)}
        className="mt-1 block break-all text-xs font-semibold leading-relaxed text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
      >
        {disasterApplication.recipient.email}
      </a>
    </div>
  );
}

function ApplicationGuide({
  lang,
  directionSlug,
}: {
  lang: Lang;
  directionSlug: PublishedDisasterDirectionSlug;
}) {
  const steps = [copy.taskItem, copy.profileItem] satisfies readonly Localized[];
  const applicationSubject = directionPageCopy[directionSlug].applicationSubject;
  return (
    <section aria-labelledby="disaster-application-title" className="border-y border-border bg-white py-8 md:py-10">
      <div className="w-full max-w-[1100px] px-6">
        <div className="rounded-2xl border border-gold/35 bg-primary-light/35 p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-gold uppercase">
              {t(copy.applicationEyebrow, lang)}
            </p>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
              {t(copy.required, lang)}
            </span>
          </div>
          <h2 id="disaster-application-title" className="mt-3 text-2xl font-bold leading-tight text-primary md:text-3xl">
            {t(copy.applicationTitle, lang)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
            {t(copy.applicationLead, lang)}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <NumberedList items={steps} lang={lang} />
              <p className="mt-5 text-sm leading-relaxed text-body-secondary md:text-base">
                {t(copy.friendly, lang)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-xs font-bold tracking-[0.12em] text-gold uppercase">
                {t(copy.submissionLabel, lang)}
              </p>
              <p className="mt-3 text-lg font-bold text-primary">
                {t(disasterApplication.recipient.name, lang)}
              </p>
              <a
                href={applicationMailHref(lang, directionSlug)}
                className="mt-1 inline-flex items-start gap-2 break-all text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {disasterApplication.recipient.email}
              </a>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold text-body-muted">{t(copy.subjectLabel, lang)}</p>
                <p className="mt-1 text-sm leading-relaxed font-medium text-body">
                  {t(applicationSubject, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaperCard({ paper, lang }: { paper: DisasterPaper; lang: Lang }) {
  return (
    <details className="group rounded-xl border border-border bg-white shadow-sm open:border-primary/30">
      <summary className="cursor-pointer list-none px-5 py-5 focus-visible:outline-2 focus-visible:outline-ring md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.08em] text-gold uppercase">{paper.venue}</p>
            <h3 className="mt-2 text-lg font-bold leading-snug text-primary md:text-xl">{paper.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body-muted">{paper.authors}</p>
          </div>
          <span className="mt-1 shrink-0 text-xl text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
        </div>
        <p className="mt-3 text-sm font-semibold text-body-secondary">{t(copy.expand, lang)}</p>
      </summary>
      <div className="border-t border-border px-5 py-5 md:px-6 md:py-6">
        <p className="text-sm leading-relaxed text-body-secondary md:text-base">{t(paper.summary, lang)}</p>
        <h4 className="mt-6 text-sm font-bold text-primary">{t(copy.taskRequirements, lang)}</h4>
        <div className="mt-3">
          <NumberedList items={paper.requirements} lang={lang} />
        </div>
        {paper.note ? (
          <p className="mt-5 rounded-lg bg-surface px-4 py-3 text-sm leading-relaxed text-body-secondary">
            {t(paper.note, lang)}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          {paper.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/25 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t(link.label, lang)}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-5 md:p-7">
      <h3 className="text-xl font-bold text-primary md:text-2xl">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SensingComputingOverview({ lang }: { lang: Lang }) {
  return (
    <section className="border-b border-border bg-[#f5f8f6] px-6 py-10 md:py-14">
      <div className="w-full max-w-[1100px]">
        <p className="text-xs font-bold tracking-[0.14em] text-gold uppercase">
          {t(copy.sensingOverviewEyebrow, lang)}
        </p>
        <h2 className="mt-2 max-w-3xl text-3xl font-bold text-[var(--track-color)] md:text-4xl">
          {t(copy.sensingOverviewTitle, lang)}
        </h2>

        <div className="mt-9 grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-14">
          <div>
            <h3 className="text-sm font-bold tracking-[0.1em] text-body-muted uppercase">
              {t(copy.sensingTopics, lang)}
            </h3>
            <ol className="mt-4 border-y border-[var(--track-color)]/20">
              {sensingComputingOrientation.topics.map((topic, index) => (
                <li
                  key={t(topic.title, lang)}
                  className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-b border-border py-4 last:border-b-0"
                >
                  <span className="font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-bold text-[var(--track-color)]">{t(topic.title, lang)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-body-secondary">
                      {t(topic.description, lang)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold tracking-[0.1em] text-body-muted uppercase">
                {t(copy.sensingPreparation, lang)}
              </h3>
              <div className="mt-4">
                <NumberedList items={sensingComputingOrientation.preparation} lang={lang} />
              </div>
              <Link
                href={hrefFor("/join/getting-started", lang)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--track-color)] underline decoration-[var(--track-color)]/25 underline-offset-4 hover:decoration-[var(--track-color)] focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t(copy.starterGuide, lang)}
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="border-t border-border pt-7">
              <h3 className="text-sm font-bold tracking-[0.1em] text-body-muted uppercase">
                {t(copy.sensingSelection, lang)}
              </h3>
              <ul className="mt-4 space-y-3">
                {sensingComputingOrientation.selection.map((item) => (
                  <li key={t(item, lang)} className="flex gap-3 text-sm leading-relaxed text-body-secondary md:text-base">
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{t(item, lang)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-l-2 border-[var(--track-color)] pl-4 text-sm font-semibold leading-relaxed text-body">
                {t(sensingComputingOrientation.closing, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunicationComputingPrimer({ lang }: { lang: Lang }) {
  return (
    <section className="border-b border-border bg-[#f6f6fa] px-6 py-10 md:py-14">
      <div className="w-full max-w-[1100px]">
        <p className="text-sm font-bold text-gold">
          {t(copy.computingPrimerEyebrow, lang)}
        </p>
        <h2 className="mt-2 max-w-4xl text-3xl font-bold text-[var(--track-color)] md:text-4xl">
          {t(communicationComputingChallenge.taskTitle, lang)}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-body-secondary md:text-lg">
          {t(communicationComputingPrimer.lead, lang)}
        </p>

        <div className="mt-9 grid border-y border-border bg-white lg:grid-cols-3">
          <div className="border-b border-border px-5 py-5 lg:border-r lg:border-b-0">
            <p className="text-sm font-bold text-[var(--track-color)]">{t(copy.observedState, lang)}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-body-secondary">
              {communicationComputingPrimer.inputs.map((item) => <li key={t(item, lang)}>— {t(item, lang)}</li>)}
            </ul>
          </div>
          <div className="border-b border-border bg-[var(--track-color)] px-5 py-5 text-white lg:border-b-0">
            <p className="text-sm font-bold text-white">{t(copy.availableActions, lang)}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
              {communicationComputingPrimer.decisions.map((item) => <li key={t(item, lang)}>— {t(item, lang)}</li>)}
            </ul>
          </div>
          <div className="px-5 py-5 lg:border-l lg:border-border">
            <p className="text-sm font-bold text-[var(--track-color)]">{t(copy.evaluationOutputs, lang)}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-body-secondary">
              {communicationComputingPrimer.outputs.map((item) => <li key={t(item, lang)}>— {t(item, lang)}</li>)}
            </ul>
          </div>
        </div>

        <blockquote className="mt-7 max-w-4xl border-l-2 border-[var(--track-color)] pl-5 text-base leading-relaxed font-semibold text-body md:text-lg">
          {t(communicationComputingPrimer.question, lang)}
        </blockquote>

        <div className="mt-8 grid gap-x-8 gap-y-4 border-t border-border pt-6 md:grid-cols-3">
          {communicationComputingPrimer.notes.map((note, index) => (
            <p key={t(note, lang)} className="text-sm leading-relaxed text-body-secondary">
              <span className="mr-2 font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
              {t(note, lang)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruitmentCodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden border border-[#555a87] bg-[#252947] text-white">
      <div className="border-b border-white/15 px-4 py-2 text-xs font-semibold text-white/65">
        {label}
      </div>
      <pre
        tabIndex={0}
        className="overflow-x-auto p-4 text-[13px] leading-6 text-[#f0f1ff] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:p-5 md:text-sm"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CommunicationComputingChallengePanel({ lang }: { lang: Lang }) {
  return (
    <div id="disaster-panel-systems" role="tabpanel" aria-labelledby="disaster-tab-systems" className="pl-enter">
      <p className="text-sm font-bold text-gold">{t(copy.systemChallenge, lang)}</p>
      <h2 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-primary md:text-4xl">
        {t(communicationComputingChallenge.taskTitle, lang)}
      </h2>
      <p className="mt-5 max-w-4xl text-base leading-relaxed text-body-secondary md:text-lg">
        {t(communicationComputingChallenge.taskLead, lang)}
      </p>
      <p className="mt-5 border-l-2 border-gold pl-4 text-sm leading-relaxed text-body-muted">
        <span className="font-semibold text-body">{lang === "zh" ? "赛题原题：" : "Original challenge title: "}</span>
        {t(communicationComputingChallenge.title, lang)}
      </p>

      <section className="mt-10 border-t border-border pt-8">
        <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.simulationTitle, lang)}</h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-body-secondary md:text-base">
          {t(communicationComputingChallenge.simulation.lead, lang)}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch">
          <ol className="border-y border-border bg-[#f6f6fa]">
            {communicationComputingChallenge.simulation.steps.map((step, index) => (
              <li key={t(step, lang)} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-border px-4 py-4 last:border-b-0">
                <span className="font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold leading-relaxed text-body md:text-base">{t(step, lang)}</span>
              </li>
            ))}
          </ol>
          <RecruitmentCodeBlock
            label={lang === "zh" ? "负责人材料中的基础仿真框架" : "Basic simulation framework from the supplied brief"}
            code={communicationComputingChallenge.simulation.code}
          />
        </div>
        <div className="mt-7">
          <h4 className="text-base font-bold text-primary">{t(copy.systemResults, lang)}</h4>
          <ul className="mt-4 grid border-y border-border sm:grid-cols-2 xl:grid-cols-5">
            {communicationComputingChallenge.simulation.results.map((result, index) => (
              <li key={t(result, lang)} className="border-b border-border px-4 py-4 text-sm leading-relaxed text-body-secondary last:border-b-0 sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:last:border-r-0">
                <span className="mr-2 font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
                {t(result, lang)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-10 grid gap-8 border-y border-border py-8 lg:grid-cols-2">
        <section>
          <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.minimumTitle, lang)}</h3>
          <div className="mt-5"><NumberedList items={communicationComputingChallenge.minimum} lang={lang} /></div>
          <p className="mt-5 border-l-2 border-[var(--track-color)] pl-4 text-sm font-semibold leading-relaxed text-body-secondary">
            {lang === "zh"
              ? "当程序能够读取状态、选择模型、完成分析、决定是否通信，并输出完整评价结果时，一套基础系统就形成了。"
              : "A basic system is complete when it can read state, select a model, perform analysis, decide whether to communicate, and produce a complete evaluation."}
          </p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.environmentTitle, lang)}</h3>
          <p className="mt-4 text-sm leading-relaxed text-body-secondary md:text-base">
            {t(communicationComputingChallenge.environment.lead, lang)}
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-body">{t(copy.requiredTools, lang)}</p>
              <p className="mt-2 text-sm leading-relaxed text-body-secondary">
                {communicationComputingChallenge.environment.required.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-body">{t(copy.optionalTools, lang)}</p>
              <p className="mt-2 text-sm leading-relaxed text-body-secondary">
                {communicationComputingChallenge.environment.optional.join(" · ")}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 bg-[#f6f6fa] p-5 md:p-8">
        <p className="text-sm font-bold text-gold">{t(copy.datasetTitle, lang)}</p>
        <h3 className="mt-2 text-xl font-bold text-primary md:text-2xl">
          {t(communicationComputingChallenge.dataset.title, lang)}
        </h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-body-secondary md:text-base">
          {t(communicationComputingChallenge.dataset.description, lang)}
        </p>
        <div className="mt-7 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="text-base font-bold text-primary">{t(copy.dataContent, lang)}</h4>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {communicationComputingChallenge.dataset.categories.map((category) => (
                <li key={t(category, lang)} className="py-3 text-sm leading-relaxed text-body-secondary">
                  {t(category, lang)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold text-primary">{t(copy.dataCode, lang)}</h4>
            <div className="mt-3 space-y-4">
              <RecruitmentCodeBlock label="data.csv" code={communicationComputingChallenge.dataset.loadCode} />
              <RecruitmentCodeBlock
                label={lang === "zh" ? "按时间划分训练集与测试集" : "Chronological train-test split"}
                code={communicationComputingChallenge.dataset.splitCode}
              />
            </div>
          </div>
        </div>
        <div className="mt-7"><NumberedList items={communicationComputingChallenge.dataset.facts} lang={lang} /></div>
        <p className="mt-6 border-l-2 border-gold pl-4 text-sm leading-relaxed text-body-secondary">
          {t(communicationComputingChallenge.dataset.labelNote, lang)}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-5">
          {communicationComputingChallenge.dataset.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/25 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring">
              {t(link.label, lang)}<ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.technicalRoutes, lang)}</h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-body-secondary md:text-base">
          {lang === "zh"
            ? "方案应围绕以下一种或多种路线展开。重点是模型组织、信息传递和通信调度，而不是是否使用复杂的大语言模型。"
            : "Use one or more of the following routes. The focus is model organisation, information transfer, and communication scheduling—not whether a complex language model is used."}
        </p>
        <div className="mt-5 grid gap-0 border-y border-border lg:grid-cols-3">
          {communicationComputingChallenge.routes.map((route, index) => (
            <div key={t(route.title, lang)} className="border-b border-border px-0 py-5 last:border-b-0 lg:border-r lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <p className="text-xs font-bold tracking-widest text-gold">{String(index + 1).padStart(2, "0")}</p>
              <h4 className="mt-2 text-lg font-bold text-primary">{t(route.title, lang)}</h4>
              <p className="mt-2 text-sm leading-relaxed text-body-secondary">{t(route.description, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 border-y border-border py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.weakLinkTitle, lang)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-body-secondary md:text-base">
            {t(communicationComputingChallenge.simulation.weakLinkLead, lang)}
          </p>
        </div>
        <RecruitmentCodeBlock
          label={lang === "zh" ? "负责人材料中的弱连接仿真示例" : "Weak-link simulation example from the supplied brief"}
          code={communicationComputingChallenge.simulation.weakLinkCode}
        />
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-bold text-primary md:text-2xl">{t(copy.furtherTitle, lang)}</h3>
        <div className="mt-5 grid gap-x-10 border-y border-border md:grid-cols-2">
          {communicationComputingChallenge.further.map((question, index) => (
            <div key={t(question, lang)} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-border py-4 md:[&:nth-last-child(-n+2)]:border-b-0">
              <span className="font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-body-secondary md:text-base">{t(question, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <SectionCard title={t(copy.criteria, lang)}>
          <NumberedList items={communicationComputingChallenge.criteria} lang={lang} />
        </SectionCard>
        <SectionCard title={t(copy.submission, lang)}>
          <NumberedList items={communicationComputingChallenge.submission} lang={lang} />
        </SectionCard>
      </div>
    </div>
  );
}

function CommunicationComputingPaperPanel({ lang }: { lang: Lang }) {
  return (
    <div id="disaster-panel-paper-study" role="tabpanel" aria-labelledby="disaster-tab-paper-study" hidden className="pl-enter">
      <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl">
        {lang === "zh" ? "选择一篇论文完成精讲" : "Choose One Paper for an In-depth Presentation"}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-body-secondary md:text-lg">
        {lang === "zh"
          ? "四篇论文分别从无人机协同、模型仓库、事件触发卸载与大小模型协作切入。选择一篇，重点讲清系统为什么这样组织智能。"
          : "The four papers approach the problem through UAV collaboration, model repositories, event-triggered offloading, and large-small model collaboration. Choose one and explain why the system organises intelligence in that way."}
      </p>
      <div className="mt-6 space-y-4">
        {communicationComputingPapers.map((paper) => <PaperCard key={paper.id} paper={paper} lang={lang} />)}
      </div>
      <div className="mt-6">
        <SectionCard title={t(copy.submission, lang)}>
          <NumberedList items={communicationComputingPaperSubmission} lang={lang} />
        </SectionCard>
      </div>
    </div>
  );
}

function CommunicationComputingTaskSelector({ lang }: { lang: Lang }) {
  const tabs = [
    { id: "systems", label: copy.systemChallenge, description: copy.systemChallengeDesc },
    { id: "paper-study", label: copy.paperStudy, description: copy.paperStudyDesc },
  ];
  return (
    <section aria-labelledby="disaster-task-selector" className="bg-white px-6 py-10 md:py-14">
      <div className="w-full max-w-[1100px]">
        <p className="text-xs font-bold tracking-[0.14em] text-gold uppercase">{t(copy.selectorEyebrow, lang)}</p>
        <h2 id="disaster-task-selector" className="mt-2 text-3xl font-bold text-primary md:text-4xl">
          {t(copy.selectorTitle, lang)}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-body-secondary md:text-lg">
          {lang === "zh"
            ? "通信与计算协同挑战与论文精讲并列设置，任选其一即可。前者需要设计并实现一套多模型智能系统，后者适合希望先理解前沿研究脉络的同学。"
            : "Choose either the communication-computing coordination challenge or the paper study. The former asks you to design and implement a multi-model intelligent system; the latter is for understanding current research first."}
        </p>
        <div role="tablist" aria-label={t(copy.selectorTitle, lang)} className="mt-8 grid gap-3 md:grid-cols-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`disaster-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={index === 0}
              aria-controls={`disaster-panel-${tab.id}`}
              tabIndex={index === 0 ? 0 : -1}
              className="group rounded-xl border border-border bg-surface px-5 py-4 text-left transition-colors hover:border-[var(--track-color)]/40 focus-visible:outline-2 focus-visible:outline-ring aria-selected:border-[var(--track-color)] aria-selected:bg-[var(--track-color)] aria-selected:text-white"
            >
              <span className="block text-xs font-bold tracking-widest text-gold group-aria-selected:text-white/70">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-2 block text-lg font-bold">{t(tab.label, lang)}</span>
              <span className="mt-1 block text-sm opacity-75">{t(tab.description, lang)}</span>
            </button>
          ))}
        </div>
        <div className="mt-10">
          <CommunicationComputingChallengePanel lang={lang} />
          <CommunicationComputingPaperPanel lang={lang} />
        </div>
        <TaskSubmission lang={lang} directionSlug="communication-computing" />
      </div>
    </section>
  );
}

function ChallengePanel({ lang }: { lang: Lang }) {
  return (
    <div id="disaster-panel-challenge" role="tabpanel" aria-labelledby="disaster-tab-challenge" className="pl-enter">
      <div className="flex flex-wrap gap-2">
        {communicationSensingChallenge.tags[lang].map((tag) => (
          <span key={tag} className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">{tag}</span>
        ))}
      </div>
      <h2 className="mt-5 text-2xl font-bold leading-tight text-primary md:text-3xl">
        {t(communicationSensingChallenge.title, lang)}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-body-secondary md:text-lg">
        {communicationSensingChallenge.intro[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <SectionCard title={t(copy.criteria, lang)}>
          <NumberedList items={communicationSensingChallenge.criteria} lang={lang} />
        </SectionCard>
        <SectionCard title={t(copy.resources, lang)}>
          <div className="grid gap-3 sm:grid-cols-2">
            {communicationSensingChallenge.resources.map((resource) => (
              <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-ring">
                {resource.label}<ExternalLink className="size-4 shrink-0 text-gold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="mt-6">
        <SectionCard title={t(copy.submission, lang)}>
          <NumberedList items={communicationSensingChallenge.submission} lang={lang} />
        </SectionCard>
      </div>
    </div>
  );
}

function PapersPanel({
  lang,
  kind,
  directionSlug,
  hidden,
}: {
  lang: Lang;
  kind: "reproduction" | "presentation";
  directionSlug: PublishedDisasterDirectionSlug;
  hidden: boolean;
}) {
  const reproduction = kind === "reproduction";
  const sensingComputing = directionSlug === "sensing-computing";
  const papers = sensingComputing
    ? reproduction
      ? sensingComputingReproductionPapers
      : sensingComputingPresentationPapers
    : reproduction
      ? communicationSensingReproductionPapers
      : communicationSensingPresentationPapers;
  const submission = sensingComputing
    ? sensingComputingSubmission[kind][lang]
    : reproduction
      ? copy.reproductionSubmission[lang]
      : copy.presentationSubmission[lang];
  const submissionItems = submission.map((item) => ({ zh: item, en: item })) satisfies Localized[];
  return (
    <div
      id={`disaster-panel-${kind}`}
      role="tabpanel"
      aria-labelledby={`disaster-tab-${kind}`}
      hidden={hidden}
      className="pl-enter"
    >
      <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl">
        {t(reproduction ? copy.reproductionTitle : copy.presentationTitle, lang)}
      </h2>
      <div className="mt-6 space-y-4">
        {papers.map((paper) => <PaperCard key={paper.id} paper={paper} lang={lang} />)}
      </div>
      <div className="mt-6">
        <SectionCard title={t(copy.submission, lang)}>
          <NumberedList items={submissionItems} lang={lang} />
        </SectionCard>
      </div>
    </div>
  );
}

function TaskSubmission({
  lang,
  directionSlug,
}: {
  lang: Lang;
  directionSlug: PublishedDisasterDirectionSlug;
}) {
  const direction = disasterDirections.find((item) => item.slug === directionSlug);
  if (!direction) throw new Error(`灾害招新方向不存在：${directionSlug}`);

  return (
    <section className="mt-8 rounded-2xl border border-primary/20 bg-primary-light/35 p-5 md:p-7">
      <p className="text-xs font-bold tracking-[0.12em] text-gold uppercase">
        {t(copy.taskSubmissionLabel, lang)}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body-secondary md:text-base">
        {t(copy.taskSubmissionLead, lang)}
      </p>
      <div className="mt-5 grid gap-5 border-t border-primary/10 pt-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-body-muted">{t(copy.taskRecipient, lang)}</p>
          <p className="mt-1 text-lg font-bold text-primary">{t(direction.contact.name, lang)}</p>
          <a
            href={taskMailHref(lang, directionSlug)}
            className="mt-1 inline-flex items-start gap-2 break-all text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            {direction.contact.email}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold text-body-muted">{t(copy.subjectLabel, lang)}</p>
          <p className="mt-1 text-sm leading-relaxed font-medium text-body">
            {t(directionPageCopy[directionSlug].taskSubject, lang)}
          </p>
          {directionSlug === "sensing-computing" || directionSlug === "communication-computing" ? (
            <>
              <p className="mt-4 text-xs font-semibold text-body-muted">{t(copy.schedulePending, lang)}</p>
              <p className="mt-1 text-sm leading-relaxed text-body-secondary">
                {t(
                  directionSlug === "sensing-computing"
                    ? sensingComputingAvailabilityNote
                    : communicationComputingAvailabilityNote,
                  lang,
                )}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TaskSelector({
  lang,
  directionSlug,
}: {
  lang: Lang;
  directionSlug: PublishedDisasterDirectionSlug;
}) {
  if (directionSlug === "communication-computing") {
    return <CommunicationComputingTaskSelector lang={lang} />;
  }

  const sensingComputing = directionSlug === "sensing-computing";
  const tabs = sensingComputing
    ? [
        {
          id: "reproduction" as const,
          label: copy.reproduction,
          description: { zh: "从四篇论文中选择一篇", en: "Choose one of four papers" },
        },
        {
          id: "presentation" as const,
          label: copy.presentation,
          description: { zh: "从四篇论文中选择一篇", en: "Choose one of four papers" },
        },
      ]
    : [
        { id: "challenge" as const, label: copy.challenge, description: copy.challengeDesc },
        { id: "reproduction" as const, label: copy.reproduction, description: copy.reproductionDesc },
        { id: "presentation" as const, label: copy.presentation, description: copy.presentationDesc },
      ];
  const selectorLead = sensingComputing
    ? {
        zh: "论文复现与论文汇报并列设置。请根据自己的基础和兴趣，从八项任务中选择一项完成。",
        en: "Paper reproduction and presentation are equal routes. Choose one of the eight tasks according to your interests and background.",
      }
    : copy.selectorLead;
  return (
    <section aria-labelledby="disaster-task-selector" className="bg-white px-6 py-10 md:py-14">
      <div className="w-full max-w-[1100px]">
        <p className="text-xs font-bold tracking-[0.14em] text-gold uppercase">{t(copy.selectorEyebrow, lang)}</p>
        <h2 id="disaster-task-selector" className="mt-2 text-3xl font-bold text-primary md:text-4xl">
          {t(copy.selectorTitle, lang)}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-body-secondary md:text-lg">
          {t(selectorLead, lang)}
        </p>
        <div
          role="tablist"
          aria-label={t(copy.selectorTitle, lang)}
          className={`mt-8 grid gap-3 ${sensingComputing ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`disaster-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={index === 0}
              aria-controls={`disaster-panel-${tab.id}`}
              tabIndex={index === 0 ? 0 : -1}
              className="group rounded-xl border border-border bg-surface px-5 py-4 text-left transition-colors hover:border-[var(--track-color)]/40 focus-visible:outline-2 focus-visible:outline-ring aria-selected:border-[var(--track-color)] aria-selected:bg-[var(--track-color)] aria-selected:text-white"
            >
              <span className="block text-xs font-bold tracking-widest text-gold group-aria-selected:text-white/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-lg font-bold">{t(tab.label, lang)}</span>
              <span className="mt-1 block text-sm opacity-75">{t(tab.description, lang)}</span>
            </button>
          ))}
        </div>
        <div className="mt-10">
          {sensingComputing ? null : <ChallengePanel lang={lang} />}
          <PapersPanel
            lang={lang}
            kind="reproduction"
            directionSlug={directionSlug}
            hidden={!sensingComputing}
          />
          <PapersPanel lang={lang} kind="presentation" directionSlug={directionSlug} hidden />
        </div>
        <TaskSubmission lang={lang} directionSlug={directionSlug} />
      </div>
    </section>
  );
}

export function DisasterRecruitmentPage({
  lang,
  directionSlug = "communication-sensing",
}: {
  lang: Lang;
  directionSlug?: PublishedDisasterDirectionSlug;
}) {
  const pageCopy = directionPageCopy[directionSlug];
  const direction = disasterDirections.find((item) => item.slug === directionSlug);
  if (!direction) throw new Error(`灾害招新方向不存在：${directionSlug}`);
  const pageStyle = { "--track-color": direction.themeColor } as CSSProperties;
  return (
    <div style={pageStyle}>
      <div className="border-b border-border bg-white px-6 py-4 lg:hidden">
        <div className="mx-auto max-w-[1280px]">
          <Link href={hrefFor("/join", lang)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />{t(copy.back, lang)}
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.12em] text-gold uppercase">
            {t(copy.directionHeading, lang)}
            <span className="ml-1 font-semibold tracking-normal text-body-muted normal-case">· {t(copy.openNote, lang)}</span>
          </p>
        </div>
        <div className="mt-3"><ActiveTrackScroller><DirectionLinks lang={lang} active={directionSlug} /></ActiveTrackScroller></div>
      </div>

      <div className="grid w-full lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-x-5 lg:pl-[clamp(16px,2vw,40px)]">
        <aside className="hidden pb-10 lg:block">
          <div className="sticky top-[104px] flex max-h-[calc(100vh-152px)] min-h-[calc(100vh-152px)] flex-col overflow-y-auto pt-8 pr-1 pb-2">
            <Link href={hrefFor("/join", lang)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">
              <ArrowLeft className="size-4" aria-hidden="true" />{t(copy.back, lang)}
            </Link>
            <p className="mt-7 text-xs font-bold tracking-[0.14em] text-gold uppercase">
              {t(copy.directionHeading, lang)}
              <span className="mt-1 block font-semibold tracking-normal text-body-muted normal-case">{t(copy.openNote, lang)}</span>
            </p>
            <div className="mt-4"><DirectionLinks lang={lang} active={directionSlug} /></div>
            <div className="mt-auto pt-12"><ApplicationReminder lang={lang} directionSlug={directionSlug} /></div>
          </div>
        </aside>

        <article className="recruitment-track-enter min-w-0 overflow-hidden border-l border-border/70 bg-white">
          <RecruitmentContentController>
            <section className="bg-[var(--track-color)] px-6 py-14 text-white md:py-20">
              <div className="w-full max-w-[1100px]">
                <p className="text-xs font-bold tracking-[0.16em] text-gold-light uppercase">{t(pageCopy.heroEyebrow, lang)}</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{t(pageCopy.heroTitle, lang)}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">{t(pageCopy.heroLead, lang)}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/20 py-4">
                  <span className="text-xs font-bold tracking-[0.12em] text-gold-light uppercase">
                    {t(copy.directionLead, lang)}
                  </span>
                  <strong className="text-base">{t(direction.contact.name, lang)}</strong>
                  <a
                    href={`mailto:${direction.contact.email}`}
                    className="break-all text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {direction.contact.email}
                  </a>
                </div>
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
                  <p className="text-sm font-bold tracking-widest text-gold-light uppercase">{t(copy.backgroundTitle, lang)}</p>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-white/75 md:text-lg">
                    {pageCopy.background[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </div>
            </section>
            <ApplicationGuide lang={lang} directionSlug={directionSlug} />
            {directionSlug === "sensing-computing" ? <SensingComputingOverview lang={lang} /> : null}
            {directionSlug === "communication-computing" ? <CommunicationComputingPrimer lang={lang} /> : null}
            <TaskSelector lang={lang} directionSlug={directionSlug} />
          </RecruitmentContentController>
        </article>
      </div>
    </div>
  );
}
