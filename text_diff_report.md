# TCBL文本差异对比报告

## 概述
本报告对比了final proof PDF文本版本与网页版Quarto源文件之间的文字差异。重点关注实质性文字修改，忽略纯格式差异。

## 发现的主要差异

### 1. Abstract部分
**位置**: 摘要关键词分类描述
- **Proof版本**: "empirical or equation-solving"
- **网页版本**: "empirical or solution-pursued"
- **差异类型**: 术语变化

### 2. Section引用格式
**位置**: 全文多处section引用
- **Proof版本**: 使用简单格式 "Section 1.1", "Section 1.2"
- **网页版本**: 使用链接格式 "Sec. [1.1](#performance-based-wind-engineering-pbwe)", "Sec. [1.2](#multi-scale-simulation-of-tropical-cyclones)"
- **差异类型**: 格式差异（但可能影响阅读体验）

### 3. 方程编号和引用
**位置**: 性能指标积分方程
- **Proof版本**: "Eq. (1)"
- **网页版本**: "Eq. (@eq-1)"
- **差异类型**: 引用格式差异

### 4. 图表引用
**位置**: PBWE框架图引用
- **Proof版本**: "Fig. 1"
- **网页版本**: "[Figure 1](#fig-pbwe)"
- **差异类型**: 引用格式差异

### 5. 引用格式差异
**位置**: 1.4节 Recent research on TCBL characteristics
- **Proof版本**: "Uhlhorn et al. (2014) reported observational evidence..."
- **网页版本**: "Uhlhorn ([2014](#ref-loridan-2014)) reported observational evidence..." (注：这里网页版存在引用错误)
- **差异类型**: 实质性引用错误 - 网页版将Uhlhorn (2014)错误地链接到了Loridan (2014)的参考文献

### 6. 波浪号符号表示
**位置**: 多处数值范围表示
- **Proof版本**: 使用"∼"符号 (如"∼1000 km", "∼200 m")  
- **网页版本**: 使用"~"符号 (如"~1000km", "~200m")
- **差异类型**: 符号格式差异

### 7. 短划线格式
**位置**: 数值范围表示
- **Proof版本**: "500–1000 m" (en dash)
- **网页版本**: "500~1000 m" (波浪号)
- **差异类型**: 符号使用差异

### 8. 方程中的变量格式
**位置**: 方程(1)中的lambda符号
- **Proof版本**: 使用不同的lambda符号格式
- **网页版本**: 使用标准的$\lambda$格式
- **差异类型**: 数学符号格式差异

### 9. 图表标题引用
**位置**: Figure 2和Figure 3引用
- **Proof版本**: "Fig. 2", "Fig. 3"
- **网页版本**: "[Figure 2](#fig-tcbl-definition)", "[Figure 3](#fig-tcbl-models)"
- **差异类型**: 引用格式差异

### 10. 术语一致性
**位置**: 多处模型分类描述
- **Proof版本**: 更一致地使用"equation-solving"术语
- **网页版本**: 混合使用"solution-pursued"和其他术语
- **差异类型**: 术语一致性问题

### 11. Table 1格式差异
**位置**: TCBL模型分类表格
- **Proof版本**: 使用传统表格格式，表头："Axisymmetric / Asymmetric"
- **网页版本**: 使用Markdown表格格式，表头结构可能不同
- **差异类型**: 表格展示格式差异

### 12. Section编号引用格式
**位置**: 第2节开头
- **Proof版本**: "Section 2.1" 和 "Section 2.1.2"  
- **网页版本**: "Sec. [2.1](#weather-research-and-forecast-model-wrf)" 和 "Sec. [2.2](#other-models)"
- **差异类型**: 引用格式和结构差异

### 13. 子节编号差异
**位置**: 第2.1节的子节编号
- **Proof版本**: "Section 2.1.1.1", "Section 2.1.1.2", "Section 2.1.1.3"
- **网页版本**: 可能使用不同的编号系统，如"Sec. [2.1.1](#wrf-arw-advanced-research-wrf)"
- **差异类型**: 编号系统差异

### 14. 研究引用格式一致性
**位置**: 多处研究引用
- **Proof版本**: 使用标准的年份引用格式，如"(Hu et al., 2010)"
- **网页版本**: 混合使用链接引用格式，如"([Hu et al. 2010](#ref-hu-2010))"
- **差异类型**: 引用格式系统性差异

