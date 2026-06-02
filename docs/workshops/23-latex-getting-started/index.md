# LaTeX I: Getting Started with Academic Writing in LaTeX

<div class="session-meta" markdown="1">

| Field | Details |
| --- | --- |
| Date | 3 June 2026 |
| Time | 14:00 - 15:30 |
| Location | House of Prominence, Attic (Top floor), Luxemburger Str. 299, Cologne |
| Speakers | TBC |
| Prerequisites | No prior LaTeX experience required. Bringing a laptop is recommended. |
| Materials status | Slides are available. |
| Slides / recording | See slides.qmd in this folder. |

</div>

## Overview

This beginner-friendly session introduces LaTeX as a writing environment for
academic documents. Starting from scratch, participants learn the structure
of a LaTeX document, core markup commands, and how to choose an editor that
fits their workflow. The session also covers bibliography basics with Zotero
and BetterBibTeX, and closes with a hands-on exercise.

## Learning Objectives

- Understand what LaTeX is and when it is useful for academic writing
- Write and compile a minimal LaTeX document
- Use basic markup: text formatting, math, figures, tables, and cross-references
- Choose an appropriate editor (web-based or local)
- Know the difference between LaTeX distributions and when to use each
- Understand how Zotero and BetterBibTeX connect to a LaTeX project

## Topics Covered

### LaTeX Basics

- What LaTeX is; why researchers use it
- Document structure: preamble and body; `\documentclass`, `\usepackage`
- Commands, environments, and comments
- Text formatting and lists
- Math: inline `$...$`, display `\[...\]`, and numbered equations
- Figures, tables, and cross-references with `\label`/`\ref`

### Tooling and the Local Installation Problem

- Why local LaTeX setups are fragile (package versions, merge conflicts)
- LaTeX distributions: TeX Live, MiKTeX, TinyTeX
- Editors: Overleaf, Prism (OpenAI), TeXlyre, TeXstudio, VS Code + LaTeX Workshop
- Alternatives: Typst, Quarto/MyST, Lattics, Obsidian, Typora

### Reproducible Research

- Plain LaTeX, R Markdown, Quarto, and Jupyter in reproducible workflows

### Learning Resources

- lshort, DKZ.2R workshop materials, Overleaf Learn, CTAN, tex.stackexchange.com

### Collaborative LaTeX

- Overleaf and the Sciebo-linked instance at Universität zu Köln

### Bibliography: First Look

- Zotero: collecting and organising references
- BetterBibTeX: continuous auto-export to `.bib`

### AI and LaTeX

- Opportunities: AI assistance with LaTeX syntax and code
- Concerns: AI-generated scientific content and the impact on peer review

## Materials

Slides are in `slides.qmd`. Compile with Quarto to produce `slides.html`.
A hands-on APA 7 paper template is in `test.tex` (companion: `references.bib`).

## Additional Resources

- [lshort — The Not So Short Introduction to LaTeX](https://www.ctan.org/pkg/lshort)
- [DKZ.2R: LaTeX for Novices — Academic Publishing](https://dkz2r.github.io/latex-novice-academic-publishing/)
- [Overleaf Learn — LaTeX documentation](https://www.overleaf.com/learn)
- [Prism — OpenAI's AI-native LaTeX workspace](https://prism.openai.com)
- [TeXlyre — Open-source, local-first LaTeX editor](https://texlyre.github.io/texlyre/)
- [LaTeX/Introduction — Wikibooks](https://en.wikibooks.org/wiki/LaTeX/Introduction)
- [CTAN — Comprehensive TeX Archive Network](https://ctan.org)
- [Zotero — Reference Manager](https://www.zotero.org)
- [BetterBibTeX for Zotero](https://retorque.re/zotero-better-bibtex/)
- [tex.stackexchange.com](https://tex.stackexchange.com)
