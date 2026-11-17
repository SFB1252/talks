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
| Materials status   | Available — core and advanced slide decks, R scripts, and data.       |
| Slides / recording | [Core deck](slides.html) · [Advanced deck](slides-advanced.html)       |

</div>

## Overview

A two-part workshop on `ggplot2`. The **core deck** builds the grammar and the
habits of honest figures; the **advanced deck** continues with scales, models,
uncertainty, composition, and publication.

Effective data visualization is central to communicating research findings accurately and persuasively. This session takes participants from basic exploratory plots to publication-quality figures using R's `ggplot2` ecosystem. It is taught as a theory-first introduction followed by an optional advanced sequel.

## Materials

- **[Core slides](slides.html)** — perception, the grammar, layers in practice, integrity, and hands-on
- **[Advanced slides](slides-advanced.html)** — scales, guides, coordinates, stats, models, uncertainty, and publication
- **Companion scripts:** [`scripts/ggplot2-intro.R`](scripts/ggplot2-intro.R) (core) and [`scripts/ggplot2-advanced.R`](scripts/ggplot2-advanced.R) (advanced)
- **Data:** `data/penguins.csv`, `data/gapminder.csv`, `data/SAFI_clean.csv`, `data/datasaurus.tsv`

The **core deck** is the 90-minute session. The **advanced deck** is a sequel for self-study or a follow-up session and assumes the core material.

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

## Related CRC 1252 Workshops

- **[Workshop 07: Coding in R Basics](../07-coding-r-basics/index.md)** — Getting started with R
- **[Workshop 20: Advanced R: Working with Data Frames](../20-advanced-r-dataframes/index.md)** — Wrangling data into tidy format for plotting
- **[Workshop 27: lme4 Model Criticism](../27-lme4-model-criticism/index.md)** — Evaluating and interpreting mixed-effects models
- **[Workshop 31: Data Visualization with Other Tools](../31-data-visualization-other-tools/index.md)** — Alternative visualization tools in Python and web technologies

---

[← Back to Workshop Overview](../index.md)
