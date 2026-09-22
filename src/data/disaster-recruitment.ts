import type { Localized } from "./site";
import { getMemberById } from "./members";

export type DisasterDirectionSlug =
  | "communication-sensing"
  | "sensing-computing"
  | "communication-computing";

export interface DisasterDirection {
  slug: DisasterDirectionSlug;
  navigationTitle: Localized;
  shortTitle: Localized;
  fullTitle: Localized;
  description: Localized;
  status: "open" | "preparing";
  themeColor: string;
  contact: { name: Localized; email: string };
}

export type PublishedDisasterDirectionSlug = DisasterDirectionSlug;

export interface DisasterPaper {
  id: string;
  venue: string;
  title: string;
  authors: string;
  summary: Localized;
  requirements: Localized[];
  links: { label: Localized; href: string }[];
  note?: Localized;
}

const applicationRecipient = getMemberById("yang-chengxuan");
if (!applicationRecipient?.email) {
  throw new Error("灾害感知招新统一联系人杨承轩缺少邮箱");
}

export const disasterApplication = {
  recipient: {
    name: applicationRecipient.name,
    email: applicationRecipient.email,
  },
  subject: {
    zh: "MICS自然灾害招新-姓名-学号",
    en: "MICS Disaster Recruitment - Name - Student ID",
  },
} satisfies {
  recipient: { name: Localized; email: string };
  subject: Localized;
};

export function disasterDirectionPath(slug: DisasterDirectionSlug) {
  return slug === "communication-sensing"
    ? "/join/disaster"
    : `/join/disaster/${slug}`;
}

export const disasterDirections: DisasterDirection[] = [
  {
    slug: "communication-sensing",
    navigationTitle: {
      zh: "通信感知一体化",
      en: "Integrated Communication and Sensing",
    },
    shortTitle: { zh: "通感", en: "ISAC" },
    fullTitle: { zh: "通信与感知", en: "Communication and Sensing" },
    description: {
      zh: "利用通信基站、无线波形与传播信息感知山区环境变化。",
      en: "Use base stations, wireless waveforms, and propagation information to sense environmental changes in mountainous areas.",
    },
    status: "open",
    themeColor: "#12395b",
    contact: { name: applicationRecipient.name, email: applicationRecipient.email },
  },
  {
    slug: "sensing-computing",
    navigationTitle: {
      zh: "灾害感知与智能分析",
      en: "Disaster Sensing and Intelligent Analysis",
    },
    shortTitle: { zh: "感算", en: "Sensing-Computing" },
    fullTitle: { zh: "感知与计算", en: "Sensing and Computing" },
    description: {
      zh: "面向降雨、滑坡与泥石流监测，研究灾害数据建模与智能分析。",
      en: "Model and analyse rainfall, landslide, and debris-flow monitoring data with intelligent methods.",
    },
    status: "open",
    themeColor: "#235247",
    contact: { name: { zh: "徐博", en: "Bo Xu" }, email: "mountqingxubo@outlook.com" },
  },
  {
    slug: "communication-computing",
    navigationTitle: {
      zh: "AI 驱动的通信与计算",
      en: "AI-Driven Communication and Computing",
    },
    shortTitle: { zh: "通算", en: "Communication-Computing" },
    fullTitle: { zh: "通信与计算", en: "Communication and Computing" },
    description: {
      zh: "让智能体根据环境、链路与能源状态自主决定通信时机。",
      en: "Let intelligent agents decide when to communicate from environmental, link, and energy states.",
    },
    status: "open",
    themeColor: "#3e426f",
    contact: { name: { zh: "龚玮乐", en: "Weile Gong" }, email: "phare111@163.com" },
  },
];

