import type { ElementType } from "react";
import { cn } from "cn";

interface SectionHeadingProps {
  /** 眉题（如 "01 / About the Group"） */
  eyebrow: string;
  title: string;
  /** 可见标题的 id，供 section aria-labelledby 挂钩 */
  titleId?: string;
  /** 标题层级：页面主标题用 h1，区块标题用 h2（默认） */
  as?: "h1" | "h2";
  desc?: string;
  align?: "left" | "center";
  /** tone=dark 用于深色底区块 */
  tone?: "light" | "dark";
}

/** 区块标题：金色眉题 + 标题 + 可选描述（全站统一节奏） */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  as = "h2",
  desc,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const Title = as as ElementType;

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
        {eyebrow}
      </p>
      <Title
        id={titleId}
        className={cn(
          "mt-4 text-4xl font-bold tracking-tight wrap-anywhere md:text-5xl",
          tone === "dark" ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Title>
      {desc ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed md:text-xl",
            tone === "dark" ? "text-white/75" : "text-body-secondary"
          )}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
