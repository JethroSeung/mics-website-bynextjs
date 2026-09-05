import { cn } from "cn";

interface SectionHeadingProps {
  /** 眉题（如 "01 / About the Group"） */
  eyebrow: string;
  title: string;
  /** 可见 h2 的 id，供 section aria-labelledby 挂钩 */
  titleId?: string;
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
  desc,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={cn(
          "mt-3 text-3xl font-bold tracking-tight md:text-4xl",
          tone === "dark" ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-white/75" : "text-body-secondary"
          )}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
