# MICS-website 重构需求文档

版本：v1.3.1（2026-09-05，第五轮修订）
状态：待导师/维护者审阅
来源：基于 `mics-website` 纯静态站的完整代码审阅与多轮需求拆解

> **v1.3.1 变更摘要**：术语修正——"痛感计算"为笔误，正确术语为**"通感计算"**（即通信感知一体化，ISAC，Integrated Sensing and Communication，与旧站 research-communication / research-multimodal 页表述一致）；英文对应 Pain Computing → ISAC Computing；URL slug `pain` 保留不变（内部标识符）。另：轮播自动播放放慢至 6s 并平滑过渡；成员邮箱改为纯文本不跳转；全站字号整体放大；成员卡片照片改为通栏大图。

> **v1.3 变更摘要**：①技术路线升级为现代前端：引入 Tailwind CSS v4 + shadcn/ui 组件库，放弃"style.css 整体迁移、保留旧类名"方案，改为"旧站 design tokens 映射为 Tailwind 主题变量 + 组件库实现"；②视觉目标从"1:1 保留"调整为"延续品牌基调（深蓝+金学术配色、字体、排版气质）的现代重构"，不追求像素级还原；③动效从 10 项精简为 4 项（hero 轮播 / 移动端菜单 / 滚动入场 / hover 微抬升），删除粒子、3D 倾斜、视差类纯装饰动效。
>
> **v1.2 变更摘要**：①Header 左上角改为 NJUPT 校徽 + MICS logo 双 logo 展示；②页脚的合作单位与联系方式区块确认保留；③新增 NJUPT logo 素材处理事项（重命名 + 压缩）。
>
> **v1.1 变更摘要**：按导师最新指示，①取消后端、后台与在线报名（全站纯静态展示）；②研究方向由 3 个改为 2 个（自然灾害场景下的通感计算 / 医工交叉-多模态感知），详情内容待定；③招新模块改为纯展示任务、任务待发布；④新增"周末讨论决策清单"（§13）。

---

## 1. 项目概述

### 1.1 背景

南京邮电大学 MICS 课题组现有官网为纯静态 HTML 站点（GitHub Pages 部署），存在双语页面手工同步、内容四处重复维护等问题。本重构以现代前端技术栈（Next.js + Tailwind CSS + shadcn/ui）重建，延续品牌视觉基调，数据驱动渲染中英双语，**保持纯静态展示站定位**。

### 1.2 目标

1. 延续旧站品牌基调（深蓝 + 金的学术配色、字体气质、排版节奏），以现代前端技术栈重构，不追求像素级还原
2. 数据驱动渲染：成员、方向等实体抽为数据文件，单一数据源渲染中英双语
3. 研究方向展示调整为两个新方向，详情页结构预留、内容待补
4. 招新模块纯展示（任务待发布占位）

### 1.3 非目标

- **不做后端、不做数据库、不做在线提交**（任何在线功能未来若有需求再立项）
- **不做后台管理**（内容很久才改一次，改源码即可）
- 不做新闻/动态模块
- 不做自定义用户系统/登录（全站无鉴权）
- 不引入重型依赖：不用 Redux 等状态管理库、不用大型 UI 框架（Ant Design 等）；交互组件以 shadcn/ui 按需引入为准

### 1.4 阶段划分

| 阶段 | 内容 | 交付物 |
|---|---|---|
| Phase 1 | Next.js 全站迁移：结构 + 已确定内容 + 待定项占位，静态导出 | 可部署完整静态站 |
| Phase 2 | 内容填充（无代码架构变更）：两个方向详情、招新任务、hero 文案、照片素材 | 内容齐备的正式站 |

### 1.5 与旧站关系

- 旧仓库 `mics-website` 在新站上线后**归档只读**保留，不做 301
- 现站内容在 Phase 1 期间保持线上服务，直到新站验收通过
- 旧站三个方向页的富内容（智能通信三层研究链、8 篇论文等）**不迁移**，作为素材留在旧仓库，周末讨论后按新方向体系取用

---

## 2. 用户角色

| 角色 | 描述 | 接触点 |
|---|---|---|
| 访客 | 同行、学生、家长，中文为主 | 全部页面（无任何登录态） |

---

## 3. 总体架构

### 3.1 部署拓扑

**全站纯静态，无服务器进程。** Next.js `output: 'export'` 构建产物为纯 HTML/CSS/JS，两种部署方案随时可切换（构建产物相同）：

