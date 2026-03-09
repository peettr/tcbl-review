# TCBL Interactive Review — 项目规划

## 论文信息
- **标题**: An overview of modeling tropical cyclone boundary layer (TCBL): From meteorological perspectives to wind engineering applications
- **作者**: Liang Hu & Ahsan Kareem
- **期刊**: Advances in Wind Engineering (Elsevier, Open Access)
- **DOI**: 10.1016/j.awe.2025.100097
- **PII**: S2950601825000685
- **规模**: 601段正文, 123张图, 123个公式, ~198篇参考文献, ~17万字符

---

## 项目目标
建立一个**交互式学术发布平台**，将传统PDF综述转化为多模态交互体验。
作为paradigm的第一篇试点，建立可复用模板。

---

## 七大模块

### 模块1：交互式文章（核心）
**功能**：中英文双语、章节导航、浮动目录、响应式布局
**技术**：
- Quarto / Next.js 生成静态网站
- i18n 国际化（中/英切换按钮）
- 侧边栏目录（随滚动高亮当前章节）
- 图片懒加载、公式渲染（KaTeX/MathJax）
- 参考文献悬浮预览（hover显示引用详情）

**内容结构**（6大章）：
```
1. Introduction (PBWE, 多尺度框架, TCBL定义)
2. Full-physics TCBL models (WRF-ARW, HWRF, HWCM)
3. Diagnostic models (轴对称, 参数, 解析, 2D-slab, 3D非线性)
4. Data-driven methods (剖面修正, POD)
5. NatHaz systematic investigation
6. Concluding remarks
```

**工作量**：⭐⭐⭐⭐ (最大，需转换全文+图+公式)

---

### 模块2：行内批注评论系统
**功能**：读者选中任意文字即可添加匿名评论
**技术方案**（三选一）：
- **Hypothesis (自部署)** — 最成熟，学术圈广泛使用，支持匿名
- **Artalk** — 国产开源，支持匿名，但只支持页面底部评论
- **自定义方案** — 基于Web Annotation标准开发

**推荐**：Hypothesis 自部署版（解决国内访问问题）
- 部署在腾讯云/阿里云轻量服务器
- 前端一行JS嵌入

**工作量**：⭐⭐

---

### 模块3：在线PPT
**功能**：文章核心内容的演示文稿版，可在线浏览
**技术**：
- Quarto + Reveal.js（从同一内容源生成）
- 或 SliDev（Markdown → 幻灯片）
- 嵌入网站，点击"Slides"标签页打开

**内容**：约30-40页幻灯片
- 每章提炼3-5页
- 重点图表直接引用
- 模型对比表格

**工作量**：⭐⭐

---

### 模块4：交互式思维导图
**功能**：展示TCBL模型分类体系的层次结构，可缩放/折叠
**技术**：
- **Markmap**（Markdown → 交互式思维导图，最简单）
- 或 D3.js 自定义树状图

**内容结构**：
```
TCBL Models
├── Full-physics
│   ├── WRF-ARW
│   ├── HWRF
│   └── HWCM
├── Diagnostic
│   ├── Axisymmetric
│   ├── Parametric (Empirical)
│   ├── Parametric (Analytical)
│   ├── 2D-slab
│   ├── 2D hybrid
│   └── 3D nonlinear (KW01, Y08)
└── Data-driven
    ├── Profile modification
    ├── Asymmetry introduction
    └── POD-based
```

**工作量**：⭐

---

### 模块5：文献分析可视化
**功能**：198篇参考文献的引用网络、时间分布、主题聚类
**技术**：
- 提取所有参考文献DOI
- Semantic Scholar / OpenAlex API 获取引用关系
- D3.js / Vis.js 绘制引用网络图
- 可交互：点击节点查看论文详情

**可视化类型**：
1. **引用网络图** — 节点=论文，边=引用关系，大小=被引次数
2. **时间线** — 按年份分布，看研究趋势
3. **主题聚类** — 按模型类型/方法着色

**工作量**：⭐⭐⭐

---

### 模块6：AI智能体（菲菲分身）
**功能**：右下角聊天气泡，读者可以问关于文章的任何问题
**技术方案**：
- **Coze（扣子）** ⭐推荐 — 字节跳动，国内友好，免费
  - 上传文章全文作为知识库
  - 设定人设："菲菲🐱，TCBL综述的研究助手"
  - 生成嵌入代码，放入网页
- **Dify** — 开源自部署，更灵活但需要服务器
- **OpenClaw实例** — 最真实但成本高

**AI能力**：
- 回答文章内容问题（"WRF-ARW和HWRF的区别是什么？"）
- 解释公式和模型
- 推荐相关章节（"我对参数模型感兴趣，应该看哪个部分？"）
- 中英文双语回答

**工作量**：⭐⭐

---

### 模块7：部署与运维
**域名**：
- 建议：`tcbl-review.com` 或子域名 `tcbl.peterhu.me`
- 或使用 Vercel/Netlify 免费域名先跑起来

**部署**：
- 静态网站 → Vercel（全球CDN，国内有节点）
- Hypothesis → 腾讯云轻量服务器
- Coze → 字节云（无需自己管）

**国内访问优化**：
- Vercel 在国内速度尚可（不是最快但能用）
- 备选：部署到腾讯云 COS + CDN
- 图片使用 WebP 格式减小体积

---

## 实施路线

### Phase 1：内容转换（1-2周）
- [ ] Word文档 → Markdown（保留结构、图片、公式）
- [ ] 图片提取和转换（WMF → PNG/SVG）
- [ ] 公式提取和转换（OLE → LaTeX/KaTeX）
- [ ] 中文翻译（如果没有现成的中文版）

### Phase 2：网站搭建（1周）
- [ ] 选定框架（Quarto vs Next.js）
- [ ] 基础布局：目录导航 + 中英文切换
- [ ] 文章内容上线
- [ ] 响应式适配（桌面+手机）

### Phase 3：交互功能（1周）
- [ ] Hypothesis 评论系统集成
- [ ] Markmap 思维导图嵌入
- [ ] Reveal.js PPT 生成

### Phase 4：高级功能（1-2周）
- [ ] 文献网络可视化
- [ ] Coze AI 智能体创建和嵌入
- [ ] 性能优化、SEO

### Phase 5：发布推广
- [ ] 部署上线
- [ ] 在 X/Twitter、ResearchGate 推广
- [ ] 发给同行试用、收集反馈
- [ ] 迭代改进

---

## 技术栈总结

| 层 | 工具 | 备选 |
|----|------|------|
| 内容 | Quarto (Markdown+LaTeX) | Next.js + MDX |
| 样式 | Tailwind CSS | Custom CSS |
| PPT | Reveal.js | SliDev |
| 思维导图 | Markmap | D3.js |
| 评论 | Hypothesis (自部署) | Artalk |
| 文献可视化 | D3.js + Vis.js | Plotly |
| AI问答 | Coze (扣子) | Dify |
| 部署 | Vercel | 腾讯云COS+CDN |
| 版本控制 | GitHub | — |

---

## 成本估算

| 项目 | 费用 |
|------|------|
| Vercel 部署 | 免费 |
| 域名 | ~$12/年 |
| Hypothesis 自部署 | 腾讯云轻量 ~¥50/月 |
| Coze AI | 免费 |
| **总计** | ~¥50/月 + $12/年 |

---

## 可复用性
完成后形成模板：
- 下一篇综述只需替换内容
- 自动化脚本：Word → Markdown → 网站
- AI知识库更新：替换文档即可
- 评论系统共用
