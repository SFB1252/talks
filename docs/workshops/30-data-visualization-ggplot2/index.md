---
ai-assistance: heavy
---

# Data Visualization with ggplot2

**Workshop 30 - Winter Semester 2026-27**

<div class="session-meta" markdown="1">

| Field              | Details                                                               |
| ------------------ | --------------------------------------------------------------------- |
| Date               | 18 November 2026                                                      |
| Time               | 14:00 - 15:30                                                         |
| Location           | House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne |
| Speaker            | Job Schepens                                                          |
| Prerequisites      | Basic familiarity with R and RStudio                                  |
| Materials status   | Available — core, advanced, and SFB domain decks, R scripts, and data. |
| Slides / recording | [Core deck](slides.html) · [Advanced deck](slides-advanced.html) · [SFB domain deck](slides-sfb.html) |

</div>

## Overview

A three-part workshop on `ggplot2`. The **core deck** builds the grammar and the
habits of honest figures; the **advanced deck** continues with scales, models,
uncertainty, composition, and publication; the **SFB domain deck** applies both
to the data shapes of prominence research — F0 contours, vowel spaces, speaker
and item effects, ordinal ratings, corpus counts, and missing data.

Effective data visualization is central to communicating research findings accurately and persuasively. This session takes participants from basic exploratory plots to publication-quality figures using R's `ggplot2` ecosystem. It is taught as a theory-first introduction followed by an optional advanced sequel and a domain appendix for CRC 1252 members.

## Materials

- **[Core slides](slides.html)** — perception, the grammar, layers in practice, integrity, and hands-on
- **[Advanced slides](slides-advanced.html)** — scales, guides, coordinates, stats, models, uncertainty, and publication
- **[SFB domain slides](slides-sfb.html)** — contours, vowel spaces, individuals, ratings, counts, models, and data care
- **Companion scripts:** [`scripts/ggplot2-intro.R`](scripts/ggplot2-intro.R) (core), [`scripts/ggplot2-advanced.R`](scripts/ggplot2-advanced.R) (advanced), and [`scripts/make-prominence-data.R`](scripts/make-prominence-data.R) (generates the domain dataset)
- **Data:** `data/prominence_trials.csv`, `data/penguins.csv`, `data/gapminder.csv`, `data/SAFI_clean.csv`, `data/datasaurus.tsv`

The **core deck** is the 90-minute session. The **advanced deck** is a sequel for self-study or a follow-up session and assumes the core material. The **SFB domain deck** is a 70-minute appendix for prominence researchers; it assumes both.

## Topics Covered

**Core deck**

- **The Grammar of Graphics:** layers, aesthetics (`aes`), geoms, statistics, scales, coordinates, and facets
- **Common Plotting Pitfalls:** dynamite plots, truncated axes, overplotting, and misleading colour
- **Mapping and grouping:** when a variable is mapped, when it is set, and how groups are implied
- **Honest figures:** the limits of summary statistics and the design of readable plots

**Advanced deck**

- **Scales and guides:** transformations, limits versus zoom, coordinates, and direct labels
- **Under the hood:** the plot object as a specification, statistics, and position adjustments
- **Visualizing Uncertainty:** confidence versus prediction intervals, model predictions, marginal effects, and interactions (`marginaleffects`, `ggeffects`)
- **Polishing for Publication:** theme customisation, accessible colour scales, multi-panel figures with `patchwork`, and high-resolution exports

**SFB domain deck**

- **Contours and spaces:** F0 trajectories, difference curves, and vowel charts with reversed axes
- **Individuals:** caterpillar plots for speaker and item effects, and why a mean ± SE hides both
- **Ratings and counts:** ordinal distributions, Wilson versus Wald intervals, Zipf plots, and dispersion
- **Models and data care:** coefficient plots, posterior densities, IPA and font coverage, small-N disclosure, and missingness
- **Extensions:** which `ggplot2` extensions and domain packages are worth the dependency

## Session Details

- **Date:** 18 November 2026
- **Time:** 14:00 - 15:30
- **Location:** House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne
- **Speaker:** Job Schepens

## Primary Sources & Further Reading

**Core references**

