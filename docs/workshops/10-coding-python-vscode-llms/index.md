# Coding in Python/VSCode and LLMs

**Date:** 29. Oktober 2025  
**Time:** 14:00 - 15:30  
**Speaker:** Job Schepens (Project S, CRC 1252)

## Overview

Set up a productive Python development environment with VSCode, essential research libraries, and modern AI-assisted coding practices with LLMs. Includes Git integration and code quality tips.

This workshop covers practical Python development for linguistic research, with hands-on examples, statistical analysis, and LLM-assisted coding workflows.

## Learning Objectives
- Configure Python and VSCode for research workflows
- Use pandas, numpy, matplotlib effectively
- Integrate Git and version control with VSCode
- Apply AI-assisted coding patterns responsibly
- Improve code quality and documentation
- Build reproducible data analysis pipelines

## Topics Covered
- Python + VSCode environment setup (Windows, macOS, Linux)
- Core libraries: pandas, numpy, scipy, matplotlib, seaborn
- Git integration and collaborative workflows
- LLM-assisted coding tools (GitHub Copilot, Continue, Cline)
- Statistical analysis for linguistic data
- Code quality, testing, and documentation
- Virtual environments and dependency management

## Materials

### Slides & Resources
- **[Workshop Presentation (Quarto)](https://github.com/jobschepens/py-rdm/blob/main/slides.qmd)** - Full workshop slides source code
  - Python environment setup
  - LLM configuration and best practices
  - Code examples and async agents

**View Slides:**
- **[HTML Version on GIT.NRW](https://py-rdm-f36267.pages.git.nrw/)** - Slides hosted on GIT.NRW (looks better in some browsers)
- **[HTML Version](https://jobschepens.github.io/py-rdm/slides.html)** - Slides hosted on GitHub 
- **[PDF Version](https://github.com/jobschepens/py-rdm/raw/main/slides.pdf)** - Printable PDF format

### Code Repository
- **[py-rdm GIT.NRW Repository](https://gitlab.git.nrw/jschepen/py-rdm)** - Workshop materials hosted on GIT.NRW
- **[py-rdm GitHub Repository](https://github.com/jobschepens/py-rdm)** - Workshop materials hosted on GitHub
  - Example analyses (head nods, clause mates)
  - Starter scripts and templates
  - Requirements and setup instructions

### Quick Start
```bash
# Clone the repository
git clone https://github.com/jobschepens/py-rdm.git
cd py-rdm

# Set up Python environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# or: .venv\Scripts\Activate.ps1  # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Explore examples
python head-nods-example/job-testanalysis2/code/sample_size_analysis.py
python clause-mates-example/job-testanalysis/code/analyze_pronoun_thematic_roles.py
```

## Example Projects

The repository includes an example analysis:

### Head Nods Analysis
- Statistical comparison of head nod characteristics across languages
- Sample size assessment and power analysis
- Normality testing and Mann-Whitney U tests

## Tools & Setup

### Recommended Environment
- **Python**: 3.9+ (3.11+ recommended)
- **Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Terminal**: PowerShell (Windows), Bash (macOS/Linux)
- **Version Control**: Git with GitHub

### Essential VS Code Extensions
- **Python** (Microsoft) - Language support
- **Jupyter** (Microsoft) - Notebook support
- **Pylance** (Microsoft) - Type checking

### LLM Integration (Optional)
- **GitHub Copilot Chat** - Code completion and chat
- **Continue** - LLM integration with multiple providers
- **Cline** - Autonomous coding agent

## Repository Structure

```
py-rdm/
├── head-nods-example/          # Head nods analysis
├── example-scripts/             # Helper scripts (env loading, etc.)
├── slides.qmd                   # Workshop presentation
├── requirements.txt             # Python dependencies
├── .gitignore                   # Git ignore rules
└── README.md                    # Full documentation
```

## For Participants

### Folder Organization Template
```
analyses-your-name/
├── code/
│   ├── data_cleaning.py
│   ├── analysis.py
│   └── visualization.py
├── processed_data/
│   └── cleaned_data.csv
├── results/
│   ├── plots/
│   ├── summary.csv
│   └── report.md
└── README.md
```

---

**Last updated:** October 2025
