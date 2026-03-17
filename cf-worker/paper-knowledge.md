# TCBL Review Paper — Compressed Knowledge Base
# 台风边界层模型综述 — 压缩知识库

**Title:** An overview of tropical cyclone boundary layer (TCBL) modeling: From meteorological perspectives to wind engineering applications
**Authors:** Liang Hu, Ahsan Kareem (NatHaz Modeling Laboratory, University of Notre Dame)
**Published:** 2026-03-20 | DOI: 10.1016/j.awe.2025.100097

---

## 1. Introduction / 引言

Tropical cyclones (TCs, hurricanes/typhoons/cyclones) generate extreme near-surface winds threatening civil structures (buildings, bridges, wind turbines, transmission lines). Hurricane Katrina (2005) caused ~$125B loss and 1392 deaths; the 2024 Atlantic season produced $232.27B in losses. Accurate TCBL modeling is essential for performance-based wind engineering (PBWE) and design wind speed determination in TC-prone regions. All civil engineering structures reside within the TCBL.

### 1.1 Performance-Based Wind Engineering (PBWE) / 基于性能的风工程

PBWE is a simulation-based probabilistic framework evaluating structural performance under TC winds. The core integral (Eq. 1):

$$G(PI) = \int\int\int\int G(PI|DM) f(DM|EDP) f(EDP|IP,SP,IM) f(IP|IM,SP) \, d\lambda(IM)$$

where PI = performance indicator (loss), DM = damage, EDP = engineering demand parameter, IP = wind-structure interaction, SP = structural properties, λ(IM) = hazard intensity measure (joint wind speed/direction distribution). Solved by Monte Carlo simulation — generating ensembles of TC wind samples. The intensity measure λ(IM) is the foundational input to PBWE; its accuracy is critical. Unlike prescriptive design using conservative values, PBWE requires probabilistic models reflecting real-world behavior.

### 1.2 Multi-Scale Simulation of TCs / 台风的多尺度模拟

TC simulation spans four scales:
1. **Climate scale (气候尺度):** Global; months–years. Initializes TC events (genesis frequency, location, intensity).
2. **Macroscale (宏观尺度):** ~1000 km; days. TC lifecycle from genesis to decay. TC track models operate here.
3. **Mesoscale (中尺度):** ~100 km; hours. Detailed TC structure at km-scale grids. WRF and TCBL models work here.
4. **Microscale (微尺度):** ~1 km–100 m; hours–minutes. Local terrain effects, wind-structure interaction. WRF-LES or terrain coefficients (gust factors, roughness length).

The **Circular Sub-region Method (CSM)** (Georgiou 1985) generates TCs at a location using local statistics, then uses TCBL models for surface winds. The **full-track method** simulates temporal TC evolution.

### 1.3 Definition of TCBL / 台风边界层的定义

The TCBL is the lowest portion of the troposphere where viscosity is significant:
- **Interfacial sublayer** (~0–10 cm): molecular momentum exchange dominates
- **Flux-constant surface layer** (~10 cm–200 m): shear-generated turbulence drives diffusivity; constant momentum/heat fluxes; near-logarithmic wind profile
- **Mixed layer** (200 m to TCBL top): surface influence diminishes with height

Overall TCBL height: **500–1000 m**, varying with distance from TC center. In KW01, defined by maximum angular momentum height: ~200 m near center to ~1200 m outside the core.

### 1.4 Recent Research on TCBL Characteristics / 台风边界层特征的近期研究

Key TCBL features from observations:
- **Asymmetry (不对称性):** Caused by surface drag, TC translation, vertical wind shear (VWS), extratropical transition, and Beta-gyre. Both storm motion and VWS influence asymmetry.
- **Low-Level Jet (LLJ, 低空急流):** At ~500 m height, wind speed reaches a maximum with supergradient coefficient up to **1.2**. Reproduced by KW01; observed by Franklin et al. (2003) from 600+ dropsonde profiles. Below LLJ, TCBL resembles constant-flux layer with logarithmic near-surface profile.
- **Inflow angle asymmetry:** Zhang and Uhlhorn (2012) identified significant asymmetries from 18 hurricanes.
- **Turbulence structure:** Vertical diffusivity increases from surface to a peak then decreases (Zhang and Drennan 2012). K-profile and Louis-type closures capture this well.
- **Spatiotemporal variations:** Systematic changes from outer to inner core; transitions across convective, post-convective, intensification, weakening phases (Ahern et al. 2019, 2000+ profiles).

