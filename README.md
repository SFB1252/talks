# Research Data and Methods Workshop Series

[![Site](https://img.shields.io/badge/site-online-blue?logo=github&logoColor=white)](https://sfb1252.github.io/talks)
[![Schedule](https://img.shields.io/badge/schedule-Winter_2025--26-blueviolet)](https://sfb1252.github.io/talks/agenda/winter-2025-26-schedule/)
[![Docs](https://img.shields.io/badge/docs-MkDocs%20Material-3DDC84?logo=readthedocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)
[![License](https://img.shields.io/github/license/sfb1252/talks)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github-actions)](https://github.com/SFB1252/talks)
[![Python](https://img.shields.io/badge/python-3.8+-blue?logo=python&logoColor=white)](https://www.python.org)
[![MkDocs](https://img.shields.io/badge/MkDocs-1.6+-lightblue?logo=markdown&logoColor=white)](https://www.mkdocs.org)
[![Workshops](https://img.shields.io/badge/workshops-12-orange)](https://sfb1252.github.io/talks/workshops/)
[![Made with](https://img.shields.io/badge/made%20with-❤️%20in%20Cologne-red)](https://www.uni-koeln.de)
[![Open Science](https://img.shields.io/badge/Open%20Science-✓-success)](https://sfb1252.github.io/talks)
[![Research Data](https://img.shields.io/badge/Research%20Data-Management-informational)](https://sfb1252.github.io/talks/workshops/02-research-data-management/)

Workshop series on research data management, ethics, literature management, and
corpus linguistics tools for researchers at the University of Cologne's CRC
1252 - Prominence in Language.

- Live site: https://sfb1252.github.io/talks
- Winter 2025-26 schedule: docs/agenda/winter-2025-26-schedule.md

## About

This repository hosts the public website and materials for the workshop series,
built with MkDocs and the Material theme.

## Quick links (current series)

- 07 — Coding in R Basics: https://sfb1252.github.io/talks/workshops/07-coding-r-basics/
- 08 — Online Experiments: https://sfb1252.github.io/talks/workshops/08-online-experiments/
- 09 — Archiving Session: https://sfb1252.github.io/talks/workshops/09-archiving-session/
- 10 — Coding in Python/VSCode and LLMs: https://sfb1252.github.io/talks/workshops/10-coding-python-vscode-llms/
- 11 — Bayesian Regression Models: https://sfb1252.github.io/talks/workshops/11-bayesian-regression-models/
- 12 — Computational Reproducibility using R: https://sfb1252.github.io/talks/workshops/12-computational-reproducibility-r/

## Getting started (MkDocs)

Local development requires Python. Recommended steps:

1. Create and activate a virtual environment (optional)
2. Install dependencies
3. Serve locally for live preview

```powershell
# From the repo root
python -m venv .venv
. .\.venv\Scripts\Activate.ps1
# If requirements.txt exists:
pip install -r requirements.txt
# Otherwise:
# pip install mkdocs mkdocs-material
mkdocs serve
```

The site will be available at http://127.0.0.1:8000.

Build static files:

```powershell
mkdocs build
```

This outputs the site into the `site/` folder.

## Deployment

The site is published via GitHub Pages at https://sfb1252.github.io/talks.
Pushing to `main` triggers publication (serving the contents of `site/`).

If links are not working immediately after deployment, allow 5–10 minutes for
GitHub Pages to update.

## Repository structure

```
├── docs/                       # All site content (MkDocs source)
│   ├── index.md                # Front page
│   ├── agenda/                 # Workshop schedules
│   ├── workshops/              # Workshop materials (01-12)
│   ├── calendar/               # Calendar integration files
│   ├── flyers/                 # Promotional materials
│   ├── resources/              # Additional resources
│   ├── onboarding/             # Onboarding materials
│   ├── retreat/                # Retreat materials
│   ├── presenter-resources/    # Presenter guidelines
│   ├── evaluation/             # Workshop evaluation system
│   └── stylesheets/            # Custom CSS
├── site/                       # Built static site (mkdocs build output)
├── mkdocs.yml                  # MkDocs configuration
├── requirements.txt            # Python deps for MkDocs/Material
└── README.md                   # This file
```

## Contributing

We welcome contributions to improve our workshop materials. See our
[contributing guide](about/contributing.md) for details on how to contribute.

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE)
file.

## Contact

This workshop series is part of the CRC 1252 "Prominence in Language" research
initiative at the University of Cologne.
