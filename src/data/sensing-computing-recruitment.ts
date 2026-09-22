import type { DisasterPaper } from "./disaster-recruitment";
import type { Localized } from "./site";

export const sensingComputingOrientation = {
  topics: [
    {
      title: { zh: "降雨感知", en: "Rainfall sensing" },
      description: { zh: "利用通信信号在降雨中的衰减与多径变化判断降雨强度。", en: "Estimate rainfall intensity from attenuation and multipath changes in communication signals." },
    },
    {
      title: { zh: "滑坡位移预测", en: "Landslide displacement forecasting" },
      description: { zh: "使用长期监测数据预测滑坡未来的位移变化。", en: "Forecast future landslide displacement from long-running monitoring data." },
    },
    {
      title: { zh: "滑坡检测", en: "Landslide detection" },
      description: { zh: "从高分辨率卫星或无人机影像中自动提取滑坡范围。", en: "Extract landslide extents from high-resolution satellite or UAV imagery." },
    },
    {
      title: { zh: "泥石流编目", en: "Debris-flow inventory" },
      description: { zh: "分析震后泥石流的降雨阈值、易发性与工程防治效果。", en: "Analyse rainfall thresholds, susceptibility, and mitigation effects for post-earthquake debris flows." },
    },
  ],
  preparation: [
    { zh: "掌握 Python 的变量、列表、循环与函数，以及 NumPy、pandas、Matplotlib 的基本使用。", en: "Know Python variables, lists, loops, and functions, plus basic NumPy, pandas, and Matplotlib." },
    { zh: "理解训练集、验证集、测试集、过拟合、Accuracy、F1 和混淆矩阵。", en: "Understand train, validation, and test sets, overfitting, accuracy, F1, and confusion matrices." },
    { zh: "先跑通现成代码，再复现指标，最后记录命令、参数、结果与差异。", en: "Run existing code first, reproduce the metrics, then record commands, parameters, results, and discrepancies." },
  ] satisfies Localized[],
  selection: [
    { zh: "希望最快得到结果：优先考虑复现 4，数据很小，传统机器学习即可完成。", en: "For the quickest result, consider Reproduction 4; the data are small and classical machine learning is enough." },
    { zh: "希望体验完整深度学习流程：优先考虑复现 3，数据划分和开源代码较完整。", en: "For a full deep-learning workflow, consider Reproduction 3, which has prepared splits and open code." },
    { zh: "希望贴近通信感知：优先考虑复现 1。", en: "For the closest connection to communication sensing, consider Reproduction 1." },
    { zh: "时间紧、希望练习论文阅读与表达：从四项论文汇报中任选一项。", en: "If time is tight and you want to practise reading and presenting papers, choose any presentation task." },
  ] satisfies Localized[],
  closing: {
    zh: "八项任务不需要全部完成。选择一项做透，比同时浅尝多项更重要。",
    en: "You do not need to complete all eight tasks. Doing one task thoroughly matters more than sampling several.",
  },
};