### 1.5 Introduction to TCBL Modeling / 台风边界层建模概述

Two major approaches:
- **Physics-based:** Full-physics models (NWP systems) and diagnostic models (simplified)
- **Data-driven:** Bypass gradient wind intermediate steps

**Full-physics TCBL models** = TCBL portion in NWP models (WRF, GFS, CM1). Solve complete primitive equations, span full atmospheric depth. Prognostic (time-evolving). High fidelity but computationally expensive.

**Diagnostic TCBL models** = Simplified; cover lowest 1–3 km. Forcing via gradient wind/pressure at upper boundary. One-way interaction only. Computationally efficient → suitable for Monte Carlo simulation. Sub-categories:
- **Simulation-based:** Solve simplified equations numerically (finite difference) — e.g., KW01, Vickery et al. 2000a
- **Parametric:** Closed-form analytical solutions — e.g., Meng et al. 1995, Kepert 2001
- **Hybrid:** Between simulation-based and parametric — e.g., Langousis et al. 2009

### 1.6 Model Categorization Table / 模型分类表

| Category | Sub-type | Axisymmetric | Asymmetric |
|----------|----------|-------------|------------|
| Diagnostic → Parametric → Empirical | | | Powell (1980) |
| Diagnostic → Parametric → Analytical | | Kuo (1982) | **Kepert (2001)** |
| Diagnostic → Hybrid | | Smith (1968) | Langousis et al. (2009) |
| Diagnostic → Simulation → 2D-slab | | Smith (2003) | Chow (1971), Vickery et al. (2000a,b) |
| Diagnostic → Simulation → 3D nonlinear | | Eliassen & Lystad (1977) | **Kepert & Wang (2001) [KW01]** |
| Full-physics → Dedicated | | Rosenthal (1970) | Anthes (1971, 1981) |
| Full-physics → NWP | | | WRF, GFS, CM1, HAFS |

**KW01 is identified as the most theoretically rigorous diagnostic model and a suitable benchmark for PBWE.**

---

## 2. Full-Physics TCBL Models / 全物理台风边界层模型

These models solve primitive equations with full atmospheric physics (momentum, heat, humidity + radiation, ocean, land-surface, cloud parameterizations). Highly nonlinear; sensitive to grid resolution and parameterization choices. Currently too expensive for large-scale Monte Carlo TC simulation in PBWE. Also rely on data assimilation not feasible in Monte Carlo context.

### 2.1 WRF Model / 天气研究与预报模型

Four modes: **WRF-ARW** (research), **WRF-AHW** (hurricane), **HWRF** (operational, now retired), **HWCM** (hybrid idealized).

#### 2.1.1 WRF-ARW

- **Turbulence parameterization (湍流参数化):** YSU generally outperforms MYJ and others. Grid spacing from 4→36 km can cause up to **30 m/s** variation in surface wind. 1.33 km resolution best for surface gusts. MYJ tends to produce stronger LLJ.
- **Bottom boundary (下垫面):** TC intensity and TCBL structure highly sensitive to surface exchange coefficients. Coarse terrain resolution → inaccurate mean wind profiles.
- **Initial conditions (初始条件):** ECMWF reanalysis outperforms GFS in ensemble framework. Influence on first 48h TCBL is negligible between NCEP-FNL and GFS.
- **Data assimilation (资料同化):** Improves accuracy but not feasible for massive PBWE Monte Carlo simulation.
- **Ensemble prediction (集合预报):** Two approaches — varying model configurations or varying initial conditions. Ensemble prediction differs from PBWE Monte Carlo (same TC perturbed vs. thousands of distinct TCs).

#### 2.1.2 HWRF

Continuous improvements to vertical diffusivity representation under HFIP. Can simulate TCBL accurately. Uses NMM dynamical core; computationally demanding. **Now retired from operations; replaced by HAFS** (Chen et al. 2025).