| 方案 | 说明 | 优劣 |
|---|---|---|
| A. GitHub Pages + 自定义域名 | 现状方案的延续，域名 CNAME 解析到 github.io | 零成本零运维、**免备案**；国内访问速度一般（与现站持平） |
| B. 国内云服务器 nginx 托管 | out/ 目录扔服务器，nginx 指向即可 | 国内访问快；需 ICP 备案（2-4 周）+ 服务器运维 |

建议：若组里已确定买服务器且备案不嫌烦 → B；若想省事 → A 可长期使用。Phase 1 开发期间本地 `next build && npx serve out` 验收即可。

### 3.2 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js（App Router）+ TypeScript，`output: 'export'` |
| 样式 | Tailwind CSS v4（utility-first）；旧站 design tokens 映射为 Tailwind 主题变量（`@theme`），配色/字体不变 |
| 组件库 | shadcn/ui（基于 Radix UI，组件源码复制进项目、无版本锁定）；交互组件优先组件库，展示型区块自研 |
| 图片/字体 | `next/image`（`unoptimized`，压缩在素材预处理完成）；中文字体用**系统字体栈**（微软雅黑/苹方/思源黑体，不用 webfont——构建零网络依赖、加载零开销，2026-09-05 构建验证定） |
| 内容维护 | 直接编辑 `src/data/*.ts` 数据文件 + git 提交即更新 |

---

## 4. 路由表

语言策略：**默认中文、不做浏览器语言检测**。中文页在根路径，英文页在 `/en/*`。

| 路由（中文） | 路由（英文） | 页面 | 数据源 | 备注 |
|---|---|---|---|---|
| `/` | `/en` | 首页 | 数据文件 | hero/overview 文案需按新方向体系更新（§13） |
| `/team` | `/en/team` | 团队成员 | members.ts | 保留现有 35 人展示 |
| `/research/pain` | `/en/research/pain` | 自然灾害场景下的通感计算 | research.ts | **内容待发布**（结构 + 占位） |
| `/research/medeng` | `/en/research/medeng` | 医工交叉-多模态感知 | research.ts | **内容待发布**（结构 + 占位） |
| `/join` | `/en/join` | 招新（纯展示） | join.ts | 任务待发布占位 |
| 404 | 404 | 未找到页（新增） | — | |
| ~~/platform~~ | | 感知平台页 | | **去向待定**（§13-W3） |
| ~~/research/multimodal /isac /communication~~ | | 旧三方向页 | | **不迁移**，素材留存旧仓库 |

实现方式：`app/` 中文路由 + `app/en/` 英文路由两组薄页面文件，页面逻辑全部在共享组件，语言对象作 prop 传入。

slug `pain` / `medeng` 为建议值，周末讨论定正式命名后可改（改路由成本极低）。

---

## 5. 数据模型

所有实体双语字段统一为 `{ zh: string; en: string }`。**展示顺序 = 数组顺序，写死在代码里。**

```ts
// members.ts —— 成员（单一数据源：首页精选 + /team 全列表）
interface Member {
  id: string;                    // 拼音标识，如 "zhang-xuwen"
  name: { zh: string; en: string };
  role: "master" | "undergraduate";
  email: string | null;          // null = "待补充"
  emailPublic: boolean;          // 默认 true，按人可关
  photo: string;                 // /images/members/xxx.jpg，无照片用 member-placeholder.svg
  featured: boolean;             // 是否出现在首页精选
  directionLead?: "pain" | "medeng";
}
// 已确认：杨承轩（pain 负责人，头像占位）、张栩闻（medeng 负责人，有照片）均为现有成员

// research.ts —— 两个研究方向
interface ResearchDirection {
  slug: "pain" | "medeng";
  order: 1 | 2;
  name: { zh: string; en: string };
  // 中文名已定：自然灾害场景下的通感计算 / 医工交叉-多模态感知
  // 英文名待定（§13-W1）
  leadMemberId: string;          // 关联 members.ts，渲染负责人姓名+邮箱
  cardIntro: { zh: string; en: string };       // 首页方向卡片简介（待定 §13-W2）
  detail: {
    heroLead: { zh: string; en: string } | null;   // 详情页导语，null = 整页占位
    title: { zh: string; en: string } | null;
    sections: ResearchSection[];   // 正文章节：{ heading, paragraphs, focusItems?, note? }
  } | null;                      // null = "内容待发布" 整页占位态
}

// join.ts —— 招新（纯展示）
interface JoinConfig {
  status: "pending" | "open";    // pending = 任务待发布；open = 展示任务列表
  contactEmail: string;          // zuoyiping@njupt.edu.cn
  tasks: JoinTask[];             // Phase 2 填充；空数组时渲染"任务待发布"占位
}
interface JoinTask {
  index: 1 | 2 | 3;
  direction: "pain" | "medeng" | "general";
  fields: { title, intro, work, requirements }: 每项 { zh, en };
}

// site.ts —— 站点配置
interface SiteConfig {
  heroSlides: HeroSlide[];       // 文案需按新方向体系重写（§13-W2），结构不变
  supervisor: SupervisorInfo;    // 导师信息（沿用现有）
  partners: Partner[];           // 合作单位（**确认保留**，页脚展示：FutureComm Lab + 江苏省人民医院）
  contact: { zh, en };           // 联系方式（**确认保留**，页脚展示）
  navLabels: ...;
}

// publications.ts —— 论文/成果数据
// 去向待定（§13-W3）：若保留展示，沿用 v1.0 的 Publication 结构
// （单源 + featured 标记 + direction 归类，direction 枚举改为 pain/medeng/general）
```

