/**
 * 站点配置（单一数据源，双语字段统一 { zh, en }）
 * 语言策略：默认中文在根路径，英文在 /en/*
 */

export type Lang = "zh" | "en";

export interface Localized {
  zh: string;
  en: string;
}

/**
 * 站点部署域名：sitemap / robots / hreflang 均需绝对 URL。
 * 部署时通过环境变量 NEXT_PUBLIC_SITE_URL 配置真实域名（默认为占位值）。
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mics.njupt.edu.cn";

/**
 * 语言路径装饰：中文在根路径，英文加 /en 前缀。
 * 外链（http/mailto）与纯锚点（#xxx）原样返回（锚点在当前页内滚动）。
 */
export function hrefFor(href: string, lang: Lang): string {
  if (lang === "zh" || !href.startsWith("/")) return href;
  return `/en${href === "/" ? "" : href}`;
}

/**
 * 页面 metadata.alternates 配置（canonical + zh/en hreflang 互指）。
 * path 为中文站路径（如 "/team"），英文对向页自动加 /en 前缀。
 */
export function alternatesFor(path: string, lang: Lang) {
  const base = path === "/" ? "" : path;
  const zhUrl = `${siteUrl}${base}`;
  const enUrl = `${siteUrl}/en${base}`;
  return {
    canonical: lang === "zh" ? zhUrl : enUrl,
    languages: {
      "zh-CN": zhUrl,
      en: enUrl,
    } as Record<string, string>,
  };
}

export interface NavItem {
  label: Localized;
  href: string;
}

export interface Partner {
  name: Localized;
  logo: string;
}

/** hero 轮播按钮：primary=白底实心，secondary=透明白描边 */
export interface HeroAction {
  label: Localized;
  href: string;
  style: "primary" | "secondary";
}

export interface HeroSlide {
  /** 眉题保留英文（双语一致，呼应旧站排版） */
  eyebrow: string;
  title: Localized;
  tagline: Localized;
  pills: readonly Localized[];
  actions: readonly HeroAction[];
}

