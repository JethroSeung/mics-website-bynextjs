import Link from "next/link";
import { HeartPulse, Stethoscope, type LucideIcon } from "lucide-react";
import { t, type Lang } from "@/data/site";
import { getMemberById } from "@/data/members";
import type { DirectionSlug, ResearchDirection } from "@/data/research";

const directionIcons: Record<DirectionSlug, LucideIcon> = {
  pain: HeartPulse,
  medeng: Stethoscope,
};

interface ResearchCardProps {
  direction: ResearchDirection;
  lang: Lang;
}

/** 首页研究方向卡片：整卡可点，进入方向详情页 */
export function ResearchCard({ direction, lang }: ResearchCardProps) {
  const lead = getMemberById(direction.leadMemberId);
  if (!lead) {
    throw new Error(`研究方向 ${direction.slug} 负责人缺失：${direction.leadMemberId}`);
  }
  const Icon = directionIcons[direction.slug];

  return (
    <Link
      href={`/research/${direction.slug}`}
      className="lift group flex flex-col rounded-xl bg-background p-7 shadow-card focus-visible:outline-2 focus-visible:outline-ring md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="text-3xl font-bold text-primary/15">
          {String(direction.order).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-primary">
        {t(direction.name, lang)}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-body-secondary">
        {t(direction.cardIntro, lang)}
      </p>

      <p className="mt-5 text-sm text-body-secondary">
        {lang === "zh" ? "主要负责人：" : "Lead: "}
        <strong className="font-semibold text-body">{t(lead.name, lang)}</strong>
      </p>
      <p className="mt-1 text-sm text-body-muted break-all">
        {lang === "zh" ? "Email：" : "Email: "}
        {lead.email ?? (lang === "zh" ? "待补充" : "To be updated")}
      </p>

      <span className="mt-6 text-sm font-medium text-gold transition-transform duration-200 group-hover:translate-x-1">
        {lang === "zh" ? "了解更多" : "Learn more"} →
      </span>
    </Link>
  );
}