---

## 6. 招新模块（/join，纯展示）

- **无表单、无提交、无 API**。学生查看任务信息后自行通过页面上的联系方式（导师邮箱）咨询
- 当前状态 `pending`：页面渲染"招新任务待发布"占位（复用现有 PlaceholderBlock 风格）
- Phase 2 任务确定后：填 `join.ts` 的 tasks 数组，展示任务卡片（编号/方向/简介/工作内容/要求）
- 保留现有 join 页其余静态内容（招新理念、面向对象、培养路径等，以现站为准）

---

## 7. 设计规范

### 7.1 Design Tokens（源自现站 `:root`，值不改，承载方式变为 Tailwind `@theme` 主题变量）

**颜色**（映射为 `--color-primary` / `--color-accent` 等语义化主题变量，供 utility class 使用）
```
--primary: #173f67        主色·深蓝
--primary-dark: #0f2e4d   --primary-light: #e9f0f6
--accent: #b88a3b         强调·金
--text-primary: #17212b   --text-secondary: #596674   --text-muted: #7b8792
--background: #ffffff
--surface / surface-strong / surface-elevated: #f5f7f8 / #eef2f5 / #fafbfc
--border: #d9e0e5   --border-dark: #b9c4cd
```

**渐变/阴影/光效**（按新组件需要取用，不必逐一复刻）
```
--gradient-primary: 135deg #1a4570 → #0f2e4d
--gradient-accent:  135deg #2563eb → #1e40af
--gradient-subtle:  180deg #fafbfc → #f5f7f8
--shadow-card / elevated / strong（双层阴影）
```

**尺寸与排版**
```
--header-height: 78px     --content-width: 1180px
--section-gap: clamp(72px, 9vw, 120px)
--font-sans: 系统字体栈（微软雅黑 / 苹方 / 思源黑体，不用 webfont）
--font-serif: Noto Serif CJK SC, 宋体, …
基准字号 16px / 行高 1.75
```

**响应式断点：1040px / 820px / 560px**（820 为移动导航分界；映射为 Tailwind 断点 `lg` / `md` / `sm` 附近，允许 ±60px 微调）

### 7.2 组件方案（shadcn/ui + 自研展示组件）

**组件库引入（shadcn/ui，按需）**：
- `Button`（primary/secondary 变体，配主题色）
- `Sheet`（≤820px 移动端菜单抽屉：焦点圈定、Escape 关闭、锁滚动）
- `Carousel`（hero 轮播，基于 embla-carousel：自动播放、hover 暂停、指示器/前后按钮、无障碍支持）
- `Card`、`Separator`、`Accordion`（按需，如招新 FAQ）

**自研展示组件（Tailwind utility 实现，布局与信息结构参考旧站但不复刻 DOM）**：
- 布局：SiteHeader（含 LanguageSwitch、**双 Logo 区**）、SiteFooter、SkipLink、Container
- 首页：HeroSlider（基于 Carousel 封装）、ResearchCard、MemberCard、PartnerCard、ContactDetails
- 方向详情：DetailHero、NewsArticle 结构（正文/摘要/重点列表/注释）、PlaceholderBlock（"内容待发布"态）
- 招新：JoinTaskCard（Phase 2 启用）、PendingNotice（任务待发布态）
- 通用：SectionHeading、sr-only、fade-in-up 容器

