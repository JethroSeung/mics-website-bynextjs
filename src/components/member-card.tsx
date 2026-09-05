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

/** 成员卡片（首页精选 + /team 页共用） */
export function MemberCard({ member, lang, showEmail = false }: MemberCardProps) {
  const name = t(member.name, lang);

  return (
    <article className="flex flex-col items-center rounded-lg border border-border bg-surface-elevated px-4 py-6 text-center shadow-card">
      <Image
        src={member.photo}
        alt={lang === "zh" ? `${name}照片` : `${name} photo`}
        width={180}
        height={180}
        className="size-28 rounded-md object-cover md:size-32"
      />
      <p className="mt-4 text-xs font-medium tracking-wide text-body-muted uppercase">
        {t(roleLabels[member.role], lang)}
      </p>
      <h3 className="mt-1 text-base font-semibold text-body">{name}</h3>
      {showEmail ? (
        <p className="mt-2 text-xs break-all text-body-secondary">
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              {member.email}
            </a>
          ) : (
            (lang === "zh" ? "待补充" : "To be updated")
          )}
        </p>
      ) : null}
    </article>
  );
}
