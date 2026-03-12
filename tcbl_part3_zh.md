# 诊断模型

上一节综述的全物理TCBL模型，是指全物理NWP模型在台风模拟中涉及TCBL的部分。这些模型通常求解涵盖台风演变全部物理过程的完整原始方程组。尽管全物理模型有助于探索TCBL特征，但其计算成本通常很高，目前尚不适用于PBWE中的大规模台风模拟。因此，从全物理模型简化而来的诊断模型在PBWE中得到广泛应用，因为它们在大幅降低计算成本的同时，保留了TCBL的核心物理机制。

需要指出的是，本文中"诊断模型"一词的范围超越了其在气象学中的传统定义。在气象学中，诊断模型利用分析场和观测资料估算当前大气状态，与预测未来状况的预报模型形成对照。在本文语境中，除全物理模型外的所有TCBL模型均归入"诊断"类别，因为它们通常不具备预报能力，也不旨在预测台风的未来演变。

TCBL诊断模型追求原始方程组的准定常解\[例如，在柱坐标系$(r, \varphi, z)$下定义，如([Kepert 2010a](#ref-kepert-2010a); [Kepert 2017](#ref-kepert-2017))\]：


$$
\frac{\partial u}{\partial t} + u\,\frac{\partial u}{\partial r} + \frac{v + v_{gr}}{r}\frac{\partial u}{\partial \varphi} + w\,\frac{\partial u}{\partial z} - \frac{v^2}{r} = \left(f + \frac{2v_{gr}}{r}\right)v + \frac{\partial}{\partial z}\left(K\,\frac{\partial u}{\partial z}\right)
$$ {#eq-2}

$$
\frac{\partial v}{\partial t} + u\,\frac{\partial v}{\partial r} + \frac{v + v_{gr}}{r}\frac{\partial v}{\partial \varphi} + w\,\frac{\partial v}{\partial z} + \frac{uv}{r} = -\left(f + \frac{v_{gr}}{r} + \frac{\partial v_{gr}}{\partial r}\right)u + \frac{\partial}{\partial z}\left(K\,\frac{\partial v}{\partial z}\right)
$$ {#eq-3}


其中$v_{gr}$为梯度风速；$K$为垂直扩散；$f$为科里奥利力系数；$u$、$v$、$w$分别为径向、切向和垂直风速分量。其他符号若使用，均保持其常规含义。方程中出现的符号不再逐一解释，除非它们是新引入的或在本文中被赋予了特定含义。有明确引用的方程按其原始形式呈现。对数学细节感兴趣的读者可参阅相应的原始文献。

该方程由模型顶部的梯度风$v_{gr}(r)$驱动，梯度风也可等价地通过梯度平衡以梯度气压的形式给出。风速分量可以使用有限差分法直接进行数值求解，无需额外简化，由此得到KW01开发的完全非线性三维TCBL模型（第[3.6](#simulation-based-models-iii-3d-nonlinear-models)节）。为降低计算成本，可引入若干层次的近似。一种自然的简化是沿垂直坐标*z*对式(@eq-2)和(@eq-3)取平均，由此得到二维平板模型（第[3.4](#simulation-based-models-i-2d-slab-model)节）。二维混合模型介于二维和三维模型之间，其中待求解的积分原始方程考虑了预设垂直风剖面的影响（第[3.5](#simulation-based-models-ii-2d-hybrid-models)节）。

上述TCBL模型均属于模拟型。在本文中，"模拟型"是指在离散化计算域上求解控制方程的模型（主要采用有限差分法）。为降低计算需求，可通过部分或完全消除离散化将这些模型简化为参数化形式（参见第[1.5](#introduction-to-tcbl-modeling)节和[Table 1](#tbl-models)）。

简化可沿多条路径进行。首先，若基于尺度分析省略未加方框的项，剩余方程仅含线性项。这一化简得到一组近似解析或半解析解（第[3.3](#parametric-models-ii-analytical-solution-based-linear-models)节），构成参数化TCBL模型中的线性模型类别。其次，如前所述，所有TCBL模型的目标是将预设的梯度风或梯度气压剖面转换为TCBL内的三维风速场。通过显式求解控制方程完成这一转换的模型在本文中称为"求解型"。这一显式求解过程可被经验关系取代，从而产生另一类简化方法，即第[3.2](#parametric-models-i-empirical-methods)节中描述的经验模型。第三种简化可通过在式(@eq-2)和(@eq-3)中去除径向变化来实现，得到轴对称/柱模型（第[3.1](#axisymmetric-models)节）。需要注意的是，柱模型也可用于捕捉TCBL风场的不对称性（第[3.3.2](#column-linear-model-meng-et-al.-1995)节）。相比之下，第[3.2](#parametric-models-i-empirical-methods)节~第[3.6](#simulation-based-models-iii-3d-nonlinear-models)节中介绍的模型大多是非对称的。

最后需要指出，上述简化虽能大幅降低计算成本，但以牺牲精度为代价。这些模型构成一个具有不同简化层次、因而具有不同保真度的层级体系，如Table 1所总结。KW01三维非线性TCBL模型在理论上最为严格，通常被认为精度最高。因此，较低简化层次的模型不应期望达到KW01模型的精度。

在上面的介绍中，诊断TCBL模型按从复杂到简单的顺序呈现。在本节余下部分，综述按相反顺序进行，从最简单的公式开始。第[3.1](#axisymmetric-models)节介绍轴对称/柱模型，这些模型可以是线性或非线性的，可能包含部分模拟型成分。第[3.1](#axisymmetric-models)节之后的各节讨论非对称模型。参数化模型（与模拟型模型相对）分两部分综述：第[3.2](#parametric-models-i-empirical-methods)节介绍经验方法，第[3.3](#parametric-models-ii-analytical-solution-based-linear-models)节介绍解析和半解析解。由于经验模型需要梯度风或气压剖面以及台风路径信息作为输入，这些输入也在第[3.2](#parametric-models-i-empirical-methods)节中简要总结。模拟型模型随后在第[3.4](#simulation-based-models-i-2d-slab-model)节、[3.5](#simulation-based-models-ii-2d-hybrid-models)节和[3.6](#simulation-based-models-iii-3d-nonlinear-models)节分别介绍二维平板模型、二维混合模型和三维模型。其中，被认为精度最高的三维非线性模型是本节的重点。

## 轴对称模型

通过去除式(@eq-2)和(@eq-3)中的切向平流项，可得到轴对称原始方程([Rosenthal 1962](#ref-rosenthal-1962); [Smith 1968](#ref-smith-1968))：


$$
u \frac{\partial u}{\partial r} + w \frac{\partial u}{\partial z} + \frac{v_{gr}^2 - v^2}{r} + f(v_{gr} - v) = K \frac{\partial^2 u}{\partial z^2}
$$ {#eq-4}

$$
u \frac{\partial v}{\partial r} + w \frac{\partial v}{\partial z} + \frac{uv}{r} + fu = K \frac{\partial^2 v}{\partial z^2}
$$ {#eq-5}


需要注意的是，这两个方程中的风速分量与方位角坐标无关，相关参数（如表面阻力系数和垂直扩散）也是轴对称的。这些轴对称非线性方程可以使用基于有限差分法的模拟型模型求解\[例如([Yamasaki 1968](#ref-yamasaki-1968); [Ooyama 1969](#ref-ooyama-1969); [Rosenthal 1971](#ref-rosenthal-1971); [Anthes 1972](#ref-anthes-1972); [Anthes 1981](#ref-anthes-1981))\]，尽管此类研究大多关注台风的完整物理过程而非TCBL特征。然而，模拟型轴对称模型的计算成本仍然较高。因此，大多数轴对称TCBL模型采用进一步简化，形成混合模型、高度平均模型以及线性或非线性解析公式。以下四个小节将详细介绍这些类别。

### 轴对称混合模型

这一类方法将参数化的水平风速径向和垂直剖面与模拟型方法相结合。因此，根据所采用剖面类型的不同，可以导出多种混合模型。通常仍需数值方法来求解模型中的简化微分方程。

Smith ([1968](#ref-smith-1968))通过假设以下风剖面提出了一种混合解：

$$
u(r, \eta) = v_{gr}(r) E(r) f(\eta) \qquad v(r, \eta) = v_{gr}(r) g(\eta)
$$ {#eq-6}

其中$f(\eta) = -e^{-\eta} \sin \eta$，$g(\eta) = e^{-\eta} \cos \eta$（埃克曼螺线），以及$f(\eta) = c e^{-\eta} (a_1 \sin \eta + a_2 \cos \eta)$，$g(\eta) = 1 - c e^{-\eta} (a_1 \cos \eta + a_2 \sin \eta)$分别对应无滑移和滑移底部边界条件；$\eta = z / \delta(r)$；$\delta(r)$为TCBL高度。将式(@eq-6)代入轴对称原始方程并沿高度$[0, +\infty]$积分，可得到一组以未知量$E^2$和$E\delta^2$表示的常微分方程\[([Smith 1968](#ref-smith-1968))，其式(24)和(25)\]，可用龙格-库塔方法等数值方法求解。该混合模型是非线性的、三维的，但垂直方向经过参数化处理。Langousis et al. ([2009](#ref-langousis-2009))将其扩展以考虑不对称性（见第[3.5](#simulation-based-models-ii-2d-hybrid-models)节）。

沿着类似的推导思路([Smith 1968](#ref-smith-1968))，Kepert ([2010b](#ref-kepert-2010b))采用另一种风剖面参数化来简化轴对称原始方程：

$$
u(r,z) = [\{u_m(r) - v_m(r)\}\cos\{z/\delta(r)\} + \{u_m(r) + v_m(r)\}\sin\{z/\delta(r)\}]\exp\{-z/\delta(r)\}
$$ {#eq-7}

其中两个未知量为$u_{\mathrm{m}}(r)$和$v_{\mathrm{m}}(r)$，而TCBL高度$\delta(r)$为预设值。所得混合模型\[([Kepert 2010b](#ref-kepert-2010b))，其式(14)和(15)\]避免了二维平板模型中的数值不稳定性。

Eliassen ([1971](#ref-eliassen-1971))给出了风剖面的幂级数展开：


$$
\frac{1}{r}v(r,z) = v_0(z) + v_1(z)r + v_2(z)r^2 + \ldots
$$ {#eq-8}


通过令每阶半径的多项式系数均满足平衡条件，推导出以*z*为自变量的一组新常微分方程及其解析解。

还有一类混合模型假设类似于式(@eq-6)的可分离风剖面，但不对这些剖面进行参数化([Foster 2009](#ref-foster-2009))：


$$
u = v_{gr}(r)y_1(\xi),\quad v = v_{gr}(r)y_3(\xi),\quad W = \frac{v_{gr}(r)}{r_c(r)}y_5(\xi)
$$ {#eq-9}


其中$\xi = z/\delta(r)$和$r_e = r / \delta(r)$分别为归一化的垂直和径向坐标；$\delta(r)$为预设值；$y_1, y_3, y_5$为未知形状函数。通过式(@eq-9)，轴对称原始方程被转化为一组五阶常微分方程，可用配点法求解。该模型能够灵活处理不同的空间变化湍流参数化方案和表面阻力系数，因而有潜力扩展至非对称TCBL。然而，由于边界层高度$\delta(r)$是预先指定的，该模型无法恰当反映湍流参数化对边界层高度的影响。

最后，尽管上述模型以风速分量的形式表达，轴对称原始方程也可以角动量和流函数的形式重新表述。这些替代形式随后可以数值方法求解\[([Eliassen and Lystad 1977](#ref-eliassen-1977); [Montgomery et al. 2001](#ref-montgomery-2001))\]，或通过混合方法进行半解析求解([Kuo 1982](#ref-kuo-1982))。

### 轴对称高度平均模型

无需上述参数化风剖面，轴对称原始方程可通过沿整个TCBL高度积分来求解([Smith 2003](#ref-smith-2003); [Smith and Vogl 2008](#ref-smith-2008))：


$$
\frac{\mathrm{d}}{\mathrm{d}r}\left(r \int_0^\delta u^2\,\mathrm{d}z\right) + \left[r u w\right]\Big|_{z=0} + \int_0^\delta \left(v_{gr}^2 - v^2\right)\mathrm{d}z + r f \int_0^\delta \left(v_{gr} - v\right)\mathrm{d}z = -K r \left.\frac{\partial u}{\partial z}\right|_{z=0}
$$ {#eq-10}


由此得到平均风速分量$u_b$和$v_b$的方程\[([Smith and Montgomery 2008](#ref-smith-2008))的式(1)和(2)\]：


$$
u_b \frac{\mathrm{d} u_b}{\mathrm{d} r} = u_b \frac{w_\delta}{\delta} - \frac{\left(v_{gr}^2 - v_b^2\right)}{r} - f\left(v_{gr} - v_b\right) - \frac{C_D}{\delta}\left(u_b^2 + v_b^2\right)^{1/2} u_b - \frac{\overline{u'w'}\big|_\delta}{\delta}
$$ {#eq-11}


式(@eq-11)右边第一项和最后一项分别表示TCBL顶部垂直风速和湍流扩散的影响。该高度平均模型是轴对称、完全非线性的，可用龙格-库塔方法求解；数值结果揭示了超梯度的高度平均切向风，这是TCBL的一个典型特征。水汽和热力方程可作类似处理，以考察TCBL热力结构的影响([Smith 2003](#ref-smith-2003); [Smith and Vogl 2008](#ref-smith-2008))。该模型可进一步简化，例如通过去除平流项和线性化表面阻力项，得到一系列近似形式（线性、半非线性、地转等）([Smith and Montgomery 2008](#ref-smith-2008))。

### 轴对称非线性解析模型

Kuo ([1982](#ref-kuo-1982))通过引入复变量$q$将轴对称原始方程转化为单一方程：


$$
\frac{\mathrm{d}^2 q}{\mathrm{d} \eta^2} + 2i q = \hat{Q} \qquad q = v + \mathrm{i} \left( \frac{f_2}{f_1} \right)^{1/2} u \qquad \dot{Q} = \frac{2 \left\{ u \dfrac{\partial q}{\partial r} + w \dfrac{\partial q}{\partial \eta} + \dfrac{u v}{r} - \mathrm{i} \left( \dfrac{f_2}{f_1} \right)^{1/2} \left( \dfrac{v^2}{r} - \dfrac{\partial p}{\partial r} \right) \right\}}{(f_1 f_2)^{1/2}}
$$ {#eq-12}


其中$f_1$和$f_2$为以梯度风速表示的参数；$p$为梯度气压；$\eta$为无量纲垂直坐标。通过对变量引入幂级数展开，在适当的底部边界条件下，推导出了一阶（线性）和二阶（非线性）风速分量的解析解。数值结果表明，TCBL的垂直风剖面也呈现超梯度的低空急流（LLJ）\[例如([Kuo 1982](#ref-kuo-1982))的图7\]。研究还证明了解析公式所得剖面与模拟型方法([Kuo 1971](#ref-kuo-1971))结果之间的相似性，验证了所推导的解析解。结果还表明，对于形状相对平坦的兰金涡旋型梯度风剖面，二阶项的贡献很小。该解析解的发展似乎影响了非对称三维线性解析TCBL模型([Kepert 2001](#ref-kepert-2001))的建立。

### 轴对称线性解析模型

通过线性化平流项，轴对称原始方程可进一步简化，得到无需动量积分的半解析解\[([Meng et al. 1995](#ref-meng-1995))，见其式(19)\]：


$$
v = \mathrm{e}^{-\lambda z} \left[ D_1 \cos(\lambda z) + D_2 \sin(\lambda z) \right] \qquad D_1 = \frac{-\chi(\chi + 1) v_{gr}}{1 + (\chi + 1)^2} \qquad D_2 = \frac{\chi v_{gr}}{1 + (\chi + 1)^2} \qquad \chi = \frac{C_{\mathrm{d}} V_s}{K \lambda}
$$ {#eq-13}


其中$\xi$和$\lambda$为以梯度风速$v_{gr}$表示的径向变化参数；$C_d$为表面阻力系数；$V_S$为近地面风速；$D_1$和$D_2$为未知系数。由于未知量以近地面风速（即$v$）定义，需要迭代求解。需要注意，该模型是轴对称的；它仅代表([Kepert 2001](#ref-kepert-2001))三维线性非对称TCBL模型的波数0（轴对称）部分，如([Vogl and Smith 2009](#ref-vogl-2009); [Snaiki and Wu 2017a](#ref-snaiki-2017a))所示。然而，通过假设非对称的梯度气压/风剖面，该模型可用于非对称TCBL模拟([Meng et al. 1995](#ref-meng-1995))；第[3.3](#parametric-models-ii-analytical-solution-based-linear-models)节也有简要描述。在这种情况下，轴对称模型可被重新表述为随方位角变化的柱模型。值得注意的是，该线性解析解是第[3.1.3](#axisymmetric-nonlinear-analytical-models)节中非线性解析解的子集（其一阶解）；此外，与式(@eq-13)相同的解也被([Vogl 2009](#ref-vogl-2009); [Vogl and Smith 2009](#ref-vogl-2009))重新推导为线性弱摩擦近似。

## 参数化模型（I）：方法

在第[3](#diagnostic-models)节中，第[3.1](#axisymmetric-models)节之后的模型均为非对称模型。早期（早在1970年代）用于估算台风引起极端风速的TCBL模拟的开创性工作采用经验方法，包括TCBL顶部的梯度风和经验参数化的TCBL风速至近地面风速的转换。无需任何求解过程。一个典型例子见([Batts et al. 1980](#ref-batts-1980))：


$$
v(r, \varphi, z=10) = \left[0.865 v_{gr}(RMW) + 0.5 V_T\right] \left[\frac{v(10, r)}{v(10, RMW)}\right] - \frac{V_T}{2}(1 - \cos \varphi)
$$ {#eq-14}


其中$V_T$为台风移动速度；RMW为最大风速半径（Radius of Maximum Wind）。该方程考虑了台风移动和近地面径向剖面（而非梯度风速），但使用了0.865的近地面风速折减因子（Surface Wind Reduction Factor, SWRF）进行转换。

在后续研究中，使用简单SWRF从梯度风转换到近地面风速的方法可被TCBL内垂直风剖面的参数化所替代。同时，随着TCBL实地测量的不断丰富，更加精细的径向气压剖面得以发展。梯度气压（风）的径向剖面模型和经验性的TCBL垂直风剖面模型分别在第[3.2.1](#gradient-pressurewind-profile-models)节和第[3.2.2](#vertical-wind-profile-models)节中综述。经验方法的应用可通过联合使用这两类剖面来实施，但本文不再详述。

### 梯度气压/风剖面模型

梯度风/气压剖面是经验方法和所有其他诊断模型的基本输入。梯度平衡关系维持了风和气压剖面之间的联系：


$$
v_{gr} = -\frac{fr}{2} + \sqrt{\left(\frac{fr}{2}\right)^2 + \frac{r}{\rho} \frac{\partial p}{\partial r}}
$$ {#eq-15}


其中$\Delta p$为中心气压差。在RMW附近，旋转风近似（*f* = 0）也适用。通常，该梯度平衡在实际大气中仅近似成立。尽管如此，它是一个有用的基本假设，有助于在TCBL模型中围绕该平衡进行计算。由于该假设适用于方位角平均剖面，梯度剖面模型通常是轴对称的。然而，可以解除该限制以产生非对称梯度剖面，作为考虑TCBL风场不对称性的工具。以下第[3.2.1.1](#axisymmetric-gradient-profiles)节和第[3.2.1.2](#asymmetric-gradient-profiles)节分别介绍轴对称和非对称梯度剖面。作为确定梯度剖面参数的输入，与TCBL模型相关的台风路径模型也在第[3.2.1.3](#tc-track-model)节中简要综述。

#### 轴对称梯度剖面

以下特别介绍两种常用剖面。

(1) Holland剖面([Holland 1980](#ref-holland-1980))：

$$
p = p_c + \Delta p \exp\left(-A / r^B\right) \qquad RMW = A^{1/B} \qquad v_{\max} = \sqrt{\frac{B}{\rho e} \Delta p}
$$ {#eq-16}

其中$p_c$为台风中心气压；$v_{\max}$为最大梯度风速。*A*和*B*均为通过拟合侦察测量的气压剖面来确定的参数。Holland-B参数的引入使该剖面具有很强的观测匹配能力。因此，它以最少的参数提供了与观测的良好一致性，特别适合PBWE中的蒙特卡罗台风模拟。该剖面后由([Holland et al. 2010](#ref-holland-2010))改进，通过加入扰动项使其能表示双眼壁结构的次级风速极大值。

(2) Willoughby剖面([Willoughby and Rahn 2004](#ref-willoughby-2004); [Willoughby et al. 2006](#ref-willoughby-2006))：

$$
V(r) = \begin{cases} V_i = v_{\max}\left(\dfrac{r}{RMW}\right)^n, & (0 \leq r \leq R_1) \\ V_i(1 - w) + V_o w, & (R_1 \leq r \leq R_2) \\ V_o = v_{\max} \exp\left(-\dfrac{r - RMW}{X_1}\right), & (R_2 \leq r) \end{cases}
$$ {#eq-17}

其中$w$为权重函数；$V_i$和$V_o$分别表示RMW附近过渡区内外的径向风剖面。外层部分可用另一个指数项进行扩展。该剖面能以令人满意的精度拟合几乎所有实测台风径向风剖面。Chavas et al. ([2015](#ref-chavas-2015); [2016](#ref-chavas-2016))沿类似思路提出了一个融合内核和外核风剖面的模型，但纳入了更多动力学考量。然而，该剖面的适应性源于其参数数量较多，因此更适合表征台风气象特征，而非PBWE应用。

还有其他一些值得关注的剖面模型。Emanuel剖面\[([Emanuel 2004](#ref-emanuel-2004))，式(45)\]与其台风潜在强度理论无缝衔接，因此适用于台风强度预测。[Kepert (2013)](#ref-kepert-2013)和[Wood et al. (2013)](#ref-wood-2013)提出了表示次级眼壁形成期间同心眼壁的径向风剖面。径向气压和风剖面的全面综述和比较评估可参见([Holland et al. 2010](#ref-holland-2010); [Davidson and Ma 2012](#ref-davidson-2012); [Lin and Chavas 2012](#ref-lin-2012); [Ma et al. 2012](#ref-ma-2012); [Chavas and Lin 2016](#ref-chavas-2016))，重点关注其与观测的匹配能力以及驱动台风模拟的适用性。由于TCBL结果对径向剖面的选择十分敏感，这些模型对PBWE的影响仍有待进一步研究。

#### 非对称梯度剖面

如前所述，大多数研究假设径向气压剖面沿方位角不变，基于所有方位角上的梯度平衡。然而，为了将不对称性引入轴对称（柱）TCBL模型或上述经验近地面风模型，一些研究者发展了沿方位角变化的梯度气压/风剖面。例如，[Xie et al. (2006)](#ref-xie-2006)定义了沿方位角变化的RMW及相应的气压剖面：

$$
p(r, \varphi) = p_c + \Delta p \, e^{-[RMW(\varphi)/r]^B} \qquad RMW(\varphi) = C_1 \varphi^{n-1} + C_2 \varphi^{n-2} + \cdots + C_{n-1} \varphi + C_n
$$ {#eq-18}

其中$C_n$为一组通过拟合观测确定的多项式系数。[Guo and van de Lindt (2019)](#ref-guo-2019)采用了类似思路，以同时考虑平移引起的和陆地引起的不对称性。然而，参数数量的增加限制了该类模型在PBWE中的适用性。

此外，即使气压剖面本身沿方位角不变，也可产生另一种形式的非对称梯度风模型：


$$
v_{gr}(r, \varphi) = \frac{1}{2}\left[(fr - V_T \sin \varphi)^2 + 4r\rho^{-1}\frac{dp}{dr}\right]^{1/2} - \frac{1}{2}(fr - V_T \sin \varphi)
$$ {#eq-19}


Georgiou ([1985](#ref-georgiou-1985))、Tryggvason et al. ([1976](#ref-tryggvason-1976))和[Meng et al. (1995)](#ref-meng-1995)采用该梯度风剖面来获得近地面风场的不对称性。该非对称梯度风剖面出现在经典文献中\[例如([Haltiner and Martin 1957](#ref-haltiner-1957); [Myers and Malkin 1961](#ref-myers-1961))\]，是在假设圆形梯度气压涡旋的条件下，沿流线而非等压线施加平衡而推导得到的。这一处理反映了一种不同于传统轴对称梯度平衡的引导气流处理方式。

由于可靠观测资料有限，非对称梯度风和气压剖面的检验颇具挑战性。相比之下，轴对称梯度平衡在方位角平均意义下，已在气压与跟随台风中心的风速之间得到验证([Kepert 2006b](#ref-kepert-2006b); [Kepert 2006a](#ref-kepert-2006a); [Schwendike and Kepert 2008](#ref-schwendike-2008); [Ramsay et al. 2009](#ref-ramsay-2009))。因此，非对称梯度公式在TCBL建模中的适用性仍不确定，有待进一步研究。

#### 台风路径模型

如PBWE中台风事件多尺度模拟框架所讨论的（第[1.2](#multi-scale-simulation-of-tropical-cyclones)节），TCBL模拟需要宏观尺度的输出作为输入。这些输入包括梯度气压或风剖面参数，如台风强度（中心气压差或最大风速）、Holland-*B*参数、RMW及相关量。在实践中，这些参数可通过单位圆法（Circular Sub-region Method, CSM）或全路径方法生成。

在全路径方法之前，CSM被首先提出并系统化，该方法直接从台风特征参数的统计分布中抽样([Russell 1971](#ref-russell-1971); [Batts et al. 1980](#ref-batts-1980); [Georgiou 1985](#ref-georgiou-1985))。相比之下，全路径方法以固定时间间隔模拟台风特征的时间演变([Vickery et al. 2000b](#ref-vickery-2000b))。虽然CSM更为简便，但在台风统计数据不足的地区，全路径方法是必要的，因为CSM所需的参数分布无法可靠建立。

全路径方法包括台风生成和消散模型，更重要的是台风路径模型。路径建模的研究仍在活跃进行中，许多新的公式不断涌现，这些进展基于台风物理、统计技术和机器学习方法的发展\[例如([Cui and Caracoglia 2019](#ref-cui-2019); [Hong and Li 2021](#ref-hong-2021))\]。尽管这些模型通常基于观测记录进行校准，但很难确定哪个路径模型始终优于其他模型，因为模型间的差异可能很大。采用集合方法对多个模型的结果进行平均，可能有助于减少与路径模型相关的不确定性。

本文重点介绍两个广泛使用的路径模型，一个是统计型的，另一个是统计-物理型的。第一个由[Vickery et al. (2000b)](#ref-vickery-2000b)提出。基本上，它是一个类似自回归的统计路径模型，其参数（移动速度、移动方向和强度）通过历史台风记录校准。梯度气压剖面中的其他参数可由其统计模型\[例如([Vickery and Wadhera 2008](#ref-vickery-2008); [Vickery et al. 2009c](#ref-vickery-2009c))\]根据路径模型预测的参数生成。台风登陆后，其强度可能以登陆后距离/时间的指数函数衰减，由填充模型（filling model）描述([Kaplan and DeMaria 1995](#ref-kaplan-1995); [Vickery and Twisdale 1995](#ref-vickery-1995); [Kaplan and DeMaria 2001](#ref-kaplan-2001))。该模型是最早用于台风模拟的统计路径模型，成为后续模型发展的基准。迄今为止，没有其他路径模型在拟合误差方面表现出更优的性能。

第二个常被引用的台风路径模型由[Emanuel et al. (2006)](#ref-emanuel-2006)提出。该模型属于统计-物理型，求解一个基于统计方法生成的环境风（即250 hPa和850 hPa风场以及β漂移）的微分方程，环境风在驱动台风运动中起主导作用。生成的台风路径信息随后与Emanuel的潜在强度理论([Emanuel 2004](#ref-emanuel-2004))耦合，计算台风强度的时间序列。需要注意的是，先验的潜在强度预测与实测台风强度之间的偏差可高达35 m/s ([Bell and Montgomery 2008](#ref-bell-2008))，这要求对该路径模型进行进一步验证和校准。

### 垂直风剖面模型

#### 近地面风速折减因子（SWRF）

常数SWRF是将梯度风速转换为近地面风场的最直接方法。文献中使用了多种数值，包括0.865 ([Batts et al. 1980](#ref-batts-1980))和0.80 ([Vickery et al. 2000a](#ref-vickery-2000a))。SWRF取值的综合列表见[Vickery et al. (2009a)](#ref-vickery-2009a)。

然而，该方法仅能提供有限但可接受的精度。Powell ([1980](#ref-powell-1980))将SWRF与若干经验性TCBL风剖面进行了对比评估，包括取决于地形相关阻力和热力效应的典型剖面，如莫宁-奥布霍夫相似理论所描述的。结论是，在与近地面风观测的一致性方面，没有任何经验剖面公式优于0.8的简单SWRF。因此，常数SWRF方法被广泛使用，直到更复杂且具有物理基础的方法出现。尽管近几十年来测量不确定性已大幅降低，但在当前观测能力下，重新评估单一SWRF是否仍优于其他公式仍然值得关注。

此外，SWRF可随距台风中心的半径变化，如[Georgiou (1985)](#ref-georgiou-1985)所提出和校准的，取决于下垫面条件（陆地/海面）。

#### TCBL剖面模型

这些剖面模型还刻画了TCBL内风速的垂直分布；相比之下，SWRF中不包含这一分辨能力。它们大多与二维TCBL模型得到的近地面风速配合使用。

Thompson and Cardone ([1996](#ref-thompson-1996))改进了一个早期剖面，该剖面对径向和切向风分量采用不同的公式，参数中包含位温效应。该模型近年由[Wu and Huang (2019)](#ref-wu-2019)修订，引入了非线性拟合程序以简化摩擦速度$u_*$的计算。

通过按近地面风速和距台风中心的半径对下投式探空仪观测数据进行分层，[Vickery et al. (2009b)](#ref-vickery-2009b)提出了另一种垂直风剖面形式：


$$
U(z) = \frac{u_*}{k}\left[\ln\!\left(\frac{z}{z_0}\right) - 0.4\!\left(\frac{z}{H^*}\right)^2\right] \qquad H^* = 343.7 + \frac{0.260}{\sqrt{\left(f + \dfrac{2v_{gr}}{r}\right)\!\left(f + \dfrac{v_{gr}}{r} + \dfrac{\partial v_{gr}}{\partial r}\right)}}
$$ {#eq-20}


其中$u_*$为摩擦速度；$z_0$为表面粗糙长度；$k = 0.4$；$H^*$与TCBL高度$H = 1.12 H^*$（假设取LLJ高度）相关。该公式受线性TCBL模型([Kepert 2001](#ref-kepert-2001))的启发。由于式(@eq-20)不包含方位角依赖性，所得剖面代表轴对称TCBL，仅在方位角平均意义下适用。通过经验调整并与二维平板模型结合，其性能与0.85的常数SWRF进行了对比。结果表明，所提公式可将拟合地面站观测的均方根（RMS）误差降低约27%。该剖面的性能至今未被超越。

尽管上述剖面主要源自观测，[Meng et al. (1997)](#ref-meng-1997)和[Ishihara et al. (2005)](#ref-ishihara-2005)基于第[3.1.4](#axisymmetric-linear-analytical-models)节所述三维线性柱模型的TCBL模拟结果，提出了幂函数型垂直风剖面和入流角剖面。该公式的参数定义为局地地形粗糙度、梯度风和惯性稳定度的函数，这些量均沿径向和方位角变化。尽管该模型结构优雅，但尚未针对足够大的观测数据集进行充分验证。

## 参数化模型（II）：基于解析解的线性模型

如前所述，通过线性化非线性项（通常围绕梯度风进行）并引入一系列简化假设，可以从非对称原始方程\[式(@eq-2)和(@eq-3)\]推导出近似的闭合形式解。沿此思路，本小节讨论两组已发展的线性TCBL模型。

### K01模型([Kepert 2001](#ref-kepert-2001))

第一组模型直接基于控制方程并结合线性化的滑移边界条件([Kepert 2001](#ref-kepert-2001))：


$$
\frac{v_{gr}}{r} \frac{\partial u}{\partial \varphi} - v \left( f + \frac{2 v_{gr}}{r} \right) = K \frac{\partial^2 u}{\partial z^2} \qquad \frac{v_{gr}}{r} \frac{\partial v}{\partial \varphi} + u \left( f + \frac{v_{gr}}{r} + \frac{\partial v_{gr}}{\partial r} \right) = K \frac{\partial^2 v}{\partial z^2}
$$ {#eq-21}


通过线性化滑移底部边界条件、利用傅里叶级数展开以及分离垂直和方位角坐标，最终解为：

$$
u(\lambda, z) = u_1(\lambda, z) + u_0(z) + u_{-1}(\lambda, z)
$$ {#eq-22}

即波数0和波数1方位角变化的叠加。该模型受到台风中埃克曼层早期研究的启发([Eliassen 1971](#ref-eliassen-1971); [Kuo 1982](#ref-kuo-1982))。它基于四个关键假设：(1)垂直湍流扩散*K*在垂直方向和方位角上保持常数，但可随径向变化，因为线性化方程在每个径向坐标上分别求解；(2)表面阻力系数沿方位角保持常数；(3)移动速度远小于台风最大风速，以使表面阻力项可以线性化；(4)忽略垂直平流。

该模型的性能和TCBL的物理机制已被深入研究。它无需预设参数化风剖面即可解析垂直结构，因而比第[3.5](#simulation-based-models-ii-2d-hybrid-models)节中的混合模型能更有效地再现LLJ。此外，该模型与KW01非线性模型的简要比较总结在第[3.6.6.2](#comparison-to-parametric-models)节中。

进一步地，假设(4)已被部分放松，即重新引入垂直平流，同时假设常数、不随高度变化的垂直速度剖面([Kepert 2002](#ref-kepert-2002); [Kepert 2006b](#ref-kepert-2006b))。这一改进近年被重新提出([Snaiki and Wu 2020](#ref-snaiki-2020); [Yang et al. 2021](#ref-yang-2021))。

### 考虑不对称性的轴对称模型

如第[3.1.4](#axisymmetric-linear-analytical-models)节所述，通过引入式(@eq-19)所示的非对称梯度平衡，轴对称模型可被重新表述为随方位角变化的柱模型。由此，轴对称线性模型能够表征非对称的TCBL特征。这正是发展此类具有高度分辨能力的柱模型的动机([Meng et al. 1995](#ref-meng-1995))。关键原因在于，不同方位角或半径处的解彼此独立，使得该公式实质上是一组以方位角和半径为索引的柱模型。

然而，该模型产生的平移引起的不对称性与本节K01模型中三个谐波分量叠加所表示的模式不同。非对称梯度风方法无法完全捕捉K01解中具有高度分辨的方位角平流。另一方面，允许湍流扩散和阻力系数沿方位角变化，为再现不对称性提供了一定能力。因此，比较这两个模型对于评估它们的相对精度具有重要价值。

### 近期进展

近年来试图改进上述两个线性模型的尝试并非总是成功的。为了纳入高度依赖位温的影响，[Huang and Xu (2013)](#ref-huang-2013)和[Fang et al. (2018)](#ref-fang-2018)在柱线性模型中引入了随高度变化的梯度风。在此修改下，控制方程变为具有高度依赖系数的微分方程，无法用原有的傅里叶级数方法求解。这一数学困难尚未得到妥善解决。[Fang et al. (2018)](#ref-fang-2018)进一步引入了随高度变化的湍流扩散，导致了类似的困难，尽管[Meng et al. (1997)](#ref-meng-1997)通过数值模拟部分地解决了这一问题。[Snaiki and Wu (2017a)](#ref-snaiki-2017a)通过向控制方程添加一项，将非对称梯度风应用于K01模型，但其推导在数学上不够严格。在后续研究中，[Snaiki and Wu (2017b)](#ref-snaiki-2017b)试图纳入由热力效应引起的随高度分辨的气压梯度，但其公式也遇到了与[Fang et al. (2018)](#ref-fang-2018)类似的未解决数学难题。

一个相对可靠的进展是[Li et al. (2020)](#ref-li-2020)的工作，他们在K01模型的控制方程中引入了指定的随高度变化的湍流扩散，从而去除了*K*为常数的假设。这一修改需要使用中心差分法迭代求解一组额外的常微分方程。然而，湍流扩散必须保持沿方位角不变，且基于其研究结果和该模型与柱模型的概念混合，改进公式的计算成本并不比完全非线性模型低多少。尽管如此，[Li et al. (2020)](#ref-li-2020)的公式为纳入其他参数的高度依赖变化建立了有价值的基础，值得进一步探索。

尽管这些扩展存在局限性，它们仍然提供了线性化原始方程的近似线性解。如果将其结果与KW01三维非线性模型进行比较，可以识别这些改进所带来的提升，从而为其在未来应用中的潜在价值提供参考。
