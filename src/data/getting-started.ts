import type { Localized } from "./site";

export type GuideLinkKind = "official" | "tutorial" | "reference" | "repository";

export interface GuideLink {
  label: Localized;
  href: string;
  kind: GuideLinkKind;
}

export interface GuideEntry {
  title: Localized;
  summary: Localized;
  meta?: Localized;
  access?: Localized;
  note?: Localized;
  links: GuideLink[];
}

export interface GuideSection {
  id: string;
  title: Localized;
  description: Localized;
  entries: GuideEntry[];
}

const bilibiliSearch = (keyword: string) =>
  `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`;

export const guideSteps: Localized[] = [
  { zh: "选定一套开发环境", en: "Choose one development setup" },
  { zh: "运行第一个程序", en: "Run your first program" },
  { zh: "完成一次 Git 提交", en: "Make one Git commit" },
  { zh: "找到并确认一篇论文", en: "Find and verify one paper" },
];

export const guideSections: GuideSection[] = [
  {
    id: "environment",
    title: { zh: "开发环境", en: "Development setup" },
    description: {
      zh: "不需要一次装完所有软件。按照课程、任务和研究方向选择一套能够稳定运行的环境。",
      en: "You do not need every tool at once. Choose one reliable setup for your course, task, or research track.",
    },
    entries: [
      {
        title: { zh: "开始之前", en: "Before installing" },
        summary: {
          zh: "先认识文件路径、环境变量和终端，再区分编译器、解释器、编辑器与 IDE：它们分别负责把代码变成可执行结果、运行代码或提供开发界面。安装软件时尽量使用默认且清晰的路径，完成后记录版本号和安装位置。遇到问题不要只截最后一行，保留完整报错与自己的操作步骤。",
          en: "Begin with file paths, environment variables, and terminals, then distinguish compilers, interpreters, editors, and IDEs: they build or run code and provide the development workspace. Prefer clear default installation paths, record versions and locations, and preserve the full error plus the steps that produced it.",
        },
        meta: { zh: "开发环境基础", en: "Development environment fundamentals" },
        links: [
          {
            label: { zh: "Windows 终端文档", en: "Windows Terminal documentation" },
            href: "https://learn.microsoft.com/zh-cn/windows/terminal/",
            kind: "reference",
          },
          {
            label: { zh: "B站：计算机环境配置基础", en: "Bilibili: development environment basics" },
            href: bilibiliSearch("编程 环境变量 PATH 终端 入门"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "Java / JDK / IntelliJ IDEA", en: "Java / JDK / IntelliJ IDEA" },
        summary: {
          zh: "Java 是一门静态类型、面向对象的编程语言，代码通过 JVM 运行，常见于课程教学、后端服务和大型工程。JDK（Java Development Kit）是开发 Java 所需的工具包，包含编译、运行和调试工具；IntelliJ IDEA 则负责写代码、管理项目和定位问题。先按课程或项目要求选择 JDK 版本，再在 IDEA 中运行一个最小程序。",
          en: "Java is a statically typed, object-oriented language that runs on the JVM and is widely used in coursework, backend services, and large systems. The JDK (Java Development Kit) provides the compiler, runtime, and debugging tools, while IntelliJ IDEA is the workspace for writing and managing a project. Follow the version required by your course or project, then run one minimal program in IDEA.",
        },
        meta: { zh: "语言与开发工具 · Oracle / JetBrains", en: "Language and development tools · Oracle / JetBrains" },
        links: [
          {
            label: { zh: "下载 Oracle JDK", en: "Download Oracle JDK" },
            href: "https://www.oracle.com/java/technologies/downloads/",
            kind: "official",
          },
          {
            label: { zh: "下载 IntelliJ IDEA", en: "Download IntelliJ IDEA" },
            href: "https://www.jetbrains.com/idea/download/",
            kind: "official",
          },
          {
            label: { zh: "B站：JDK 与 IDEA 入门", en: "Bilibili: JDK and IDEA setup" },
            href: bilibiliSearch("JDK IDEA 安装配置 Java 入门"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "C / C++ / Visual Studio", en: "C / C++ / Visual Studio" },
        summary: {
          zh: "C / C++ 是编译型语言，运行效率高，也能更直接地理解内存、数据结构与计算机系统，适合程序设计课程和性能敏感的任务。新生阶段不必先研究复杂配置：安装 Visual Studio 时勾选“使用 C++ 的桌面开发”，新建控制台项目，点击运行并看懂编译错误即可。",
          en: "C and C++ are compiled languages with strong performance and direct control over memory and system resources. They are useful for programming courses and performance-sensitive work. As a beginner, keep setup simple: select the Desktop development with C++ workload in Visual Studio, create a console project, run it, and learn to read compiler errors.",
        },
        meta: { zh: "编译型语言与 IDE · Microsoft", en: "Compiled languages and IDE · Microsoft" },
        note: {
          zh: "Visual Studio 是完整 IDE；Visual Studio Code 是另一款轻量编辑器。",
          en: "Visual Studio is a full IDE; Visual Studio Code is a separate lightweight editor.",
        },
        links: [
          {
            label: { zh: "下载 Visual Studio", en: "Download Visual Studio" },
            href: "https://visualstudio.microsoft.com/zh-hans/vs/",
            kind: "official",
          },
          {
            label: { zh: "Microsoft C++ 入门", en: "Microsoft C++ getting started" },
            href: "https://learn.microsoft.com/zh-cn/cpp/get-started/?view=msvc-170",
            kind: "reference",
          },
          {
            label: { zh: "B站：Visual Studio C++ 入门", en: "Bilibili: Visual Studio C++ setup" },
            href: bilibiliSearch("Visual Studio C++ 安装 创建控制台项目"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "Python / PyCharm / VS Code", en: "Python / PyCharm / VS Code" },
        summary: {
          zh: "Python 语法简洁、可读性强，又拥有成熟的科学计算、人工智能、数据分析、数学建模、自动化和 Web 生态，因此在科研中非常常见。Python 解释器负责运行代码，PyCharm 和 VS Code 是编写与调试代码的工具，二选一即可。跑通第一个脚本后，再学习 pip、虚拟环境和 requirements.txt，避免不同项目的依赖互相冲突。",
          en: "Python is popular because its readable syntax is backed by mature ecosystems for scientific computing, AI, data analysis, automation, and the web. The Python interpreter runs the code; PyCharm and VS Code are environments for writing and debugging it, and either one is enough. After your first script works, learn pip, virtual environments, and requirements.txt so projects do not conflict.",
        },
        meta: { zh: "解释型语言与开发工具 · Python Software Foundation / JetBrains / Microsoft", en: "Interpreted language and tools · Python Software Foundation / JetBrains / Microsoft" },
        links: [
          {
            label: { zh: "下载 Python", en: "Download Python" },
            href: "https://www.python.org/downloads/",
            kind: "official",
          },
          {
            label: { zh: "下载 PyCharm", en: "Download PyCharm" },
            href: "https://www.jetbrains.com/pycharm/download/",
            kind: "official",
          },
          {
            label: { zh: "下载 VS Code", en: "Download VS Code" },
            href: "https://code.visualstudio.com/Download",
            kind: "official",
          },
          {
            label: { zh: "B站：Python 环境配置", en: "Bilibili: Python environment setup" },
            href: bilibiliSearch("Python PyCharm VS Code 环境配置 入门"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "Jupyter Notebook", en: "Jupyter Notebook" },
        summary: {
          zh: "Jupyter Notebook 把代码、运行结果、图表和说明文字放在同一份文档里，适合逐步观察数据、验证想法和记录实验过程。它擅长探索与演示，但单元格的执行顺序也容易造成结果难以复现；任务稳定后，应把核心逻辑整理为结构清晰的脚本或工程。",
          en: "Jupyter Notebook keeps code, results, charts, and explanations in one document, making it useful for inspecting data, testing ideas, and recording experiments step by step. It is excellent for exploration, but out-of-order cells can hurt reproducibility, so stable work should move into clearly structured scripts or projects.",
        },
        meta: { zh: "交互式计算环境 · Project Jupyter", en: "Interactive computing environment · Project Jupyter" },
        links: [
          {
            label: { zh: "Jupyter 安装说明", en: "Jupyter installation" },
            href: "https://jupyter.org/install",
            kind: "official",
          },
          {
            label: { zh: "B站：Jupyter Notebook 入门", en: "Bilibili: Jupyter Notebook basics" },
            href: bilibiliSearch("Jupyter Notebook 安装 使用 入门"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "MATLAB", en: "MATLAB" },
        summary: {
          zh: "MATLAB 以矩阵计算、数学建模和工程工具箱见长，适合信号处理、通信实验、数据绘图与快速算法验证。它把许多常用工程算法封装成可直接调用的函数，新生可以先完成官方 MATLAB Onramp，学会脚本、矩阵和绘图，再根据具体任务选择工具箱，不必一次掌握全部功能。",
          en: "MATLAB is built around matrix computing and engineering toolboxes, making it useful for signal processing, communications experiments, plotting, and rapid algorithm validation. Many common engineering methods are available as ready-to-use functions. Begin with MATLAB Onramp, learn scripts, matrices, and plotting, then add toolboxes only when a task needs them.",
        },
        meta: { zh: "科学计算平台 · MathWorks", en: "Scientific computing platform · MathWorks" },
        links: [
          {
            label: { zh: "MATLAB 下载", en: "Download MATLAB" },
            href: "https://www.mathworks.com/downloads/",
            kind: "official",
          },
          {
            label: { zh: "MATLAB Onramp", en: "MATLAB Onramp" },
            href: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted",
            kind: "official",
          },
          {
            label: { zh: "B站：MATLAB 官方入门", en: "Bilibili: MATLAB beginner tutorials" },
            href: bilibiliSearch("MATLAB中国 入门 官方"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: {
          zh: "JavaScript / TypeScript / Node.js / npm",
          en: "JavaScript / TypeScript / Node.js / npm",
        },
        summary: {
          zh: "JavaScript 是网页开发的基础语言，Node.js 让它能够脱离浏览器运行，也是现代前端工程、Next.js、后端服务和命令行工具的重要基础。npm 随 Node.js 一起使用，负责安装项目依赖和运行脚本；TypeScript 则在 JavaScript 上增加类型检查，更适合维护规模较大的项目。AI时代Node.js不单单服务于JS与TS，更是AI Agent本地运行不可或缺的环境基础。",
          en: "JavaScript is the foundation of web development, while Node.js runs it outside the browser and underpins modern frontend tooling, Next.js, backend services, and command-line tools. npm manages project dependencies and scripts, and TypeScript adds type checking for larger codebases. This ecosystem is common for building AI interfaces, connecting model services, and creating tools, while Python remains more common for model training and data analysis.",
        },
        meta: {
          zh: "Web 与应用开发运行时 · OpenJS Foundation / Microsoft",
          en: "Web and application runtime · OpenJS Foundation / Microsoft",
        },
        note: {
          zh: "新生优先安装官网标注的 LTS 长期支持版本，完成后用 node -v 和 npm -v 检查环境。先认识 package.json，学会 npm install 与 npm run dev；如果课程或项目指定了 Node.js 版本，应以项目要求为准。",
          en: "Start with the official LTS release, then check the setup with node -v and npm -v. Learn what package.json records and how to use npm install and npm run dev. If a course or project requires a specific Node.js version, follow that requirement.",
        },
        links: [
          {
            label: { zh: "下载 Node.js LTS", en: "Download Node.js LTS" },
            href: "https://nodejs.org/en/download",
            kind: "official",
          },
          {
            label: { zh: "npm 安装与入门文档", en: "npm installation guide" },
            href: "https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/",
            kind: "official",
          },
          {
            label: { zh: "TypeScript 新手文档", en: "TypeScript for new programmers" },
            href: "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
            kind: "official",
          },
          {
            label: { zh: "B站：Node.js 与 npm 入门", en: "Bilibili: Node.js and npm basics" },
            href: bilibiliSearch("Node.js npm package.json 入门"),
            kind: "tutorial",
          },
        ],
      },
    ],
  },
  {
    id: "collaboration",
    title: { zh: "代码与协作", en: "Code and collaboration" },
    description: {
      zh: "会写代码之后，下一步是让修改可追踪、可回退、可协作。",
      en: "Once code runs, make every change traceable, reversible, and collaborative.",
    },
    entries: [
      {
        title: { zh: "Git 与 GitHub", en: "Git and GitHub" },
        summary: {
          zh: "Git 在本地记录每次代码修改，让你能够比较差异、回退错误和并行开发；GitHub 则把仓库放到线上，便于共享代码、讨论问题和审查修改。先跑通 clone、pull、commit、push 这一条最小流程，再学习 branch 和 pull request。重要文件不要只留在一台电脑里。",
          en: "Git records code changes locally so you can compare revisions, recover from mistakes, and work on separate branches. GitHub hosts repositories online for sharing, discussion, and review. First complete the minimal clone, pull, commit, and push workflow; then learn branches and pull requests. Do not keep important work on only one computer.",
        },
        meta: { zh: "版本控制与代码协作 · Git / GitHub", en: "Version control and collaboration · Git / GitHub" },
        links: [
          {
            label: { zh: "下载 Git", en: "Download Git" },
            href: "https://git-scm.com/downloads",
            kind: "official",
          },
          {
            label: { zh: "GitHub 入门文档", en: "GitHub getting started" },
            href: "https://docs.github.com/zh/get-started",
            kind: "official",
          },
          {
            label: { zh: "B站：Git 与 GitHub 入门", en: "Bilibili: Git and GitHub basics" },
            href: bilibiliSearch("Git GitHub 入门 clone commit push pull request"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "README、Markdown 与提交习惯", en: "README, Markdown, and commit habits" },
        summary: {
          zh: "README 负责告诉后来者项目做什么、如何安装和运行；Markdown 是编写这类说明的轻量格式。每次提交只处理一个相对完整的问题，并用提交信息说清“做了什么”。使用 .gitignore 排除虚拟环境、缓存、密钥和不应上传的数据，提交前先查看文件差异。",
          en: "A README explains what a project does and how to install and run it; Markdown is the lightweight format commonly used for that documentation. Keep each commit focused and state what changed. Use .gitignore for environments, caches, secrets, and data that should stay local, and always inspect the diff before committing.",
        },
        meta: { zh: "项目文档与提交规范", en: "Project documentation and commit practice" },
        links: [
          {
            label: { zh: "GitHub Markdown 语法", en: "GitHub Markdown syntax" },
            href: "https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
            kind: "reference",
          },
          {
            label: { zh: "GitHub 忽略文件模板", en: "GitHub .gitignore templates" },
            href: "https://github.com/github/gitignore",
            kind: "reference",
          },
        ],
      },
    ],
  },
  {
    id: "literature",
    title: { zh: "论文检索", en: "Finding papers" },
    description: {
      zh: "不同平台解决不同问题：广泛搜索、核对书目信息、访问出版版本、寻找预印本和管理文献。",
      en: "Different services support broad search, bibliographic verification, publisher access, preprints, and reference management.",
    },
    entries: [
      {
        title: { zh: "Google Scholar", en: "Google Scholar" },
        summary: {
          zh: "适合用关键词、作者、引用次数和“被引用”关系快速发现论文，也能顺着相关工作追踪一个主题的发展。它更像检索入口而不是最终依据：找到结果后，还要核对作者、年份、期刊或会议、论文版本与原始来源。",
          en: "Use keywords, authors, citation counts, and cited-by links to discover papers and follow how a topic developed. Treat it as a discovery tool rather than the final authority: verify the authors, year, venue, version, and original source.",
        },
        meta: { zh: "学术搜索 · Google", en: "Academic search · Google" },
        access: { zh: "访问提示：中国大陆通常需要加速器", en: "Access note: may require a proxy in mainland China" },
        links: [
          {
            label: { zh: "打开 Google Scholar", en: "Open Google Scholar" },
            href: "https://scholar.google.com/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "DBLP", en: "DBLP" },
        summary: {
          zh: "DBLP 是计算机科学领域的书目信息数据库，适合核对作者、会议、期刊、年份与论文记录，也可以查看一位研究者的发表脉络。它本身不是论文下载站，页面中的外部链接才会指向出版社或开放版本；遇到同名作者时，应结合单位、合作者和研究方向判断。",
          en: "DBLP is a computer-science bibliography for verifying authors, venues, years, and publication records, and for tracing a researcher's publication history. It is not itself a paper repository; external links lead to publishers or open versions. For identical names, compare affiliations, coauthors, and research topics.",
        },
        meta: { zh: "计算机科学书目数据库 · Schloss Dagstuhl / Trier University", en: "Computer science bibliography · Schloss Dagstuhl / Trier University" },
        links: [
          {
            label: { zh: "打开 DBLP", en: "Open DBLP" },
            href: "https://dblp.org/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "IEEE Xplore", en: "IEEE Xplore" },
        summary: {
          zh: "IEEE Xplore 收录通信、电子、计算机及相关工程领域的期刊论文、会议论文和标准，适合确认正式发表版本、DOI 与出版信息。检索时可以组合关键词、作者和年份，并通过参考文献继续追踪。部分全文需要学校订阅，可先尝试校园网络或学校提供的图书馆访问方式。",
          en: "IEEE Xplore indexes journals, conference papers, and standards in communications, electronics, computing, and related engineering fields. Use it to confirm the published version, DOI, and publication details, and combine keywords, authors, and years when searching. Some full text requires institutional access through the university library.",
        },
        meta: { zh: "学术出版与标准数据库 · IEEE", en: "Research and standards database · IEEE" },
        links: [
          {
            label: { zh: "打开 IEEE Xplore", en: "Open IEEE Xplore" },
            href: "https://ieeexplore.ieee.org/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "arXiv", en: "arXiv" },
        summary: {
          zh: "arXiv 是开放预印本平台，适合寻找尚未正式出版或刚刚公开的研究工作，也便于查看论文不同版本的更新时间。预印本不等同于已经同行评审的正式论文：阅读时要关注版本号，引用前检查作者是否已在会议或期刊发表，并优先引用可确认的正式版本。",
          en: "arXiv is an open preprint platform for recent work that may not yet be formally published, and it preserves revision histories. A preprint is not the same as a peer-reviewed paper: check its version and date, see whether it later appeared at a conference or journal, and cite the confirmed published version when possible.",
        },
        meta: { zh: "开放预印本平台 · Cornell University", en: "Open preprint platform · Cornell University" },
        links: [
          {
            label: { zh: "打开 arXiv", en: "Open arXiv" },
            href: "https://arxiv.org/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "Zotero", en: "Zotero" },
        summary: {
          zh: "Zotero 用来保存论文信息、管理 PDF、添加标签与笔记，并在写作时生成参考文献。建议按课题或方向建立分类，在导入后检查标题、作者和年份是否正确。越早形成统一的文献库，后续查找、阅读和写作的成本越低。",
          en: "Zotero stores bibliographic records, organizes PDFs, adds tags and notes, and generates citations while you write. Organize material by project or topic and verify titles, authors, and years after importing. A consistent library established early makes later reading and writing much easier.",
        },
        meta: { zh: "文献管理工具 · Corporation for Digital Scholarship", en: "Reference manager · Corporation for Digital Scholarship" },
        links: [
          {
            label: { zh: "下载 Zotero", en: "Download Zotero" },
            href: "https://www.zotero.org/download/",
            kind: "official",
          },
          {
            label: { zh: "B站：论文检索与 Zotero", en: "Bilibili: literature search and Zotero" },
            href: bilibiliSearch("Google Scholar DBLP IEEE arXiv Zotero 论文检索"),
            kind: "tutorial",
          },
        ],
      },
    ],
  },
  {
    id: "ai-assistants",
    title: { zh: "通用 AI 助手", en: "General AI assistants" },
    description: {
      zh: "用它们解释概念、梳理思路和检查表达，但不要把回答直接当作事实、文献或最终成果。",
      en: "Use them to explain concepts, structure ideas, and review writing, but never treat an answer as a verified fact, citation, or finished submission.",
    },
    entries: [
      {
        title: { zh: "ChatGPT", en: "ChatGPT" },
        summary: {
          zh: "OpenAI 推出的通用 AI 助手，适合概念解释、学习问答、资料整理、代码分析和写作辅助。AI界全能小霸王，能力十分出色，agent水平突出，生图能力优秀。提问时说明自己的基础、目标、已有材料和限制条件，比只发一句“帮我完成”更容易得到有用结果。它可能生成错误事实或不存在的文献，涉及结论和引用时必须回到原始来源核验。",
          en: "OpenAI's general AI assistant can help explain concepts, organize research, analyze code, and improve writing. It is a highly capable all-rounder in the AI landscape, with especially strong agentic and image-generation capabilities. State your background, goal, available material, and constraints instead of asking it to simply finish a task. It can produce incorrect facts or nonexistent citations, so verify important claims against original sources.",
        },
        meta: { zh: "通用 AI 助手 · OpenAI", en: "General AI assistant · OpenAI" },
        access: { zh: "访问提示：需要加速器", en: "Access note: requires a proxy" },
        links: [
          {
            label: { zh: "打开 ChatGPT", en: "Open ChatGPT" },
            href: "https://chatgpt.com/",
            kind: "official",
          },
          {
            label: { zh: "OpenAI 官方学习资料", en: "Official OpenAI learning resources" },
            href: "https://learn.chatgpt.com/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "Claude", en: "Claude" },
        summary: {
          zh: "Anthropic 推出的通用 AI 助手，适合围绕长文本、代码和文档持续讨论，也可以协助比较方案与修改表达。Claude在代码层面有极为优秀的表现，但因为其价格过高，且容易封号的特性，使用前需要再三考虑。上传材料前先确认其中没有未公开数据、个人信息或课题组敏感内容；涉及事实、论文和具体数据时，同样需要回到原始来源核验。",
          en: "Anthropic's general AI assistant is useful for sustained work with long text, code, and documents, as well as comparing options and revising writing. Claude performs exceptionally well in coding, but its high price and tendency for accounts to be suspended deserve careful consideration before use. Before uploading material, remove unpublished data, personal information, and sensitive group content. Facts, papers, and data still need verification against original sources.",
        },
        meta: { zh: "通用 AI 助手 · Anthropic", en: "General AI assistant · Anthropic" },
        access: { zh: "访问提示：需要加速器且易封号", en: "Access note: requires a proxy and accounts may be suspended" },
        links: [
          {
            label: { zh: "打开 Claude", en: "Open Claude" },
            href: "https://claude.ai/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "Gemini", en: "Gemini" },
        summary: {
          zh: "Google 推出的通用 AI 助手，可用于学习问答、梳理思路、代码辅助和图像等多模态内容理解。Nano Banana具备不俗的生图能力。它适合帮助你拆解陌生问题，但不能替代教材、论文和真实实验结果；提交作业或研究结论前，应由自己重新检查推理过程与引用来源。Gemini更新速度较慢，且幻觉率和降智现象严重，常被冠予\"美国大豆包\"的称号",
          en: "Google's general AI assistant supports learning, idea development, coding help, and multimodal understanding such as images. Nano Banana also offers strong image-generation capabilities. Gemini can help break down unfamiliar problems, but it does not replace textbooks, papers, or real experimental results. Recheck the reasoning and sources yourself before submitting work. Its update cadence can feel slow, and users may encounter serious hallucination or quality degradation; it is sometimes jokingly nicknamed \"America's Doubao.\"",
        },
        meta: { zh: "通用 AI 助手 · Google", en: "General AI assistant · Google" },
        access: { zh: "访问提示：需要加速器", en: "Access note: requires a proxy" },
        links: [
          {
            label: { zh: "打开 Gemini", en: "Open Gemini" },
            href: "https://gemini.google.com/",
            kind: "official",
          },
          {
            label: { zh: "B站：AI 助手入门与信息核验", en: "Bilibili: AI assistants and verification" },
            href: bilibiliSearch("ChatGPT Claude Gemini 入门 信息核验"),
            kind: "tutorial",
          },
        ],
      },
      {
        title: { zh: "GLM", en: "GLM" },
        summary: {
          zh: "智谱推出的国产大语言模型与通用 AI 助手，适合中文问答、资料梳理、写作辅助和代码解释。代码能力表现出色，但在多模态方面略有欠缺。它可以作为新生较容易直接体验的国产模型，但回答仍可能存在事实错误或遗漏；涉及论文、数据和专业结论时，应继续核对原始来源。",
          en: "GLM is a Chinese large-language-model family and general AI assistant from Zhipu AI. It is suitable for Chinese-language questions, research organization, writing support, and code explanation. Its coding performance is strong, although its multimodal capabilities are somewhat weaker. It is easy for new students to try, but factual claims, papers, data, and technical conclusions still require verification against original sources.",
        },
        meta: { zh: "国产通用 AI 助手 · 智谱", en: "Chinese general AI assistant · Zhipu AI" },
        links: [
          {
            label: { zh: "打开 GLM / 智谱清言", en: "Open GLM / ChatGLM" },
            href: "https://chatglm.cn/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "DeepSeek", en: "DeepSeek" },
        summary: {
          zh: "深度求索推出的国产大语言模型与通用 AI 助手，可用于中文问答、推理分析、代码辅助和学习讨论。普通使用者可以从官方对话页面开始；需要把模型接入程序时，再进入官方 API 平台创建密钥并阅读计费与调用说明。无论是否开启深度思考，都应自行核验重要结论。DeepSeek因其高响应速度与高性价比在国内很受欢迎，但值得注意的是，DeepSeek的多模态能力尚且一般。",
          en: "DeepSeek is a Chinese large-language-model family and general AI assistant for Chinese-language questions, reasoning, coding help, and study. Most students can begin with the official chat service; use the official API platform only when integrating the models into software, and review its key, billing, and usage documentation first. Important conclusions still need independent verification. DeepSeek is popular in China for its fast responses and strong cost-performance ratio, although its multimodal capabilities remain fairly average.",
        },
        meta: { zh: "国产通用 AI 助手与开发者模型 · 深度求索", en: "Chinese AI assistant and developer models · DeepSeek" },
        links: [
          {
            label: { zh: "DeepSeek 官方对话", en: "DeepSeek official chat" },
            href: "https://chat.deepseek.com/",
            kind: "official",
          },
          {
            label: { zh: "DeepSeek API 平台", en: "DeepSeek API platform" },
            href: "https://platform.deepseek.com/",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "Kimi", en: "Kimi" },
        summary: {
          zh: "月之暗面推出的国产 AI 助手，综合实力较强，特点是长文本处理、联网搜索、深度研究和 Agent 能力突出，也擅长阅读 PDF、整理资料、生成文档、表格、PPT 与网页，中文体验自然，适合课程调研和科研资料梳理。基础功能提供免费额度；缺点是产品功能和套餐较多，额度规则不够直观，复杂研究或生成任务消耗较快，百万 Token 长对话等高级能力只在高档套餐提供；生成的事实与引用仍需自行核验。",
          en: "Kimi is a Chinese AI assistant developed by Moonshot AI with strong all-round capabilities. It stands out in long-document processing, web search, deep research, and agentic work, and is also well suited to reading PDFs, organizing sources, and creating documents, spreadsheets, presentations, and websites. Its natural Chinese-language experience makes it useful for coursework research and literature organization. Basic use includes a free allowance; current auto-renewing monthly plans are priced at RMB 49, 99, 199, and 699, with advanced Agent features, Kimi Code, and long-context use drawing from a shared credit pool. Its weaknesses are a relatively complex product and pricing structure, credits that can be consumed quickly by demanding tasks, and advanced features such as million-token conversations being limited to higher tiers. Generated facts and citations still need verification.",
        },
        meta: { zh: "国产通用 AI 助手 · 月之暗面", en: "Chinese general AI assistant · Moonshot AI" },
        links: [
          {
            label: { zh: "打开 Kimi", en: "Open Kimi" },
            href: "https://www.kimi.com/",
            kind: "official",
          },
          {
            label: { zh: "Kimi 会员价格", en: "Kimi membership pricing" },
            href: "https://www.kimi.com/help/membership/membership-pricing",
            kind: "official",
          },
        ],
      },
    ],
  },
  {
    id: "ai-tools",
    title: { zh: "AI 工程工具", en: "AI engineering tools" },
    description: {
      zh: "这些工具可能读取项目、修改文件或执行命令。先理解基本开发流程，再在可回退的 Git 工作区中使用。",
      en: "These tools may read repositories, modify files, or run commands. Learn the basic workflow first, then use them in a recoverable Git workspace.",
    },
    entries: [
      {
        title: { zh: "Codex", en: "Codex" },
        summary: {
          zh: "OpenAI 的代码智能体，能够读取代码库上下文，并配合终端与开发工具完成理解、修改、测试和审查等任务。它适合在目标明确、能够验证结果的工程任务中使用；第一次使用时先从小项目开始，查看每一处差异，不要在未备份的目录中直接接受大范围修改。",
          en: "OpenAI's coding agent can work with repository context, terminals, and development tools to understand, change, test, and review software. Use it for clearly defined tasks whose results you can verify. Start with a small project, inspect every diff, and avoid broad changes in an unbacked-up directory.",
        },
        meta: { zh: "代码智能体 · OpenAI", en: "Coding agent · OpenAI" },
        access: { zh: "访问提示：需要加速器且开启虚拟网卡模式", en: "Access note: may require a proxy in mainland China; availability follows OpenAI's official guidance" },
        links: [
          {
            label: { zh: "Codex 官方指南", en: "Official Codex guide" },
            href: "https://learn.chatgpt.com/docs/quickstart?setup=app",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "Claude Code", en: "Claude Code" },
        summary: {
          zh: "Anthropic 的代码智能体，可在终端、IDE 和网页环境中理解代码库、调试问题并完成工程任务。由于它能够读取文件和执行命令，使用前应先确认当前目录、权限与 Git 状态；完成后逐项检查差异，并运行项目自己的测试。",
          en: "Anthropic's coding agent can understand codebases, debug problems, and complete engineering work from terminals, IDEs, and the web. Because it can read files and run commands, confirm the working directory, permissions, and Git status first, then inspect the diff and run the project's own tests.",
        },
        meta: { zh: "代码智能体 · Anthropic", en: "Coding agent · Anthropic" },
        access: { zh: "访问提示：配置国产模型后可以不需要加速器", en: "Access note: may require a proxy in mainland China; also check officially supported regions" },
        links: [
          {
            label: { zh: "Claude Code 官网", en: "Claude Code official site" },
            href: "https://claude.com/product/claude-code",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "CC Switch", en: "CC Switch" },
        summary: {
          zh: "一款开源的跨平台桌面配置工具，可以在图形界面中统一管理和快速切换 Codex、Claude Code 等 AI 编程工具使用的模型提供方与配置，减少反复手动修改 JSON、TOML 或环境变量的工作。切换前仍应确认 API 来源、密钥权限和计费方式，并保留原配置备份。",
          en: "An open-source, cross-platform desktop configuration tool for managing and quickly switching model providers and profiles used by AI coding tools such as Codex and Claude Code. It reduces repeated manual edits to JSON, TOML, and environment variables. Before switching, verify the API source, key permissions, and billing method, and keep a backup of the original configuration.",
        },
        meta: { zh: "模型与配置切换工具 · 开源项目", en: "Model and configuration switcher · Open-source project" },
        links: [
          {
            label: { zh: "CC Switch GitHub 仓库", en: "CC Switch GitHub repository" },
            href: "https://github.com/farion1231/cc-switch",
            kind: "repository",
          },
        ],
      },
      {
        title: { zh: "Trae", en: "Trae" },
        summary: {
          zh: "字节跳动推出的 AI 开发环境，把代码编辑、项目问答、补全和智能体式任务放在同一套图形界面中。它对习惯 VS Code 操作的新生较容易上手，但仍要先理解项目如何运行、修改了哪些文件，以及结果是否通过测试，不能把“工具执行成功”等同于代码正确。",
          en: "ByteDance's AI development environment combines code editing, project questions, completion, and agentic tasks in one graphical workspace. It is approachable for students familiar with VS Code-style workflows, but you still need to understand how the project runs, what changed, and whether tests pass.",
        },
        meta: { zh: "AI 开发环境 · 字节跳动", en: "AI development environment · ByteDance" },
        links: [
          {
            label: { zh: "TraeCode 官网", en: "TraeCode official site" },
            href: "https://www.trae.ai/ide",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "ZCode", en: "ZCode" },
        summary: {
          zh: "Z.ai 推出的智能开发环境，面向代码库任务、较长时间的执行流程与多智能体协作。开始任务前先确认工作目录、模型连接方式和允许执行的命令；如果工具给出大量修改，应分批审查并保留可回退的提交记录。",
          en: "Z.ai's development environment supports repository tasks, longer-running workflows, and multi-agent collaboration. Confirm the workspace, model connection, and allowed commands before starting. Review large changes in batches and keep recoverable commits.",
        },
        meta: { zh: "AI 开发环境 · Z.ai", en: "AI development environment · Z.ai" },
        links: [
          {
            label: { zh: "ZCode 官网", en: "ZCode official site" },
            href: "https://zcode.z.ai/en",
            kind: "official",
          },
        ],
      },
      {
        title: { zh: "WorkBuddy", en: "WorkBuddy" },
        summary: {
          zh: "腾讯推出的全场景桌面智能体，可协助资料研究、文档处理、数据分析和部分开发任务。它并非专门的编程 IDE，更适合跨软件、跨资料的综合工作；授权文件与应用前，应先判断任务是否真的需要这些权限，并避免导入敏感材料。",
          en: "Tencent's general-purpose desktop agent can assist with research, documents, data analysis, and some development work. It is not a dedicated programming IDE and is better suited to cross-application tasks. Before granting access to files or apps, decide whether the task truly needs those permissions and exclude sensitive material.",
        },
        meta: { zh: "桌面智能体 · 腾讯", en: "Desktop agent · Tencent" },
        links: [
          {
            label: { zh: "WorkBuddy 官网", en: "WorkBuddy official site" },
            href: "https://www.workbuddy.cn/",
            kind: "official",
          },
          {
            label: { zh: "B站：AI 编程工具基础", en: "Bilibili: AI coding tools basics" },
            href: bilibiliSearch("Codex Claude Code Trae ZCode WorkBuddy 入门"),
            kind: "tutorial",
          },
        ],
      },
    ],
  },
  {
    id: "habits",
    title: { zh: "科研与协作习惯", en: "Research and collaboration habits" },
    description: {
      zh: "工具会更新，可靠的工作习惯更值得尽早建立。",
      en: "Tools change; dependable working habits remain valuable.",
    },
    entries: [
      {
        title: { zh: "记录、备份与提问", en: "Document, back up, and ask well" },
        summary: {
          zh: "分开保存原始数据、代码与输出结果，不要直接覆盖唯一一份数据；记录环境版本、参数、实验日期和结果对应的代码提交。提问时先说明目标和预期结果，再给出操作步骤、完整报错、最小复现方式以及已经尝试的方法。清楚的问题能让同学和老师更快定位真正的困难。",
          en: "Keep raw data, code, and outputs separate, and never overwrite the only copy of a dataset. Record environment versions, parameters, dates, and the code commit behind each result. When asking for help, state the goal, expected result, steps, full error, minimal reproduction, and what you have already tried.",
        },
        meta: { zh: "可复现工作习惯", en: "Reproducible working habits" },
        links: [],
      },
      {
        title: { zh: "学术诚信与信息安全", en: "Academic integrity and information security" },
        summary: {
          zh: "只引用自己真正阅读并核验过的材料，不虚构来源，也不要把 AI 生成的内容直接当作实验结论。不要向公共 AI 服务、公开仓库或聊天群上传未公开数据、课题组代码、个人信息、密码和 API Key。提交作业、代码或研究结果前，确保自己能够解释每一项关键选择、代码修改与结论来源。",
          en: "Cite only material you have actually read and verified, never invent sources, and never treat AI-generated text as an experimental conclusion. Do not upload unpublished data, group code, personal information, passwords, or API keys to public AI services, repositories, or chats. Be able to explain every key choice, code change, and conclusion you submit.",
        },
        meta: { zh: "研究底线与数据边界", en: "Research integrity and data boundaries" },
        links: [],
      },
    ],
  },
];