#### 2.1.3 HWCM (混合WRF气旋模型)

Generates idealized TCs with random parameters, inserts into real environment for landfall simulation. Sensitive to SST and VWS. Applied to climate change impacts and storm surge (200 TC ensemble). Promising for PBWE but needs further verification.

### 2.2 Other Models / 其他模型

JMA non-hydrostatic model (Deardorff-Blackadar scheme favorable), RAMS (Louis parameterization recommended), fvGFS (FV3+GFS physics). LES systems (WRF-LES, CM1) resolve ~100 m but too expensive for PBWE currently.

---

## 3. Diagnostic Models / 诊断模型

Solve quasi-steady primitive equations (Eqs. 2–3) in cylindrical coordinates (r, φ, z):

$$\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial r} + \frac{v+v_{gr}}{r}\frac{\partial u}{\partial \varphi} + w\frac{\partial u}{\partial z} - \frac{v^2}{r} = (f+\frac{2v_{gr}}{r})v + \frac{\partial}{\partial z}(K\frac{\partial u}{\partial z})$$

where v_gr = gradient wind, K = vertical diffusivity, f = Coriolis parameter, u/v/w = radial/azimuthal/vertical winds. Forced by gradient wind v_gr(r) at top boundary. Models form a hierarchy from fully nonlinear 3D (KW01, most accurate) down through 2D-slab, hybrid, parametric (analytical), and empirical methods.

### 3.1 Axisymmetric Models / 轴对称模型

Dropping azimuthal advection yields Eqs. 4–5. Axisymmetric but can be extended to represent asymmetry via column-model approach.

**Sub-types:**
- **Hybrid (混合):** Smith (1968) — Ekman-profile parameterization (Eq. 6), nonlinear 3D but vertically parameterized. Solved by Runge-Kutta. Extended by Langousis et al. (2009) for asymmetry. Kepert (2010b) variant avoids 2D-slab numerical instability. Eliassen (1971) power-series approach. Foster (2009) — separable but non-parameterized profiles.
- **Height-averaged (高度平均):** Smith (2003) — integrates over TCBL height (Eqs. 10–11). Fully nonlinear, reveals supergradient azimuthal winds.
- **Nonlinear analytical (非线性解析):** Kuo (1982) — complex variable formulation (Eq. 12), 1st-order (linear) and 2nd-order (nonlinear) solutions. Reproduces LLJ. Influenced development of Kepert (2001).
- **Linear analytical (线性解析):** Meng et al. (1995) — semi-analytical (Eq. 13). Actually wavenumber-0 component of Kepert (2001) 3D linear model. Can represent asymmetry via asymmetric gradient wind input.

### 3.2 Parametric Models (I): Empirical Methods / 参数化模型（I）：经验方法

Earliest approach (~1970s): gradient wind + empirical conversion to surface wind. Example (Batts et al. 1980, Eq. 14) uses SWRF of 0.865.

#### 3.2.1 Gradient Pressure/Wind Profiles / 梯度气压/风剖面模型

Gradient balance (Eq. 15): $v_{gr} = -fr/2 + \sqrt{(fr/2)^2 + (r/ρ)(dp/dr)}$

**Key axisymmetric profiles (轴对称梯度剖面):**

1. **Holland (1980)** (Eq. 16): $p = p_c + Δp \exp(-A/r^B)$, RMW = A^{1/B}, v_max = √(BΔp/ρe). Holland-B parameter enables flexible fitting. Minimal parameters → ideal for Monte Carlo PBWE. Enhanced by Holland et al. (2010) for secondary wind maximum.

2. **Willoughby (2004/2006)** (Eq. 17): Piecewise profile with inner power law, transition zone, outer exponential decay. Fits nearly all measured profiles. More parameters → better for meteorology than PBWE.

Other notable profiles: Emanuel (2004) — coupled with potential intensity theory; Chavas et al. (2015/2016) — merged inner/outer core.