**Header 双 Logo 规格**：左上角 NJUPT 校徽 + MICS logo 并排展示（校徽在前，两者间细竖线分隔，高度视觉等高约 40px；≤820px 移动端可只保留校徽或缩至 32px，以不挤爆导航为准）。中英文页一致。

**SiteFooter 内容规格**（保留现站结构）：课题组简介列 / 快速链接 / **合作单位**（FutureComm Lab、江苏省人民医院 logo + 名称）/ **联系方式**（导师邮箱等）；底部版权行 + 年份。

**信息架构改进（针对旧站引导不直观）**：
- 全局导航精简为真实路由：首页 / 研究方向（含两个方向）/ 团队成员 / 加入我们 + EN/CN 语言切换；全站导航一致，点击行为可预判
- 课题组介绍、导师介绍保留在首页长滚动内，由 hero CTA 与页脚快速链接承载锚点直达
- 删除旧站首页"研究入口"概览区块（与 hero、方向卡片三重冗余）
- 内页统一 DetailHero（eyebrow + 标题 + 导语 + 返回链接）

### 7.3 双语排版约定

- 英文长标题允许自然换行，`overflow-wrap: break-word`
- UI 文案与叙述性内容双语；论文标题/作者/venue 保持原文（若保留论文展示）
- `hreflang`：中文页 `zh-CN` + 英文页 `en` 互指

---

## 8. 动效规范（精简为 4 项实用动效，2026-09-05 与导师"不花哨"指示对齐）

统一降级规则：`prefers-reduced-motion: reduce` 时**全部禁用**（fade-in-up 直接显示、轮播停止自动播放）；触屏设备（无 `hover: hover`）不注册鼠标类效果。

| # | 动效 | 实现方式与参数 |
|---|---|---|
| 1 | Hero 轮播 | shadcn/ui Carousel（embla-carousel）：自动播放 3200ms；hover 暂停、移出恢复；指示器/前后按钮切换；aria 同步；幻灯片缩减为 **2-3 张**（Phase 1 用现有文案微调占位，正式文案等 §13-W2） |
| 2 | 移动端菜单 | shadcn/ui Sheet：≤820px 汉堡按钮唤起侧滑抽屉；Escape 关闭、点链接关闭、焦点圈定、锁滚动；>820 自动隐藏 |
| 3 | 滚动进入动画 | 自研轻量实现（IntersectionObserver + CSS）：opacity 0→1；translateY(48px)→0；0.6~0.9s `cubic-bezier(0.16,1,0.3,1)`；threshold 0.1；子项 stagger 80ms；一次性触发后 unobserve |
| 4 | 卡片 hover 微抬升 | 纯 CSS transition：translateY(-4px) + 阴影加深，0.25s ease |

**已删除的旧站动效**（不再迁移）：粒子网络 canvas、Hero 鼠标视差、BlockPanel 3D 视差、研究卡片 3D 倾斜、滚动背景视差、scrollspy 滚动导航高亮（新导航为纯路由导航，锚点不进主导航，自然取消）、5 组 hero 入场 keyframes（简化为 slide 首帧普通 fade 入场）。

实现约定：轮播/菜单交互封装为 `"use client"` 组件；其余页面保持 Server Component 纯静态输出。

---

## 9. 非功能需求

### 9.1 SEO

- 每页独立 title/description（中英对应）
- og:image 制作 **1200×630 PNG**（替换现 SVG，微信等不渲染 SVG）
- sitemap.xml + robots.txt（静态导出时输出）
- hreflang 互指；`lang` 属性 `zh-CN` / `en`

### 9.2 无障碍（基线不降级）

skip-link、`aria-expanded`/`aria-controls`/`aria-current` 体系、sr-only、`:focus-visible` 高亮、语义化标题层级、键盘可操作轮播与菜单（Radix 组件自带焦点管理与 ARIA）、图片 alt。

### 9.3 性能

- 大图经 `next/image` 压缩（导师照现 1280×1868、BFI 现场现 3301×2476）；列表图 `loading="lazy"`
- 目标：LCP < 2.5s（国内 4G）、单图 ≤ 200KB、无布局偏移
- 静态资源缓存头 1 年 immutable（部署时配置）

