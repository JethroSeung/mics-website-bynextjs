/**
 * 研究方向数据（需求文档 §5：3 方向合并为 2）
 * - pain：自然灾害场景下的通感计算（负责人：杨承轩）
 * - medeng：医工交叉-多模态感知（负责人：张栩闻）
 * medeng 详情迁移自旧站 research-multimodal.html / en/research-multimodal.html（2026-09-06）
 * pain 详情待与导师讨论（§13-W2），detail 为 null 时详情页渲染整页占位
 */

import type { Localized, PartnerId } from "./site";
import { getMemberById } from "./members";

export type DirectionSlug = "pain" | "medeng";

/** 配图（news-note-media / publication-media），width/height 供 next/image 使用 */
export interface ResearchFigure {
  src: string;
  alt: Localized;
  caption: Localized;
  /** 图片内在宽度（px） */
  width: number;
  /** 图片内在高度（px） */
  height: number;
}

/** 编号研究任务（旧站 focus-item：01-04） */
export interface ResearchFocusItem {
  no: string;
  title: Localized;
  paragraphs: Localized[];
}

export interface ResearchSection {
  heading: Localized;
  paragraphs: Localized[];
  /** 编号任务列表（如 4 类研究任务，各含标题与多段说明） */
  focusList?: ResearchFocusItem[];
  /** 侧栏注记（如医工交叉合作 + 配图） */
  aside?: {
    title: Localized;
    paragraph: Localized;
    figure?: ResearchFigure;
  };
}

/** 代表成果（旧站 publication-item：实验平台 / 论文通用） */
export interface ResearchPublication {
  title: Localized;
  /** 论文作者（英文名两种语言一致） */
  authors?: string;
  /** Type / Venue / Year 等元信息 */
  meta: Localized;
  description: Localized;
  /** 论文链接（实验平台类无链接） */
  link?: string;
  figure?: ResearchFigure;
}

export interface ResearchDetail {
  /** 详情页专用标题，避免覆盖首页研究方向卡片标题 */
  pageTitle: Localized;
  /** 详情页专用导语，避免覆盖首页研究方向卡片简介 */
  pageIntro: Localized;
  /** 概述大标题（旧站 news-header h2） */
  overviewTitle: Localized;
  /** 概述导语（紧跟 overviewTitle 的段落） */
  heroLead: Localized;
  /** 摘要框（旧站 news-summary：标签 + 重点任务） */
  summary: { label: Localized; text: Localized };
  sections: ResearchSection[];
  /** 代表成果列表（旧站 publication-list） */
  publications: ResearchPublication[];
}

export interface ResearchDirection {
  slug: DirectionSlug;
  order: 1 | 2;
  name: Localized;
  /** 关联 members.ts 的成员 id，渲染负责人姓名 + 邮箱 */
  leadMemberId: string;
  /** 与该研究方向直接关联的合作单位 */
  partnerIds: readonly PartnerId[];
  cardIntro: Localized;
  /** null = "内容待发布" 整页占位态（Phase 1） */
  detail: ResearchDetail | null;
}

