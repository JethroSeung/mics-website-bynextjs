/**
 * 成员数据（单一数据源：/team 全列表 + 首页精选）
 * 初始数据迁移自旧站 team.html / en/team.html，后续随成员变动更新
 * 照片文件在任务 5 迁入 public/images/members/
 */

export type Role = "master" | "undergraduate";
export type Direction = "disaster" | "medeng" | "general";

export interface Member {
  /** 拼音标识（与照片文件名一致） */
  id: string;
  name: { zh: string; en: string };
  role: Role;
  /** null = 旧站"待补充" */
  email: string | null;
  photo: string;
  /** 是否出现在首页精选（首页 4×4 共 16 人：8 研究生 + 8 本科生） */
  featured: boolean;
  /** 研究方向负责人（需求文档 §5 确认：杨承轩-disaster、张栩闻-medeng） */
  directionLead?: Exclude<Direction, "general">;
}

export const PLACEHOLDER_AVATAR = "/images/members/member-placeholder.svg";

export const members: Member[] = [
  // ===== 研究生（8，全部上首页精选）=====
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
    photo: "/images/members/liu-hexin.webp",
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
    featured: true,
  },
  {
    id: "wen-yuhang",
    name: { zh: "文宇航", en: "Yuhang Wen" },
    role: "master",
    email: "wyh1265456537@163.com",
    photo: "/images/members/wen-yuhang.jpg",
    featured: true,
  },
  {
    id: "xu-bo",
    name: { zh: "徐博", en: "Bo Xu" },
    role: "master",
    email: "mountqingxubo@outlook.com",
    photo: "/images/members/xu-bo.jpg",
    featured: true,
  },
  {
    id: "ma-rui",
    name: { zh: "马蕊", en: "Rui Ma" },
    role: "master",
    email: "3305372418@qq.com",
    photo: "/images/members/ma-rui.jpg",
    featured: true,
  },
  {
    id: "dou-jiangnan",
    name: { zh: "豆江南", en: "Jiangnan Dou" },
    role: "master",
    email: "doujiangn@163.com",
    photo: "/images/members/dou-jiangnan.jpg",
    featured: true,
  },

  // ===== 本科生 =====
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
    photo: "/images/members/jin-chuwei.jpg",
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
    email: "mk15598060419@outlook.com",
    photo: "/images/members/ma-kai.jpg",
    featured: true,
  },
  {
    id: "wang-yuehan",
    name: { zh: "王悦涵", en: "Yuehan Wang" },
    role: "undergraduate",
    email: "wyhwkwl@gmail.com",
    photo: "/images/members/wang-yuehan.jpg",
    featured: false,
  },
  {
    id: "jiang-shixu",
    name: { zh: "蒋十旭", en: "Shixu Jiang" },
    role: "undergraduate",
    email: "shixuj@acm.org",
    photo: "/images/members/jiang-shixu.webp",
    featured: false,
  },
  {
    id: "wu-zeyuan",
    name: { zh: "吴泽原", en: "Zeyuan Wu" },
    role: "undergraduate",
    email: "B24040512@njupt.edu.cn",
    photo: "/images/members/wu-zeyuan.jpg",
    featured: false,
  },
  {
    id: "gong-weile",
    name: { zh: "龚玮乐", en: "Weile Gong" },
    role: "undergraduate",
    email: "phare111@163.com",
    photo: "/images/members/gong-weile.webp",
    featured: false,
  },
  {
    id: "qiu-rui",
    name: { zh: "邱锐", en: "Rui Qiu" },
    role: "undergraduate",
    email: "19881608170@163.com",
    photo: "/images/members/qiu-rui.webp",
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
    email: "B25040902@njupt.edu.cn",
    photo: "/images/members/wang-yihan.jpg",
    featured: false,
  },
  {
    id: "yang-chengxuan",
    name: { zh: "杨承轩", en: "Chengxuan Yang" },
    role: "undergraduate",
    email: "ycxuan4work@gmail.com",
    photo: "/images/members/yang-chengxuan.webp",
    featured: true,
    directionLead: "disaster",
  },
  {
    id: "zhang-xuanming",
    name: { zh: "张轩鸣", en: "Xuanming Zhang" },
    role: "undergraduate",
    email: "zhangxuanming7@163.com",
    photo: "/images/members/zhang-xuanming.webp",
    featured: false,
  },
  {
    id: "chen-yutong",
    name: { zh: "陈语瞳", en: "Yutong Chen" },
    role: "undergraduate",
    email: "2965886547@qq.com",
    photo: "/images/members/chen-yutong.jpg",
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
    id: "chen-tuoyu",
    name: { zh: "陈拓宇", en: "Tuoyu Chen" },
    role: "undergraduate",
    email: "chentuoyu1@outlook.com",
    photo: "/images/members/chen-tuoyu.jpg",
    featured: false,
  },
  {
    id: "guo-anyou",
    name: { zh: "郭桉佑", en: "Anyou Guo" },
    role: "undergraduate",
    email: "15371023110@139.com",
    photo: "/images/members/guo-anyou.jpg",
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
  // 2026 年新增本科生成员
  {
    id: "zhang-jiashu",
    name: { zh: "张佳舒", en: "Jiashu Zhang" },
    role: "undergraduate",
    email: "zhangjiashu6672@outlook.com",
    photo: "/images/members/zhang-jiashu.webp",
    featured: false,
  },
  {
    id: "feng-tianyu",
    name: { zh: "冯天煜", en: "Tianyu Feng" },
    role: "undergraduate",
    email: "3080315330@qq.com",
    photo: "/images/members/feng-tianyu.jpg",
    featured: false,
  },
  {
    id: "lan-yifei",
    name: { zh: "兰一菲", en: "Yifei Lan" },
    role: "undergraduate",
    email: "b26010601@njupt.edu.cn",
    photo: "/images/members/lan-yifei.webp",
    featured: false,
  },
  {
    id: "fang-juanran",
    name: { zh: "房隽冉", en: "Juanran Fang" },
    role: "undergraduate",
    email: "13020080319@wo.cn",
    photo: "/images/members/fang-juanran.webp",
    featured: false,
  },
  {
    id: "zha-xinhan",
    name: { zh: "查昕含", en: "Xinhan Zha" },
    role: "undergraduate",
    email: "b25010405@njupt.edu.cn",
    photo: "/images/members/zha-xinhan.webp",
    featured: false,
  },
  {
    id: "xu-ziyi",
    name: { zh: "徐子奕", en: "Ziyi Xu" },
    role: "undergraduate",
    email: "xuziyi080826@gmail.com",
    photo: "/images/members/xu-ziyi.webp",
    featured: false,
  },
  {
    id: "huan-tianhao",
    name: { zh: "宦天昊", en: "Tianhao Huan" },
    role: "undergraduate",
    email: "lazarus_mission@outlook.com",
    photo: "/images/members/huan-tianhao.jpg",
    featured: false,
  },
  {
    id: "cao-sihan",
    name: { zh: "曹思涵", en: "Sihan Cao" },
    role: "undergraduate",
    email: "b26042104@njupt.edu.cn",
    photo: "/images/members/cao-sihan.webp",
    featured: false,
  },
  {
    id: "yin-minghui",
    name: { zh: "尹明辉", en: "Minghui Yin" },
    role: "undergraduate",
    email: "hopehope0723@qq.com",
    photo: "/images/members/yin-minghui.webp",
    featured: false,
  },
  {
    id: "chen-pengpeng",
    name: { zh: "陈鹏鹏", en: "Pengpeng Chen" },
    role: "undergraduate",
    email: "b25060321@njupt.edu.cn",
    photo: "/images/members/chen-pengpeng.webp",
    featured: false,
  },
  {
    id: "feng-siying",
    name: { zh: "冯思颖", en: "Siying Feng" },
    role: "undergraduate",
    email: "3428316475@qq.com",
    photo: "/images/members/feng-siying.webp",
    featured: false,
  },
  {
    id: "che-jiahao",
    name: { zh: "车加豪", en: "Jiahao Che" },
    role: "undergraduate",
    email: "3058616963@qq.com",
    photo: "/images/members/che-jiahao.jpg",
    featured: false,
  },
  {
    id: "zhang-yinan",
    name: { zh: "张忆楠", en: "Yinan Zhang" },
    role: "undergraduate",
    email: "672409501@qq.com",
    photo: "/images/members/zhang-yinan.webp",
    featured: false,
  },
  {
    id: "zhou-tao",
    name: { zh: "周涛", en: "Tao Zhou" },
    role: "undergraduate",
    email: "McGradyJay1@gmail.com",
    photo: "/images/members/zhou-tao.webp",
    featured: false,
  },
  {
    id: "wu-yuecheng",
    name: { zh: "吴悦诚", en: "Yuecheng Wu" },
    role: "undergraduate",
    email: "2409876868@qq.com",
    photo: "/images/members/wu-yuecheng.webp",
    featured: false,
  },
];

/** 首页精选成员（16 人：8 研究生全部 + 指定本科生 8 人，顺序与数据文件一致） */
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