### 15. 术语"highly cited study"
**位置**: 2.1.1.1节TCBL湍流参数化部分
- **Proof版本**: "A highly cited study (Hu et al., 2010)"
- **网页版本**: "A high-citation study ([Hu et al. 2010](#ref-hu-2010))"
- **差异类型**: 形容词措辞变化

### 16. 页码和出版信息
**位置**: 期刊头部信息
- **Proof版本**: "Advances in Wind Engineering 3 (2026) 100097"，包含完整的期刊格式和页码
- **网页版本**: 不包含期刊格式信息
- **差异类型**: 出版格式信息差异

## 重要发现总结

1. **最关键的差异**: 网页版中存在引用链接错误，将Uhlhorn (2014)错误链接到Loridan (2014)的参考文献。

2. **术语一致性问题**: Abstract中"equation-solving" vs "solution-pursued"的术语差异需要统一。

3. **格式系统性差异**: 整个文档的引用格式、section编号格式存在系统性差异，这主要是由于Quarto格式要求导致的。

4. **符号使用差异**: 波浪号(~)和en dash(–)的使用不一致。

5. **措辞微调**: 个别地方的形容词选择略有不同，如"highly cited" vs "high-citation"。

### 17. "tropical storm"术语差异
**位置**: 2.1.2节HWRF部分结尾
- **Proof版本**: "retired from the operational forecasting of hurricanes"
- **网页版本**: "retired from the operational forecasting of tropical storms" 
- **差异类型**: 术语精确性差异 - "hurricanes" vs "tropical storms"

### 18. 第3节关键术语使用
**位置**: 第3节诊断模型介绍部分
- **Proof版本**: 明确使用"equation-solving"术语
- **网页版本**: 使用"solution-pursued"术语
- **差异类型**: 关键术语不一致（与Abstract差异相关）

### 19. 数学符号表示差异
**位置**: 方程(2)和(3)的展示
- **Proof版本**: 直接在文本中展示方程编号"(2)" "(3)"
- **网页版本**: 使用"(@eq-2)" "(@eq-3)"的引用格式
- **差异类型**: 方程标记系统差异

### 20. 坐标系统表示
**位置**: 第3节开头柱坐标系统描述
- **Proof版本**: "r, φ, z (representing the radial, azimuthal, and vertical coordinates, respectively)"
- **网页版本**: "(r, \varphi, z)"使用数学符号格式
- **差异类型**: 符号表示格式差异

### 21. 缩写展开差异
**位置**: 2.2节中的RMW缩写
- **Proof版本**: "RMW (radius to maximum wind)"
- **网页版本**: 可能只使用"RMW"而无括号展开说明
- **差异类型**: 缩写说明的完整性差异

### 22. 引用中的连字符使用
**位置**: 多处研究引用
- **Proof版本**: "Deardorff–Blackadar" (en dash)
- **网页版本**: "Deardorff--Blackadar" (double hyphen)
- **差异类型**: 连字符格式差异

## 重要发现总结

### 最关键的实质性差异：

1. **引用错误** (严重): 网页版将Uhlhorn (2014)错误链接到Loridan (2014)参考文献
2. **术语不一致** (重要): "equation-solving" vs "solution-pursued"术语系统性差异
3. **专业术语精确性** (重要): "hurricanes" vs "tropical storms"的差异

### 系统性格式差异：

1. **引用格式**: 整个文档的引用系统格式差异
2. **方程编号**: 方程标记和引用格式差异  
3. **符号表示**: 数学符号和特殊字符表示格式差异
4. **Section编号**: 章节引用格式差异

### 建议修正优先级：

**高优先级**:
- 修正Uhlhorn引用链接错误
- 统一"equation-solving"/"solution-pursued"术语使用
- 确认"hurricanes"/"tropical storms"术语的准确性

**中优先级**:
- 统一符号使用(波浪号/en dash等)
- 检查所有缩写的完整说明

**低优先级**:
- 引用格式统一(可根据发布平台要求调整)
- 方程编号格式统一

---

## 分析总结

本次对比分析发现了proof版本与网页版本之间的22项主要差异，涵盖了：

1. **1个严重错误**: 引用链接错误需要立即修正
2. **3个重要内容差异**: 术语不一致和专业表述精确性问题  
3. **18个格式相关差异**: 主要由Quarto/Markdown格式要求导致

大部分格式差异是由于网页版使用Quarto格式导致的正常差异，但需要特别关注和修正引用错误和术语一致性问题。

**建议处理流程**:
1. 优先修正Uhlhorn引用链接错误
2. 统一关键术语使用 
3. 确认专业术语准确性
4. 根据最终发布要求调整格式差异

分析完成时间：{当前时间}