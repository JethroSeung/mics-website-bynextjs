/**
 * 成员数据（单一数据源：/team 全列表 + 首页精选）
 * 迁移自旧站 team.html / en/team.html（8 研究生 + 27 本科生 = 35 人）
 * 照片文件在任务 5 迁入 public/images/members/
 */

export type Role = "master" | "undergraduate";
export type Direction = "pain" | "medeng" | "general";

export interface Member {
  /** 拼音标识（与照片文件名一致） */
  id: string;
  name: { zh: string; en: string };
  role: Role;
  /** null = 旧站"待补充" */
  email: string | null;
  photo: string;
  /** 是否出现在首页精选（旧站首页 8 人） */
  featured: boolean;
  /** 研究方向负责人（需求文档 §5 确认：杨承轩-pain、张栩闻-medeng） */
  directionLead?: Exclude<Direction, "general">;
}

export const PLACEHOLDER_AVATAR = "/images/members/member-placeholder.svg";

export const members: Member[] = [
  // ===== 研究生（8）=====
  {
    id: "liu-jiaming",
    name: { zh: "刘佳铭", en: "Jiaming Liu" },
    role: "master",
    email: "1224045634@njupt.edu.cn",
    photo: "/images/members/liu-jiaming.jpg",
    featured: true,
  },
  {
    id: "liu-hexin",
    name: { zh: "刘何鑫", en: "Hexin Liu" },
    role: "master",
    email: "b21030920@163.com",
    photo: "/images/members/liu-hexin.jpg",
    featured: true,
  },
  {
    id: "zhang-fuwei",
    name: { zh: "张福伟", en: "Fuwei Zhang" },
    role: "master",
    email: "Zhangfwfw@outlook.com",
    photo: "/images/members/zhang-fuwei.jpg",
    featured: true,
  },
  {
    id: "yuan-quan",
    name: { zh: "袁权", en: "Quan Yuan" },
    role: "master",
    email: "yuanquan2777800769@163.com",
    photo: "/images/members/yuan-quan.jpg",
    featured: false,
  },
  {
    id: "wen-yuhang",
    name: { zh: "文宇航", en: "Yuhang Wen" },
    role: "master",
    email: "wyh1265456537@163.com",
    photo: "/images/members/wen-yuhang.jpg",
    featured: false,
  },
  {
    id: "xu-bo",
    name: { zh: "徐博", en: "Bo Xu" },
    role: "master",
    email: "mountqingxubo@outlook.com",
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "ma-rui",
    name: { zh: "马蕊", en: "Rui Ma" },
    role: "master",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "dou-jiangnan",
    name: { zh: "豆江南", en: "Jiangnan Dou" },
    role: "master",
    email: "doujiangn@163.com",
    photo: "/images/members/dou-jiangnan.jpg",
    featured: false,
  },

  // ===== 本科生（27）=====
  {
    id: "lu-zijian",
    name: { zh: "陆梓健", en: "Zijian Lu" },
    role: "undergraduate",
    email: "18818732360@163.com",
    photo: "/images/members/lu-zijian.jpg",
    featured: true,
  },
  {
    id: "jin-chuwei",
    name: { zh: "金楚惟", en: "Chuwei Jin" },
    role: "undergraduate",
    email: "b24013021@njupt.edu.cn",
    photo: PLACEHOLDER_AVATAR,
    featured: true,
  },
  {
    id: "zhang-xuwen",
    name: { zh: "张栩闻", en: "Xuwen Zhang" },
    role: "undergraduate",
    email: "barcaxu@outlook.com",
    photo: "/images/members/zhang-xuwen.jpg",
    featured: true,
    directionLead: "medeng",
  },
  {
    id: "qiao-xiaoxiao",
    name: { zh: "谯霄霄", en: "Xiaoxiao Qiao" },
    role: "undergraduate",
    email: "b24041308@njupt.edu.cn",
    photo: "/images/members/qiao-xiaoxiao.jpg",
    featured: true,
  },
  {
    id: "gu-yuxuan",
    name: { zh: "顾语轩", en: "Yuxuan Gu" },
    role: "undergraduate",
    email: "gulynn605@gmail.com",
    photo: "/images/members/gu-yuxuan.jpg",
    featured: true,
  },
  {
    id: "song-jiasheng",
    name: { zh: "宋嘉晟", en: "Jiasheng Song" },
    role: "undergraduate",
    email: "jethrosong@163.com",
    photo: "/images/members/song-jiasheng.jpg",
    featured: true,
  },
  {
    id: "ma-kai",
    name: { zh: "马凯", en: "Kai Ma" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "wang-yuehan",
    name: { zh: "王悦涵", en: "Yuehan Wang" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "jiang-shixu",
    name: { zh: "蒋十旭", en: "Shixu Jiang" },
    role: "undergraduate",
    email: "B25040902@njupt.edu.cn",
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "wu-zeyuan",
    name: { zh: "吴泽原", en: "Zeyuan Wu" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "gong-weile",
    name: { zh: "龚玮乐", en: "Weile Gong" },
    role: "undergraduate",
    email: "phare111@163.com",
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "qiu-rui",
    name: { zh: "邱锐", en: "Rui Qiu" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "li-junchen",
    name: { zh: "李俊辰", en: "Junchen Li" },
    role: "undergraduate",
    email: "lcy645200@163.com",
    photo: "/images/members/li-junchen.jpg",
    featured: false,
  },
  {
    id: "wang-yihan",
    name: { zh: "王怡涵", en: "Yihan Wang" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "yang-chengxuan",
    name: { zh: "杨承轩", en: "Chengxuan Yang" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
    directionLead: "pain",
  },
  {
    id: "zhang-xuanming",
    name: { zh: "张轩鸣", en: "Xuanming Zhang" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "chen-yutong",
    name: { zh: "陈语瞳", en: "Yutong Chen" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "zhao-jiayi",
    name: { zh: "赵佳怡", en: "Jiayi Zhao" },
    role: "undergraduate",
    email: "15819806009@163.com",
    photo: "/images/members/zhao-jiayi.jpg",
    featured: false,
  },
  {
    id: "li-jiale",
    name: { zh: "李家乐", en: "Jiale Li" },
    role: "undergraduate",
    email: "b25011115@njupt.edu.cn",
    photo: "/images/members/li-jiale.jpg",
    featured: false,
  },
  {
    id: "chen-qing",
    name: { zh: "陈清", en: "Qing Chen" },
    role: "undergraduate",
    email: "b24042205@outlook.com",
    photo: "/images/members/chen-qing.jpg",
    featured: false,
  },
  {
    id: "peng-wanting",
    name: { zh: "彭婉婷", en: "Wanting Peng" },
    role: "undergraduate",
    email: "B25040308@njupt.edu.cn",
    photo: "/images/members/peng-wanting.jpg",
    featured: false,
  },
  {
    id: "chen-tuoyu",
    name: { zh: "陈拓宇", en: "Tuoyu Chen" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "guo-anyou",
    name: { zh: "郭桉佑", en: "Anyou Guo" },
    role: "undergraduate",
    email: null,
    photo: PLACEHOLDER_AVATAR,
    featured: false,
  },
  {
    id: "xu-zishen",
    name: { zh: "徐子申", en: "Zishen Xu" },
    role: "undergraduate",
    email: "b23041126@njupt.edu.cn",
    photo: "/images/members/xu-zishen.jpg",
    featured: false,
  },
  {
    id: "dai-yujia",
    name: { zh: "代宇佳", en: "Yujia Dai" },
    role: "undergraduate",
    email: "zoeydai.cn@gmail.com",
    photo: "/images/members/dai-yujia.jpg",
    featured: false,
  },
  {
    id: "yu-haoming",
    name: { zh: "于皓名", en: "Haoming Yu" },
    role: "undergraduate",
    email: "b24011007@njupt.edu.cn",
    photo: "/images/members/yu-haoming.jpg",
    featured: false,
  },
  {
    id: "xue-qianyi",
    name: { zh: "薛谦益", en: "Qianyi Xue" },
    role: "undergraduate",
    email: "b24040527@njupt.edu.cn",
    photo: "/images/members/xue-qianyi.jpg",
    featured: false,
  },
];

/** 首页精选成员（旧站首页顺序：3 研究生 + 5 本科生） */
export const featuredMembers: Member[] = members.filter((m) => m.featured);

/** 按角色分组（/team 页渲染用），顺序与数据文件一致 */
export function getMembersByRole(role: Role): Member[] {
  return members.filter((m) => m.role === role);
}

/** 按 id 查成员（研究方向负责人关联） */
export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

/** 校验：研究方向负责人必须存在 */
function assertLeadsExist() {
  const leads = members.filter((m) => m.directionLead);
  if (leads.length !== 2) {
    throw new Error(`预期 2 位方向负责人，实际 ${leads.length}`);
  }
}
assertLeadsExist();
