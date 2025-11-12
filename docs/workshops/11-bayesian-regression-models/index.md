# Bayesian Mixed Effects Models with brms for Linguists

**Date:** 12. November 2025  
**Time:** 14:00 - 15:30  
**Speaker:** Job Schepens (Project S, CRC 1252)

## Workshop Summary

This workshop covers the fundamentals of **Bayesian mixed effects modeling using brms**, with a focus on two common psycholinguistics experiments:

1. **Reaction Time (RT) data** — continuous response times (log-transformed)
2. **Grammaticality Judgments** — binary acceptability judgments (logistic regression)

We will learn how to specify domain-specific priors, validate them with prior and posterior predictive checks, and interpret Bayesian mixed effects models. The workshop emphasizes practical implementation in R and understanding the Bayesian workflow.

## Learning Objectives
- Understand how to set domain-specific priors instead of using defaults
- Validate priors with prior predictive checks
- Fit mixed effects models with brms
- Assess model adequacy with posterior predictive checks
- Interpret posterior distributions and credible intervals
- Understand hyperpriors and regularization of random effects

## Core Topics (60-75 min)

1. **Setting Priors in brms** 
   - Flat, weakly informative, and regularizing priors
   - Hyperprior standard deviations for random effects

2. **Prior Predictive Checks** 
   - Validating prior assumptions before model fitting

3. **Posterior Predictive Checks** 
   - Assessing model adequacy after fitting


## For Later Discussion
- Sensitivity analysis with different priors
- Convergence diagnostics (Rhat, ESS, mcmc_plot, mcmc_dens_overlay)
- Inference with hypothesis() and ROPE
- Model comparison with Bayes Factors and LOO cross-validation
- Other dependent variable types (count, ordinal, bounded)

## Materials & Resources

**Full workshop materials:** [brms-ws GitHub repository](https://github.com/jobschepens/brms-ws)

**References:**
- [brms documentation](https://paul-buerkner.github.io/brms/)
- [Stan prior choice recommendations](https://github.com/stan-dev/stan/wiki/Prior-Choice-Recommendations)

## Related
- See schedule entry in `agenda/winter-2025-26-schedule.md` for context.
