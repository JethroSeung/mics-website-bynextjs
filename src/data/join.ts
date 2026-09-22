import type { Localized } from "./site";
import { getMemberById } from "./members";

export type RecruitmentStatus = "open" | "coming-soon";
export type RecruitmentAreaSlug = "medeng" | "disaster";
export type RecruitmentTrackSlug =
  | "mmwave"
  | "wifi-csi"
  | "computer-vision"
  | "voice";

export interface RecruitmentArea {
  slug: RecruitmentAreaSlug;
  status: RecruitmentStatus;
  eyebrow: string;
  title: Localized;
  description: Localized;
  detail: Localized;
  trackLabels: Localized[];
}

export interface RecruitmentTrack {
  slug: RecruitmentTrackSlug;
  shortTitle: Localized;
  title: Localized;
  description: Localized;
  contact: {
    name: Localized;
    email: string;
  };
}

const applicationRecipient = getMemberById("zhang-xuwen");
if (!applicationRecipient?.email) {
  throw new Error("医工招新简历接收人张栩闻缺少邮箱");
}

/** 医工交叉四个方向共用的个人介绍投递规则。 */
export const medengApplication = {
  recipient: {
    name: applicationRecipient.name,
    email: applicationRecipient.email,
  },
  subject: {
    zh: "MICS医工招新-意向方向-姓名-年级",
    en: "MICS Medical-Engineering Recruitment - Track - Name - Year",
  },
} satisfies {
  recipient: { name: Localized; email: string };
  subject: Localized;
};

export const recruitmentIntro: Localized = {
  zh: "课题组面向全校本科生开放科研招新。你可以先按研究方向了解计划，再进入具体赛题，选择最适合自己的参与方式。",
  en: "The group welcomes undergraduate students across NJUPT. Start with a research area, then explore its tracks and choose the participation route that best fits your background.",
};

export const recruitmentAreas: RecruitmentArea[] = [
  {
    slug: "medeng",
    status: "open",
    eyebrow: "Medical Engineering",
    title: { zh: "医工交叉", en: "Medical Engineering" },
    description: {
      zh: "从毫米波、WiFi CSI、计算机视觉和语音四个方向进入无接触健康感知研究。",
      en: "Explore contactless health sensing through millimeter-wave radar, WiFi, computer vision, and voice.",
    },
    detail: {
      zh: "本轮招新计划已发布，包含挑战赛、论文复现、论文汇报与开放式任务。",
      en: "The current plan is open, with challenges, paper reproduction, presentations, and open-ended tasks.",
    },
    trackLabels: [
      { zh: "毫米波", en: "mmWave" },
      { zh: "Wi-Fi / CSI", en: "Wi-Fi / CSI" },
      { zh: "计算机视觉", en: "Computer Vision" },
      { zh: "语音", en: "Voice" },
    ],
  },
  {
    slug: "disaster",
    status: "open",
    eyebrow: "Disaster Sensing",
    title: { zh: "灾害感知", en: "Disaster Sensing" },
    description: {
      zh: "面向自然灾害场景，探索通信、感知与智能分析协同的科研问题。",
      en: "Study the coordination of communication, sensing, and intelligent analysis in natural-disaster scenarios.",
    },
    detail: {
      zh: "通信感知一体化、灾害感知与智能分析、AI 驱动的通信与计算三个方向现已开放。",
      en: "Integrated Communication and Sensing, Disaster Sensing and Intelligent Analysis, and AI-Driven Communication and Computing are now open.",
    },
    trackLabels: [
      { zh: "通感", en: "Communication-Sensing" },
      { zh: "感算", en: "Sensing-Computing" },
      { zh: "通算", en: "Communication-Computing" },
    ],
  },
];

export const recruitmentTracks: RecruitmentTrack[] = [
  {
    slug: "mmwave",
    shortTitle: { zh: "毫米波", en: "mmWave" },
    title: { zh: "毫米波方向招新", en: "Millimeter-Wave Track Recruitment" },
    description: {
      zh: "无接触生命体征感知与生成式 AI",
      en: "Contactless vital-sign sensing and generative AI",
    },
    contact: { name: { zh: "代宇佳", en: "Yujia Dai" }, email: "zoeydai.cn@gmail.com" },
  },
  {
    slug: "wifi-csi",
    shortTitle: { zh: "Wi-Fi / CSI", en: "Wi-Fi / CSI" },
    title: { zh: "Wi-Fi / CSI 方向招新", en: "Wi-Fi / CSI Track Recruitment" },
    description: {
      zh: "无线信道驱动的人体活动与健康感知",
      en: "Wireless-channel-based activity and health sensing",
    },
    contact: { name: { zh: "谯霄霄", en: "Xiaoxiao Qiao" }, email: "b24041308@njupt.edu.cn" },
  },
  {
    slug: "computer-vision",
    shortTitle: { zh: "计算机视觉", en: "Computer Vision" },
    title: { zh: "计算机视觉方向招新", en: "Computer Vision Track Recruitment" },
    description: {
      zh: "面向医疗健康的视觉质量评估与生理测量",
      en: "Visual quality assessment and physiological measurement for healthcare",
    },
    contact: { name: { zh: "文宇航", en: "Yuhang Wen" }, email: "wentian040318@gmail.com" },
  },
  {
    slug: "voice",
    shortTitle: { zh: "语音", en: "Voice" },
    title: { zh: "语音方向招新", en: "Voice Track Recruitment" },
    description: {
      zh: "多模态表征学习与可信可解释推理",
      en: "Multimodal representation learning and trustworthy explainable reasoning",
    },
    contact: { name: { zh: "陆梓健", en: "Zijian Lu" }, email: "18818732360@163.com" },
  },
];

export const nestedRecruitmentTrackSlugs = recruitmentTracks
  .filter((track) => track.slug !== "mmwave")
  .map((track) => track.slug);

export function getRecruitmentTrack(slug: string) {
  return recruitmentTracks.find((track) => track.slug === slug);
}

export function recruitmentTrackPath(slug: RecruitmentTrackSlug) {
  return slug === "mmwave" ? "/join/medeng" : `/join/medeng/${slug}`;
}
