import Link from "next/link";
import { Waves, Stethoscope, type LucideIcon } from "lucide-react";
import { DirectionPartners } from "@/components/direction-partners";
import { t, hrefFor, type Lang } from "@/data/site";
import { getMemberById } from "@/data/members";
import type { DirectionSlug, ResearchDirection } from "@/data/research";

const directionIcons: Record<DirectionSlug, LucideIcon> = {
  pain: Waves,
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
      href={hrefFor(`/research/${direction.slug}`, lang)}
      className="lift group flex flex-col rounded-xl bg-background p-7 shadow-card focus-visible:outline-2 focus-visible:outline-ring md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-14 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="text-4xl font-bold text-primary/15">
          {String(direction.order).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-bold wrap-anywhere text-primary">
        {t(direction.name, lang)}
      </h3>
      <p className="mt-3 text-base leading-relaxed break-words text-body-secondary">
        {t(direction.cardIntro, lang)}
      </p>

      <p className="mt-5 text-base text-body-secondary">
        {lang === "zh" ? "主要负责人：" : "Lead: "}
        <strong className="font-semibold text-body">{t(lead.name, lang)}</strong>
      </p>
      <p className="mt-1 text-base text-body-muted break-all">
        {lang === "zh" ? "Email：" : "Email: "}
        {lead.email ?? (lang === "zh" ? "待补充" : "To be updated")}
      </p>

      <DirectionPartners
        partnerIds={direction.partnerIds}
        lang={lang}
        variant="compact"
      />

      <span className="mt-auto pt-6 text-base font-medium text-gold transition-transform duration-200 group-hover:translate-x-1">
        {lang === "zh" ? "了解更多" : "Learn more"} →
      </span>
    </Link>
  );
}
