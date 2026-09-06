/**
 * 研究方向数据（需求文档 §5：3 方向合并为 2）
 * - pain：自然灾害场景下的通感计算（负责人：杨承轩）
 * - medeng：医工交叉-多模态感知（负责人：张栩闻）
 * medeng 详情迁移自旧站 research-multimodal.html / en/research-multimodal.html（2026-09-06）
 * pain 详情待与导师讨论（§13-W2），detail 为 null 时详情页渲染整页占位
 */

import type { Localized } from "./site";
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
  cardIntro: Localized;
  /** null = "内容待发布" 整页占位态（Phase 1） */
  detail: ResearchDetail | null;
}

export const researchDirections: ResearchDirection[] = [
  {
    slug: "pain",
    order: 1,
    name: {
      zh: "自然灾害场景下的通感计算",
      en: "Integrated Sensing and Communication in Natural Disaster Scenarios",
    },
    leadMemberId: "yang-chengxuan",
    cardIntro: {
      zh: "面向地震、洪涝等自然灾害救援场景，研究通信感知一体化信号的采集、表征与计算方法。",
      en: "Researching integrated sensing and communication (ISAC) signal acquisition, representation and computing for disaster rescue scenarios.",
    },
    detail: null,
  },
  {
    slug: "medeng",
    order: 2,
    name: {
      zh: "医工交叉-多模态感知",
      en: "Medical-Engineering Multimodal Sensing",
    },
    leadMemberId: "zhang-xuwen",
    cardIntro: {
      zh: "医工交叉视角下的多模态感知技术，探索面向健康监测与临床应用的智能感知方案。",
      en: "Multimodal sensing from a medical-engineering perspective for health monitoring and clinical applications.",
    },
    detail: {
      overviewTitle: {
        zh: "多模态感知：面向人体与环境状态的智能理解",
        en: "Multimodal sensing for human and environmental understanding",
      },
      heroLead: {
        zh: "多模态感知关注人体、设备和环境状态的智能理解。单一传感器往往只能看到对象的一个侧面，而无线信号、毫米波雷达、视觉图像和其他传感信息可以从不同角度描述同一场景。课题组希望通过多源数据采集、特征建模和协同融合，构建更稳定、更连续、更适合真实环境部署的智能感知能力。",
        en: "Multimodal sensing studies how to understand human, device, and environmental states from multiple sources of information. A single sensor usually sees only one side of a scene, while wireless signals, millimeter-wave radar, vision, and other sensors describe the same target from different angles. The group aims to build more stable, continuous, and deployable sensing capabilities through multi-source data collection, feature modeling, and collaborative fusion.",
      },
      summary: {
        label: { zh: "重点任务", en: "Core tasks" },
        text: {
          zh: "本方向聚焦多源感知数据融合，面向人体定位、生理与行为感知、人体姿态估计和环境感知四类任务开展研究，重点解决复杂室内场景中的信号干扰、模态差异、跨场景泛化和实时部署问题。",
          en: "This direction focuses on multi-source sensing-data fusion for human localization, physiological and behavioral sensing, human pose estimation, and environmental sensing, with attention to signal interference, modality gaps, cross-scene generalization, and real-time deployment.",
        },
      },
      sections: [
        {
          heading: { zh: "行业背景", en: "Industry background" },
          paragraphs: [
            {
              zh: "智能家居、智慧医疗、公共安全和移动机器人等场景都需要系统持续理解人体活动和周围环境。传统方法通常依赖单一传感器，信息来源有限，换到复杂环境后稳定性容易下降。例如，同一套模型在不同房间、不同设备位置或不同人群活动模式下，可能会出现明显的性能波动。",
              en: "Smart homes, healthcare, public safety, and mobile robotics all need systems that can continuously interpret human activities and surrounding environments. Methods based on a single sensor often have limited information and become less stable when the scene changes. A model that works in one room, with one device placement or one activity pattern, may degrade noticeably after the environment changes.",
            },
            {
              zh: "视觉传感器能提供外观、姿态和场景语义，但容易受到光照、遮挡和隐私需求的影响。无线信号覆盖范围广，不需要人体佩戴设备，也不依赖可见光，可以通过信道变化反映人体活动，但会受到空间结构、设备位置和多径传播的影响。毫米波雷达可以获得距离、速度、角度和点云信息，对光照不敏感，在复杂场景中适合与其他模态协同使用。",
              en: "Vision provides appearance, pose, and scene semantics, but can be affected by lighting, occlusion, and privacy requirements. Wireless sensing covers a broad area without wearable devices or visible light, but it is sensitive to room structure, device placement, and multipath propagation. Millimeter-wave radar provides range, velocity, angle, and point-cloud information. It is robust to lighting and works well when combined with other modalities.",
            },
            {
              zh: "多模态感知的价值不在于简单增加传感器数量，而在于研究不同信息之间如何对齐、互补和融合。某一种信息不稳定时，另一种信息可以补上；某一种传感器只能看到局部状态时，其他模态可以提供更完整的上下文。通过这种互补关系，系统可以从“单点判断”走向“联合理解”。",
              en: "The value of multimodal sensing is not simply adding more sensors. The core question is how different sources of information can be aligned, complemented, and fused so that the system remains stable when one modality is weak or incomplete. This complementary relationship allows the system to move from isolated detection toward joint scene understanding.",
            },
            {
              zh: "因此，多模态感知需要建立从数据采集、预处理、时空对齐、特征提取、信息融合到状态输出的完整链路。这个链路不仅决定算法能否获得有效信息，也决定系统能否在真实物联网场景中持续运行。",
              en: "A complete multimodal sensing pipeline therefore includes data acquisition, preprocessing, spatiotemporal alignment, feature extraction, information fusion, and state output. This pipeline determines not only whether the algorithm can obtain useful information, but also whether the system can operate continuously in real IoT environments.",
            },
          ],
        },
        {
          heading: { zh: "研究方向", en: "Research directions" },
          paragraphs: [
            {
              zh: "课题组依托 WiFi CSI、BFI、毫米波雷达、视觉传感器和移动机器人等实验平台，围绕人体定位、生理与行为感知、人体姿态估计和环境感知开展研究。相关工作强调实验平台、算法模型和应用任务之间的闭环：先从真实设备获取数据，再分析不同模态的优势与局限，最后面向具体任务设计融合方法。",
              en: "The group builds on WiFi CSI, BFI, millimeter-wave radar, vision sensors, and mobile robot platforms, with research covering human localization, physiological and behavioral sensing, human pose estimation, and environmental sensing. The work emphasizes a closed loop among experimental platforms, algorithmic models, and application tasks: collecting data from real devices, analyzing the strengths and limits of each modality, and then designing fusion methods for specific sensing tasks.",
            },
          ],
          focusList: [
            {
              no: "01",
              title: { zh: "人体定位", en: "Human localization" },
              paragraphs: [
                {
                  zh: "人体定位用于估计人员在室内空间中的位置和移动过程，是智能空间、人员管理、公共安全和移动服务的重要基础。课题组研究基于无线信号、毫米波雷达和多源感知信息的人体定位方法，通过分析人体对无线传播路径和雷达回波的影响，提取与位置相关的特征。",
                  en: "Human localization estimates where people are and how they move in indoor spaces. It is an important foundation for smart spaces, personnel management, public safety, and mobile services. The group studies methods based on wireless signals, millimeter-wave radar, and multimodal sensing data, extracting position-related features from radio propagation and radar echoes.",
                },
                {
                  zh: "该方向重点关注非视距传播、多径效应、空间结构变化、设备位置变化及人员活动带来的干扰，探索不同感知信息之间的互补机制，提高人体定位在不同环境和场景中的稳定性与适应能力。",
                  en: "This direction focuses on non-line-of-sight propagation, multipath effects, room-structure changes, device-placement changes, and interference caused by human activities. The goal is to use complementary sensing information to improve localization stability and adaptability across different environments.",
                },
              ],
            },
            {
              no: "02",
              title: { zh: "生理与行为感知", en: "Physiological and behavioral sensing" },
              paragraphs: [
                {
                  zh: "生理与行为感知关注呼吸、心跳、胸腔微动、手势、步态和日常活动等人体状态。呼吸、心跳等生理活动会带来细微的信号变化，手势、步态和日常活动则呈现出更明显的时间连续性和行为模式。",
                  en: "Physiological and behavioral sensing focuses on breathing, heartbeat, chest micro-motion, gestures, gait, and daily activities. Physiological states often produce subtle signal variations, while gestures and gait present clearer temporal patterns and behavioral structures.",
                },
                {
                  zh: "课题组关注弱信号提取、时序特征分析和状态识别，探索非接触式、连续化的人体状态感知方法。该方向将结合医学场景中的实际需求，研究复杂环境下生理信号与行为特征的稳定获取和协同分析。",
                  en: "The group works on weak-signal extraction, temporal feature analysis, and state recognition for contactless and continuous human-state sensing. This direction will be connected with practical medical needs to study stable acquisition and joint analysis of physiological and behavioral features in complex environments.",
                },
              ],
            },
            {
              no: "03",
              title: { zh: "人体姿态估计", en: "Human pose estimation" },
              paragraphs: [
                {
                  zh: "人体姿态估计需要从感知数据中判断人体空间结构、肢体状态和运动变化，是行为理解、健康辅助和人机交互等任务的重要基础。毫米波雷达可以提供目标的空间位置与运动信息，视觉传感器能够描述人体外观和关键部位，无线信号则可以反映人体活动对传播环境造成的整体影响。",
                  en: "Human pose estimation infers body structure, limb states, and motion changes from sensing data. It is important for behavior understanding, health assistance, and human-computer interaction. Millimeter-wave radar provides spatial and motion information, vision describes body appearance and key parts, and wireless signals reflect how human activity changes the propagation environment.",
                },
                {
                  zh: "课题组研究毫米波点云、视觉信息和无线信号之间的互补关系，用于提升复杂光照、局部遮挡和动态环境下的姿态估计能力。该方向关注如何把不同模态中的空间信息和运动信息统一到可学习、可解释的表示中。",
                  en: "The group studies how radar point clouds, vision, and wireless signals complement each other under difficult lighting, partial occlusion, and dynamic environments. This direction focuses on unifying spatial and motion information from different modalities into learnable and interpretable representations.",
                },
              ],
            },
            {
              no: "04",
              title: { zh: "环境感知", en: "Environmental sensing" },
              paragraphs: [
                {
                  zh: "环境感知关注空间中是否存在人员、人员数量、活动状态，以及视距和非视距等传播条件。相比只识别单个人体动作，环境感知更强调对空间整体状态的理解，需要同时考虑人员活动、设备位置、房间结构和动态干扰。",
                  en: "Environmental sensing considers occupancy, people counting, activity states, and line-of-sight or non-line-of-sight propagation conditions. Compared with recognizing a single human action, environmental sensing emphasizes the understanding of the whole space, including human activities, device positions, room structure, and dynamic interference.",
                },
                {
                  zh: "课题组分析人体活动、空间结构和设备部署方式对感知结果的影响，减少系统对固定环境的依赖。该方向将为智能空间和物联网系统提供持续、低干扰的环境理解能力。",
                  en: "The group studies how human activity, room structure, and device deployment affect sensing results, with the aim of reducing dependence on fixed environments. This direction will support continuous and low-intrusion environmental understanding for smart spaces and IoT systems.",
                },
              ],
            },
          ],
          aside: {
            title: { zh: "医工交叉合作", en: "Medical collaboration" },
            paragraph: {
              zh: "课题组将结合与江苏省人民医院的合作，探索多模态感知技术在人体生理状态、行为活动和健康相关信息分析中的应用。",
              en: "The group will combine its collaboration with Jiangsu Province Hospital to explore multimodal sensing for physiological states, behavioral activities, and health-related information analysis.",
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
              zh: "未来研究将关注多模态统一表征、大模型辅助场景理解、边缘部署与实时感知。无线信号、毫米波点云和视觉数据的结构差异很大，统一表征可以帮助系统在同一框架下理解不同模态之间的关系，使算法能够更好地处理模态缺失、设备变化和场景迁移。",
              en: "Future work will focus on unified multimodal representation, large-model-assisted scene understanding, edge deployment, and real-time sensing. Wireless signals, radar point clouds, and visual data have very different structures, so unified representations can help systems reason across heterogeneous sensing data and better handle missing modalities, device changes, and scene transfer.",
            },
            {
              zh: "在人工智能和大模型方向，课题组将关注多模态知识迁移、场景语义理解和复杂状态推理。感知系统不应只输出“有人”或“无人”等简单结果，还需要逐步理解人体活动、环境状态和场景变化之间的关系，为更复杂的智能决策提供支撑。",
              en: "In artificial intelligence and large-model directions, the group will study multimodal knowledge transfer, scene semantics, and complex state reasoning. A sensing system should not only output simple labels such as occupied or empty. It should gradually understand the relationships among human activities, environmental states, and scene changes, and support more complex intelligent decisions.",
            },
            {
              zh: "在边缘计算方向，研究将面向实际物联网设备的计算能力、通信开销和实时性需求，探索感知数据在终端、边缘节点与计算平台之间的协同处理方式，使智能感知方法能够更好地部署到真实应用环境中。",
              en: "In edge computing, the work will consider the compute capacity, communication cost, and latency requirements of real IoT devices, and explore collaborative processing among terminals, edge nodes, and computing platforms so that intelligent sensing methods can be deployed in practical environments.",
            },
            {
              zh: "通感一体化是多模态感知的重要延伸。无线信号不只承担数据通信，也可以用于人体、设备和环境状态感知。课题组将探索通信链路与感知任务之间的协同设计，在保证通信性能的同时提取有用的环境信息，推动通信系统从信息传输基础设施进一步发展为具备环境理解能力的智能系统。",
              en: "Integrated sensing and communication is a natural extension of multimodal sensing. Wireless signals can transmit data and also sense humans, devices, and environments. The group will study joint design of communication links and sensing tasks, extracting useful environmental information while maintaining communication performance.",
            },
          ],
        },
      ],
      publications: [
        {
          title: {
            zh: "毫米波-WiFi-红外一体化实时采集平台",
            en: "Millimeter-Wave, WiFi, and Infrared Integrated Real-Time Acquisition Platform",
          },
          meta: {
            zh: "Type：实验平台 · Direction：多模态感知",
            en: "Type: Experimental platform · Direction: Multimodal sensing",
          },
          description: {
            zh: "课题组开发了毫米波、WiFi 与红外的一体化实时采集平台，用于多源感知数据采集、同步观察和算法验证，为人体状态感知、呼吸检测和复杂场景实验提供平台支撑。",
            en: "The group has developed an integrated real-time acquisition platform combining millimeter-wave radar, WiFi, and infrared sensing. The platform supports multi-source data collection, synchronized observation, and algorithm validation for human-state sensing, respiratory detection, and complex-scene experiments.",
          },
          figure: {
            src: "/images/research/medeng/multimodal-realtime-platform.jpg",
            alt: {
              zh: "毫米波-WiFi-红外一体化实时采集平台实验现场",
              en: "Millimeter-wave, WiFi, and infrared integrated real-time acquisition platform",
            },
            caption: {
              zh: "毫米波-WiFi-红外一体化实时采集平台",
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
            zh: "Venue：IEEE Transactions on Mobile Computing · Year：2026",
            en: "Venue: IEEE Transactions on Mobile Computing · Year: 2026",
          },
          description: {
            zh: "该工作面向射频信号行为识别中的类别不平衡问题，提出注意力引导的上下文增强网络，从特征层面区分相似动作并缓解不平衡带来的决策边界偏差。",
            en: "This work addresses class imbalance in RF-based activity recognition and proposes an attention-guided context enhancement network to distinguish semantically similar actions and reduce imbalance-induced decision-boundary bias.",
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
            zh: "Venue：2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD), 4117-4122 · Year：2026",
            en: "Venue: 2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD), 4117-4122 · Year: 2026",
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
            zh: "Venue：2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD), 4098-4103 · Year：2026",
            en: "Venue: 2026 29th International Conference on Computer Supported Cooperative Work in Design (CSCWD), 4098-4103 · Year: 2026",
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
];

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