### 9.4 隐私与安全

- 全站无表单无数据收集，无敏感数据存储问题
- 成员邮箱保持公开（学术惯例），`emailPublic` 字段按人可关
- 无登录无后台，无攻击面（静态文件 + 无状态托管）

---

## 10. 部署与运维

### 10.1 方案 A：GitHub Pages（推荐先用于上线）

1. 仓库 Settings → Pages → GitHub Actions（next build + export + deploy，官方工作流现成）
2. 域名 DNS：CNAME → `<user>.github.io`，仓库 CNAME 文件绑定域名
3. **免备案**（服务器在境外），push main 自动部署

### 10.2 方案 B：国内云服务器

1. 购买后第一件事提交 **ICP 备案**（2-4 周，与 Phase 1 并行）
2. 备案通过后 A 记录指向服务器；nginx 托管 `out/` 目录 + certbot HTTPS
3. 发布：GitHub Actions 构建后 rsync 产物到服务器

### 10.3 环境变量

仅一个：`NEXT_PUBLIC_SITE_URL`（站点正式域名，构建时注入，用于 sitemap/canonical/hreflang 绝对地址）。

---

## 11. 里程碑与验收标准

### Phase 1：前端迁移（完成定义）

- [ ] 路由表全部页面可访问（两个方向页 + join 页为占位态），404 生效
- [ ] 与旧站对照：team/导师/联系方式/页脚等**内容无缺失**；首页方向区块展示两个新方向（视觉允许现代化差异）
- [ ] 4 项动效（轮播/移动菜单/滚动入场/hover 抬升）在 Chrome/Safari/移动端表现一致
- [ ] Lighthouse：Performance ≥ 85、Accessibility ≥ 95、SEO ≥ 95
- [ ] 控制台零报错；320px~1920px 无横向溢出
- [ ] `next build` 静态导出成功，产物可被任意静态服务器服务

### Phase 2：内容填充（完成定义）

- [ ] 两个方向详情内容（周末讨论产出）录入 research.ts
- [ ] 招新任务录入 join.ts，占位态切换为任务列表
- [ ] hero slides 文案按新方向体系重写
- [ ] 成员邮箱核实（含蒋十旭/王怡涵冲突）、照片素材（含杨承轩头像）补齐
- [ ] og:image PNG 制作

---

## 12. 已知问题清单

| # | 问题 | 处置 |
|---|---|---|
| 1 | 邮箱冲突：蒋十旭与王怡涵（EN 版）共用 `B25040902@njupt.edu.cn` | 维护者提供正确信息后录入 members.ts |
| 2 | 导航文案不一致：首页"代表作" vs 内页"学术成果" | 统一以首页为准（论文展示去向见 §13-W3） |
| 3 | og:image 为 SVG | 制作 1200×630 PNG |
| 4 | 大图未压缩 | next/image 处理 |
| 5 | 部分成员邮箱"待补充"、杨承轩头像占位 | 保留占位态，Phase 2 补 |
| 6 | 无 404/sitemap/robots | 新增 |
| 7 | hero/overview 宣传 RIS，但无对应内容 | hero 文案整体重写时一并处理（§13-W2） |
| 8 | NJUPT logo 素材问题：现文件 `assets/images/NJUPT Logo.png`（431.9KB，文件名含空格） | 迁移时重命名为 `njupt-logo.png` 并压缩至 ≤50KB（校徽为单色图形，可转 SVG 或 webp 更优）；文件名空格会导致 URL 百分号编码，必须消除 |

---

## 13. 周末讨论决策清单（带去和老师对齐）