export const sensingComputingReproductionPapers: DisasterPaper[] = [
  {
    id: "sensing-computing-reproduction-rain-gauge-net",
    venue: "IEEE Transactions on Communications 2025 · 降雨强度分类",
    title: "RainGaugeNet: CSI-Based Sub-6 GHz Rainfall Attenuation Measurement and Classification for ISAC Applications",
    authors: "Yan Li, Jie Yang, Yixuan Huang, Tao Yang, Chao-Kai Wen, Shi Jin",
    summary: {
      zh: "利用 2.8 GHz 通信信号的 CSI 与功率时延谱分析降雨条件下的多径变化，并结合单帧特征和连续观测的时间关联，识别无雨、中雨和大雨三类状态。",
      en: "Uses CSI and power-delay profiles from 2.8 GHz communication signals to analyse rainfall-induced multipath changes, combining single-frame features with temporal context to classify no, moderate, and heavy rain.",
    },
    requirements: [
      { zh: "跑通 CSI 数据读取、PDP 预处理以及 RainGaugeNet 的训练和测试流程。", en: "Run CSI loading, PDP preprocessing, and the RainGaugeNet training and test pipeline." },
      { zh: "说明传播场景、类别标签和训练／验证／测试划分，并记录与原文不同的预处理或网络设置。", en: "Document the propagation setting, labels, data split, and any preprocessing or model settings that differ from the paper." },
      { zh: "报告准确率、分类别指标和混淆矩阵，与论文结果比较并分析差异。", en: "Report accuracy, per-class metrics, and a confusion matrix, then compare them with the paper and analyse differences." },
    ],
    links: [
      { label: { zh: "公开数据集", en: "Open dataset" }, href: "https://github.com/Lii-Yan/RainGaugeNet-Sub6G-CSI-dataset" },
      { label: { zh: "论文预印本", en: "Paper preprint" }, href: "https://arxiv.org/abs/2501.02175" },
    ],
  },
  {
    id: "sensing-computing-reproduction-landslide-forecasting",
    venue: "Landslides 2023 · 山体滑坡位移预测",
    title: "Landslide displacement forecasting using deep learning and monitoring data across selected sites",
    authors: "Lorenzo Nava, Edoardo Carraro, Cristina Reyes-Carmona, Silvia Puliero, Kushanav Bhuyan, Ascanio Rosi, Oriol Monserrat, Mario Floris, Sansar Raj Meena, Jorge Pedro Galve, Filippo Catani",
    summary: {
      zh: "比较 MLP、LSTM、GRU、1D CNN、2xLSTM、双向 LSTM 与 Conv-LSTM 七种模型在四处滑坡上的位移预测表现，讨论季节性、库区环境和位移峰值对模型选择的影响。",
      en: "Compares seven deep-learning models across four landslides and examines how seasonality, reservoir settings, and displacement peaks affect forecasting performance.",
    },
    requirements: [
      { zh: "跑通 Lamosano 滑坡数据与预处理流程。", en: "Run the Lamosano landslide dataset and preprocessing pipeline." },
      { zh: "按照论文 Table 2 的超参数，使用七种模型复现 Lamosano 的 RMSE 与 R²，并与论文结果比较。", en: "Use the Table 2 hyperparameters to reproduce Lamosano RMSE and R² with seven models and compare them with the paper." },
      { zh: "说明七种模型的优缺点，并结合复现结果分析原因。", en: "Explain the strengths and weaknesses of the seven models and interpret the reproduced results." },
    ],
    links: [
      { label: { zh: "论文入口", en: "Paper" }, href: "https://link.springer.com/article/10.1007/s10346-023-02104-9" },
      { label: { zh: "数据与代码", en: "Data and code" }, href: "https://github.com/lorenzonava96/Landslide-Displacement-Forecasting-using-seven-Deep-Learning-architectures-and-monitoring-data/tree/main" },
    ],
  },
  {
    id: "sensing-computing-reproduction-hr-gldd",
    venue: "Earth System Science Data 2023 · 全球高分辨率滑坡制图",
    title: "HR-GLDD: a globally distributed dataset using generalized deep learning for rapid landslide mapping on high-resolution satellite imagery",
    authors: "Sansar Raj Meena, Lorenzo Nava, Kushanav Bhuyan, Silvia Puliero, Lucas Pedrosa Soares, Helen Cristina Dias, Mario Floris, Filippo Catani",
    summary: {
      zh: "使用覆盖十个地貌区的高分辨率卫星影像和官方训练、验证、测试划分，复现滑坡分割流程并分析降雨型、地震型事件及跨洲泛化差异。",
      en: "Uses high-resolution satellite imagery from ten geomorphic regions and official train, validation, and test splits to reproduce landslide segmentation and study event-type and cross-continent generalisation.",
    },
    requirements: [
      { zh: "读取官方 trainX/Y、valX/Y、testX/Y 数据，完成影像预处理、分割网络训练与测试。", en: "Load the official trainX/Y, valX/Y, and testX/Y files and complete preprocessing, segmentation training, and testing." },
      { zh: "说明十个研究区、降雨型／地震型事件标签和官方划分，记录分辨率、通道、损失函数、增强及阈值。", en: "Document the ten regions, rainfall and earthquake labels, official split, resolution, channels, losses, augmentation, and thresholds." },
      { zh: "报告 F1、IoU 及分类别／分事件指标，并分析降雨型与地震型、跨洲泛化差异。", en: "Report F1, IoU, and per-class or per-event metrics, then analyse event-type and cross-continent generalisation differences." },
    ],
    links: [
      { label: { zh: "数据集", en: "Dataset" }, href: "https://doi.org/10.5281/zenodo.7189381" },
      { label: { zh: "官方代码", en: "Official code" }, href: "https://github.com/kushanavbhuyan/HR-GLDD-A-Global-Landslide-Mapping-Data-Repository" },
      { label: { zh: "论文", en: "Paper" }, href: "https://doi.org/10.5194/essd-15-3283-2023" },
    ],
  },
  {
    id: "sensing-computing-reproduction-wenchuan",
    venue: "Scientific Data 2022 · 震后泥石流编目",
    title: "Two multi-temporal datasets to track debris flow after the 2008 Wenchuan earthquake",
    authors: "Lei Wang, Ming Chang, Jian Le, Lanlan Xiang, Zhang Ni",
    summary: {
      zh: "利用2008至2020年龙门山震中区的泥石流、触发降雨和工程防治数据，完成降雨阈值或易发性分类，并分析震后时效及工程措施对事件率的影响。",
      en: "Uses 2008-2020 debris-flow, triggering-rainfall, and mitigation data from the Longmenshan epicentral region to model rainfall thresholds or susceptibility and analyse post-earthquake and engineering effects.",
    },
    requirements: [
      { zh: "完成两套表格的读取以及流域、事件和降雨字段清洗，并实现降雨阈值或易发性分类。", en: "Load both tables, clean catchment, event, and rainfall fields, and implement a rainfall-threshold or susceptibility classifier." },
      { zh: "说明场景、发生／未发生标签、时间范围和数据划分；若论文未提供固定划分，需自行按流域或年份划分并说明。", en: "Document the setting, event labels, period, and split; if no official split exists, define and justify a catchment- or year-based split." },
      { zh: "报告准确率、分类别指标和混淆矩阵，与经验阈值比较，并分析震后时效和工程防治影响。", en: "Report accuracy, per-class metrics, and a confusion matrix, compare against empirical thresholds, and analyse post-earthquake and mitigation effects." },
    ],
    note: {
      zh: "这是数据论文，适合完成降雨阈值或易发性分类，不要求使用深度网络；数据量较小。",
      en: "This is a data paper suited to rainfall-threshold or susceptibility classification; a deep network is not required and the dataset is small.",
    },
    links: [
      { label: { zh: "数据集", en: "Dataset" }, href: "https://doi.org/10.5281/zenodo.6891244" },
      { label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1038/s41597-022-01658-y" },
      { label: { zh: "开放全文", en: "Open-access paper" }, href: "https://europepmc.org/articles/PMC9420130?pdf=render" },
    ],
  },
];

export const sensingComputingPresentationPapers: DisasterPaper[] = [
  {
    id: "sensing-computing-presentation-rain-gauge-net",
    venue: "IEEE Transactions on Communications 2025 · 降雨强度分类",
    title: "RainGaugeNet: CSI-Based Sub-6 GHz Rainfall Attenuation Measurement and Classification for ISAC Applications",
    authors: "Yan Li, Jie Yang, Yixuan Huang, Tao Yang, Chao-Kai Wen, Shi Jin",
    summary: {
      zh: "从无线感知角度理解如何利用 Sub-6 GHz CSI 和 PDP 识别降雨强度，并评估实验室人工降雨向真实环境监测推广时的限制。",
      en: "Explains how Sub-6 GHz CSI and PDP can classify rainfall intensity and evaluates the limitations of transferring controlled-rain experiments to real environments.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "讲清无线信号感知降雨的原理，以及 RSS、CSI 和 PDP 的区别与作用。", en: "Explain rainfall sensing with radio signals and distinguish RSS, CSI, and PDP." },
      { zh: "重点解释 RainGaugeNet 的多径特征、时间关联，以及连续观测对分类的帮助。", en: "Explain RainGaugeNet's multipath features, temporal context, and the value of continuous observations." },
      { zh: "分析传播条件、风速和天线淋雨等影响，并讨论真实部署的局限和改进方向。", en: "Analyse propagation, wind, and antenna wetting effects, then discuss deployment limitations and improvements." },
    ],
    links: [
      { label: { zh: "公开数据集", en: "Open dataset" }, href: "https://github.com/Lii-Yan/RainGaugeNet-Sub6G-CSI-dataset" },
      { label: { zh: "论文预印本", en: "Paper preprint" }, href: "https://arxiv.org/abs/2501.02175" },
    ],
  },
  {
    id: "sensing-computing-presentation-landslide-forecasting",
    venue: "Landslides 2023 · 山体滑坡位移预测",
    title: "Landslide displacement forecasting using deep learning and monitoring data across selected sites",
    authors: "Lorenzo Nava, Edoardo Carraro, Cristina Reyes-Carmona, Silvia Puliero, Kushanav Bhuyan, Ascanio Rosi, Oriol Monserrat, Mario Floris, Sansar Raj Meena, Jorge Pedro Galve, Filippo Catani",
    summary: {
      zh: "比较七种深度学习架构在不同地理位置、地质背景、时间尺度和监测仪器条件下的滑坡位移预测能力。",
      en: "Compares seven deep-learning architectures for landslide-displacement forecasting across different locations, geological settings, time scales, and instruments.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "讲清滑坡位移时序预测的基本原理与真实场景困难。", en: "Explain the fundamentals and real-world challenges of landslide displacement forecasting." },
      { zh: "重点比较七种架构的信息流差异。", en: "Compare the information flow of the seven architectures." },
      { zh: "结合课题组方向，分析其对通感算一体化和滑坡感知预警的启发。", en: "Connect the work to integrated communication, sensing, and computing for landslide warning." },
    ],
    links: [
      { label: { zh: "论文入口", en: "Paper" }, href: "https://link.springer.com/article/10.1007/s10346-023-02104-9" },
      { label: { zh: "数据与代码", en: "Data and code" }, href: "https://github.com/lorenzonava96/Landslide-Displacement-Forecasting-using-seven-Deep-Learning-architectures-and-monitoring-data/tree/main" },
    ],
  },
  {
    id: "sensing-computing-presentation-lmhld",
    venue: "IEEE Transactions on Geoscience and Remote Sensing 2025 · 滑坡检测",
    title: "LMHLD: A Large-scale Multi-source High-resolution Landslide Dataset for Landslide Detection based on Deep Learning",
    authors: "Guanting Liu, Yi Wang, Xi Chen, Baoyu Du, Penglei Li, Yuan Wu, Zhice Fang",
    summary: {
      zh: "围绕七个灾区、五类卫星传感器和25,365个多尺度图块，理解多源高分辨率滑坡检测、跨事件泛化及灾难性遗忘问题。",
      en: "Studies multi-source high-resolution landslide detection, cross-event generalisation, and catastrophic forgetting through seven disaster regions, five sensor types, and 25,365 image patches.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "讲清光学遥感滑坡检测原理，以及 RGB、多光谱和DEM坡度数据的区别。", en: "Explain optical landslide detection and distinguish RGB, multispectral, and DEM-slope data." },
      { zh: "解释多源、多尺度图块和 LMHLDpart 如何减轻灾难性遗忘并支持跨事件识别。", en: "Explain how multi-source, multi-scale patches and LMHLDpart reduce catastrophic forgetting and support cross-event detection." },
      { zh: "分析云雾、阴影和相似地物等干扰，以及向真实山区监测推广的局限。", en: "Analyse cloud, shadow, and look-alike interference and limitations in real mountain deployment." },
    ],
    note: {
      zh: "数据约5.3GB，已提供训练、验证和测试划分；未检索到官方训练代码，本题仅要求论文汇报。",
      en: "The approximately 5.3 GB dataset includes train, validation, and test splits. No official training code was found; this is a presentation task only.",
    },
    links: [
      { label: { zh: "数据集", en: "Dataset" }, href: "https://zenodo.org/records/17258777" },
      { label: { zh: "论文预印本", en: "Paper preprint" }, href: "https://arxiv.org/abs/2502.19866" },
      { label: { zh: "正式论文 DOI", en: "Published-paper DOI" }, href: "https://doi.org/10.1109/TGRS.2025.3619062" },
    ],
  },
  {
    id: "sensing-computing-presentation-wenchuan",
    venue: "Scientific Data 2022 · 震后泥石流编目",
    title: "Two multi-temporal datasets to track debris flow after the 2008 Wenchuan earthquake",
    authors: "Lei Wang, Ming Chang, Jian Le, Lanlan Xiang, Zhang Ni",
    summary: {
      zh: "理解汶川地震后多年泥石流活动、触发降雨和工程防治措施之间的关系，并讨论如何将震后样本推广到其他强震区。",
      en: "Examines the relationships among long-term post-Wenchuan debris flows, triggering rainfall, and engineering mitigation, including transfer to other earthquake regions.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT。", en: "Prepare a 20-minute individual on-site presentation." },
      { zh: "讲清震后泥石流与同发滑坡的关系，以及编目、雨量和工程措施三类数据的作用。", en: "Explain the relationship between post-earthquake debris flows and co-seismic landslides and the roles of inventory, rainfall, and mitigation data." },
      { zh: "解释震后数年泥石流仍然高发的原因，以及连续降雨观测对预警的帮助。", en: "Explain prolonged post-earthquake debris-flow activity and the value of continuous rainfall observations for warning." },
      { zh: "分析雨量站密度、流域尺度和拦挡坝时效，并讨论向其他强震区推广的局限。", en: "Analyse gauge density, catchment scale, and dam effectiveness and discuss transfer limitations." },
    ],
    links: [
      { label: { zh: "数据集", en: "Dataset" }, href: "https://doi.org/10.5281/zenodo.6891244" },
      { label: { zh: "论文 DOI", en: "Paper DOI" }, href: "https://doi.org/10.1038/s41597-022-01658-y" },
      { label: { zh: "开放全文", en: "Open-access paper" }, href: "https://europepmc.org/articles/PMC9420130?pdf=render" },
    ],
  },
];

