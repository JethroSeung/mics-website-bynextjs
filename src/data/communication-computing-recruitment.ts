import type { DisasterPaper } from "./disaster-recruitment";
import type { Localized } from "./site";

export const communicationComputingPrimer = {
  question: {
    zh: "环境、链路和能源都在变化时，系统应该何时本地计算，何时调用更强模型，又何时值得通信？",
    en: "When the environment, link, and energy state keep changing, when should a system compute locally, invoke a stronger model, or communicate?",
  },
  lead: {
    zh: "本方向的任务，是设计并实现一套通信—计算协同的多模型智能系统。核心产物不是某一个预测模型，而是一套能够完成模型选择、模型协同和通信调度的完整系统。",
    en: "The task is to design and implement a multi-model intelligent system that coordinates communication and computing. The outcome is not a single predictive model, but a complete system for model selection, collaboration, and communication scheduling.",
  },
  inputs: [
    { zh: "环境与土壤状态", en: "Environment and soil state" },
    { zh: "链路质量与上传结果", en: "Link quality and upload outcome" },
    { zh: "电池与计算资源", en: "Battery and compute budget" },
    { zh: "历史观测与模型置信度", en: "History and model confidence" },
  ] satisfies Localized[],
  decisions: [
    { zh: "是否调用模型", en: "Whether to invoke a model" },
    { zh: "调用什么模型", en: "Which model to invoke" },
    { zh: "如何组织多个模型", en: "How to organise multiple models" },
    { zh: "当前是否通信", en: "Whether to communicate now" },
  ] satisfies Localized[],
  outputs: [
    { zh: "环境状态预测误差", en: "Environmental-state prediction error" },
    { zh: "通信次数", en: "Communication count" },
    { zh: "模型调用次数", en: "Model call count" },
    { zh: "不同模型使用比例", en: "Usage ratio of each model" },
  ] satisfies Localized[],
  notes: [
    {
      zh: "这里的“模型”是广义的：线性回归、随机森林、神经网络或专用模型都可以，不特指大语言模型。",
      en: "Model is used broadly here: linear regression, random forests, neural networks, and specialised models all qualify; it does not specifically mean an LLM.",
    },
    {
      zh: "不要求使用 LLM、Transformer、独立显卡或 CUDA；基础方案用普通笔记本和 scikit-learn 即可完成。",
      en: "LLMs, Transformers, dedicated GPUs, and CUDA are not required. A basic solution can run on a laptop with scikit-learn.",
    },
    {
      zh: "数据没有真实滑坡或泥石流标签。本题把它视作长期无人值守监测系统，研究可迁移的通信—计算协同问题。",
      en: "The data contain no real landslide or debris-flow labels. Treat them as a long-running unattended monitoring system for studying transferable communication-computing coordination.",
    },
  ] satisfies Localized[],
};