**Asymmetric gradient profiles (非对称梯度剖面):**
- Xie et al. (2006): Azimuthally varying RMW polynomial (Eq. 18)
- Georgiou (1985)/Meng et al. (1995): Asymmetric gradient wind from axisymmetric pressure + TC translation (Eq. 19)
- Applicability of asymmetric gradient formulations remains uncertain.

#### 3.2.1.3 TC Track Models / 台风路径模型

Two approaches:
- **CSM (Circular Sub-region Method):** Samples TC parameters directly from statistical distributions (Russell 1971, Batts 1980, Georgiou 1985). Simpler but needs sufficient local TC statistics.
- **Full-track method:** Simulates TC evolution at fixed intervals (Vickery et al. 2000b). Necessary where TC stats are limited.

Key track models:
1. **Vickery et al. (2000b):** Auto-regression statistical model. Parameters calibrated from historical records. First and benchmark statistical track model. Includes filling/decay models post-landfall (Kaplan & DeMaria).
2. **Emanuel et al. (2006):** Statistical-physical; solves differential equation based on 250/850 hPa environmental wind. Coupled with potential intensity theory. Discrepancy vs. observed intensity may reach **35 m/s**.

#### 3.2.2 Vertical Wind Profile Models / 垂直风剖面模型

- **SWRF (近地风速折减因子):** Constant values (0.865, 0.80, 0.85). Simple but acceptable. Powell (1980) found SWRF=0.8 competitive with more complex profiles. Can vary radially (Georgiou 1985).
- **TCBL profile models (台风边界层剖面):**
  - Thompson & Cardone (1996): Distinct radial/azimuthal formulations with potential temperature
  - **Vickery et al. (2009b)** (Eq. 20): Log-based profile with TCBL height H* parameter. Inspired by K01. Reduces RMS fitting error by **~27%** vs. constant SWRF. Best-performing profile to date.
  - Meng et al. (1997)/Ishihara et al. (2005): Power-law profile from 3D linear column model simulations.

### 3.3 Parametric Models (II): Analytical Linear Models / 参数化模型（II）：基于解析解的线性模型

#### K01 Model (Kepert 2001)

Linearized governing equations (Eq. 21) with slip boundary conditions. Solution = sum of wavenumber-0 and wavenumber-1 azimuthal variations (Eq. 22). Four key assumptions: (1) K constant vertically/azimuthally, may vary radially; (2) constant azimuthal drag coefficient; (3) V_T << V_max for linearized drag; (4) vertical advection ignored. Resolves vertical structure without prescribed profiles → reproduces LLJ better than hybrid models. Extension: vertical advection reintroduced with constant vertical velocity (Kepert 2002, 2006b).

#### Column Model Accounting for Asymmetry (考虑不对称性的轴对称模型)

Meng et al. (1995) axisymmetric model + asymmetric gradient wind (Eq. 19) → column model varying azimuthally. Cannot fully capture height-resolved azimuthal advection present in K01.

#### Recent Developments / 近期进展

Attempts to enhance linear models (height-dependent K, height-dependent gradient wind, thermal effects) by Huang & Xu (2013), Fang et al. (2018), Snaiki & Wu (2017a/b) encountered unresolved mathematical difficulties. Li et al. (2020) introduced height-dependent K into K01 — more reliable but computational cost comparable to nonlinear model.

### 3.4 Simulation-Based Models (I): 2D-Slab / 模拟型模型（I）：二维平板模型

#### The Model

Height-averaged primitive equations (Chow 1971, Vickery et al. 2000a, Eq. 23) on moving Cartesian coordinates. TCBL height fixed at **1000 m**. Cannot resolve vertical structure — needs SWRF or prescribed profiles for surface wind. Solved by first-order upwind finite difference (Chow 1971) with nested 7-layer grid (innermost 2 km spacing).

#### Key Physics Findings
Shapiro (1983): Nonlinear effects depend strongly on translation speed — minor at V_T=5 m/s, substantial at 10 m/s.

#### Surrogates
Shapiro (1983): Fourier-series approximation (Eq. 24). Vickery et al. (2000a): Non-intrusive linear interpolation of Fourier coefficients.

#### Applications
Widely used in practice. Underpins US design (Vickery 2000b, 2009c), HAZUS software (Vickery et al. 2006), Chinese wind analysis (Xiao et al. 2011, Li et al. 2016). TCRM open-source package includes only parametric models.

