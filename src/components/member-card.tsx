import Image from "next/image";
import { t, type Localized, type Lang } from "@/data/site";
import type { Member } from "@/data/members";

const roleLabels: Record<Member["role"], Localized> = {
  master: { zh: "研究生", en: "Master Student" },
  undergraduate: { zh: "本科生", en: "Undergraduate Student" },
};

interface MemberCardProps {
  member: Member;
  lang: Lang;
  /** /team 页传 true 显示邮箱；首页精选不显示（沿袭旧站） */
  showEmail?: boolean;
  /** 调用方需要时附加的样式类 */
  className?: string;
}

/**
 * 成员卡片（首页精选 + /team 页共用）
 * 手机端（<560px）使用紧凑竖版以适配两列网格；
 * ≥560px 保持照片通栏铺满上半区的大图展示
 * 邮箱为纯文本不跳转；字号全断点一致（仅布局随断点切换）
 */
export function MemberCard({ member, lang, showEmail = false, className }: MemberCardProps) {
  const name = t(member.name, lang);

  return (
    <article
      className={`lift flex flex-col items-stretch overflow-hidden rounded-xl border border-border bg-surface-elevated text-center shadow-card ${className ?? ""}`}
    >
      <Image
        src={member.photo}
        alt={lang === "zh" ? `${name}照片` : `${name} photo`}
        width={380}
        height={380}
        className="aspect-square w-full object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-5">
        <p className="text-xs font-medium tracking-wide text-body-muted uppercase sm:text-sm">
          {t(roleLabels[member.role], lang)}
        </p>
        <h3 className="mt-1.5 text-base font-semibold text-body sm:text-lg">{name}</h3>
        {showEmail ? (
          <p className="mt-2 text-xs break-all text-body-secondary sm:text-sm md:text-base">
            {member.email ?? (lang === "zh" ? "待补充" : "To be updated")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