export const communicationComputingChallenge = {
  taskTitle: {
    zh: "设计并实现一套通信—计算协同的多模型智能系统",
    en: "Design and implement a multi-model intelligent system for communication-computing coordination",
  },
  taskLead: {
    zh: "系统在每个时间步读取当前环境状态，选择模型完成预测或分析，再由通信策略决定是否通信。重点是让不同模型和通信策略真正参与系统决策，而不是单独比较某一个模型的预测精度。",
    en: "At each time step, the system reads the current environmental state, selects a model for prediction or analysis, and then uses a communication policy to decide whether to communicate. The focus is on models and communication policies genuinely participating in system decisions, rather than comparing one model's accuracy in isolation.",
  },
  title: {
    zh: "通信与计算中智能的分布、传递、协作与组织",
    en: "Distributing, Transferring, Coordinating, and Organising Intelligence Across Communication and Computing",
  },
  lead: {
    zh: "利用全年 IoT 环境监测数据，构建一个能在多种模型和通信动作之间自主选择的完整系统。",
    en: "Use a full year of IoT monitoring data to build a complete system that selects among multiple models and communication actions.",
  },
  routes: [
    {
      title: { zh: "大小模型协同", en: "Large-small model collaboration" },
      description: {
        zh: "让低成本模型处理日常状态，只在异常、不确定或快速变化时调用能力更强的模型。无需自行训练大模型。",
        en: "Use a low-cost model for routine states and invoke a stronger model only for anomalies, uncertainty, or rapid change. Training a large model is not required.",
      },
    },
    {
      title: { zh: "多个小模型协同", en: "Multiple small models" },
      description: {
        zh: "训练功能或适用场景不同的模型，通过选择、投票、加权、Router 或模型库组织它们。",
        en: "Train models for different functions or operating conditions and organise them with selection, voting, weighting, routers, or a model library.",
      },
    },
    {
      title: { zh: "Agent 统一调度", en: "Agent orchestration" },
      description: {
        zh: "由上层 Agent 决定是否调用模型、调用哪个模型以及当前是否通信，重点是调度逻辑而非复杂语言模型。",
        en: "Let a higher-level agent decide whether to invoke a model, which model to use, and whether to communicate. The focus is orchestration rather than a complex language model.",
      },
    },
  ],
  dataset: {
    title: {
      zh: "2025 年太阳能野外监测数据",
      en: "2025 solar-powered field monitoring data",
    },
    description: {
      zh: "数据覆盖全年 8,760 个小时级时间点，同时记录环境、土壤、能源与 LoRaWAN 通信状态。通信失败和缺失上传也被保留，可用于研究“什么时候值得通信”。",
      en: "The dataset spans 8,760 hourly observations across environmental, soil, energy, and LoRaWAN states. Failed and missing uploads are retained, making it possible to study when communication is worthwhile.",
    },
    facts: [
      { zh: "按时间划分训练集和测试集，避免随机打乱带来的未来信息泄漏。", en: "Split train and test sets chronologically to avoid leaking future information." },
      { zh: "可直接从线性回归、决策树、随机森林和简单时间序列模型开始。", en: "Start with linear regression, decision trees, random forests, or simple time-series models." },
      { zh: "原始数据包含多张表；配套材料提供整理版数据，使用时请保留通信失败和缺失状态。", en: "The original data contain multiple tables; the supplied materials include a prepared version. Preserve communication failures and missing states." },
    ] satisfies Localized[],
    categories: [
      { zh: "环境与气象：气象、水文及降雨等环境变量", en: "Environment and weather: meteorological, hydrological, and rainfall variables" },
      { zh: "土壤状态：土壤相关监测数据", en: "Soil state: soil-monitoring data" },
      { zh: "能源状态：电池、电源及节点运行状态", en: "Energy state: battery, power, and node-operation states" },
      { zh: "通信状态：LoRaWAN RSSI、SNR、传输时延及遥测是否成功", en: "Communication state: LoRaWAN RSSI, SNR, latency, and telemetry success" },
      { zh: "运行信息：设备运行、维护和校准记录", en: "Operation information: device operation, maintenance, and calibration records" },
    ] satisfies Localized[],
    loadCode: `import pandas as pd

data = pd.read_csv("data.csv")

print(data.head())
print(data.columns)
print(data.info())`,
    splitCode: `split = int(len(data) * 0.7)

train = data.iloc[:split]
test = data.iloc[split:]`,
    labelNote: {
      zh: "数据来自真实农业 IoT 环境监测系统，不包含真实滑坡或泥石流事件标签。本题不要求直接完成“滑坡预测”，而是以它为长期无人值守环境监测系统的实验载体。",
      en: "The data come from a real agricultural IoT monitoring system and contain no real landslide or debris-flow labels. The task does not require direct landslide prediction; the dataset serves as a testbed for long-running unattended environmental monitoring.",
    },
    links: [
      { label: { zh: "Mendeley 原始数据", en: "Original data on Mendeley" }, href: "https://data.mendeley.com/datasets/fn8h5h33ct/1" },
      { label: { zh: "配套数据包（百度网盘）", en: "Prepared data package (Baidu Netdisk)" }, href: "https://pan.baidu.com/s/1h-YKFMoSCAc43Gk1q-Nhcg?pwd=mics" },
    ],
  },
  minimum: [
    { zh: "完成一个环境状态预测或分析模型。", en: "Build one model for environmental-state prediction or analysis." },
    { zh: "使用至少两种不同的模型或计算方式。", en: "Use at least two different models or computation methods." },
    { zh: "设计一个通信策略。", en: "Design one communication policy." },
    { zh: "给出一个完整的评价结果。", en: "Provide one complete evaluation result." },
  ] satisfies Localized[],
  simulation: {
    lead: {
      zh: "文档建议将整个系统抽象成一个简单的离散时间仿真。在每一个时间步 t，程序读取当前环境状态，随后系统作出模型选择和通信决策。",
      en: "The brief suggests modelling the whole system as a simple discrete-time simulation. At every time step t, the program reads the current environmental state and then makes model-selection and communication decisions.",
    },
    code: `for t in range(len(test)):

    state = test.iloc[t]

    model = select_model(state)

    prediction = model.predict(...)

    communicate = communication_policy(
        state,
        prediction
    )`,
    steps: [
      { zh: "读取当前环境状态", en: "Read the current environmental state" },
      { zh: "选择本次使用的模型", en: "Select the model for this time step" },
      { zh: "完成环境状态预测或分析", en: "Predict or analyse the environmental state" },
      { zh: "由通信策略决定是否通信", en: "Use the communication policy to decide whether to communicate" },
    ] satisfies Localized[],
    results: [
      { zh: "环境状态预测误差", en: "Environmental-state prediction error" },
      { zh: "通信次数", en: "Communication count" },
      { zh: "模型调用次数", en: "Model call count" },
      { zh: "不同模型使用比例", en: "Usage ratio of each model" },
      { zh: "系统在异常状态下的表现", en: "System performance under abnormal states" },
    ] satisfies Localized[],
    weakLinkLead: {
      zh: "如需模拟弱连接、丢包等情况，可以直接在 Python 中对已有通信质量数据或通信结果进行简单扰动。",
      en: "To simulate weak connectivity or packet loss, perturb the available communication-quality data or communication outcome directly in Python.",
    },
    weakLinkCode: `if link_quality < threshold:
    communication_success = False`,
  },
  environment: {
    lead: {
      zh: "本题推荐使用普通 Python 环境完成。普通笔记本电脑 CPU 即可完成基础方案，不要求独立显卡或 CUDA 环境。",
      en: "A standard Python environment is recommended. A basic solution runs on an ordinary laptop CPU; a dedicated GPU and CUDA are not required.",
    },
    required: ["Python 3.10 / 3.11", "pandas", "NumPy", "scikit-learn", "Matplotlib"],
    optional: ["PyTorch", "XGBoost"],
  },
  further: [
    { zh: "一个小模型什么时候不再值得相信？", en: "When should a small model no longer be trusted?" },
    { zh: "多个模型意见不一致时，系统应该如何处理？", en: "What should the system do when models disagree?" },
    { zh: "是否可以让一个模型判断另一个模型是否可靠？", en: "Can one model judge whether another model is reliable?" },
    { zh: "应该传输原始数据、特征，还是只传输模型结果？", en: "Should the system transmit raw data, features, or only model outputs?" },
    { zh: "通信成本升高时，能否用更多本地计算换取更少上传？", en: "Can extra local compute replace uploads when communication becomes expensive?" },
    { zh: "本地计算能力弱时，是否应该增加通信？", en: "Should communication increase when local compute is limited?" },
    { zh: "不同节点是否可以部署不同模型？", en: "Can different nodes deploy different models?" },
    { zh: "一个 Agent 能否根据环境状态重新组织这些模型？", en: "Can an agent reorganise these models according to the environmental state?" },
  ] satisfies Localized[],
  criteria: [
    { zh: "创新性与创造性：是否提出有意义的模型选择、模型协同、大小模型配合、Agent 调度或通信—计算协同方法。", en: "Innovation and creativity: whether the work proposes meaningful model selection, model collaboration, large-small model cooperation, agent scheduling, or communication-computing coordination." },
    { zh: "技术实现效果：系统是否可以完整、稳定运行，不同模型和通信策略是否真正参与决策。", en: "Technical implementation: whether the system runs completely and reliably, with different models and communication policies genuinely participating in decisions." },
    { zh: "多模型协同能力：是否真正利用不同模型之间的能力与成本差异，而不是简单地同时运行多个模型。", en: "Multi-model collaboration: whether capability and cost differences are used rather than simply running multiple models at once." },
    { zh: "环境状态保持能力：减少通信或高成本模型调用后，是否仍能较准确地掌握重要环境状态及其变化。", en: "Environmental-state retention: whether important states and changes remain accurately tracked with fewer communications or expensive model calls." },
    { zh: "通信与计算效率：是否有效减少不必要的通信和计算，并展示性能、通信成本与计算成本之间的关系。", en: "Communication and computing efficiency: whether unnecessary communication and computation are reduced and their relationship with performance is shown." },
    { zh: "系统鲁棒性与应用价值：在弱连接、数据缺失、环境快速变化等情况下是否仍能保持合理表现。", en: "Robustness and application value: whether the system maintains reasonable performance under weak links, missing data, and rapid environmental changes." },
  ] satisfies Localized[],
  submission: [
    { zh: "提交代码、运行说明、实验结果、关键图表和简要技术报告。", en: "Submit code, run instructions, experimental results, key figures, and a concise technical report." },
    { zh: "展示不同模型调用、通信决策、环境状态保持效果，以及通信与计算成本变化，并提供基础方案对比。", en: "Show model calls, communication decisions, state-estimation quality, communication and compute costs, and a baseline comparison." },
    { zh: "准备线下 PPT，说明问题理解、系统设计、协同方式、通信策略、结果与改进方向。", en: "Prepare an on-site presentation covering the problem, system design, collaboration, communication policy, results, and improvements." },
    { zh: "答辩时能够解释不同状态下为何选择该模型、为何通信或等待。", en: "Be prepared to explain why each model and communication or waiting action was selected in different states." },
  ] satisfies Localized[],
};