### 3.5 Simulation-Based Models (II): 2D Hybrid / 模拟型模型（II）：二维混合模型

Langousis et al. (2009): Extended Smith (1968) axisymmetric hybrid to asymmetric (Eqs. 25–26). Retains all nonlinear advection including vertical. Cost comparable to 2D-slab. But assumes constant K and linearized drag → limited LLJ accuracy. Not benchmarked against KW01.

### 3.6 Simulation-Based Models (III): 3D Nonlinear / 模拟型模型（III）：三维非线性模型

#### 3.6.1 The KW01 Model / KW01模型

Most rigorous diagnostic TCBL model. Evolution from early 3D TC models (Anthes 1972/1981) with only 1 TCBL level → KW01 with multiple levels. Simplifications from full-physics: steady-state, idealized gradient pressure, dry atmosphere, hydrostatic approximation. Uses time-splitting strategy (advection + adjustment + physics), 3rd-order upwinding scheme, MYJ level-2.25 turbulence closure (TKE + Richardson number dependent). Terrain-following, TC-center-following coordinates. Successfully reproduces LLJ, vertical advection effects, inertial stability features.

#### 3.6.2 The Y08 Model / Y08模型

Yoshida et al. (2008): Independent 3D nonlinear model. Level-2.5 closure, includes humidity and turbulence integral length-scale. Theoretically more complex than KW01 but uses coarser grid and 2nd-order scheme. Isolated from mainstream development; relationship to KW01 not well explored.

#### 3.6.3 Linearization / 线性化

KW01 has linearized counterparts: K01 (3D linear analytical), Meng et al. (1997) semi-analytical with MYJ closure, Li et al. (2020) K01 + height-dependent K. Their practical utility vs. KW01 needs further assessment.

#### 3.6.4 Validation / 验证

KW01 validated against dropsonde data for hurricanes Georges, Mitch, Danielle (1998), Isabel (2003). Procedure: calibrate TC track from best-track, fit flight-level data to gradient profiles (5 km center error → up to **10 m/s** wind error). KW01 reproduces major kinematic/dynamic TCBL features with meteorologically credible accuracy. Additional validations: Powell et al. (2009) SFMR, Hong et al. (2019) surface stations, Zieger et al. (2021) 17 Australian TCs, Done et al. (2020) 8 US TCs.

#### 3.6.5 Underlying Physics / 内在物理机制

- **Turbulence closure (湍流闭合):** Kepert (2012) evaluated Bulk-Hi-Res, Louis, MYJ, KPP(YSU). Louis and MYJ recommended (lower RMS errors). KPP not superior (unlike in WRF studies).
- **Vertical advection (垂直平流):** Increases LLJ height/strength by ~**50%** (radial wind advection) and height by ~**30%** (azimuthal), decreases azimuthal LLJ strength by ~**10%**. Limited influence on azimuthal surface wind.
- **Landfall (登陆):** Wind speed decay, secondary surface wind maxima, isotach discontinuities, landfall-induced asymmetry analogous to motion-induced asymmetry.
- **Thermodynamics (热力学):** Williams (2016/2017) extended KW01 with humidity, cloud water, rainwater equations.
- **TC evolution (台风演变):** Eyewall replacement cycles (Kepert 2013), sensitivity to drag coefficients and initial vortex structure.
- **Micro-meteorological (微气象):** Roll vortices (Gao & Ginis 2014, driven by radial wind inflection points), rainbands (Kepert 2018, may alter surface winds >**10%**).

#### 3.6.6 Comparison to Other Models / 与其他模型的对比

**vs. 2D-slab (与二维平板模型):**
- Kepert (2010a/b): Significant differences in surface wind fields. 2D-slab produces excessive inflow angles, unrealistic sensitivity to Coriolis parameter, artificial oscillations. Translation-induced asymmetry in 2D-slab can be **several times larger** than in KW01. Kepert noted that empirical tuning in 2D-slab models has "concealed fundamental deficiencies."
- Williams (2015): Extreme wind speed differences up to **50%**. Shock-like feature near RMW in 2D-slab absent in KW01.