export const sensingComputingSubmission = {
  reproduction: {
    zh: [
      "提交完整代码仓库，包含环境说明、固定随机种子的配置和一键复现脚本。",
      "提交实验报告 PDF 与原始结果文件（CSV 或 JSON）；仅有截图不视为完整报告。",
      "引用他人代码、预训练权重或开源实现时，注明来源、使用范围和改动点。",
      "准备20分钟独立现场答辩，讲解方法、实现、结果和差异分析。",
    ],
    en: [
      "Submit a complete repository with environment instructions, a fixed random seed, and a one-command reproduction script.",
      "Submit a PDF report and raw CSV or JSON results; screenshots alone are not a complete report.",
      "Identify the source, use, and modifications of external code, pretrained weights, or open implementations.",
      "Prepare a 20-minute individual on-site defence covering the method, implementation, results, and discrepancy analysis.",
    ],
  },
  presentation: {
    zh: [
      "提交论文汇报 PPT，包含研究背景、方法流程、核心实验、结论和个人理解。",
      "引用图表、代码或外部材料时明确标注来源。",
      "准备20分钟独立现场答辩，并回答论文方法和应用相关问题。",
    ],
    en: [
      "Submit slides covering the background, method pipeline, core experiments, conclusions, and your own understanding.",
      "Clearly cite figures, code, and external material.",
      "Prepare a 20-minute individual on-site defence and answer questions about the method and its applications.",
    ],
  },
} satisfies Record<"reproduction" | "presentation", Record<"zh" | "en", string[]>>;

export const sensingComputingAvailabilityNote: Localized = {
  zh: "截止时间和答辩排期将在招新群内另行通知。",
  en: "The submission deadline and defence schedule will be announced in the recruitment group.",
};
