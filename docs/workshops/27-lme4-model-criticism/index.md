# lme4 Model Criticism

**Workshop 27 - Winter Semester 2026-27**

<div class="session-meta" markdown="1">

| Field              | Details                                                               |
| ------------------ | --------------------------------------------------------------------- |
| Date               | 30 September 2026                                                     |
| Time               | 14:00 - 15:30                                                         |
| Location           | House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne |
| Speaker            | Job Schepens                                                          |
| Prerequisites      | Basic knowledge of R and linear mixed-effects models (`lme4`)         |
| Materials status   | Upcoming workshop — materials will be added before the session.       |
| Slides / recording | Slides and materials will be linked here once available.              |

</div>

## Overview

Diagnostics, assumptions, model comparison, and robust interpretation for `lme4` models.

Linear mixed-effects models fitted with `lme4::lmer()` or `lme4::glmer()` are standard tools across linguistics and cognitive science. However, fitting a model is only the first step. This workshop focuses on **model criticism**: the essential diagnostics, checks, and decisions needed after fitting mixed-effects models to ensure that conclusions are robust, well-specified, and justifiable.

## Topics Covered

- **Residual Diagnostics & Model Assumptions:** Checking linearity, normality of residuals, and homoscedasticity (`performance`, `DHARMa`, residual plots)
- **Random Effects Structure & Singular Fit Warnings:** Diagnosing boundary (singular) fits, correlation parameters near $\pm 1.0$, and strategies for simplifying or regularizing random effect specifications (`trouBBlme4SolveR::dwmw()`)
- **Contrast Coding vs. Post-Hoc Estimation:** Why contrast coding (sum coding) is essential before fitting to stabilize random slopes and avoid singular fits, and why `emmeans` is essential post-fitting for balanced marginal means, interaction slicing, and scale back-transformation
- **Ordinal & Likert Data:** Diagnosing the failure of naive Gaussian models and fitting Cumulative Link Mixed Models (`ordinal::clmm`)
- **Influential Observations & Outliers:** Identifying cluster-level leverage points with `influence.ME` (Subject and Word Cook's distance)
- **Model Comparison & Selection:** Likelihood ratio tests (`anova()`), REML vs. ML rules, AIC/BIC, and Nakagawa's $R^2$
- **Convergence Issues & Optimizers:** Troubleshooting convergence warnings with optimizer benchmarking (`allFit()`)
- **Reporting Mixed-Effects Models:** Best practices and open science reporting checklists (Meteyard & Davies, 2020)

## Session Details

- **Date:** 30 September 2026
- **Time:** 14:00 - 15:30
- **Location:** House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne
- **Speaker:** Job Schepens

## Related CRC 1252 Workshops

- **[Workshop 07: Coding in R Basics](../07-coding-r-basics/index.md)** — Fundamentals of R programming
- **[Workshop 11: Bayesian Mixed Effects Models with brms](../11-bayesian-regression-models/index.md)** — Moving beyond frequentist LMMs with Bayesian hierarchical modeling
- **[Workshop 13: Bayesian Model Comparison Using Cross-Validation](../13-bayesian-model-comparison-cv/index.md)** — Out-of-sample predictive accuracy and model comparison
- **[Workshop 20: Advanced R: Working with Data Frames](../20-advanced-r-dataframes/index.md)** — Data preparation and wrangling in R
- **[Workshop 26: SMLP 2026 Recap Discussion](../26-smlp2026-recap/index.md)** — Summer school recap covering foundational LMMs and Julia MixedModels

---

[← Back to Workshop Overview](../index.md)
