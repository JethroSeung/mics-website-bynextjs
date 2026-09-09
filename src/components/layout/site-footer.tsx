import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteConfig, t, hrefFor, type Lang } from "@/data/site";

/**
 * 全站页脚：四列（课题组简介 / 快速链接 / 合作单位 / 联系方式）+ 版权行
 * 年份在 SSG 构建时生成
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. 课题组简介 */}
          <div className="flex flex-col gap-3 lg:max-w-[280px]">
            <div className="flex items-center gap-2">
              <Image
                src="/images/mics-logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
              <strong className="text-sm font-bold text-primary">
                {t(siteConfig.name, lang)}
              </strong>
            </div>
            <p className="text-sm leading-relaxed text-body-secondary">
              {t(siteConfig.intro, lang)}
            </p>
          </div>

          {/* 2. 快速链接 */}
          <nav aria-label={lang === "zh" ? "页脚快速链接" : "Quick links"}>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-foreground">
              {lang === "zh" ? "快速链接" : "Quick Links"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={hrefFor(item.href, lang)}
                    className="text-sm text-body-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {t(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. 合作单位 */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-foreground">
              {lang === "zh" ? "合作单位" : "Partners"}
            </h3>
            <ul className="flex flex-col gap-3">
              {siteConfig.partners.map((partner) => (
                <li key={partner.logo} className="flex items-center gap-3">
                  <Image
                    src={partner.logo}
                    alt={`${t(partner.name, lang)} logo`}
                    width={40}
                    height={40}
                    className="size-10 rounded-md border border-border object-contain p-1"
                  />
                  <span className="text-sm text-body-secondary">
                    {t(partner.name, lang)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. 联系方式 */}
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-wide text-foreground">
              {lang === "zh" ? "联系方式" : "Contact"}
            </h3>
            <address className="flex flex-col gap-2.5 not-italic">
              <p className="text-sm text-body-secondary">
                <span className="text-body-muted">
                  {lang === "zh" ? "联系人：" : "Contact: "}
                </span>
                {lang === "zh" ? siteConfig.contact.person : siteConfig.contact.personEn}
              </p>
              <p className="text-sm text-body-secondary">
                <span className="text-body-muted">Email：</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="break-all transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                {siteConfig.contact.email}
              </a>
              </p>
              <p className="text-sm text-body-secondary">
                <span className="text-body-muted">
                  {lang === "zh" ? "所属单位：" : "Affiliation: "}
                </span>
                {t(siteConfig.contact.affiliation, lang)}
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-body-muted">
          © {year} {t(siteConfig.name, lang)} · {t(siteConfig.affiliation, lang)}
        </p>
      </div>
    </footer>
  );
}
