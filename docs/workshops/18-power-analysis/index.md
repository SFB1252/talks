# Sample Size and Power Analysis

**Workshop 18 - Winter Semester 2025-26**

## Overview

This workshop covers the principles of statistical power and sample size calculation for robust research design, with a focus on Bayesian sequential designs using HDI/ROPE criteria. The workshop explores practical approaches to determining sample sizes when both detection (PRESENT) and exclusion (ABSENT) decisions are required simultaneously.

## Learning Objectives

- Understand statistical power fundamentals
- Calculate appropriate sample sizes
- Estimate and interpret effect sizes
- Apply power analysis tools in R

## Topics Covered

- Statistical power fundamentals (Type I/II errors, power curves)
- Frequentist vs. Bayesian approaches to sample size determination
- Bayesian sequential designs with ROPE (Region of Practical Equivalence)
- HDI/ROPE decision rules for PRESENT and ABSENT verdicts
- Simulation-based power analysis
- Effect size estimation and sensitivity analysis
- Tools for power analysis in R (brms, bayestestR)

## Materials

This workshop showcases an exploratory simulation study that demonstrates what's possible with Bayesian sequential designs. The example is based on ongoing research and serves as a practical illustration of the methodology rather than a finished tutorial.

### Main Notebook

- **[Sequential Design Simulation Report](https://jobschepens.github.io/samplesize/)** - Interactive report showing a Bayesian sequential design for an iconic-duration effect study (4 scenarios: Conservative, Realistic, Optimistic, Minimal)
- **[GitHub Repository](https://github.com/jobschepens/samplesize)** - Full simulation code and documentation

### Background Material (Bayesian Workshops)

The sequential design relies heavily on concepts covered in the Bayesian modeling workshop series:

- **[ROPE (Region of Practical Equivalence)](https://jobschepens.github.io/brms-ws/06_rope.html)** - Understanding ROPE-based decision criteria
- **[Bayesian Workshop Materials](https://github.com/jobschepens/brms-ws)** - Full workshop series on Bayesian regression with brms

### Key Concepts

- **Sequential design:** Check for decisions at multiple checkpoints (N = 30, 45, 60, ..., 120) and stop early when evidence is decisive
- **HDI/ROPE:** Declare an effect PRESENT when the 95% HDI lies entirely above ROPE, ABSENT when entirely inside ROPE
- **Dual decisions:** Simultaneously requiring PRESENT (early window) and ABSENT (late window) decisions creates asymmetric power requirements that conventional power analysis cannot address

## Prerequisites

- Basic understanding of statistics and hypothesis testing
- Familiarity with Bayesian concepts (priors, posteriors, HDI) helpful but not required
- Basic R knowledge recommended

## Instructor

**Job Schepens**  
_Project S, SFB 1252_  
University of Cologne

## Session Details

**Date:** 4 March 2026  
**Time:** 14:00 - 15:30  
**Location:** House of Prominence, Attic, Luxemburger Str. 299, Cologne

---

[← Back to Workshop Overview](../index.md)
