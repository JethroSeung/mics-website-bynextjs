/**
 * 招新配置（需求文档 §6：纯展示，无表单/无提交/无 API）
 * - status "pending"：渲染"招新任务待发布"占位（Phase 1 现状）
 * - status "open"：渲染任务卡片列表（Phase 2 填充 tasks 后切换）
 * 学生通过页面展示的导师邮箱自行咨询
 */

import type { Localized } from "./site";
import type { DirectionSlug } from "./research";

export type JoinStatus = "pending" | "open";
export type JoinDirection = DirectionSlug | "general";

export interface JoinTask {
  index: 1 | 2 | 3;
  direction: JoinDirection;
  fields: {
    title: Localized;
    intro: Localized;
    work: Localized;
    requirements: Localized;
  };
}

export interface JoinConfig {
  status: JoinStatus;
  contactEmail: string;
  /** Phase 2 填充；空数组时渲染"任务待发布"占位 */
  tasks: JoinTask[];
  /** 招新导语（首页招新区块与 /join 页复用，迁移自旧站） */
  intro: Localized;
  /** status === "pending" 时的提示文案 */
  pendingNote: Localized;
}

export const joinConfig: JoinConfig = {
  status: "pending",
  contactEmail: "zuoyiping@njupt.edu.cn",
  tasks: [],
  intro: {
    zh: "课题组常年招募对多模态智能通信与感知技术感兴趣的本科生，具体研究题目与申请要求请查看详细招新页面。",
    en: "The group welcomes undergraduate students interested in multimodal intelligent communication and sensing. Detailed topics and application requirements are available on the recruitment page.",
  },
  pendingNote: {
    zh: "招新任务整理中，敬请期待",
    en: "Recruitment tasks are being prepared — stay tuned",
  },
};