**vs. Parametric (linear) models (与参数化模型):**
- KW01 differs from K01 in: retaining nonlinear terms, turbulence closure, vertical advection, spatially varying drag. K01 fails to reproduce peak jet near eyewall due to inertial instability. Radial surface winds differ by ~**10%** for concentric eyewalls. Linear model produces excessive fluctuations without filtering.

**vs. Full-physics (CM1, WRF) (与全物理模型):**
- CM1: LLJ height/strength relative difference <**5%** (Fei et al. 2021).
- WRF: KW01 captures most significant TCBL features. Interestingly, linear K01 sometimes agrees more closely with WRF than nonlinear KW01.

#### 3.6.7 Applications / 应用

KW01's PBWE application remains limited due to: no open-source implementation, accuracy not fully established for PBWE-specific needs, higher computational cost than parametric models (~**216 CPU hours** for 24h TC evolution for 714 global footprints in Done et al. 2020). A dedicated bridging effort is needed.

---

## 4. Data-Driven Methods / 数据驱动方法

Bypass gradient wind intermediate steps; produce asymmetric surface wind fields directly from TC parameters.

### 4.1 Modifying Radial Profiles / 非对称径向剖面

- Xie et al. (2006): Azimuthally varying RMW via polynomial, calibrated to gale radii (R64)
- Hu et al. (2012): Added translation asymmetry + combined R43/R50/R64 calibration
- MacAfee & Pearson (2006): 5 profiles with azimuthally varying parameters at 16 sectors, statistical models from 605 H*Wind snapshots

### 4.2 Introducing Additional Asymmetries / 引入额外不对称性

- **Knaff et al. (2007/2018) CLIPER model** (Eq. 27): Modified Rankine + wavenumber-1 asymmetry. Four coefficients regressed from TC parameters using thousands of gale-radius records. Practical candidate for PBWE Monte Carlo.
- **Chang et al. (2020):** Holland profile + VWS-dependent wavenumber-1 harmonics. VWS term provides marginal improvement.
- **Yang et al. (2022):** Bessel-function basis + XGBoost with 20+ environmental predictors. Good fit but many parameters limit PBWE practicality.

### 4.3 POD-Based Models / 基于正交分解（POD）的模型

Loridan et al. (2017, Eq. 28): Reconstructs surface wind from 3 POD modes of 1580 WRF-simulated fields (30 TCs). Modal coordinates from random forest. Limitation: omits VWS as predictor.

**Overall assessment:** Data-driven methods show encouraging reconstruction ability but no clear winner. Advantages over physics-based models in accuracy not demonstrated. Knaff et al. (2007) most practical for PBWE (large dataset, directly uses TC track parameters). Machine learning surrogates (e.g., GraphCast-style) expected to become more viable.

---

## 5. Systematic Investigation at NatHaz / NatHaz实验室的系统性研究

### 5.1 Motivation / 研究动机

KW01 is most rigorous diagnostic model but not adopted in PBWE. Current PBWE relies on 2D-slab and parametric models (simplified from KW01). Introducing KW01 into PBWE is necessary to enhance accuracy and reduce uncertainty.

### 5.2 Objectives / 研究目标

Four objectives:
1. Evaluate influence of model configuration/parameterizations on TCBL winds through extensive idealized simulations spanning feasible TC parameter ranges
2. Construct benchmark validation dataset and comprehensively validate the 3D nonlinear model
3. Develop hierarchy of linear TCBL models and compare with 3D nonlinear model
4. Investigate land-sea roughness contrast effects on landfalling TC TCBL

### 5.3 Overview of Work / 工作概述

**(1) Factor analysis:** Four key factors (algorithm order, thermal effects, vertical diffusivity, surface drag coefficients). Influence concentrated near RMW, exhibits asymmetric spatial patterns. Magnitude typically within **22%**. Evaluated across VMax, VT, Holland-B parameter space.

**(2) Benchmark dataset:** **692 sorties** combining Flight+ reconnaissance input with output measurements (surface stations, SFMR, H*Wind, dropsonde). **82 sorties** contain all three output types for comprehensive comparison.

