# Online Experiments

**Date:** 1. Oktober 2025  
**Speaker:** Onur Özsoy, Project C03, SFB 1252  
**Duration:** 14:00 - 15:30

## Presenter Materials

- Slides (PDF): [Online_experiments_RDM_SFB1252_2025.pdf](./Online_experiments_RDM_SFB1252_2025.pdf)
- Analysis script (R): [ResearchDataMethod.R](./ResearchDataMethod.R)
- Results data (CSV): [results_prod.csv](./results_prod.csv)

## Overview

ntroduction to designing, implementing, and conducting online
experiments for linguistic research. Covers platform selection, participant
recruitment, data quality control, and ethical considerations.

## Learning Objectives

- Design effective online experiments for linguistic research
- Select appropriate platforms and tools
- Implement robust participant recruitment strategies
- Ensure data quality in online settings
- Address ethical considerations specific to online research
- Troubleshoot common online experiment issues

## Topics 

### Platform Overview

- jsPsych for behavioral experiments
- Prolific for participant recruitment
- Amazon Mechanical Turk (MTurk) considerations
- Qualtrics for surveys and simple experiments
- Lab.js and PsyToolkit alternatives

### Experiment Design

- Adapting lab experiments for online delivery
- Timing precision and technical limitations
- Browser compatibility and device considerations
- Attention checks and data validation

### Participant Management

- Recruitment strategies and screening
- Payment and compensation logistics
- Communication with participants
- Handling technical issues and dropouts

### Data Quality

- Identifying low-quality responses
- Attention checks and validation measures
- Statistical approaches to data cleaning
- Handling missing data and exclusions

### Ethics and Legal Issues

- Informed consent in online settings
- Data protection and GDPR compliance
- Participant anonymity and privacy
- Cross-border research considerations

## Prerequisites

Basic familiarity with experimental design concepts. Programming experience
helpful but not required.


## Notes (from slides)

Presenter: Onur Özsoy  
Date: 1 October 2025 (Uni Köln)  
Contact: ooezsoy@uni-koeln.de

### Why webcam-based online eye-tracking
- Reach remote and hard-to-reach, non-WEIRD populations (e.g., regions without labs; heritage speakers outside universities).
- Cost: high-end eye-trackers ($10k+) vs. webcam-based (no additional hardware cost).
- Approachability: less technical training than lab setups; online training/support available.
- Context: pandemic accelerated remote data collection.

### Core concept and tooling
- Webcam tracks pupil movement; gaze estimation computed locally in participant’s browser.
- WebGazer.js: "Democratizing Webcam Eye Tracking on the Browser" — https://webgazer.cs.brown.edu/
- PCIbex: platform to program and host experiments (free; docs/support available).
  - Docs: https://doc.pcibex.net/
  - Paper: Zehr, J., & Schwarz, F. (2018). PennController for Internet Based Experiments (IBEX). https://doi.org/10.17605/OSF.IO/MD832
- Typical tasks supported: surveys, AJTs, ratings, Stroop, picture selection, audio recording, eye-tracking, lexical decision, mouse tracking, etc.

### Limitations and caveats
- Timing delays: ~300 ms average between true gaze and recorded time (Slim & Hartsuiker, 2022).
- Accuracy limits and varying sampling rate (Zhang et al., 2022).
- Calibration can be difficult.
- Suitability: often "good enough" for Visual World Paradigm (VWP); consider supervised webcam ET to improve data quality/control.

### Step-by-step quickstart
1) Create an account: https://farm.pcibex.net/ (you can create multiple accounts if needed).
2) General guidelines for ET: https://hu.berlin/ET
3) HU Berlin farm: https://korpling.german.hu-berlin.de/ibex/
4) Explore a demo and copy into your account: https://farm.pcibex.net/r/jsBNEF/
5) Example experiment components: translation tasks, Stroop task, survey.

### Analysis
- "Jump to R" indicated for analysis workflow; details not included on slides.

### Additional resources and examples
- WebGazer.js: https://webgazer.cs.brown.edu/
- PCIbex documentation: https://doc.pcibex.net/
- Paper: Zehr & Schwarz (2018), https://doi.org/10.17605/OSF.IO/MD832
- Analysis (Turkish case processing): https://osf.io/sehnf/?view_only=a0a306606f064652b14b03e29a52d27d
- Turkish case processing experiment: https://farm.pcibex.net/r/GOsYzn/
- German case processing experiment: https://farm.pcibex.net/r/gcwFgV/

### Key takeaways
- Webcam-based ET via PCIbex/WebGazer is accessible, free, and feasible for many psycholinguistic paradigms.
- Plan for timing/accuracy limitations; design tasks accordingly and consider supervision to boost data quality.

## Workshop Discussion Points

### Platforms and task design
- Randomization and lists (PCIbex)
  - Use `Template()` with CSV for lists/conditions.
  - URL parameter filtering for list assignment; enables quick list handling.
- Mobile devices
  - Suitability and constraints; consider disabling or gating by screen size/orientation.
- Timing
  - Be mindful of webcam ET timing variance; design tasks tolerant to delays.
- Effort and plugins
  - Factor in learning curve; use community plugins and examples.

### Hosting and data governance
- GDPR/DSGVO compliance
  - Pavlovia: EU-friendly hosting option; check DPA and data flows.
  - PCIbex Farm: quick start but US-based; consider self-hosting for GDPR.
- jsPsych
  - Can use static hosting (GitHub Pages/Netlify) or Pavlovia.
  - Data capture: serverless CSV download or custom backend/API.
- PCIbex
  - Farm hosting (fast onboarding) or self-host for compliance.
  - Built-in result capture and download options.

### General online design considerations
- Session duration and fatigue management.
- Response filtering (invalid/too fast/failed calibrations).
- Breaks and pacing to maintain attention.
- Attention checks embedded at intervals.

### Participant recruitment
- Balanced sampling across lists/conditions.
- Scaling to large samples when needed.
- Prolific integration
  - Pre-screening, approval rate thresholds.
  - Payment on completion; use bonus for performance/longer tasks.

## Demos and Links

- PCIbex account: https://farm.pcibex.net/
- ET guidelines: https://hu.berlin/ET
- HU Berlin farm: https://korpling.german.hu-berlin.de/ibex/
- Demo (copy to your account): https://farm.pcibex.net/r/jsBNEF/
- WebGazer.js: https://webgazer.cs.brown.edu/
- PCIbex docs: https://doc.pcibex.net/
- Zehr & Schwarz (2018): https://doi.org/10.17605/OSF.IO/MD832
- Turkish analysis (OSF): https://osf.io/sehnf/?view_only=a0a306606f064652b14b03e29a52d27d
- Turkish experiment: https://farm.pcibex.net/r/GOsYzn/
- German experiment: https://farm.pcibex.net/r/gcwFgV/

## Additional Resources

- [jsPsych Documentation](https://www.jspsych.org/7.3/) - Comprehensive
  programming guide
- [Prolific Academic](https://www.prolific.co/) - Participant recruitment
  platform
- [Ethics in Online Research](https://www.bps.org.uk/news-and-policy/ethics-guidelines-internet-mediated-research-2017) -
  BPS Guidelines

## Related Workshops

This workshop complements the ethics approval and preregistration workshops in
understanding online research methodology.
