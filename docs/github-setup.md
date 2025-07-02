# GitHub Repository Setup Guide

This document provides instructions for setting up this folder as a GitHub repository and making it available online.

## Repository Structure Overview

The repository is now organized with the following structure:

```
rdm-workshop-series/
├── README.md                          # Main repository overview with agenda
├── LICENSE                           # Creative Commons Attribution 4.0
├── .gitignore                        # Git ignore file
├── agenda/
│   ├── summer-2025-schedule.md       # Detailed workshop schedule
│   ├── Research Data and Methods.htm # Original HTML agenda
│   └── Research Data and Methods_files/ # Supporting files
├── workshops/
│   ├── 01-good-academic-practice/
│   │   └── README.md
│   ├── 02-research-data-management/
│   │   ├── README.md
│   │   └── 2-rau-DCH_Basics_of_RDM_SFB1252.pdf
│   ├── 03-ethics-approval/
│   │   └── README.md
│   ├── 04-literature-management/
│   │   ├── README.md
│   │   └── 4-schwiertz-Zotero.pdf
│   ├── 05-annotation-corpus-tools/
│   │   ├── README.md
│   │   └── 5-schepens-annotation_corpus_tools.pptx
│   └── 06-preregistration/
│       └── README.md
├── onboarding/
│   ├── README.md
│   └── onboarding-day-slides.qmd
├── resources/
│   └── additional-links.md
└── docs/
    ├── contributing.md
    └── github-setup.md (this file)
```

## Setting Up the GitHub Repository

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Research Data & Methods Workshop Series"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" or go to [github.com/new](https://github.com/new)
3. Repository name: `rdm-workshop-series` (or your preferred name)
4. Description: "Research Data & Methods Workshop Series - SFB 1252 Prominence in Language"
5. Set to **Public** (recommended for open science)
6. **Do not** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/rdm-workshop-series.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 4: Configure Repository Settings

#### Enable GitHub Pages (Optional)
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. This will make your README.md available as a website

#### Add Repository Topics
Add relevant topics to help others discover your repository:
- `research-data-management`
- `open-science`
- `workshops`
- `academia`
- `linguistics`
- `corpus-linguistics`
- `university-of-cologne`

#### Repository Description
Use this description:
"A series of talks and tutorials on research data and methods with a focus on best practices and principles of open science, organized by SFB 1252 'Prominence in Language' at the University of Cologne."

## Recommended GitHub Features

### Issues
Enable issues for:
- Workshop feedback and suggestions
- Resource recommendations
- Technical questions
- Content updates

### Discussions
Enable discussions for:
- General questions about research methods
- Community sharing of experiences
- Announcements about new workshops

### Releases
Create releases for:
- Each semester's materials
- Major updates to the workshop series
- Special workshop collections

## Maintenance and Updates

### Regular Updates
- Add new workshop materials after each session
- Update links and resources as needed
- Respond to issues and discussions
- Create releases for each semester

### Content Guidelines
- Follow the contributing guidelines in `docs/contributing.md`
- Maintain consistent formatting across all README files
- Ensure all external links are working
- Keep the main README.md agenda up to date

### Collaboration
- Invite workshop organizers as collaborators
- Set up branch protection rules for the main branch
- Use pull requests for major changes
- Review contributions before merging

## Additional Features

### GitHub Actions (Optional)
Consider setting up automated workflows for:
- Link checking
- Spell checking
- Automatic issue labeling
- Release automation

### Integration with Other Platforms
- Link to institutional repositories
- Connect with ORCID profiles
- Reference in academic publications
- Share on social media and academic networks

## Contact and Support

For questions about the repository setup or maintenance:

- **Technical Issues**: Create an issue in the GitHub repository
- **Content Questions**: Contact workshop organizers
- **General Support**: jschepen(at)uni-koeln.de

---

*This repository supports the open science mission of SFB 1252 "Prominence in Language" at the University of Cologne.*
