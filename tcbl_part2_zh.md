# 全物理TCBL模型

如第[1.5](#introduction-to-tcbl-modeling)节所述，本文中的"全物理TCBL模型"是指全物理台风模型（通常为NWP系统）中与TCBL相关的部分。这些模型求解控制大气动力学和热力学的原始方程组，同时纳入真实大气的主要物理过程，因此将动量场、热量场和湿度场与辐射、海洋、陆面和云参数化方案相耦合。由于此类系统具有高度非线性，TCBL及其他预报场对具体的建模选择（包括网格分辨率和物理参数化方案）十分敏感，这一问题持续推动着相关研究的开展。如前所述，随着精度和计算效率的不断提升，全物理模型最终有望适用于PBWE中的大规模台风事件模拟（[Vickery et al. 2009a](#ref-vickery-2009a)）。然而需要指出的是，这些模型通常依赖资料同化——特别是在指定边界条件和背景环境方面——以保持与观测的一致性。这种资料同化在PBWE所需的蒙特卡罗模拟中并不可行。因此，在将未经同化的模拟结果应用于此类场景之前，必须通过与大量观测数据的对比进行严格评估。本节对利用WRF模型（第[2.1](#weather-research-and-forecast-model-wrf)节）及其他同类全物理模型系统（第[2.2](#other-models)节）模拟的TCBL进行简要综述。

## 天气研究与预报模型（WRF）

在台风模拟方面，WRF至少有四种运行模式可供使用：WRF-ARW（高级研究WRF，Advanced Research WRF）、WRF-AHW（高级飓风WRF，Advanced Hurricane WRF）、HWRF（飓风WRF，Hurricane WRF）和HWCM（混合WRF气旋模型，Hybrid WRF Cyclone Model）。这些模式以WRF的一个子集或变体作为计算核心，可视为原系统的专门化配置。在这四种模式中，ARW和HWRF目前用于研究和业务预报。各模式的详细信息可参见其用户手册。以下仅综述与TCBL相关的近期应用研究：第[2.1.1](#wrf-arw-advanced-research-wrf)节介绍WRF-ARW基本模式；第[2.1.2](#hwrf-hurricane-wrf)节介绍HWRF；第[2.1.3](#hwcm-hybrid-wrf-cyclone-model)节介绍HWCM。采用AHW进行台风模拟的研究[如（[Davis et al. 2008](#ref-davis-2008); [Alimohammadi and Malakooti 2018](#ref-alimohammadi-2018)）]数量远少于其他WRF模式，因此不在此详述。

### WRF-ARW（高级研究WRF）

大多数将ARW应用于台风模拟的研究侧重于评估其再现台风强度、路径、结构特征及相关特性的能力，通常将模型结果与观测进行对比以验证和解释。值得注意的是，此处的"预测"一般指回报模拟。模型设置和物理参数化方案常在敏感性实验中加以调整以改善性能[如（[Kueh et al. 2019](#ref-kueh-2019); [Saunders et al. 2019](#ref-saunders-2019)）]。本节聚焦两个方面：建模参数对ARW中TCBL模拟的影响，以及TCBL表征对其他台风特征的后续效应。第[2.1.1.1](#tcbl-turbulence-parameterizations)节综述湍流参数化的影响；第[2.1.1.2](#bottom-boundary)至[2.1.1.4](#data-assimilation)节分别考察下边界条件、初始条件和资料同化的影响；第[2.1.1.5](#ensemble-prediction)节概述基于ARW模型的集合TCBL模拟。

#### TCBL湍流参数化

这一因素常与网格尺寸一起通过对比相近的参数化方案来考察。[Hill and Lackmann (2009)](#ref-hill-2009)较早研究了湍流参数化方案[延世大学方案（Yonsei University, YSU）和Mellor–Yamada–Janjic方案（MYJ）]与网格尺寸的综合效应。他们报告，将水平网格间距从4 km增大到36 km可导致地面风速最大30 m/s的变化。这两种参数化方案的对比一直是反复出现的研究主题，但结论往往不尽相同。一项高引用率的研究（[Hu et al. 2010](#ref-hu-2010)）评估了三种参数化方案，发现YSU总体优于MYJ。Nolan et al.（[2009a](#ref-nolan-2009a); [2009b](#ref-nolan-2009b)）以Isabel（2003）为测试个例，考察了MYJ和改进YSU方案以及网格间距对最大地面风速和TCBL结构的影响。结果表明，1.33 km分辨率在预测地面阵风方面表现最优。MYJ和YSU均能以合理的精度再现TCBL，但MYJ倾向于产生更强的LLJ。此外，利用孟加拉湾气旋的现场观测进行的对比研究（[Sateesh et al. 2017](#ref-sateesh-2017); [Singh and Bhaskaran 2017](#ref-singh-2017); [Singh and Bhaskaran 2018](#ref-singh-2018); [Singh et al. 2021](#ref-singh-2021)）进一步支持了YSU的良好表现。这些研究还指出，较大的计算域和较高的垂直分辨率有助于改善台风路径和强度的预测。近期研究进一步考察了TCBL参数化对台风演变和精细结构的影响[如（[Zhu et al. 2014](#ref-zhu-2014); [Zhu and Zhu 2015](#ref-zhu-2015)）]。

总体而言，现有证据表明，在基于ARW的台风模拟中，YSU方案总体优于其他常用参数化方案。

#### 下边界

基于ARW的台风模拟需要高分辨率的地面模型。以台风莫拉克（2009）为例，Ming and Zhang（[2016](#ref-ming-2016)）考察了不同的焓和动量表面交换系数公式，发现台风强度和TCBL结构（地面风速和TCBL高度）对这些系数高度敏感。这一敏感性在预期之中，因为调节阻力系数长期以来一直被用于改善TCBL模型输出与观测之间的吻合度[如（[Kepert 2010a](#ref-kepert-2010a)）]。此外，Tse et al.（[2014](#ref-tse-2014)）对风洞实验、ARW模拟和现场观测的对比表明，粗糙的地形分辨率可能导致平均风剖面不准确。

#### 初始条件

WRF-ARW依赖全球环流模型输出或再分析数据集（如NCEP、GFS、ECMWF等）提供初始条件和侧边界条件。Singh and Bhaskaran（[2018](#ref-singh-2018)）对比了NCEP-FNL和GFS产品提供的条件，发现二者对前48小时内模拟TCBL的影响可以忽略。相比之下，[Hamill (2011a)](#ref-hamill-2011a)报告，在集合预报框架中利用2010年多个台风进行的模拟评估表明，ECMWF再分析数据优于GFS产品。鉴于这些数据集（以及近期AI赋能的产品）正在经历重大发展，其对ARW TCBL模拟的影响值得利用最新版本的数据产品进行重新检验。

#### 资料同化

局地资料同化已被证明可以改善TCBL模拟与观测的吻合度。[Tse et al. (2015)](#ref-tse-2015)利用经风洞验证的地形修正风剖面，通过ARW中的观测逼近方法改进了台风风神（2008）的中尺度模拟。类似地，[Greeshma et al. (2015)](#ref-greeshma-2015)证明，将局地观测同化到初始条件中可以改善在印度登陆的八个气旋的气压和风场模拟。但需要指出，这种资料同化对于PBWE中的大规模台风模拟通常不可行。

#### 集合预报

集合平均是量化和减少基于ARW的台风模拟不确定性的一种实用方法。一种途径是跨多种模型配置进行集合预报（[Fovell and Su 2007](#ref-fovell-2007); [Fovell et al. 2016](#ref-fovell-2016)）。例如，[Rao and Srinivas (2014)](#ref-rao-2014)在模拟气旋Orissa（1999）时，采用由不同物理参数化方案组合构成的36个集合成员，通过分析偏差和随机误差确定了最有效的集合组合。这一技术也被应用于北大西洋盆地的季节性台风预测（[Villarini et al. 2019](#ref-villarini-2019)）。

另一种途径是基于初始条件的变化生成集合。例如，Blanton et al.（[2020](#ref-blanton-2020)）利用不同初始条件（[Hamill et al. 2011a](#ref-hamill-2011a); [Hamill et al. 2011b](#ref-hamill-2011b)）预测飓风路径和强度，从而捕捉飓风演变及其引起的风暴潮中的不确定性。结果表明，尽管模拟对初始条件和边界条件的扰动敏感，集合展布成功包络了观测值。Liu et al.（[2019](#ref-liu-2019)）采用类似策略，利用与历史统计一致的伪随机噪声对初始场进行扰动，生成了1503个理想化的人造涡旋。

虽然集合预报与PBWE中的蒙特卡罗台风模拟类似，但两者在根本上有所不同。集合预报通常在扰动条件下对同一台风进行多次模拟，而PBWE中的蒙特卡罗模拟则生成成千上万个不同的台风事件。尽管如此，集合预报最终可能与大尺度、长期气象模式扰动相结合，为未来PBWE应用中不确定性的处理提供额外途径。

### HWRF（飓风WRF）

HWRF经历了持续更新，其改进依据来自现场观测，特别是与TCBL湍流特性相关的观测。在飓风预报改进项目（Hurricane Forecast Improvement Project, HFIP）框架下，HWRF中垂直扩散的表征得到改进（[Zhang et al. 2015](#ref-zhang-2015); [Zhang and Rogers 2019](#ref-zhang-2019)），增强了台风路径和近地面风剖面的预测能力。Wang et al.（[2018](#ref-wang-2018)）提出连续的垂直扩散剖面，进一步改善了地面风速和入流角的预测。在三个登陆飓风的模拟中，[Zhang et al. (2017b)](#ref-zhang-2017b)分析了增强的垂直混合长度对TCBL结构的影响，并给出了所观测行为的物理解释。水平混合长度的类似研究也已开展（[Zhang and Marks 2015](#ref-zhang-2015)）。Zhang et al.（[2020](#ref-zhang-2020)）通过一系列理想化模拟评估了多种TCBL参数化方案，基于与TCBL观测的对比确定了最优方案。

这些研究的主要目标是改进HWRF模型系统。增强配置与原始配置以及观测数据集的对比表明，HWRF能够以较高精度模拟TCBL。然而，由于其非静力中尺度模型（Non-hydrostatic Mesoscale Model, NMM）动力核心，该模型的计算成本仍然很高，这可能限制其在需要大量台风模拟的PBWE中的适用性。最后需要指出，虽然HWRF模型仍可用于科研，但已从飓风业务预报中退役，由下一代飓风分析与预报系统（Hurricane Analysis and Forecast System, HAFS）取代（[Chen et al. 2025](#ref-chen-2025)）。

### HWCM（混合WRF气旋模型）

HWCM是近期开发的一种WRF模式，专门用于模拟理想化的登陆台风（[Bruyère et al. 2019](#ref-bruy-2019)）。在该框架中，首先以随机指定参数生成一个理想化台风，使其在理想化背景环境中旋转和演变，然后将其嵌入真实环境场以模拟后续演变和登陆过程。敏感性分析表明，洋面温度（Sea Surface Temperature, SST）和垂直风切变（Vertical Wind Shear, VWS）等背景条件影响模拟台风的运动，并有助于指导HWCM配置的选取。

HWCM已被用于研究气候变化对台风行为的影响（[Bruyère et al. 2019](#ref-bruy-2019)），以及通过200个台风的集合模拟分析登陆入射角对风暴潮的影响（[Ramos‐Valle et al. 2020](#ref-ramos-2020)）。由于HWCM能够在保持全物理表征完整性的同时以随机指定参数生成台风，因此在未来PBWE应用中具有前景。然而，在全面用于该目的之前，仍需进行额外的验证和性能提升。

## 其他模型

除WRF外，全球还有若干其他中尺度NWP模型可用于台风模拟，从而充当全物理TCBL模型。与WRF类似，这些模型中TCBL湍流参数化（闭合方案）的作用也得到了广泛研究。[Kanada et al. (2012)](#ref-kanada-2012)报告，在日本气象厅的业务非静力模型中，Deardorff–Blackadar非局地方案在预测台风强度和TCBL结构方面表现良好。值得注意的是，该模型使用的闭合方案与WRF中实现的方案存在显著差异。对于同一模型，[Coronel et al. (2016)](#ref-coronel-2016)在台风鲇鱼（2010）的模拟中考察了增强阻力系数和类MYJ参数化方案的影响。[Abarca et al. (2015)](#ref-abarca-2015)推荐在区域大气模拟系统（Regional Atmospheric Modeling System, RAMS）的台风模拟中使用Louis参数化方案。

[Hazelton et al. (2018)](#ref-hazelton-2018)引入了fvGFS模型，该模型将FV3有限体积动力核心与GFS物理方案相结合，并将七个台风的模拟与观测进行了对比。数值实验表明，fvGFS能够合理预测RMW和快速增强，但在准确再现TCBL高度方面存在困难。

此外，基于LES的系统如WRF-LES[如（[Zhu 2008](#ref-zhu-2008); [Huang et al. 2018](#ref-huang-2018)）]和CM1（Cloud Model 1）[如（[Kepert et al. 2016](#ref-kepert-2016)）]也被用于TCBL研究。凭借其微尺度分辨率（约100 m），LES模型可以在不依赖参数化湍流闭合的情况下模拟TCBL中的瞬态特征和湍流特性。尽管LES的高分辨率使其在TCBL模拟中日益流行，但其巨大的计算成本以及关于其是否适合模拟完整台风的持续争论，目前限制了其在PBWE中的适用性。
