import Image from "next/image";
import {
  getPartnersByIds,
  t,
  type Lang,
  type PartnerId,
} from "@/data/site";

interface DirectionPartnersProps {
  partnerIds: readonly PartnerId[];
  lang: Lang;
  variant: "compact" | "detail";
}

/** 研究方向与合作单位的统一展示：首页紧凑列表 / 详情页横向面板。 */
export function DirectionPartners({
  partnerIds,
  lang,
  variant,
}: DirectionPartnersProps) {
  const partners = getPartnersByIds(partnerIds);
  const title =
    variant === "compact"
      ? lang === "zh"
        ? "合作单位"
        : "Partners"
      : lang === "zh"
        ? "方向合作单位"
        : "Research Partners";

  if (variant === "compact") {
    return (
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-xs font-semibold tracking-widest text-body-muted uppercase">
          {title}
        </p>
        <ul className="mt-3 grid gap-2 lg:grid-cols-2">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background p-1">
                <Image
                  src={partner.logo}
                  alt={`${t(partner.name, lang)} logo`}
                  width={40}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <span className="min-w-0 text-sm leading-snug font-medium break-words text-body-secondary">
                {t(partner.name, lang)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="direction-partners-title"
      className="mt-6 rounded-xl border border-border bg-surface-elevated px-7 py-6 shadow-card md:px-8"
    >
      <h2
        id="direction-partners-title"
        className="text-sm font-semibold tracking-widest text-body-muted uppercase"
      >
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="flex min-w-0 flex-1 basis-72 items-center gap-4 rounded-lg border border-border bg-background px-5 py-4"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-white p-1.5">
              <Image
                src={partner.logo}
                alt={`${t(partner.name, lang)} logo`}
                width={56}
                height={56}
                className="max-h-full max-w-full object-contain"
              />
            </span>
            <span className="text-lg leading-snug font-semibold break-words text-primary">
              {t(partner.name, lang)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
