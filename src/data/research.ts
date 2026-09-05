/**
 * 研究方向数据（需求文档 §5：3 方向合并为 2）
 * - pain：自然灾害场景下的痛感计算（负责人：杨承轩）
 * - medeng：医工交叉-多模态感知（负责人：张栩闻）
 * 详情内容待周末与导师讨论（§13-W2），detail 为 null 时详情页渲染整页占位
 * 英文名与 cardIntro 为过渡占位，正式命名后仅改本文件
 */

import type { Localized } from "./site";
import { getMemberById } from "./members";

export type DirectionSlug = "pain" | "medeng";

export interface ResearchSection {
  heading: Localized;
  paragraphs: Localized[];
  /** 可选：要点列表（如研究内容细分） */
  focusItems?: Localized[];
}

export interface ResearchDirection {
  slug: DirectionSlug;
  order: 1 | 2;
  name: Localized;
  /** 关联 members.ts 的成员 id，渲染负责人姓名 + 邮箱 */
  leadMemberId: string;
  cardIntro: Localized;
  /** null = "内容待发布" 整页占位态（Phase 1） */
  detail: {
    heroLead: Localized;
    sections: ResearchSection[];
  } | null;
}

export const researchDirections: ResearchDirection[] = [
  {
    slug: "pain",
    order: 1,
    name: {
      zh: "自然灾害场景下的痛感计算",
      en: "Pain Computing in Natural Disaster Scenarios",
    },
    leadMemberId: "yang-chengxuan",
    cardIntro: {
      zh: "面向地震、洪涝等自然灾害救援场景，研究多模态痛感信号的采集、表征与计算方法。",
      en: "Researching multimodal pain signal acquisition, representation and computing for disaster rescue scenarios.",
    },
    detail: null,
  },
  {
    slug: "medeng",
    order: 2,
    name: {
      zh: "医工交叉-多模态感知",
      en: "Medical-Engineering Multimodal Sensing",
    },
    leadMemberId: "zhang-xuwen",
    cardIntro: {
      zh: "医工交叉视角下的多模态感知技术，探索面向健康监测与临床应用的智能感知方案。",
      en: "Multimodal sensing from a medical-engineering perspective for health monitoring and clinical applications.",
    },
    detail: null,
  },
];

/** 按 slug 取方向 */
export function getDirection(slug: DirectionSlug): ResearchDirection {
  const dir = researchDirections.find((d) => d.slug === slug);
  if (!dir) throw new Error(`未知研究方向：${slug}`);
  return dir;
}

/** 取方向负责人（数据完整性在模块加载时校验） */
function assertLeadsValid() {
  for (const dir of researchDirections) {
    const lead = getMemberById(dir.leadMemberId);
    if (!lead) throw new Error(`方向 ${dir.slug} 负责人 ${dir.leadMemberId} 不在成员数据中`);
    if (lead.directionLead !== dir.slug) {
      throw new Error(`成员 ${lead.id} 的 directionLead 与方向 ${dir.slug} 不匹配`);
    }
  }
}
assertLeadsValid();
