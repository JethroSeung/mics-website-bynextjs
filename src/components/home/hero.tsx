import Link from "next/link";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { t, hrefFor, type HeroSlide, type Lang } from "@/data/site";

/** 静态首页首屏：保留原第一张的内容与视觉，不加载轮播及自动播放。 */
export function Hero({ slide, lang }: { slide: HeroSlide; lang: Lang }) {
  const pillClassName = "rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-xs sm:px-5 sm:py-2 sm:text-base";
  return (
    <section aria-labelledby="hero-title" className="relative bg-[image:var(--gradient-primary)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(640px circle at 85% 15%, rgba(184, 138, 59, 0.16), transparent 60%)",
        }}
      />
      <div className="flex min-h-[clamp(440px,70svh,520px)] items-center px-6 sm:min-h-[max(560px,calc(100svh_-_var(--spacing-header)))] md:px-8 lg:min-h-[clamp(420px,60svh,520px)] lg:items-start">
        <div className="mx-auto w-full max-w-content pt-8 pb-12 sm:py-16 md:py-20 lg:pt-16 lg:pb-12">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase sm:text-sm sm:tracking-[0.25em]">
            {slide.eyebrow}
          </p>
          <h1
            id="hero-title"
            className={cn(
              "mt-3 text-3xl leading-tight font-bold tracking-tight break-words text-white sm:mt-4 sm:text-5xl",
              lang === "zh"
                ? "max-w-none md:text-[clamp(2rem,5vw,4.5rem)] md:whitespace-nowrap"
                : "max-w-3xl md:text-7xl"
            )}
          >
            {t(slide.title, lang)}
          </h1>
          <p className={cn(
            "mt-3 text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg",
            lang === "zh"
              ? "max-w-none md:text-[clamp(1rem,1.6vw,1.25rem)] md:whitespace-nowrap"
              : "max-w-2xl md:text-xl"
          )}>
            {t(slide.tagline, lang)}
          </p>
          {slide.pills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
              {slide.pills.map((pill) => pill.href ? (
                <Link
                  key={t(pill, lang)}
                  href={hrefFor(pill.href, lang)}
                  className={cn(pillClassName, "transition-colors hover:border-white/60 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white")}
                >
                  {t(pill, lang)}
                </Link>
              ) : (
                <span key={t(pill, lang)} className={pillClassName}>{t(pill, lang)}</span>
              ))}
            </div>
          ) : null}
          {slide.actions.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-3.5">
              {slide.actions.map((action) => (
                <Button
                  key={action.href}
                  asChild
                  className={cn(
                    "h-auto min-h-11 px-4 text-center text-sm whitespace-normal sm:min-h-12 sm:px-6 sm:text-base md:h-12 md:px-8 md:text-lg md:whitespace-nowrap",
                    action.style === "primary"
                      ? "bg-white text-primary-dark hover:bg-white/90"
                      : "border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10"
                  )}
                >
                  <Link href={hrefFor(action.href, lang)}>{t(action.label, lang)}</Link>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