export const siteConfig = {
  name: {
    zh: "多模态智能通信与感知",
    en: "Multimodal Intelligent Communication and Sensing",
  },
  shortName: "MICS",
  affiliation: {
    zh: "南京邮电大学 · 计算机学院",
    en: "College of Computer Science, NJUPT",
  },
  intro: {
    zh: "多模态智能通信与感知课题组隶属于南京邮电大学计算机学院，由左益平老师指导，围绕自然灾害场景下的通感计算与医工交叉多模态感知开展研究。",
    en: "The MICS group is affiliated with the College of Computer Science, NJUPT, supervised by Dr. Zuo Yiping, focusing on integrated sensing and communication (ISAC) in disaster scenarios and medical-engineering multimodal sensing.",
  },
  /** 首页"课题组介绍"区块（正式文案 §13-W2 后调整） */
  about: {
    lead: {
      zh: "面向自然灾害救援与健康监测场景，探索通感计算与多模态感知融合技术。",
      en: "Exploring integrated sensing and communication (ISAC) and multimodal sensing for disaster rescue and health monitoring.",
    },
    note: {
      zh: "多模态智能通信与感知课题组隶属于南京邮电大学计算机学院，由左益平老师指导。课题组围绕自然灾害场景下的通感计算与医工交叉多模态感知开展研究，重视科研平台建设、跨学科合作与学生科研训练。",
      en: "The MICS group is affiliated with the School of Computer Science, Nanjing University of Posts and Telecommunications, supervised by Dr. Yiping Zuo. The group focuses on integrated sensing and communication (ISAC) in natural disaster scenarios and medical-engineering multimodal sensing, with an emphasis on research platforms, interdisciplinary collaboration, and student research training.",
    },
  },
  /** hero 轮播（3 张；Phase 1 沿用旧站文案按新方向体系微调，正式文案 §13-W2） */
  heroSlides: [
    {
      eyebrow: "Multimodal Intelligent Communication and Sensing",
      title: { zh: "多模态智能通信与感知", en: "Multimodal Intelligent Communication and Sensing" },
      tagline: {
        zh: "面向自然灾害救援与健康监测场景，开展通感计算与医工交叉多模态感知研究。",
        en: "Research on integrated sensing and communication (ISAC) in natural disaster scenarios and medical-engineering multimodal sensing.",
      },
      pills: [
        { zh: "通感计算", en: "ISAC Computing" },
        { zh: "多模态感知", en: "Multimodal Sensing" },
      ],
      actions: [
        { label: { zh: "了解课题组", en: "About the Group" }, href: "#about", style: "primary" },
        { label: { zh: "加入我们", en: "Join Us" }, href: "/join", style: "secondary" },
      ],
    },
    {
      eyebrow: "Research Directions",
      title: { zh: "两大研究方向", en: "Two Research Directions" },
      tagline: {
        zh: "聚焦自然灾害场景下的通感计算与医工交叉多模态感知，扎实推进基础研究与场景落地。",
        en: "Integrated sensing and communication (ISAC) in natural disaster scenarios and medical-engineering multimodal sensing.",
      },
      pills: [],
      actions: [
        { label: { zh: "了解通感计算", en: "ISAC Computing" }, href: "/research/pain", style: "primary" },
        { label: { zh: "了解多模态感知", en: "Multimodal Sensing" }, href: "/research/medeng", style: "secondary" },
      ],
    },
    {
      eyebrow: "Join Our Team",
      title: { zh: "诚邀新同学加入", en: "New Students Welcome" },
      tagline: {
        zh: "加入我们，探索通感计算与多模态感知前沿，共筑科研梦想。",
        en: "Explore integrated sensing and communication (ISAC) and multimodal sensing with us.",
      },
      pills: [
        { zh: "科研指导", en: "Research Guidance" },
        { zh: "工程教导", en: "Engineering Mentoring" },
        { zh: "自主实践", en: "Independent Practice" },
      ],
      actions: [
        { label: { zh: "查看招新信息", en: "Recruitment Info" }, href: "/join", style: "primary" },
      ],
    },
  ],
  contact: {
    person: "左益平",
    personEn: "Yiping Zuo",
    email: "zuoyiping@njupt.edu.cn",
    affiliation: {
      zh: "南京邮电大学计算机学院",
      en: "College of Computer Science, NJUPT",
    },
  },
  /** 导师信息（迁移自旧站 index.html / en/index.html，任务 5 迁入照片） */
  supervisor: {
    name: { zh: "左益平", en: "Yiping Zuo" },
    title: { zh: "讲师 / 硕士生导师", en: "Lecturer / Master Supervisor" },
    photo: "/images/supervisor/zuo-yiping.jpg",
    homepage:
      "https://yjs.njupt.edu.cn/dsgl/nocontrol/college/dsfcxq.htm?dsJbxxId=22f2f2c29c3c46178ac1f0f92911e65d",
    homepageLabel: { zh: "南京邮电大学导师主页", en: "Supervisor homepage (NJUPT)" },
    profile: {
      zh: "左益平，南邮计算机学院讲师、硕士生导师，东南大学博士。长期担任期刊 IEEE TWC、TVT、TCOM、TMC 等期刊的审稿人，主持国家自然科学基金青年项目与江苏省高等学校基础科学（自然科学）面上项目等科研项目，参与国家自然科学基金专项项目。",
      en: "Yiping Zuo is a lecturer and master supervisor at the School of Computer Science, NJUPT, and received her Ph.D. from Southeast University. She has served as a reviewer for IEEE TWC, TVT, TCOM, and TMC, led the NSFC Young Scientists Fund project and a Jiangsu higher education basic science project, and participated in an NSFC special project.",
    },
    interests: {
      zh: "多模态感知、无线通信、人工智能、边缘计算、通信感知一体化",
      en: "Multimodal sensing, wireless communication, artificial intelligence, edge computing, and integrated sensing and communication",
    },
  },
  partners: [
    {
      name: { zh: "东南大学 FutureComm Lab", en: "FutureComm Lab, SEU" },
      logo: "/images/futurecomm-lab-logo.jpg",
    },
    {
      name: { zh: "江苏省人民医院", en: "Jiangsu Province Hospital" },
      logo: "/images/jiangsu-province-hospital-logo.jpg",
    },
  ] as Partner[],
  nav: [
    { label: { zh: "首页", en: "Home" }, href: "/" },
    // 方向短名导航（正式命名待周末讨论 W1，改这里即可）
    {
      label: { zh: "通感计算", en: "ISAC Computing" },
      href: "/research/pain",
    },
    {
      label: { zh: "多模态感知", en: "Multimodal Sensing" },
      href: "/research/medeng",
    },
    { label: { zh: "团队成员", en: "Team" }, href: "/team" },
    { label: { zh: "加入我们", en: "Join Us" }, href: "/join" },
  ] as NavItem[],
} as const;

/** 当前语言的取值辅助 */
export function t(value: Localized, lang: Lang): string {
  return value[lang];
}
