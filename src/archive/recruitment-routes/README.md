# 招新路由归档

招新详情路由已恢复至 src/app，中英文任务页重新开放。
“加入我们”继续保留研究生优先的交流与报考说明、负责人邮箱和新生起步指南。

此前中英文医工、灾害任务页的四条临时跳转已从 vercel.json 移除；
历史 research/pain 到 research/disaster 的重定向继续保留。

以后关闭或恢复时，需要同步路由文件、vercel.json、sitemap、src/data/join.ts 的状态和页面入口。
当前验证：先执行 npm run build，再运行 node scripts/qa-join-open.mjs。
开放任务页并不代表已公布新一轮截止日期或名额，具体安排仍按负责人通知。