- [ggplot2: Elegant Graphics for Data Analysis (3e)](https://ggplot2.tidyverse.org/#) — The official ggplot2 documentation and book
- [R for Data Science (2e): Data Visualization](https://r4ds.hadley.nz/data-visualize) — Wickham's introduction to visualisation with ggplot2

**Recommended starting point**

- [Data Visualization chapter, Rstats Textbook](https://elenlefoll.github.io/RstatsTextbook/10_Dataviz.html) — Elen Le Foll's accessible introduction

**Tutorials**

- [DataCamp: Data Visualization with R skill track](https://app.datacamp.com/learn/skill-tracks/data-visualization-with-r)
- [Data visualization course materials, University of Cologne (ILIAS)](https://www.edulabs.uni-koeln.de/ilias.php?baseClass=ilrepositorygui&ref_id=21663)
- [Software Carpentry: Plotting with ggplot2](https://swcarpentry.github.io/r-novice-gapminder/08-plot-ggplot2.html)
- [Data Carpentry: Data Visualization with ggplot2](https://datacarpentry.github.io/r-socialsci/05-ggplot2.html)
- [QCBS R Workshop 3: ggplot2](https://r.qcbs.ca/workshop03/book-en/references.html)

**Examples & inspiration**

- [From Data to Viz](https://www.data-to-viz.com/)
- [The R Graph Gallery](https://r-graph-gallery.com/)
- [ggplot2 extension gallery](https://exts.ggplot2.tidyverse.org/gallery/)

**Theory & foundations**

- [R Graphics Cookbook](https://r-graphics.org/) — Practical recipes and reference for base R and ggplot2 graphics
- [Fundamentals of Data Visualization](https://clauswilke.com/dataviz/) — Wilke's guide to making informative figures
- Wilkinson, Leland. 2005. *The Grammar of Graphics* (Statistics and Computing). Secaucus, NJ, USA: Springer-Verlag New York, Inc.

**Advanced topics**

- [marginaleffects](https://marginaleffects.com/) — Predictions, slopes, and comparisons from statistical models
- [ggeffects](https://strengejacke.github.io/ggeffects/) — Tidy marginal predictions and uncertainty
- [ggdist](https://mjskay.github.io/ggdist/) — Visual distributions and uncertainty
- [patchwork](https://patchwork.data-imaginist.com/) — Compose and align multiple panels
- [ggplot2 extension gallery](https://exts.ggplot2.tidyverse.org/gallery/) — Specialised geoms and themes

## ggplot2 Extensions for Prominence Research

The SFB domain deck closes with a tour of extensions. The short version:

**Distributions and labels**

| Package | What it adds | Where it helps |
| --- | --- | --- |
| [ggdist](https://cran.r-project.org/package=ggdist) | Half-eye, dot, and gradient intervals; ROPE shading | Posterior draws, per-speaker effects |
| [ggridges](https://cran.r-project.org/package=ggridges) | Ridgeline densities | F0 or duration distributions per speaker |
| [ggbeeswarm](https://cran.r-project.org/package=ggbeeswarm) | Quasirandom and swarm jitter | Ratings and accuracy with few observations per cell |
| [ggrepel](https://cran.r-project.org/package=ggrepel) | Labels that push away from each other | Vowel labels, speaker IDs, item names |
| [ggtext](https://cran.r-project.org/package=ggtext) | Markdown and HTML in labels | Italics, F~0~, IPA, coloured words in titles |
| [ggpmisc](https://cran.r-project.org/package=ggpmisc) | Equations, tables, and annotations as layers | Model equations inside a panel |
| [ggfittext](https://cran.r-project.org/package=ggfittext) | Text that shrinks to fit its box | Labels inside bars and tiles |

**Layout, categories, colour**

| Package | What it adds | Where it helps |
| --- | --- | --- |
| [ggforce](https://cran.r-project.org/package=ggforce) | `facet_zoom()`, `geom_mark_ellipse()`, `geom_sina()` | Zoom into a crowded vowel region |
| [ggnewscale](https://cran.r-project.org/package=ggnewscale) | A second colour or fill scale in one plot | Points by vowel plus tiles by probability |
| [ggalluvial](https://cran.r-project.org/package=ggalluvial) | Alluvial and Sankey flows | Annotation categories across turns or raters |
| [ggmosaic](https://cran.r-project.org/package=ggmosaic) | Mosaic plots | Condition × response category |
| [ggseqplot](https://cran.r-project.org/package=ggseqplot) | Sequence plots, built on `TraMineR` | Gaze, gesture phase, or annotation state over time |
| [ggupset](https://cran.r-project.org/package=ggupset) | UpSet plots | Which participants or items fall in which condition sets |
| [ggbreak](https://cran.r-project.org/package=ggbreak) | Axis breaks | A gap you must show — label it, or facet instead |
| [scico](https://cran.r-project.org/package=scico) | Perceptually uniform scientific palettes | Sequential and diverging scales for a projector |
| [ggokabeito](https://cran.r-project.org/package=ggokabeito) | Okabe–Ito colour-blind-safe palette | Categorical scales for talks and print |

**Domain packages** (these produce the data frame; the plotting grammar is unchanged)

- [phonR](https://cran.r-project.org/package=phonR) — Lobanov and other normalisations, vowel plotting helpers
- [vowels](https://cran.r-project.org/package=vowels) — reference vowel data and normalisation methods
- [wrassp](https://cran.r-project.org/package=wrassp) — F0, formants, and intensity from the ASSP library
- [emuR](https://cran.r-project.org/package=emuR) — query and plot from speech databases
- [praatR](https://cran.r-project.org/package=praatR) — drive Praat from R
- [quanteda](https://cran.r-project.org/package=quanteda) — corpus statistics that feed the plots
- [tidytext](https://cran.r-project.org/package=tidytext) — token and frequency tables in tidy shape
- [lingtypology](https://cran.r-project.org/package=lingtypology) — typological features and maps

**Worked examples in the deck.** Two slides run four of these packages on real data, so the pattern is visible rather than described:

| Slide | Packages | Data | What it shows |
| --- | --- | --- | --- |
| In practice: acoustic data | `vowels`, `phonR` | `vowels::ohiovowels` — 2 speakers, 24 vowel classes, 426 tokens | Raw Hz separates the two speakers into bands; `normLobanov()` collapses them into one shared space. Speaker means differ by 105 Hz (F1) and 340 Hz (F2) before, and by exactly 0 after. |
| In practice: corpus data | `quanteda`, `tidytext` | `quanteda::data_corpus_inaugural` — 60 speeches, 1789–2025 | `dfm()` → `convert()` → ggplot2 for frequency over time; `unnest_tokens()` → `count()` for per-party top words. |

Both slides make the same point: the domain package stops at the data frame, and the grammar, theme, and honesty rules are unchanged. Two traps are shown explicitly — `normLobanov()` returns `NaN` for a speaker-by-vowel cell with a single token, and dividing corpus counts by the sum of the *selected* words instead of by `ntoken()` produces a meaningless axis.

**How to choose one**

- **Does it still build?** Check the CRAN checks page and the last release date before depending on it in a paper.
- **Does it compose with the grammar?** A geom or scale you can place in a pipeline is safer than a function that returns a finished picture.
- **Can you read the source?** Most extensions are a few hundred lines; the ones that are not are the ones that surprise you.
- **Prefer the layer you understand.** A hand-built `geom_segment()` you can explain beats a helper you cannot.
- **For a paper, fewer dependencies.** Reproducibility is easier when the figure needs three packages, not thirteen.

If the extension saves you a paragraph of explanation in the methods section, keep it. If it hides a choice you would have to defend, build the layer yourself.

## Related CRC 1252 Workshops

- **[Workshop 07: Coding in R Basics](../07-coding-r-basics/index.md)** — Getting started with R
- **[Workshop 20: Advanced R: Working with Data Frames](../20-advanced-r-dataframes/index.md)** — Wrangling data into tidy format for plotting
- **[Workshop 27: lme4 Model Criticism](../27-lme4-model-criticism/index.md)** — Evaluating and interpreting mixed-effects models
- **[Workshop 31: Data Visualization with Other Tools](../31-data-visualization-other-tools/index.md)** — Alternative visualization tools in Python and web technologies

---

[← Back to Workshop Overview](../index.md)