export const communicationSensingChallenge = {
  title: {
    zh: "山区无线数字孪生与多基站覆盖评估挑战",
    en: "Mountain Wireless Digital Twin and Multi-Base-Station Coverage Challenge",
  },
  tags: {
    zh: ["三维场景", "Sionna RT", "无线传播"],
    en: ["3D scenes", "Sionna RT", "radio propagation"],
  },
  intro: {
    zh: [
      "利用公开三维工具和无线射线追踪平台，构建一个可重复使用的山区无线数字孪生场景。你可以从公开地形、程序化山体或自行设计的简化场景出发，分析地形对无线传播、通信覆盖和多径结构的影响。",
      "场景应包含山体、沟谷、坡面和少量建筑物，设置不少于 3 个基站和若干接收或观测位置。使用 Sionna RT 或其他无线传播工具生成路径损耗、LoS/NLoS 状态等结果，比较基站位置、载频与山体遮挡的影响，并说明模型限制。",
    ],
    en: [
      "Build a reusable mountain wireless digital twin with open 3D tools and a ray-tracing platform. Start from public terrain, procedural mountains, or a simplified scene of your own design, then study how terrain changes propagation, coverage, and multipath structure.",
      "Include mountains, valleys, slopes, and a small number of buildings. Place at least three base stations and several receiver or observation points. Use Sionna RT or another propagation tool to generate path loss and LoS/NLoS results, compare the effects of base-station placement, carrier frequency, and terrain blockage, and explain the model's limitations.",
    ],
  },
  criteria: [
    { zh: "创新性与创造性：山区结构、基站布局或传播对比实验是否具有代表性。", en: "Innovation: whether the terrain, base-station layout, or propagation comparisons are representative and original." },
    { zh: "技术实现效果：场景与仿真流程能否稳定运行，代码结构是否清晰。", en: "Implementation: whether the scene and simulation run reliably with clear code structure." },
    { zh: "数据完整性：是否保存坐标、场景参数、信道结果和必要元数据。", en: "Data completeness: whether coordinates, scene parameters, channel results, and metadata are preserved." },
    { zh: "分析与可视化：能否解释地形遮挡、多径与覆盖变化。", en: "Analysis and visualisation: whether blockage, multipath, and coverage changes are clearly explained." },
    { zh: "应用价值：场景与数据能否继续支持后续通信感知研究。", en: "Application value: whether the scene and data can support follow-up communication-sensing research." },
  ] satisfies Localized[],
  resources: [
    { label: "NVIDIA Sionna RT", href: "https://nvlabs.github.io/sionna/rt/" },
    { label: "Blender", href: "https://www.blender.org/" },
    { label: "BlenderGIS", href: "https://github.com/domlysz/BlenderGIS" },
    { label: "OpenTopography", href: "https://opentopography.org/" },
  ],
  submission: [
    { zh: "提交代码仓库链接、环境与运行说明、三维场景、材料参数、基站及观测点坐标。", en: "Submit the code repository, environment and run instructions, 3D scene, material parameters, and base-station and observation-point coordinates." },
    { zh: "提交可重复生成的无线传播数据、字段说明以及覆盖图、路径图或统计图。", en: "Provide reproducible propagation data, field descriptions, and coverage, path, or statistical visualisations." },
    { zh: "提交技术报告，说明场景设计、数据生成流程、实验结论与模型局限。", en: "Provide a technical report covering scene design, data generation, conclusions, and model limitations." },
    { zh: "准备线下汇报 PPT，说明方法、实现、结果、应用价值与改进方向。", en: "Prepare an on-site presentation covering the method, implementation, results, application value, and next steps." },
  ] satisfies Localized[],
};

