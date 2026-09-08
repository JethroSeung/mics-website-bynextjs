"use client";

import { useEffect, useState, type ElementType } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { t, hrefFor, type HeroSlide, type Lang } from "@/data/site";

interface HeroSliderProps {
  slides: readonly HeroSlide[];
  lang: Lang;
}

/**
 * 首页 hero 轮播（需求 §8-1）：
 * 自动播放 6000ms（放慢节奏）/ 切换过渡 duration 45（平滑）/
 * hover 暂停移出恢复 / 点按后继续 /
 * 指示器 + 前后按钮 / aria 同步 / reduced-motion 停止自动播放
 */
export function HeroSlider({ slides, lang }: HeroSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1); // 1 基，供指示器与 aria
  // 惰性初始化保存插件实例（useState 而非 useRef：渲染期读取 ref.current 违反 React Compiler 规则）
  const [autoplay] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // 偏好减少动效：停止自动播放（§8 统一降级规则）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
    }
  }, [autoplay]);

  // 跟踪当前幻灯片（setState 只发生在 embla 事件回调里）
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const navLabel = (i: number) =>
    lang === "zh" ? `跳转到幻灯片 ${i + 1}` : `Go to slide ${i + 1}`;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <Carousel
        opts={{ loop: true, duration: 45 }}
        plugins={[autoplay]}
        setApi={setApi}
        aria-label={lang === "zh" ? "课题组焦点轮播" : "Featured slides"}
        className="relative bg-[image:var(--gradient-primary)]"
      >
        {/* 顶部金色微光（纯 CSS 装饰，替代旧站粒子 canvas） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(640px circle at 85% 15%, rgba(184, 138, 59, 0.16), transparent 60%)",
          }}
        />

        <CarouselContent>
          {slides.map((slide, i) => {
            // 仅首张为 h1（页面主标题），其余同级 h2 保持一致视觉
            const Title = (i === 0 ? "h1" : "h2") as ElementType;
            return (
              <CarouselItem
                key={slide.eyebrow}
                aria-label={`${lang === "zh" ? "幻灯片" : "Slide"} ${i + 1} / ${slides.length}`}
              >
                <div className="flex min-h-[max(560px,calc(100svh_-_var(--spacing-header)))] items-center px-6 md:px-8">
                  <div className="mx-auto w-full max-w-content py-16 md:py-20">
                    <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
                      {slide.eyebrow}
                    </p>
                    <Title
                      id={i === 0 ? "hero-title" : undefined}
                      className="mt-4 max-w-3xl text-4xl leading-tight font-bold tracking-tight break-words text-white sm:text-5xl md:text-7xl"
                    >
                      {t(slide.title, lang)}
                    </Title>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                      {t(slide.tagline, lang)}
                    </p>

                    {slide.pills.length > 0 ? (
                      <div className="mt-7 flex flex-wrap gap-2.5">
                        {slide.pills.map((pill) => (
                          <span
                            key={t(pill, lang)}
                            className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-base text-white/90 backdrop-blur-xs"
                          >
                            {t(pill, lang)}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {slide.actions.length > 0 ? (
                      <div className="mt-9 flex flex-wrap gap-3.5">
                        {slide.actions.map((action) => (
                          <Button
                            key={action.href}
                            asChild
                            className={cn(
                              // 小屏英文长文案允许换行并自适应高度，避免溢出
                              "h-auto min-h-12 px-6 text-center text-base whitespace-normal md:h-12 md:px-8 md:text-lg md:whitespace-nowrap",
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
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          aria-label={lang === "zh" ? "上一张幻灯片" : "Previous slide"}
          className="left-3 size-11 rounded-full border-white/40 bg-white/10 text-white backdrop-blur-xs hover:bg-white/20 hover:text-white md:left-6"
        />
        <CarouselNext
          aria-label={lang === "zh" ? "下一张幻灯片" : "Next slide"}
          className="right-3 size-11 rounded-full border-white/40 bg-white/10 text-white backdrop-blur-xs hover:bg-white/20 hover:text-white md:right-6"
        />

        {/* 指示器 */}
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.eyebrow}
              type="button"
              aria-label={navLabel(i)}
              aria-current={current === i + 1 ? "true" : undefined}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                current === i + 1
                  ? "w-7 bg-gold"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
