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
}

/**
 * 成员卡片（首页精选 + /team 页共用）
 * 照片通栏铺满卡片上半区（大图展示），邮箱为纯文本不跳转
 */
export function MemberCard({ member, lang, showEmail = false }: MemberCardProps) {
  const name = t(member.name, lang);

  return (
    <article className="lift flex flex-col overflow-hidden rounded-xl border border-border bg-surface-elevated text-center shadow-card">
      <Image
        src={member.photo}
        alt={lang === "zh" ? `${name}照片` : `${name} photo`}
        width={380}
        height={380}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-1 flex-col items-center px-4 py-5">
        <p className="text-sm font-medium tracking-wide text-body-muted uppercase">
          {t(roleLabels[member.role], lang)}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-body">{name}</h3>
        {showEmail ? (
          <p className="mt-2 text-sm break-all text-body-secondary md:text-base">
            {member.email ?? (lang === "zh" ? "待补充" : "To be updated")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
