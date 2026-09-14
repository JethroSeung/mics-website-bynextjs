import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteConfig, t, hrefFor, type Lang } from "@/data/site";

/**
 * 全站页脚：桌面四列；手机端按信息类别分区、区内横向压缩
 * 年份在 SSG 构建时生成
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-8 md:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
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
          <nav
            className="min-w-0"
            aria-label={lang === "zh" ? "页脚快速链接" : "Quick links"}
          >
            <h3 className="mb-3 text-sm font-bold tracking-wide text-foreground">
              {lang === "zh" ? "快速链接" : "Quick Links"}
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-2.5">
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
            <ul className="flex flex-col gap-2.5 lg:gap-3">
              {siteConfig.partners.map((partner) => (
                <li
                  key={partner.logo}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  <Image
                    src={partner.logo}
                    alt={`${t(partner.name, lang)} logo`}
                    width={40}
                    height={40}
                    className="size-8 rounded-md border border-border object-contain p-1 lg:size-10"
                  />
                  <span className="text-sm leading-snug text-body-secondary">
                    {t(partner.name, lang)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. 联系方式 */}
          <div className="min-w-0">
            <h3 className="mb-3 text-sm font-bold tracking-wide text-foreground">
              {lang === "zh" ? "联系方式" : "Contact"}
            </h3>
            <address className="flex flex-col gap-2 not-italic lg:hidden">
              <p className="text-xs leading-relaxed text-body-secondary sm:text-sm">
                <span className="text-body-muted">
                  {lang === "zh" ? "联系人：" : "Contact: "}
                </span>
                {lang === "zh" ? siteConfig.contact.person : siteConfig.contact.personEn}
                <span className="mx-2 text-border-dark" aria-hidden="true">·</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-xs leading-relaxed text-body-secondary sm:text-sm">
                {t(siteConfig.contact.affiliation, lang)}
              </p>
            </address>
            <address className="hidden flex-col gap-2.5 not-italic lg:flex">
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

        <Separator className="my-5 lg:my-6" />

        <p className="text-center text-xs text-body-muted">
          © {year} {t(siteConfig.name, lang)} · {t(siteConfig.affiliation, lang)}
        </p>
      </div>
    </footer>
  );
}
