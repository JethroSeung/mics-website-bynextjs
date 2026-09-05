"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { siteConfig, t, hrefFor, type Lang } from "@/data/site";

/**
 * 移动端导航（<1280px）：汉堡按钮唤起侧滑抽屉。
 * Escape 关闭、焦点圈定、锁滚动由 Radix Sheet 内建；点链接后手动关闭。
 */
export function MobileNav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const isActive = (itemHref: string) => {
    const href = hrefFor(itemHref, lang);
    return href === "/" || href === ""
      ? pathname === "/" || pathname === "" || pathname === "/en"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={lang === "zh" ? "打开导航菜单" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-md text-body-secondary transition-colors hover:bg-surface hover:text-primary xl:hidden focus-visible:outline-2 focus-visible:outline-ring"
        >
          <MenuIcon className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 max-w-[85vw]">
        <SheetHeader>
          <SheetTitle>{lang === "zh" ? "导航菜单" : "Menu"}</SheetTitle>
          <SheetDescription className="sr-only">
            {lang === "zh" ? "页面主导航" : "Primary navigation"}
          </SheetDescription>
        </SheetHeader>
        <nav
          aria-label={lang === "zh" ? "主要导航" : "Primary"}
          className="flex flex-col gap-1 px-4"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={hrefFor(item.href, lang)}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary-light text-primary"
                  : "text-body-secondary hover:bg-surface hover:text-primary"
              }`}
            >
              {t(item.label, lang)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <LanguageSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
}
