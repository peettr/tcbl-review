# TCBL论文文本差异对比报告 v2

**对比文件：**
- PDF文本：`tcbl_proof_text.txt` (Final Proof版本)
- 网页文本：`index.qmd` (当前网页版本)

**对比时间：** 2026-03-12

**对比方法：** 逐段、逐句对比，重点关注实质性文字差异

---

## 差异清单

### 1. Introduction部分 - 数字格式差异
**位置：** Introduction段落1
**行号：** 30
**网页版：** "1,392 fatalities"
**Proof版：** "1392 fatalities"
**差异描述：** 数字千分位逗号格式差异

### 2. Performance-based wind engineering (PBWE) - 句子开头措辞变化
**位置：** PBWE部分开头
**行号：** 34  
**网页版：** "**Suppose** the TC-induced damage to a structure can be predicted"
**Proof版：** "**If** the TC-induced damage to a structure can be predicted"
**差异描述：** 重要的措辞变化：Suppose vs If

### 3. Introduction部分 - 连字符差异  
**位置：** Introduction段落1
**行号：** 30
**网页版：** "transmission tower--line systems"  
**Proof版：** "transmission tower-line systems"
**差异描述：** 连字符格式差异：双连字符 vs 单连字符

### 4. Section引用格式差异
**位置：** Introduction段落3  
**行号：** 34
**网页版：** "Sec. [1.1]", "Sec. [1.2]"等
**Proof版：** "Section 1.1", "Section 1.2"等  
**差异描述：** 全称vs缩写，加markdown链接格式

### 5. Figure引用格式差异
**位置：** PBWE部分
**行号：** 38, 58  
**网页版：** "[Figure 1]"
**Proof版：** "Fig. 1"
**差异描述：** Figure全称vs缩写形式

### 6. Multi-scale simulation - 标点符号差异
**位置：** Multi-scale simulation部分  
**行号：** 约70行
**网页版：** "(4) **Microscale.**"
**Proof版：** "(4) Microscale:"  
**差异描述：** 句号vs冒号的标点差异

### 7. Definition of TCBL - 数字范围表示差异
**位置：** Definition of TCBL部分
**行号：** 约79行
**网页版：** "500\~1000 m"
**Proof版：** "500–1000 m"  
**差异描述：** 波浪号vs en dash表示数字范围

### 8. Definition of TCBL - 数字间距差异  
**位置：** Definition of TCBL部分
**行号：** 约79行
**网页版：** "\~200m near"
**Proof版：** "∼200 m near"
**差异描述：** 数字与单位间缺少空格

### 9. Introduction to TCBL modeling - 连接词差异
**位置：** Introduction to TCBL modeling部分  
**行号：** 约107行
**网页版：** "**Further,** physics-based models"
**Proof版：** "**Furthermore,** physics-based models"
**差异描述：** Further vs Furthermore的措辞选择

### 10. Introduction to TCBL modeling - 强调格式差异
**位置：** Introduction to TCBL modeling部分
**行号：** 约107行  
**网页版：** "is **NOT** necessarily equivalent"
**Proof版：** "is not necessarily equivalent"
**差异描述：** NOT的大写强调vs普通小写

### 11. Table 1标题格式差异
**位置：** Introduction to TCBL modeling部分
**行号：** 约125行  
**网页版：** ": The categorization of physics-based tropical cyclone boundary layer (TCBL) models {#tbl-models}"
**Proof版：** "Table 1 Categorization of physics-based tropical cyclone boundary layer (TCBL) models."
**差异描述：** 表格标题格式，网页版使用markdown表格标题格式

### 12. Concluding remarks - 术语补充说明
**位置：** Concluding remarks部分
**行号：** 749  
**网页版：** "axisymmetric **(column)** or asymmetric"
**Proof版：** "axisymmetric or asymmetric"
**差异描述：** 网页版添加了"(column)"的补充说明

### 13. Concluding remarks - 双句号错误
**位置：** Concluding remarks部分  
**行号：** 749
**网页版：** "are linearized**..** This categorization"
**Proof版：** "are linearized. This categorization"
**差异描述：** 网页版有双句号错误

### 14. Data-driven methods - 双括号错误
**位置：** Data-driven methods部分
**行号：** 671
**网页版：** "**((**[Chang et al. 2020](#ref-chang-2020))**.**"
**Proof版：** "(Chang et al., 2020)."
**差异描述：** 网页版有双括号错误和双句号错误

## 总结

### 已发现的14个实质性文字差异：

1. **数字格式差异** - 1392 vs 1,392 fatalities
2. **重要措辞变化** - If vs Suppose (句子开头)
3. **连字符格式** - tower-line vs tower--line 
4. **Section引用格式** - Section 1.X vs Sec. [1.X]
5. **图片引用格式** - Fig. 1 vs [Figure 1]
6. **标点符号** - Microscale: vs Microscale.
7. **数字范围表示** - 500–1000 vs 500\~1000
8. **数字间距** - ∼200 m vs \~200m
9. **措辞变化** - Furthermore vs Further
10. **强调格式** - NOT vs not
11. **表格标题格式** - Table 1 vs markdown标题格式
12. **术语补充说明** - axisymmetric vs axisymmetric (column)
13. **排版错误** - linearized.. (双句号)
14. **引用格式错误** - ((Chang et al.)).. (双括号+双句号)

### 主要差异类型：

1. **重要实质性差异**：
   - If → Suppose (差异#2) 
   - Furthermore → Further (差异#9)
   - 术语补充说明 (差异#12)

2. **格式/标点差异**：
   - 数字格式、连字符、标点符号 (差异#1,3,6,7,8)
   - 引用和标题格式 (差异#4,5,11)

3. **排版错误** (需要修正)：
   - 双句号错误 (差异#13)
   - 双括号错误 (差异#14)

### 建议修正的差异：
- 差异#13和#14是明显的排版错误，应该修正
- 差异#2的措辞变化可能需要确认是否是有意的修改
- 其他格式差异主要是由于markdown vs PDF格式差异造成

### 结论：
经过详细逐段对比，发现的实质性文字差异相对较少，主要集中在格式变化和少数几个措辞调整。最需要关注的是排版错误（双句号、双括号）和个别重要的措辞变化。
