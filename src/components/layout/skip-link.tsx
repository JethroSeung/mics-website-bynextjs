import type { Lang } from "@/data/site";

/**
 * 键盘跳转链接：聚焦时显现，直达主内容（无障碍基线）
 */
export function SkipLink({ lang }: { lang: Lang }) {
  return (
    <a
      href="#main-content"
      className="fixed top-3 left-3 z-[100] -translate-y-200 rounded-md bg-primary-dark px-4 py-2.5 text-sm font-medium text-white transition-transform duration-150 focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-ring"
    >
      {lang === "zh" ? "跳到主内容" : "Skip to main content"}
    </a>
  );
}