export const communicationComputingPapers: DisasterPaper[] = [
  {
    id: "communication-computing-uav-iscc",
    venue: "IEEE · UAV-assisted ISCC",
    title: "Joint Task Scheduling and Resource Allocation for UAV-Assisted Air-Ground Collaborative Integrated Sensing, Computation, and Communication",
    authors: "Air-ground collaborative sensing, computation, and communication",
    summary: {
      zh: "从森林火灾监测出发，理解地面 IoT、无人机、任务调度、计算卸载与通信资源分配如何共同构成一套感知—通信—计算系统。",
      en: "Uses forest-fire monitoring to connect ground IoT, UAVs, task scheduling, computation offloading, and communication-resource allocation in one sensing-communication-computing system.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT，说明问题、系统架构与主要结论。", en: "Prepare a 20-minute individual presentation covering the problem, system architecture, and conclusions." },
      { zh: "解释火灾监测为何需要感知、通信与计算协同，以及三类资源如何相互影响。", en: "Explain why fire monitoring needs sensing, communication, and computing coordination and how the resources interact." },
      { zh: "绘制地面 IoT、UAV、任务调度、计算卸载与资源分配的完整流程图。", en: "Draw a complete flowchart linking ground IoT, UAVs, task scheduling, offloading, and resource allocation." },
      { zh: "讨论其在山区弱覆盖、低功耗和长期监测中的适用性，并思考向滑坡、泥石流场景迁移。", en: "Discuss weak coverage, low power, long-running monitoring, and transfer to landslide or debris-flow settings." },
    ],
    note: { zh: "可选：构建简化 UAV–IoT 场景，验证一种调度、卸载或资源分配策略。", en: "Optional: build a small UAV-IoT scenario and test one scheduling, offloading, or resource-allocation policy." },
    links: [{ label: { zh: "IEEE 论文", en: "IEEE paper" }, href: "https://ieeexplore.ieee.org/document/11090168" }],
  },
  {
    id: "communication-computing-learnware",
    venue: "IEEE · Learnware",
    title: "Learnware for CSI Feedback: Scene-Specific Small Models Can Do Big",
    authors: "Scene-specific small models and model repositories",
    summary: {
      zh: "理解场景专用小模型与 Learnware 模型仓库如何降低 CSI 反馈中的计算、通信和部署成本。",
      en: "Explores how scene-specific small models and a Learnware repository reduce compute, communication, and deployment costs in CSI feedback.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT，说明问题、方法与主要结论。", en: "Prepare a 20-minute individual presentation covering the problem, method, and conclusions." },
      { zh: "解释场景专用小模型与模型仓库的动机及其成本影响。", en: "Explain the motivation for scene-specific small models and a model repository and their cost implications." },
      { zh: "绘制 AI 数据中心、模型仓库、基站、终端、模型检索与适配的完整流程图。", en: "Draw the complete flow among the AI data centre, repository, base station, user equipment, model retrieval, and adaptation." },
      { zh: "讨论其局限，以及对边缘智能、大小模型协同和环境监测的启发。", en: "Discuss limitations and implications for edge intelligence, large-small model collaboration, and environmental monitoring." },
    ],
    note: { zh: "可选：设计小规模实验，验证论文中的一个核心观点。", en: "Optional: design a small experiment that tests one central claim." },
    links: [{ label: { zh: "IEEE 论文", en: "IEEE paper" }, href: "https://ieeexplore.ieee.org/document/11668998" }],
  },
  {
    id: "communication-computing-event-triggered",
    venue: "IEEE · Event-triggered edge AI",
    title: "Communication Efficient Cooperative Edge AI via Event-Triggered Computation Offloading",
    authors: "Local inference, event decisions, and edge offloading",
    summary: {
      zh: "围绕“不是所有数据都应上传”这一核心问题，理解本地推理、事件判断、信道状态、卸载决策与边缘推理的关系。",
      en: "Centres on why not all data should be uploaded, connecting local inference, event decisions, channel state, offloading, and edge inference.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT，说明问题、方法与主要结论。", en: "Prepare a 20-minute individual presentation covering the problem, method, and conclusions." },
      { zh: "解释事件触发计算卸载，以及为什么不是所有数据都应送到边缘服务器。", en: "Explain event-triggered computation offloading and why not every sample should reach the edge server." },
      { zh: "绘制本地推理、事件判断、信道状态、卸载决策与边缘推理流程图。", en: "Draw the flow among local inference, event detection, channel state, offloading, and edge inference." },
      { zh: "讨论其对弱覆盖、低功耗监测和关键事件传输的启发与限制。", en: "Discuss implications and limitations for weak coverage, low-power monitoring, and critical-event transmission." },
    ],
    note: { zh: "可选：实现“本地处理—选择性卸载”实验，比较任务性能与通信开销。", en: "Optional: implement local processing with selective offloading and compare task performance against communication cost." },
    links: [{ label: { zh: "IEEE 论文", en: "IEEE paper" }, href: "https://ieeexplore.ieee.org/document/11318636" }],
  },
  {
    id: "communication-computing-large-small",
    venue: "IEEE · Mobile edge intelligence",
    title: "Large-Small Model Collaboration in Mobile Edge Networks With Heterogeneous Computational Resources",
    authors: "Device-edge collaboration under heterogeneous resources",
    summary: {
      zh: "理解端侧小模型与边缘大模型如何分工，以及异构算力与有限带宽如何影响大小模型协同。",
      en: "Explains how device-side small models and edge-side large models divide work under heterogeneous compute and limited bandwidth.",
    },
    requirements: [
      { zh: "准备20分钟独立现场答辩PPT，说明问题、系统框架与主要结论。", en: "Prepare a 20-minute individual presentation covering the problem, framework, and conclusions." },
      { zh: "解释为何需要大小模型协同，以及端侧和边缘侧分别承担什么任务。", en: "Explain why large-small model collaboration is needed and what device and edge models each do." },
      { zh: "绘制本地推理、数据上传、边缘推理、模型更新与通信资源分配流程图。", en: "Draw the flow among local inference, upload, edge inference, model updates, and communication-resource allocation." },
      { zh: "讨论异构算力和有限带宽的影响，以及对弱覆盖云边端协同的启发。", en: "Discuss heterogeneous compute, limited bandwidth, and implications for cloud-edge-device collaboration under weak coverage." },
    ],
    note: { zh: "可选：构造“简单样本本地处理、困难样本交给强模型”的系统并比较通信预算。", en: "Optional: route easy samples locally and difficult samples to a stronger model, then compare communication budgets." },
    links: [{ label: { zh: "IEEE 论文", en: "IEEE paper" }, href: "https://ieeexplore.ieee.org/document/11299818" }],
  },
];

export const communicationComputingPaperSubmission = [
  { zh: "提交汇报 PPT，并准备20分钟独立现场答辩。", en: "Submit slides and prepare a 20-minute individual on-site presentation." },
  { zh: "汇报应包含问题、系统流程、核心方法、实验结论、局限与个人理解。", en: "Cover the problem, system flow, core method, findings, limitations, and your own understanding." },
  { zh: "图表、代码与外部材料需注明来源；可选工程实现不作为必需项。", en: "Cite figures, code, and external material. The optional implementation is not required." },
] satisfies Localized[];

export const communicationComputingAvailabilityNote: Localized = {
  zh: "提交截止时间和答辩排期将在招新群内另行通知。",
  en: "The submission deadline and defence schedule will be announced in the recruitment group.",
};
