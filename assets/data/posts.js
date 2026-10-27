/* 博客文章数据 —— 后期新增文章直接往这里加对象即可
   body 为 HTML 字符串，支持 <p> <h4> <ul><li> <pre><code> 等标签
*/
window.POSTS = [
  {
    id: "pasm-19-layer",
    date: "2026-10",
    title: "从零构建认知智能体引擎：PASM 的 19 层认知栈",
    excerpt: "为什么我放弃“一个大 Prompt”路线，转而把记忆、事实、世界模型、规划拆成可独立验证的层次？复盘 PASM V2 的架构取舍。",
    tag: "架构",
    body:
      '<p>做智能体一年下来，我最深的体会是：<strong>“一个超长 System Prompt + 工具调用”在 Demo 阶段很香，但一旦进入真实业务，就会迅速塌方</strong>——幻觉、遗忘、无法自我纠错、行为不可解释。</p>' +
      '<p>PASM 的出发点，是把“认知”当成一套可以分层、可以逐层验证的系统来建，而不是一个黑箱。V2.0 我把它收敛成 19 层认知栈，大致分四组：</p>' +
      '<ul>' +
      '<li><b>感知与编码层</b>：把对话 / 文档 / 观测编码成统一的心智状态。</li>' +
      '<li><b>记忆与事实层</b>：工作记忆、长期记忆、向量记忆，以及一层“事实层”——关键事实走标签直查，命中率 100%，不被闲聊挤掉。</li>' +
      '<li><b>世界模型与规划层</b>：维护一个轻量世界模型，让规划器能在“脑内”推演而不是盲试。</li>' +
      '<li><b>执行与守卫层</b>：动作池、回复模板、以及边界守卫（BoundaryGuard）做安全与一致性兜底。</li>' +
      '</ul>' +
      '<p>关键设计纪律是：<strong>每一层都能独立跑测试</strong>。比如事实层有 selftest，记忆路由有回归，规划器有可重放的推演轨迹。这让我能在不碰上层的情况下，单独把“记忆会不会丢”“情绪会不会漂”这类问题查清楚。</p>' +
      '<p>一句话总结：与其赌一个模型变强，不如把认知拆解成可验证的层次，让“可靠”成为结构属性，而不是运气。</p>'
  },
  {
    id: "local-llm-slow",
    date: "2026-09",
    title: "本地大模型为什么“变慢”：一次 Ollama 性能诊疗实录",
    excerpt: "显存装不下、思考链偷跑、冷加载——三个让本地模型从 16 tok/s 掉到 6 tok/s 的真凶，以及对应调优清单。",
    tag: "性能",
    body:
      '<p>BlackWarrior 早期接入本地 Ollama 时，首问要等一分钟，生成只有 6 tok/s。我按“先量再改”的原则，定位到三个真凶：</p>' +
      '<h4>1. 显存装不下，悄悄走 CPU 卸载</h4>' +
      '<p>模型权重 + KV cache 超过显存后，Ollama 会把部分层卸载到内存，速度直接腰斩。用 <code>nvidia-smi</code> 看一眼显存占用就清楚了。</p>' +
      '<h4>2. 思考链（CoT）在“非推理模型”上也偷跑</h4>' +
      '<p>有些客户端默认塞一段很长的思维链前缀，普通模型也会跟着啰嗦。显式约束输出长度与格式，tok 数立刻下来。</p>' +
      '<h4>3. 冷加载：第一次请求要等模型映射</h4>' +
      '<p>进程没常驻时，首个请求要现场 mmap 权重。改成常驻 + 预热一次，首问从 60s 降到 2s 内。</p>' +
      '<p>调优后稳定在 16 tok/s 左右。结论：本地模型的“慢”几乎都能归因到资源与配置，不是模型本身不行。</p>'
  },
  {
    id: "ai-study-agent",
    date: "2026-08",
    title: "做一款多租户 AI 学习系统：学生专属智能体怎么落地",
    excerpt: "霖云智学的设计决策：一人一智能体、知识图谱+策略模板、数据飞轮、奥数进阶与考试预测三源融合。",
    tag: "产品",
    body:
      '<p>霖云智学（学习网）是我把 PASM 思路用到教育场景的一次完整落地。核心决策有四条：</p>' +
      '<ul>' +
      '<li><b>一人一智能体</b>：每个学生自动实例化一个专属智能体，记住他的学科、进度、错题与偏好，而不是共用一个通用助教。</li>' +
      '<li><b>三轨学科</b>：校内 11 科 + 奥数 + 信奥，学习程序按轨道自动创建。</li>' +
      '<li><b>考试预测 v2 三源融合</b>：成绩序列 + 学生画像特征 + 学习习惯，输出不仅是分数预测，还有备考建议。</li>' +
      '<li><b>数据飞轮</b>：作答 / 浏览 / 对话 / 提交全链路埋点（StudyLog），反哺画像与量化分析引擎。</li>' +
      '</ul>' +
      '<p>技术上用 Python FastAPI + Vue3，鉴权走 JWT + RBAC，五端门户（学生 / 家长 / 教师 / 校管 / 超管）共用同一套数据与智能体底座。信奥 OJ 用本地 C++ 判题，支持 AC/WA/TLE/RE/CE。</p>'
  },
  {
    id: "pasm-pypi-release",
    date: "2026-07",
    title: "把智能体变成 pip 包：pasm-skills / pasm-agents 的发布流水线",
    excerpt: "基座与成品分离、entry points 自动发现、PyPI 三包协同发布的踩坑与固化经验。",
    tag: "工程",
    body:
      '<p>为了让“别人下载基座就能造自己的智能体”，我把 PASM 拆成了三个可独立发布的 PyPI 包：</p>' +
      '<ul>' +
      '<li><code>pasm-skills</code>：基座 SDK（BaseAgent + 认知能力），<code>pip install</code> 即可。</li>' +
      '<li><code>pasm-agents</code>：成品智能体集，依赖基座，装完经 entry points 自动被基座发现。</li>' +
      '<li><code>pasm-framework</code>：应用框架（防腐层），统一 Engine API。</li>' +
      '</ul>' +
      '<p>关键约定：<strong>基座与成品版本号对齐</strong>（都 0.x.0），一眼看出配套关系；entry points 让成品“即插即用”，不用手动注册。</p>' +
      '<p>踩过最大的坑是 Gitee 建仓“传 private:false 仍建私库、空仓不能改公开”，以及 Release 附件 1GB 配额超限。这些我都固化成了发布检查清单，现在发版基本一次过。</p>'
  },
  {
    id: "jusuo-microservice",
    date: "2026-06",
    title: "把 Laravel 单体重构成 Spring Cloud：居索平台的绞杀者之路",
    excerpt: "3226 条路由映射、不合理点清单、JDK17 + Nacos + Gateway 的 10 服务拆分，以及“先试点再核心域”的落地顺序。",
    tag: "架构",
    body:
      '<p>居索（ijusuo.com）原本是一个 Laravel 5.5 单体，承载品牌门户、商学院、设计师、画册、产品等模块。要上量又不想推倒重来，我选了<strong>绞杀者（Strangler Fig）模式</strong>。</p>' +
      '<h4>先做“深度剖析”</h4>' +
      '<p>我把原站 3226 条路由映射全部梳理出来，列出不合理点清单，作为拆分依据。这一步很枯燥，但决定了后面不走弯路。</p>' +
      '<h4>技术栈与落地顺序</h4>' +
      '<ul>' +
      '<li><b>P0</b>：基建 + 网关（Spring Cloud Gateway）+ 认证（多角色 JWT）+ 样板服务。</li>' +
      '<li><b>P1</b>：最独立、读多写少的 <code>cms-service</code>（门户内容）与 <code>file-service</code>（文件 / OSS）试点，同时修掉遗留的白名单 401、OSS 空串启动炸等问题。</li>' +
      '<li><b>P2</b>：核心域 <code>user-org</code> / <code>product</code> / <code>rbac</code> / <code>album</code> / <code>designer</code> 服务落地。</li>' +
      '</ul>' +
      '<p>鉴权模型对应 Laravel 的四端（平台 / 品牌商 / 经销商 / 业主）：网关做 JWT 全局过滤并注入身份头，各服务二次校验防直连，<code>@RequireRole</code> 做角色准入。本地无需 Nacos 也能跑（H2 自动建表 + 种子数据）。</p>'
  },
  {
    id: "zhichuangdao",
    date: "2026-05",
    title: "智创岛：给 AI 创业 / 副业人群做一本“活指南”",
    excerpt: "从《AI 兼职创业指南平台方案》到一个真实产品：React 19 + Vite 前端、Python 后端、软著申请材料的一次性梳理。",
    tag: "产品",
    body:
      '<p>智创岛的定位很朴素：把“AI 时代怎么搞副业 / 创业”从零散经验，沉淀成一个可查、可对接的平台。它不是又一个小工具，而是一套<strong>指南 + 对接</strong>的产品。</p>' +
      '<p>工程上我选了能快速出活的组合：</p>' +
      '<ul>' +
      '<li>前端 <b>React 19 + TypeScript + Vite</b>，组件化、类型安全、热更新快。</li>' +
      '<li>后端 <b>Python（FastAPI / SQLAlchemy，Alembic 迁移）</b>，与我在 PASM 上的积累直接复用。</li>' +
      '<li>配套 <b>infra</b> 与 admin 后台，方便后续运营。</li>' +
      '</ul>' +
      '<p>顺手把<strong>软件著作权申请材料</strong>一次性整理齐：使用说明（HTML / PDF）、源程序鉴别材料、申请表填写模板。产品化和合规一起走，省得后面补。</p>'
  }
];

/* CSDN 专栏 —— 后期新增专栏往这里加对象即可
   url 暂时用 CSDN 搜索占位（可直接访问），请把 url 换成你的真实专栏地址
*/
window.COLUMNS = [
  {
    icon: "🐍",
    title: "《python玩转AI》",
    meta: "CSDN 专栏 · Python × AI 实战",
    desc: "从环境搭建、数据处理到模型调用与智能体开发，用 Python 把 AI 真正玩起来：可复现的代码、踩坑笔记与工程化经验。",
    url: "https://so.csdn.net/so/search?q=python%E7%8E%A9%E8%BD%ACAi"
  },
  {
    icon: "🤖",
    title: "《AI智能体实战从0到1：Manus等多平台与多智能体协同》",
    meta: "CSDN 专栏 · 多智能体协同",
    desc: "拆解 Manus 等多平台智能体的设计思路，讲清多智能体如何分工、编排、协同与自验证；结合 PASM 实战，带你从 0 到 1 造出能落地的智能体系统。",
    url: "https://so.csdn.net/so/search?q=AI%E6%99%BA%E8%83%BD%E4%BD%93%E5%AE%9E%E6%88%98%E4%BB%8E0%E5%88%B01"
  }
];