| # | 待决策项 | 影响范围 |
|---|---|---|
| W1 | **两个方向的正式命名**：中文全称确认；英文名称与翻译（含 slug `pain`/`medeng` 是否调整） | 路由、导航、首页卡片、详情页 |
| W2 | **首页文案体系**：hero slides（已定缩减为 2-3 张）、overview 区块（已定删除）、方向卡片简介——需从旧三方向体系（含 RIS）改写为新两方向体系 | 首页整体 |
| W3 | **论文/成果展示去向**：首页"代表作"区块和论文列表保留吗？若保留，现有 14 条成果如何归属两个新方向？ | publications.ts、首页 |
| W4 | **两个方向详情页内容**：标题、导语、章节结构（行业背景/研究内容/未来方向等）、是否含图片素材 | research.ts detail |
| W5 | **感知平台页（platform）去留**：现有 4 个平台（CSI/BFI/毫米波/TurtleBot4）是否保留独立页、并入方向详情、还是暂下线 | 路由表、导航 |
| W6 | **旧三方向内容取用**：旧站智能通信页（三层研究链 + 8 篇论文）、多模态页的富内容是否作为素材融入新方向 | W3/W4 的素材池 |
| W7 | **招新任务**：题目数量、方向归属、内容（工作内容/要求）、发布时间 | join.ts |
| W8 | **部署方案拍板**：GitHub Pages（免备案）还是国内服务器（需备案）；服务器和域名是否已购买 | §10 |

> 已决策（无需再议）：合作单位与联系方式确认保留在页脚（2026-09-04 定）；Header 双 logo（NJUPT + MICS）确认（2026-09-04 定）。

---

## 14. 内容迁移清单（旧站 → 数据文件）

| 实体 | 数量 | 目标文件 | 备注 |
|---|---|---|---|
| 成员 | 35（研 8 + 本 27） | members.ts | featured 8 人；杨承轩/张栩闻标记 directionLead；邮箱/照片缺失保留占位 |
| 研究方向 | 2（新建） | research.ts | 名称/负责人已定，详情内容待 W4 |
| 招新任务 | 0（待发布） | join.ts | status: pending |
| Hero slides | 5 → 2-3 | site.ts | 轮播缩减为 2-3 张；文案待 W2 重写 |
| 合作单位 | 2 | site.ts | **确认保留**，页脚展示 |
| 导师信息 | 1 | site.ts | 沿用现有 |
| 论文/成果 | 14 | publications.ts | **去向待 W3** |
| 感知平台 | 4 | — | **去向待 W5** |
| 设计 tokens | :root 颜色/字体/间距 | Tailwind `@theme` | 旧 style.css（2536 行）**不整体迁移**，仅提取 token 值映射为主题变量；旧类名体系弃用 |
| 静态资源 | 40+ 图片、favicon、placeholder、**NJUPT 校徽** | /public/images/ | 照片由维护者放入项目目录；保持相对路径；NJUPT logo 重命名压缩（见 §12-8） |

---

## 附录 A：决策记录（供后续回溯）

1. 默认中文、不检测语言（2026-09-04）
2. **取消后端/后台/在线报名**（2026-09-04 晚，导师指示）——全站纯静态，内容改源码
3. **研究方向 3→2**：自然灾害场景下的通感计算（负责人杨承轩）、医工交叉-多模态感知（负责人张栩闻）——详情内容周末与导师讨论（2026-09-04）
4. 招新纯展示，任务待发布（2026-09-04）
5. 成员邮箱保持公开（emailPublic 可关）
6. 无新闻模块、无历届成员页
7. 学弟基本不参与维护，文档面向维护者本人
8. ~~视觉与动效 100% 保留，仅做工程优化（next/font、next/image）~~（**已被决策 12/13 覆盖**：样式改 Tailwind + 组件库，动效精简为 4 项）
9. 部署：纯静态双方案（GitHub Pages 免备案 / 国内服务器需备案），构建产物相同可随时切换
10. 旧三方向详情页内容不迁移，素材留存旧仓库按需取用
11. 页脚合作单位 + 联系方式确认保留；Header 左上角 NJUPT 校徽 + MICS logo 双 logo 展示（2026-09-04 定）
12. **技术路线升级**：引入 Tailwind CSS v4 + shadcn/ui 组件库；视觉从"1:1 迁移"调整为"品牌基调延续的现代重构"，旧站类名体系弃用、仅提取 design tokens（2026-09-05，维护者决策，覆盖 v1.2 决策 8 的"样式整体迁移"部分）
13. **动效 10 → 4**：保留 hero 轮播（缩减至 2-3 张）/ 移动端菜单 / 滚动入场 / hover 微抬升；删除粒子、3D 倾斜、视差类纯装饰动效（2026-09-05，导师"不花哨"指示 + 维护者确认，覆盖 v1.2 决策 8 的"动效 100% 保留"部分）
14. 导航信息架构重构：全局导航精简为 4 项真实路由 + 语言切换；删除首页"研究入口"概览区块；内页导航不再跳回首页锚点（2026-09-05）