**(3) Linear model hierarchy:** Unified governing equations for axisymmetric/asymmetric gradient wind. Height-dependent K, asymmetric gradient winds, thermal profiles incorporated via semi-analytical solutions. Enhanced column model with wind-dependent drag and height-dependent K. Results: height-resolving column model is reasonable approximation under certain conditions.

**(4) Land-sea roughness contrast:** Even remote coastlines can distort surface wind near eyewall. Decomposed into transitional + global distortion components (both interact with translation-induced asymmetry). May alter overall and surface over-ocean winds by approximately **22%** and **14%** respectively.

---

## 6. Concluding Remarks / 结论与展望

### Key Conclusions
- Full-physics models (WRF, CM1) are most accurate but too expensive for PBWE (as of 2025)
- Diagnostic models are preferred for PBWE; KW01 3D nonlinear model is the benchmark
- 2D-slab models have fundamental deficiencies masked by empirical tuning
- KW01 needs to be incorporated into PBWE with proper validation and efficient algorithms

### Future Research Needs / 未来研究方向

1. **Incorporate KW01 into PBWE:**
   - Develop statistical models for factor variability in terms of TC parameters
   - Investigate alternative radial profile models beyond Holland
   - Code and compare all diagnostic models using idealized + benchmark dataset
   - Develop statistical model for land-sea roughness-induced asymmetry

2. **Microscale coupling:** Use TCBL outputs (especially KW01) as mean state for rainbands, tornado-scale vortices, nonstationary turbulence. Quantify uncertainty propagation from mesoscale to microscale.

3. **Uncertainty propagation to PBWE:** Assess TCBL model uncertainty impact on annual maximum wind speeds and loss ratios.

4. **Benchmark dataset expansion:** Incorporate SAR, SMAP, MTCSWA data; improve dropsonde calibration; add overland TC sorties.

5. **Data-driven hybrid models:** Combine TCBL model output with ML-based asymmetry components; multi-fidelity modeling; ML surrogates trained on KW01 simulations.

---

## Key Equations Reference

| Eq. | Description |
|-----|-------------|
| 1 | PBWE total probabilistic integral |
| 2–3 | 3D primitive equations in cylindrical coordinates (diagnostic model basis) |
| 4–5 | Axisymmetric primitive equations |
| 6 | Smith (1968) hybrid wind profile parameterization |
| 12 | Kuo (1982) complex-variable formulation |
| 13 | Meng et al. (1995) linear analytical solution |
| 14 | Batts et al. (1980) empirical surface wind |
| 15 | Gradient balance equation |
| 16 | Holland (1980) pressure profile |
| 17 | Willoughby (2004/2006) wind profile |
| 19 | Asymmetric gradient wind with TC translation |
| 20 | Vickery et al. (2009b) vertical wind profile |
| 21 | K01 linearized governing equations |
| 22 | K01 solution (wavenumber 0+1 superposition) |
| 23 | 2D-slab governing equations |
| 27 | Knaff et al. (2007) CLIPER model with wavenumber-1 |
| 28 | Loridan et al. (2017) POD reconstruction |

## Key Numerical Values

- TCBL height: 500–1000 m (200 m near center to 1200 m outside core)
- LLJ height: ~500 m; supergradient coefficient: up to 1.2
- SWRF values: 0.80–0.865 (commonly used)
- Grid spacing impact: 4→36 km = up to 30 m/s difference (WRF-ARW)
- Optimal WRF grid for surface gusts: 1.33 km
- TC center error 5 km → wind error up to 10 m/s
- Vertical advection effect on LLJ: +50% (height/strength via radial wind)
- 2D-slab vs KW01 extreme wind difference: up to 50%
- KW01 vs CM1 LLJ difference: <5%
- Land-sea roughness effect: ~22% overall, ~14% surface over-ocean
- KW01 factor influences: typically within 22%
- Benchmark dataset: 692 sorties, 82 with all three output types
- Done et al. (2020): 714 global TC footprints, ~216 CPU hours per 24h TC
- Emanuel track model intensity discrepancy: up to 35 m/s
- Vickery (2009b) profile: 27% RMS error reduction vs constant SWRF
