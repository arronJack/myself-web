# 郑志能 · 个人站点与在线简历

> 纯静态、数据驱动的个人站点 + 在线简历。
> 在线访问 👉 **https://arronjack.github.io/myself-web/**

## 关于我

**郑志能**（ID：`arron_zheng`）· 广东佛山

AI 产品 / 全栈工程师 / 独立开发者，专注**认知智能体（Cognitive Agent）**的工程化落地。
从自研认知引擎 **PASM**，到桌面智能体、教育 SaaS、防伪溯源与量化系统，擅长把「会思考、有记忆」的智能体做成可发布、可运维的软件。

- GitHub：[arronJack](https://github.com/arronJack)  ·  Gitee：[arronzheng](https://gitee.com/arronzheng)
- 技术栈：**Python / Java（Spring Boot + Vue）/ PHP（Laravel）**，熟悉 Electron、WebGL、微信小程序、PySide6 桌面应用、RAG 与智能体工程。

## 站点内容

| 页面 | 说明 |
|------|------|
| `index.html` | 首页：关于、技能、精选项目、履历时间线、博客预览、扫码联系 |
| `resume.html` | 在线简历（可「打印 / 另存 PDF」直接导出） |
| `projects.html` | 项目作品全集（数据驱动，可持续增改） |
| `blog.html` | 技术博客入口与文章详情 |

所有内容由 `assets/data/projects.js` 与 `assets/data/posts.js` 驱动，**新增项目 / 文章只需改数据文件**，无需改动页面。

## 核心项目

- **PASM 认知智能体引擎** —— 自研认知底座（记忆 / 事实 / 世界模型 / 规划 / 工具链），衍生 PASM Studio（小U）、BlackWarrior、pasm-skills / agents / framework（已上架 PyPI）等系列。
- **霖云智学（AIstudy）** —— 多租户 AI 学习系统（FastAPI + Vue3）：OCR 批改、考试预测、学生画像、信奥 OJ。
- **金管家** —— 防伪溯源查询系统（Spring Boot 2.7.18 + MyBatis-Plus + MySQL + JWT + Vue3），已落地江西华硕陶瓷集团。
- **居索平台（ijusuo.com）** —— Laravel 单体门户，正以 Spring Cloud Alibaba 微服务重构。
- **YAKE WebChat** —— 微信小程序 + Spring Boot 后端的一体化小程序（含 admin / seller 双后台）。
- **口播视频生成智能体技能包** —— 数字人 / 口播视频生成，可打包上架 ClawHub。
- 更多见 [项目页](https://arronjack.github.io/myself-web/projects.html)。

## 本地预览

```bash
# 任意静态服务器即可，例如：
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 部署

本站为纯静态文件，部署到 GitHub Pages：将本仓库内容推送到 `main` 分支根目录，开启 Pages（分支构建）即可。
联系信息通过 vCard 二维码（`assets/img/contact-qr.svg`）对外，明文电话 / 邮箱不公开。

---

© 2026 郑志能 · 个人站点与简历
