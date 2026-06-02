# LaTeX II: Thesis Workflows, Bibliography, and Advanced Tools

<div class="session-meta" markdown="1">

| Field | Details |
| --- | --- |
| Date | 17 June 2026 |
| Time | 14:00 - 15:30 |
| Location | House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne |
| Speakers | TBC |
| Prerequisites | Basic familiarity with LaTeX document structure is recommended (Session 1). |
| Materials status | Slides are available. |
| Slides / recording | See slides.qmd in this folder. |

</div>

## Overview

This follow-up session looks at how LaTeX scales to longer academic documents
and collaborative writing. The focus is on practical workflows for theses,
bibliographies, and modular document organization, as well as tools that
integrate LaTeX with the broader research workflow.

## Learning Objectives

- Organize larger LaTeX projects for theses and dissertations using multi-file structure
- Manage bibliographies with Zotero, BetterBibTeX, and `biblatex`/`biber`
- Use Quarto for literate programming with PDF output via LaTeX
- Create programmatic figures with TikZ
- Start from journal and thesis templates
- Read LaTeX error messages and debug common problems

## Topics Covered

### Document Structure for Longer Works

- `report` and `book` document classes
- Multi-file projects: `\input` and `\include`
- Recommended folder structure for theses

### Bibliography Management

- How the LaTeX bibliography pipeline works (`.bib`, `biblatex`, `biber`)
- `.bib` file structure and entry types
- Citation commands: `\parencite`, `\textcite`, `\autocite`

### Zotero and BetterBibTeX

- Building and organising a Zotero library
- BetterBibTeX: cite key patterns and continuous auto-export
- Keeping references in sync between Zotero and your LaTeX project

### Quarto

- Literate programming: combining R/Python code with prose in a single `.qmd` file
- Quarto YAML options for PDF output via LaTeX
- Using `keep-tex: true` for journal submission

### TikZ

- Programmatic figures: shapes, paths, and annotations
- Flowcharts and process diagrams
- Plots with PGFPlots
- Syntax trees with `tikz-qtree`

### Templates and Debugging

- Journal templates from Overleaf, publisher websites, and CTAN
- University thesis templates
- Reading LaTeX error messages; common errors and fixes

## Materials

Slides are in `slides.qmd`. Compile with Quarto to produce `slides.html`.

## Additional Resources

- [Zotero — Reference Manager](https://www.zotero.org)
- [BetterBibTeX for Zotero](https://retorque.re/zotero-better-bibtex/)
- [biblatex documentation (CTAN)](https://ctan.org/pkg/biblatex)
- [Quarto — Scientific Publishing](https://quarto.org)
- [TikZ & PGF documentation](https://ctan.org/pkg/pgf)
- [tikz.dev — TikZ reference](https://tikz.dev)
- [Overleaf thesis templates](https://www.overleaf.com/gallery/tagged/thesis)
- [TeX Stack Exchange](https://tex.stackexchange.com/)
- [A not so short introduction to LaTeX2e](https://tobi.oetiker.ch/lshort/lshort.pdf)