export const communicationSensingReproductionPapers: DisasterPaper[] = [
  {
    id: "reproduction-sionna",
    venue: "IEEE GLOBECOM Workshops 2023",
    title: "Sionna RT: Differentiable Ray Tracing for Radio Propagation Modeling",
    authors: "Jakob Hoydis et al.",
    summary: {
      zh: "介绍 Sionna RT 的可微无线射线追踪能力，可对材料、天线、阵列与收发机位置等参数求梯度，并用于无线数字孪生、材料学习和发射机优化。",
      en: "Introduces differentiable wireless ray tracing in Sionna RT, including gradients with respect to materials, antennas, arrays, and transceiver poses for digital twins and optimisation.",
    },
    requirements: [
      { zh: "跑通官方或自建场景的射线追踪流程。", en: "Run ray tracing in an official or self-built scene." },
      { zh: "输出传播路径、CIR、覆盖图以及 LoS/NLoS 状态。", en: "Output propagation paths, CIR, coverage maps, and LoS/NLoS states." },
      { zh: "改变发射机位置、天线方向或材料参数，完成至少两组对照实验。", en: "Complete at least two controlled experiments by changing the transmitter pose, antenna orientation, or material parameters." },
      { zh: "解释路径、反射、材料和阵列配置如何影响信道。", en: "Explain how paths, reflections, materials, and array settings affect the channel." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/GCWkshps58843.2023.10465179" }],
  },
  {
    id: "reproduction-ofdm",
    venue: "IEEE JSAC 2022",
    title: "Device-Free Sensing in OFDM Cellular Network",
    authors: "Qin Shi, Liang Liu, Shuowen Zhang, Shuguang Cui",
    summary: {
      zh: "提出两阶段无设备感知框架：先从 OFDM 反射信号估计目标距离，再完成多基站距离关联与二维目标定位。",
      en: "Presents a two-stage device-free sensing framework that estimates target ranges from reflected OFDM signals and then associates multi-base-station ranges for 2D localisation.",
    },
    requirements: [
      { zh: "构建简化的 OFDM 发射、目标反射和接收模型。", en: "Build a simplified OFDM transmission, reflection, and reception model." },
      { zh: "实现基于频域信道的时延或距离估计。", en: "Implement delay or range estimation from the frequency-domain channel." },
      { zh: "根据多个距离量测完成二维目标定位。", en: "Localise targets in 2D from multiple range measurements." },
      { zh: "比较不同带宽、SNR 或基站数量下的定位误差。", en: "Compare localisation errors under different bandwidths, SNRs, or base-station counts." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/JSAC.2022.3155543" }],
  },
  {
    id: "reproduction-deformation",
    venue: "IEEE ICSIDP 2024",
    title: "Integrated Sensing and Communication Based Deformation Monitoring in Practical 5G Network",
    authors: "Dawei Chen, Shuqiang Xia, Shijun Chen, Yihua Ma, Zhongbin Wang",
    summary: {
      zh: "利用商用 5G 基站回波相位变化估计目标形变，通过目标点和参考点的相位差分实现毫米级形变监测。",
      en: "Estimates deformation from echo phase changes in a practical 5G network and uses target-reference phase differencing for millimetre-level monitoring.",
    },
    requirements: [
      { zh: "建立简化的复信道相位与目标位移关系。", en: "Model the relation between complex-channel phase and target displacement." },
      { zh: "生成一组已知位移的仿真回波。", en: "Generate simulated echoes with known displacements." },
      { zh: "使用目标点和参考点完成相位差分。", en: "Perform phase differencing between target and reference points." },
      { zh: "输出真实位移与估计位移曲线，并计算 MAE/RMSE。", en: "Plot true and estimated displacement and calculate MAE/RMSE." },
      { zh: "分析噪声、相位周跳和参考点误差的影响。", en: "Analyse the impact of noise, phase wrapping, and reference-point errors." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/ICSIDP62679.2024.10868647" }],
  },
];

export const communicationSensingPresentationPapers: DisasterPaper[] = [
  {
    id: "presentation-dual-band",
    venue: "IEEE WCNC 2025",
    title: "Dual-Band Sensing for Passive Target Surveillance in ISAC Systems",
    authors: "Zhixiang Zhao, Carsten Jan Smeenk, Sebastian Semper, Christian Schneider, Reiner S. Thomä",
    summary: {
      zh: "结合 Sub-6 GHz 的大范围探测能力与毫米波的高分辨率感知能力，先粗略发现和定位目标，再引导毫米波波束对准，从而降低全区域波束扫描的通信、时间与计算开销。",
      en: "Combines the wide sensing range of Sub-6 GHz with the high resolution of mmWave. Coarse discovery and localisation guide mmWave beam alignment, reducing the communication, time, and computation cost of exhaustive beam sweeping.",
    },
    requirements: [
      { zh: "准备 20 分钟独立现场答辩 PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "解释毫米波搜索为何需要波束扫描，以及开销、范围与分辨率之间的矛盾。", en: "Explain why mmWave surveillance needs beam sweeping and the trade-offs among overhead, range, and resolution." },
      { zh: "梳理从 Sub-6 GHz 目标发现到毫米波精细感知的完整流程。", en: "Describe the complete pipeline from Sub-6 GHz discovery to fine mmWave sensing." },
      { zh: "比较顺序扫描、交织扫描与双频协同方案。", en: "Compare sequential, interleaved, and dual-band cooperative scanning." },
      { zh: "评价其假设与工程可行性。", en: "Evaluate its assumptions and engineering feasibility." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/WCNC61545.2025.10978429" }],
  },
  {
    id: "presentation-isac-overview",
    venue: "IEEE JSAC 2022",
    title: "Integrated Sensing and Communications: Toward Dual-Functional Wireless Networks for 6G and Beyond",
    authors: "Fan Liu, Yuanhao Cui, Christos Masouros, Jie Xu, Tony Xiao Han, Yonina C. Eldar, Stefano Buzzi",
    summary: {
      zh: "系统梳理通信感知一体化的应用、性能折中、波形与接收处理，并讨论通信辅助感知、感知辅助通信及感知网络的发展方向。",
      en: "Surveys ISAC applications, performance trade-offs, waveform design, and receive processing, including communication-assisted sensing, sensing-assisted communication, and perceptive networks.",
    },
    requirements: [
      { zh: "准备 20 分钟独立现场答辩 PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "说明通信与感知从频谱共存走向系统一体化的过程。", en: "Explain the evolution from spectrum coexistence to system-level integration." },
      { zh: "区分联合设计、通信辅助感知和感知辅助通信。", en: "Distinguish joint design, communication-assisted sensing, and sensing-assisted communication." },
      { zh: "解释至少一种感知与通信的性能折中。", en: "Explain at least one sensing-communication performance trade-off." },
      { zh: "结合自然灾害提出两个应用方向和两个现实限制。", en: "Propose two disaster-related applications and two practical limitations." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/JSAC.2022.3156632" }],
  },
  {
    id: "presentation-jcas-survey",
    venue: "IEEE Communications Surveys & Tutorials 2021",
    title: "Enabling Joint Communication and Radar Sensing in Mobile Networks—A Survey",
    authors: "J. Andrew Zhang et al.",
    summary: {
      zh: "从移动通信网络演进角度综述联合通信与雷达感知，讨论感知架构、可用信号、系统改造、参数估计与网络化感知等问题。",
      en: "Surveys joint communication and radar sensing in mobile networks, including sensing architectures, usable signals, system changes, parameter estimation, and networked sensing.",
    },
    requirements: [
      { zh: "准备 20 分钟独立现场答辩 PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "解释感知移动网络的概念与系统架构。", en: "Explain the perceptive mobile-network concept and architecture." },
      { zh: "对比单站、双站和多站感知。", en: "Compare monostatic, bistatic, and multistatic sensing." },
      { zh: "说明通信信号用于检测、定位或成像时的主要困难。", en: "Explain key challenges when communication signals are used for detection, localisation, or imaging." },
      { zh: "分析现有移动网络演进为环境感知平台的工程障碍。", en: "Analyse engineering barriers to evolving mobile networks into environmental sensing platforms." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/COMST.2021.3122519" }],
  },
  {
    id: "presentation-csi-issues",
    venue: "IEEE ICC Workshops 2022",
    title: "Practical Issues and Challenges in CSI-Based Integrated Sensing and Communication",
    authors: "Daqing Zhang, Dan Wu, Kai Niu, Xuanzhi Wang, Fusang Zhang, Jian Yao, Dajie Jiang, Fei Qin",
    summary: {
      zh: "总结利用 WiFi、4G 与 5G CSI 开展无线感知时面临的十类实际与理论问题，并讨论推动真实部署的可能解决方案。",
      en: "Identifies ten practical and theoretical challenges in CSI-based sensing with WiFi, 4G, and 5G signals and discusses possible routes toward real deployment.",
    },
    requirements: [
      { zh: "准备 20 分钟独立现场答辩 PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "总结论文提出的主要实际问题。", en: "Summarise the main practical issues raised by the paper." },
      { zh: "区分信号处理、机器学习与系统部署问题。", en: "Separate signal-processing, machine-learning, and deployment issues." },
      { zh: "选择三个问题说明可能的解决思路。", en: "Choose three issues and explain possible solutions." },
      { zh: "分析这些问题在山区场景中是否会加剧。", en: "Analyse whether these issues become more severe in mountainous environments." },
    ],
    links: [{ label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1109/ICCWorkshops53468.2022.9814523" }],
  },
];