export const researchDirections: ResearchDirection[] = ([
  {
    slug: "pain",
    order: 2,
    name: {
      zh: "自然灾害场景下的通感计算",
      en: "Integrated Sensing and Communication in Natural Disaster Scenarios",
    },
    leadMemberId: "yang-chengxuan",
    partnerIds: ["china-comservice", "china-telecom"],
    cardIntro: {
      zh: "面向地震、洪涝等自然灾害救援场景，研究通信感知一体化信号的采集、表征与计算方法。",
      en: "Researching integrated sensing and communication (ISAC) signal acquisition, representation and computing for disaster rescue scenarios.",
    },
    detail: null,
  },
  {
    slug: "medeng",
    order: 1,
    name: {
      zh: "医工交叉-多模态感知",
      en: "Medical-Engineering Multimodal Sensing",
    },
    leadMemberId: "zhang-xuwen",
    partnerIds: ["jiangsu-province-hospital"],
    cardIntro: {
      zh: "医工交叉视角下的多模态感知技术，探索面向健康监测与临床应用的智能感知方案。",
      en: "Multimodal sensing from a medical-engineering perspective for health monitoring and clinical applications.",
    },
    detail: {
      pageTitle: {
        zh: "医工交叉多模态感知，于无声处感知生命",
        en: "Biomedical Multimodal Sensing: Sensing Life in Silence",
      },
      pageIntro: {
        zh: "以机器学习与深度学习模型从无线信号中提取生理与行为信息，并以大语言模型（LLM）健康助手 Agent 整合并呈现结果，无需穿戴设备，推动无接触感知在真实临床环境中落地。",
        en: "Machine learning and deep learning models extract physiological and behavioral information from wireless signals, and a health assistant agent built on large language models (LLMs) integrates and presents the results, all without wearables, toward real clinical deployment.",
      },
      overviewTitle: {
        zh: "多模态感知",
        en: "Multimodal Sensing",
      },
      heroLead: {
        zh: "WiFi 与 CSI 信号时刻穿行在病房与客厅之间，人体的呼吸、动作与姿态变化都会留下可测量的信号改变。麦克风拾取鼾声、咳嗽与交谈，摄像头则在特定合规场景中记录姿态、动作与场景信息。在数据处理层，机器学习与深度学习模型从各通道数据中提取特征，并将其映射为定位、活动、生命体征、姿态与行为，并实现房颤等心律异常的长期无接触检测。多模态融合由深度学习模型完成，把各通道的结果整合为统一的感知结果。在报告层，课题组用大语言模型（LLM）搭建了一体化的私人健康助手 Agent，整理观测结果、解释模型判断，支撑筛查、诊断与复诊。与江苏省人民医院的合作，让这条完整的技术链路在真实临床环境中得到验证。",
        en: "WiFi and CSI signals travel through wards and living rooms at all times, and the breathing, movements, and posture changes of the human body leave measurable traces in these signals. Microphones capture snoring, coughing, and conversation, while cameras record posture, motion, and scene information in specific compliant scenarios. At the data processing layer, machine learning and deep learning models extract features from the data of each channel and map them to localization, activity, vital signs, posture, and behavior, enabling long-term contactless detection of arrhythmias such as atrial fibrillation. Multimodal fusion is performed by deep learning models, which integrate the results of all channels into a unified perception outcome. At the reporting layer, the group has built an integrated personal health assistant agent on large language models (LLMs), which organizes observations, explains model judgments, and supports screening, diagnosis, and follow-up. The collaboration with Jiangsu Province Hospital validates this complete technical pipeline in real clinical settings.",
      },
      summary: {
        label: { zh: "重点任务", en: "Core tasks" },
        text: {
          zh: "与江苏省人民医院合作，课题组在真实病房中采集并标注多通道感知数据，训练与验证机器学习、深度学习模型，研究多模态融合与大语言模型（LLM）健康助手 Agent，让人体定位、生理与行为感知、人体姿态估计与阿尔兹海默症筛查在真实环境中经得起检验。",
          en: "In collaboration with Jiangsu Province Hospital, the group collects and annotates multichannel sensing data in real wards, trains and validates machine learning and deep learning models, studies multimodal fusion, and builds a health assistant agent on large language models (LLMs), so that human localization, physiological and behavioral sensing, human pose estimation, and Alzheimer's disease screening hold up to real environments.",
        },
      },
      sections: [
        {
          heading: { zh: "行业背景", en: "Industry background" },
          paragraphs: [
            {
              zh: "穿戴设备测量准确，但患者难以长期坚持佩戴。WiFi 与毫米波雷达则几乎不引入额外负担，设备成本低、体积小，部署后即可持续工作，也不受光照条件影响。凭借这些优势，无线信号成为课题组的主要感知通道，视觉则在合适的场景中补充更丰富的观测细节。",
              en: "Wearables measure accurately, but patients can hardly keep them on over long periods. WiFi and millimeter-wave radar impose almost no extra burden, as the devices are inexpensive and compact, keep working once deployed, and are unaffected by lighting conditions. These advantages make wireless signals the primary sensing channel, with vision complementing them with richer observational details in suitable scenarios.",
            },
            {
              zh: "研究从数据采集起步。课题组使用商用设备在真实房间中采集大量无线信号，并同步记录人体的真实状态作为标注，随后训练深度学习模型从信号中识别人体活动。初步结果验证了技术可行性，深度学习模型仅凭信号的变化即可判断房间内是否有人、处于何种活动状态。",
              en: "The research began with data collection. Using commercial devices, the group recorded large amounts of wireless signals in real rooms and annotated them with the true states of the people inside, then trained deep learning models to recognize human activities from the signals. Preliminary results confirmed technical feasibility, as deep learning models could determine from signal changes alone whether a room was occupied and what activity was taking place.",
            },
            {
              zh: "WiFi 信道状态信息（CSI）能够反映人体最微小的动作，胸腔起伏、肢体移动都会在信道读数中留下特征。深度学习模型对这些特征逐层解析，把感知对象从动作推进到呼吸与心跳，形成无接触生命体征监测能力。",
              en: "WiFi channel state information (CSI) reflects the smallest human motions, as chest movement and limb motion both leave features in the channel readings. Deep learning models parse these features layer by layer, extending the sensing target from activities to breathing and heartbeat, and forming a contactless vital sign monitoring capability.",
            },
            {
              zh: "语音是另一条信息通道。房间内已有的麦克风可以拾取鼾声、咳嗽、交谈与脚步，语音识别与音频深度学习模型将这些声音转化为睡眠质量与日常状态的信息。它与无线感知共享同样的部署优势，无接触、不打扰、易于扩展。",
              en: "Voice is another information channel. Microphones already present in a room capture snoring, coughing, conversation, and footsteps, and speech recognition and audio deep learning models convert these sounds into information about sleep quality and daily states. Voice sensing shares the same deployment advantages as wireless sensing, remaining contactless, unobtrusive, and easy to scale.",
            },
            {
              zh: "视觉观测的信息量最大，覆盖外观、姿态、动作与场景。借助视觉深度学习模型，摄像头画面可以被转化为姿态与行为分析，并作为其他通道的对照参照。隐私要求决定了视觉在系统中的角色，它在特定合规场景中作为补充通道工作，补充无线通道无法提供的细节。",
              en: "Vision provides the most informative observations, covering appearance, posture, motion, and scene. With visual deep learning models, camera frames can be converted into posture and behavior analysis, serving as a reference for the other channels. Privacy requirements define the role of vision in the system, where it works as a complementary channel in specific compliant scenarios and supplies details that wireless channels cannot provide.",
            },
            {
              zh: "单一通道各有局限，多模态融合由此成为系统的基础。借助深度学习融合模型，无线信号、语音与视觉相互补充，感知结果在复杂环境中保持稳定。研究成果最终要回到真实环境中检验，与江苏省人民医院的合作，让算法在真实病房的数据与需求中持续打磨。",
              en: "Each single channel has its own limitations, which makes multimodal fusion the foundation of the system. With deep learning fusion models, wireless signals, voice, and vision complement one another, keeping perception stable in complex environments. Research results must ultimately return to real environments for testing, and the collaboration with Jiangsu Province Hospital keeps the algorithms sharpened against real ward data and clinical needs.",
            },
          ],
        },
        {
          heading: { zh: "研究方向", en: "Research directions" },
          paragraphs: [
            {
              zh: "同一套技术，四个方向。从真实环境的数据出发，课题组让模型在人体定位、生理与行为感知、人体姿态估计与阿尔兹海默症筛查中都给出可用的答案。",
              en: "One set of techniques, four directions. Starting from data collected in real environments, the group makes its models deliver usable answers in human localization, physiological and behavioral sensing, human pose estimation, and Alzheimer's disease screening.",
            },
          ],
          focusList: [
            {
              no: "01",
              title: { zh: "人体定位", en: "Human localization" },
              paragraphs: [
                {
                  zh: "人员在室内的位置与轨迹是最基础的感知信息。机器学习与深度学习模型分析 WiFi 信号与雷达回波的特征变化，据此确定患者与医护人员的位置，并发现跌倒后长时间未移动等异常状况。",
                  en: "Indoor position and trajectory are the most basic sensing information. Machine learning and deep learning models analyze feature changes in WiFi signals and radar echoes to determine the locations of patients and medical staff, and to detect anomalies such as a fall followed by prolonged immobility.",
                },
                {
                  zh: "人体定位是智慧病房的基础，支撑患者流动管理、跌倒报警与医疗机器人的路径规划。课题组通过跨房间、跨布局的模型评估检验定位稳定性，训练完成的模型在环境变化后依然保持性能。",
                  en: "Human localization is the foundation of smart wards, supporting patient flow management, fall alerts, and path planning for medical robots. Models are evaluated across rooms and layouts, so localization remains stable after the environment changes.",
                },
              ],
            },
            {
              no: "02",
              title: { zh: "生理与行为感知", en: "Physiological and behavioral sensing" },
              paragraphs: [
                {
                  zh: "生命体征体现在最微弱的信号变化中。CSI 与雷达信号经过采集与预处理后，机器学习与深度学习模型学习这些变化与生理信号之间的映射关系，在不贴电极、不接触皮肤的前提下，连续估计呼吸、心律与睡眠呼吸事件。",
                  en: "Vital signs are reflected in the weakest signal variations. After CSI and radar signals are collected and preprocessed, machine learning and deep learning models learn the relationship between these variations and physiological signals, enabling continuous estimation of respiration, heart rhythm, and sleep apnea events without electrodes or skin contact.",
                },
                {
                  zh: "同一套模型还能从长期观测中识别持续性与间歇性的心律异常，包括房颤检测。真实病房数据与江苏省人民医院的合作用于模型训练与验证，信号层的建模由此直接对接临床监护需求。",
                  en: "The same models can identify persistent and intermittent rhythm abnormalities from long-term observations, including atrial fibrillation detection. Data from real wards and the collaboration with Jiangsu Province Hospital are used for training and validation, connecting signal-level modeling with clinical monitoring needs.",
                },
              ],
            },
            {
              no: "03",
              title: { zh: "人体姿态估计", en: "Human pose estimation" },
              paragraphs: [
                {
                  zh: "深度学习模型从雷达点云与信号变化中提取空间与时序特征，重建人体姿态，覆盖坐、卧、行走与跌倒等状态。模型从数据中学习人体结构与运动模式，结果在夜间与部分遮挡环境中同样可用。",
                  en: "Deep learning models extract spatial and temporal features from radar point clouds and signal changes to reconstruct human posture, including sitting, lying, walking, and falling. The models learn body structure and motion patterns from data, so results remain available at night and under partial occlusion without depending on lighting.",
                },
                {
                  zh: "姿态估计结果进一步转化为跌倒事件、术后活动能力与康复训练动作量化等可测量的临床指标。这些指标为评估提供连续数据，多模态融合还可以把姿态变化与生理、行为信号相互对照。",
                  en: "The estimated pose is then converted into measurable clinical indicators, including fall events, post-operative mobility, and motion quantification during rehabilitation. These indicators provide continuous data for assessment, while multimodal fusion can compare pose changes with physiological and behavioral signals.",
                },
              ],
            },
            {
              no: "04",
              title: { zh: "阿尔兹海默症筛查", en: "Alzheimer's disease screening" },
              paragraphs: [
                {
                  zh: "阿尔兹海默症在确诊前多年已在日常行为中留下夜间频繁起身、昼夜节律紊乱、步态变慢、活动量下降等特征。这些变化细微而缓慢，家人难以察觉，门诊问诊也依赖患者与家属的回忆。",
                  en: "Alzheimer's disease leaves characteristic marks in daily behavior years before diagnosis, such as frequent rising at night, disrupted circadian rhythms, slowing gait, and declining activity levels. These changes are subtle and gradual, difficult for family members to notice, and clinic consultations rely on the recollections of patients and their families.",
                },
                {
                  zh: "WiFi、CSI、语音与视觉数据为这些变化提供互补证据，机器学习与深度学习模型从中识别睡眠、运动、语言与日常活动的缓慢改变。",
                  en: "WiFi, CSI, voice, and visual data provide complementary evidence for these changes, and machine learning and deep learning models identify gradual alterations in sleep, movement, speech, and daily activities.",
                },
                {
                  zh: "长期多模态数据能够支撑早期筛查与病情随访，捕捉单次门诊难以发现的变化。大语言模型把这些观测整理成可理解的报告，并通过健康助手对话加以解释，临床判断则以模型证据、医生复核以及与江苏省人民医院的合作为基础。",
                  en: "Long-term multimodal data can support early screening and condition follow-up, capturing changes that are difficult to detect in a single clinic visit. Large language models organize these observations into understandable reports and explain them through health assistant conversations, while clinical decisions are grounded in model evidence, physician review, and the collaboration with Jiangsu Province Hospital.",
                },
              ],
            },
          ],
          aside: {
            title: { zh: "临床合作", en: "Clinical collaboration" },
            paragraph: {
              zh: "课题组与江苏省人民医院开展深度合作，基于毫米波雷达的房颤无接触监测等项目已在真实临床环境中推进。医院的真实数据与医生的实际需求，是这套感知系统的出发点与检验标准。",
              en: "The group collaborates closely with Jiangsu Province Hospital, where projects such as contactless atrial fibrillation monitoring based on millimeter-wave radar are already advancing in real clinical settings. Real hospital data and the practical needs of physicians are both the starting point and the benchmark of this sensing system.",
            },
            figure: {
              src: "/images/research/medeng/hospital-collaboration.jpg",
              alt: {
                zh: "江苏省人民医院毫米波雷达无接触心电监测项目推进会现场",
                en: "Collaboration meeting at Jiangsu Province Hospital for millimeter-wave radar contactless cardiac monitoring",
              },
              caption: {
                zh: "江苏省人民医院合作交流现场",
                en: "Collaboration meeting at Jiangsu Province Hospital",
              },
              width: 1600,
              height: 1200,
            },
          },
        },
        {
          heading: { zh: "未来方向", en: "Future directions" },
          paragraphs: [
            {
              zh: "未来的病房里，感知模型运行在床旁的边缘设备上，全天候观察着房间。呼吸变浅、心律异常、夜间离床、意外跌倒，都会被及时识别，并由健康助手 Agent 通报护士站。患者不需要佩戴任何设备，监护由环境本身完成，连续记录的生理数据也为医生的诊断提供长期依据。这一切正在成为现实，课题组自研的毫米波、WiFi 与红外一体化采集平台已经能够在真实房间中同步捕获呼吸、心律与体动，与江苏省人民医院合作的房颤无接触监测正在积累临床数据，让阵发性心律异常的检出不再依赖偶然。",
              en: "In the ward of the future, sensing models will run on edge devices at the bedside, watching the room around the clock. Shallow breathing, abnormal heart rhythm, leaving the bed at night, and accidental falls will all be recognized in time and reported to the nurses' station through the health assistant agent. Patients will not need to wear any device, monitoring is performed by the environment itself, and continuously recorded physiological data will provide doctors with a long-term basis for diagnosis. This is already becoming reality, as the group's self-developed integrated millimeter-wave, WiFi, and infrared acquisition platform can already capture respiration, heart rhythm, and body movement synchronously in real rooms, and the contactless atrial fibrillation monitoring project in collaboration with Jiangsu Province Hospital is accumulating clinical data, so that the detection of paroxysmal rhythm anomalies no longer depends on chance.",
            },
            {
              zh: "同样的能力将走出医院，进入千家万户。一台路由器与一个音箱，就是一套家庭感知系统，长期记录睡眠、呼吸与活动节律。健康助手 Agent 从数十天的数据中追踪健康的缓慢变化，让早期筛查融入日常生活。无论是房颤这样的隐匿性心律异常，还是阿尔兹海默症的早期征兆，都能被及时提示，并以对话的方式解释依据、给出建议。出院后的复查与随访也在家中完成，康复进度被持续记录，异常时才会提醒就医，例行检查不必再往返医院。每位老人的家中都将有一位不知疲倦的私人医生，来自日常环境的长期观察，将取代一次性的门诊判断。",
              en: "The same capability will leave the hospital and reach millions of households. A router and a smart speaker together form a home sensing system that keeps recording sleep, breathing, and activity rhythms over long periods. The health assistant agent tracks the slow changes in health hidden within data spanning dozens of days, bringing early screening into everyday life. Silent rhythm anomalies such as atrial fibrillation, as well as the earliest signs of Alzheimer's disease, will be flagged in time, with the evidence explained and suggestions offered through conversation. Post-discharge reviews and follow-ups will also be completed at home, where recovery progress is continuously recorded and medical attention is suggested only when something abnormal appears, so routine checks no longer require repeated trips to the hospital. Every elderly person's home will have a tireless personal doctor, and long-term observation from the everyday environment will replace judgments formed in a single clinic visit.",
            },
            {
              zh: "病房与家庭积累的连续观测，最终会指向同一个问题，如何从已知的数据看清未来的变化。课题组希望用世界模型来回答。它从长期多模态观测中学习人体状态的演化规律，预测康复的走向，提示心律异常等事件发生前的预警信号，让医疗团队在变化发生之前有所准备。预测之外，世界模型也支持交互，医生可以询问不同诊疗方案下可能出现的结果，家属也能用自然语言了解未来的可能性，回答建立在模拟轨迹与可观测的数据之上。",
              en: "The continuous observations gathered from wards and homes eventually point to the same question, how to see future changes in the data we already have. World models are the group's answer. A world model learns from long-term multimodal observations how human states evolve, predicting the course of recovery and flagging the warning signals before events such as rhythm anomalies, so the care team is prepared before change arrives. Beyond prediction, world models support interaction, where physicians can ask about likely outcomes under different diagnosis and treatment plans, and families can explore the possibilities in natural language, with every answer grounded in simulated trajectories and observable data.",
            },
            {
              zh: "支撑这一切的，是课题组正在研究的统一表征与多模态大模型，让模型跨场景迁移，让感知系统能够解释自己的判断、与人自然对话，世界模型正建立在这样的基础之上。当感知融入每一间病房与每一个家庭，筛查、诊断与复诊将连成一条不间断的链条，疾病在被确诊之前就已被观察，风险在被发生之前就已被提示，医疗将从「事件驱动」走向「持续在场」。而这一切的一切，仅从一个模型、一组数据开始……",
              en: "Behind all of this lies the group's ongoing research on unified representations and multimodal large models, which allow models to transfer across scenes and allow sensing systems to explain their own judgments and converse naturally with people, and world models stand on exactly this foundation. As perception spreads into every ward and every household, screening, diagnosis, and follow-up will form one unbroken chain, where diseases are observed before they are diagnosed and risks are flagged before they occur, and healthcare will move from event-driven to always present. And it all begins with one model and one dataset...",
            },
          ],
        },
      ],
      publications: [
        {
          title: {
            zh: "毫米波、WiFi 与红外一体化实时采集平台",
            en: "Millimeter-Wave, WiFi, and Infrared Integrated Real-Time Acquisition Platform",
          },
          meta: {
            zh: "实验平台 · 多模态感知",
            en: "Experimental platform · Multimodal sensing",
          },
          description: {
            zh: "课题组自研毫米波、WiFi 与红外一体化实时采集平台，支撑多源同步数据采集与算法验证，服务生命体征监测与复杂场景实验。",
            en: "The group has built an integrated real-time acquisition platform combining millimeter-wave radar, WiFi, and infrared sensing, supporting synchronized multi-source data collection and algorithm validation for vital sign monitoring and complex scene experiments.",
          },
          figure: {
            src: "/images/research/medeng/multimodal-realtime-platform.jpg",
            alt: {
              zh: "毫米波、WiFi 与红外一体化实时采集平台实验现场",
              en: "Millimeter-wave, WiFi, and infrared integrated real-time acquisition platform",
            },
            caption: {
              zh: "毫米波、WiFi 与红外一体化实时采集平台",
              en: "Integrated real-time acquisition platform",
            },
            width: 1448,
            height: 1086,
          },
        },
        {
          title: {
            zh: "AceNet: attention-guided context enhancement for imbalanced action recognition via RF signals",
            en: "AceNet: attention-guided context enhancement for imbalanced action recognition via RF signals",
          },
          authors: "Biyun Sheng, Hao Liu, Hui Cai, Yiping Zuo, Jian Zhou, Fu Xiao",
          meta: {
            zh: "IEEE Transactions on Mobile Computing · 2026",
            en: "IEEE Transactions on Mobile Computing · 2026",
          },
          description: {
            zh: "该工作面向射频信号行为识别中的类别不平衡问题，提出注意力引导的上下文增强网络，从特征层面区分相似动作并缓解不平衡带来的决策边界偏差。",
            en: "This work addresses class imbalance in activity recognition with RF signals and proposes an attention-guided context enhancement network to distinguish semantically similar actions and reduce decision boundary bias caused by imbalance.",
          },
          link: "https://ieeexplore.ieee.org/abstract/document/11408084",
        },
        {
          title: {
            zh: "CoSense: Respiratory Detection Based on WIFI CSI and Millimeter-Wave Radar",
            en: "CoSense: Respiratory Detection Based on WIFI CSI and Millimeter-Wave Radar",
          },
          authors: "Jiaming Liu, Xiaoxiao Qiao, Zeyuan Wu, Weibei Fan, Yiping Zuo, Xin He",
          meta: {
            zh: "2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD) · 2026",
            en: "2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD) · 2026",
          },
          description: {
            zh: "该工作提出基于 WiFi CSI 与毫米波雷达联合感知的无接触呼吸检测系统，通过融合两类信号特征提升复杂室内环境下的呼吸检测准确性。",
            en: "This work proposes a contactless respiration detection system based on joint WiFi CSI and millimeter-wave sensing, fusing signal features to improve respiratory detection accuracy in complex indoor environments.",
          },
          link: "https://ieeexplore.ieee.org/abstract/document/11581638",
        },
        {
          title: {
            zh: "Adaptive Hybrid Routing for Wi-Fi CSI-Based Indoor Human Activity Recognition Using DTW-KNN and SVM",
            en: "Adaptive Hybrid Routing for Wi-Fi CSI-Based Indoor Human Activity Recognition Using DTW-KNN and SVM",
          },
          authors: "Jiasheng Song, Yiping Zuo, Chen Dai, Weicong Chen, Ning Gao, Xin He, Weibei Fan",
          meta: {
            zh: "2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD) · 2026",
            en: "2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD) · 2026",
          },
          description: {
            zh: "该工作面向 WiFi CSI 室内人体活动识别，提出结合 DTW-KNN 与 SVM 的自适应混合路由方法，用于提升资源受限场景下的识别鲁棒性。",
            en: "This work studies WiFi CSI-based indoor human activity recognition and proposes an adaptive hybrid routing method combining DTW-KNN and SVM for robust recognition in resource-constrained scenarios.",
          },
          link: "https://ieeexplore.ieee.org/abstract/document/11582546",
        },
      ],
    },
  },
] satisfies ResearchDirection[]).sort((a, b) => a.order - b.order);

/** 按 slug 取方向 */
export function getDirection(slug: DirectionSlug): ResearchDirection {
  const dir = researchDirections.find((d) => d.slug === slug);
  if (!dir) throw new Error(`未知研究方向：${slug}`);
  return dir;
}

/** 取方向负责人（数据完整性在模块加载时校验） */
function assertLeadsValid() {
  for (const dir of researchDirections) {
    const lead = getMemberById(dir.leadMemberId);
    if (!lead) throw new Error(`方向 ${dir.slug} 负责人 ${dir.leadMemberId} 不在成员数据中`);
    if (lead.directionLead !== dir.slug) {
      throw new Error(`成员 ${lead.id} 的 directionLead 与方向 ${dir.slug} 不匹配`);
    }
  }
}
assertLeadsValid();
