# AI-Assisted Development Guidelines

AI tools are increasingly part of research and software development workflows. This page collects practical guidance, institutional policies, and critical perspectives to help you use them thoughtfully — knowing what the tools do well, where they fall short, and what your obligations are in an academic context.

The goal is not to discourage use, but to support informed and responsible practice.

## Regulatory and Institutional Framework

### EU AI Act (2024/1689)

The EU AI Act establishes obligations for both AI providers and organizations that deploy AI. Key points relevant to academic work:

- Systems are classified by risk level: prohibited, high-risk, general purpose with systemic risk, limited risk, minimal risk
- Current large language models (e.g., GPT-4 variants) likely qualify as General Purpose AI with systemic risk
- AI literacy obligations apply to organizations deploying AI
- Prohibited practices include: social scoring, manipulative or deceptive AI, emotion recognition and biometric identification in certain contexts
- [EU AI Act Compliance Checker](https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/)

### University of Cologne KI-Richtlinie (27 January 2026)

The [UzK KI-Richtlinie](https://am.uni-koeln.de/e45267/data/records54900/AM_2026-02_KI_RL_ger.pdf) is binding for all university employees and those working in research and teaching. It provides a structured framework for responsible AI use — covering data protection, transparency, and human oversight — and aligns with both GDPR and the EU AI Act.

**Eight Protection Goals (§2 Schutzziele)**

1. **Information security** — follow institutional information security policies
2. **Data protection** — all personal data processing must be GDPR-compliant
3. **Fairness** — minimize discrimination and unequal treatment
4. **Human control** — named person with final responsibility required per application; decisions with legal effect cannot occur without human review (§2.4b: *"Für jede KI-gestützte Anwendung ist eine namentlich benannte Rolle mit menschlicher Letztverantwortung festzulegen"*)
5. **Transparency** — AI systems must be recognizable as such; data processing must be auditable
6. **Reliability** — suitability must be tested; measures against hallucination and confabulation required
7. **Security** — full IT security requirements apply (confidentiality, integrity, availability)
8. **Legality** — compliance with copyright, confidentiality, and anti-discrimination law

**Key Obligations**

| Requirement | Rule |
|---|---|
| Approved tools (§4, §7) | Only [KI-Whitelist](https://itcc.uni-koeln.de/services/software/kuenstliche-intelligenz/ki-whitelist) tools for official use |
| Low-risk exception (§10) | Browser-based tools off-whitelist permitted if no sensitive data is entered |
| Input data (§8) | Sensitive data (personal, confidential, trade secrets, research secrets) prohibited in public cloud; self-hosted/private cloud only |
| Output verification (§9.1) | Mandatory check for correctness, validity, completeness, hallucinations, and bias before publication |
| Marking (§9.2) | All AI-generated content must be labeled as such |
| Deepfakes (§9.4) | Require documented supervisor approval; synthetic nature must be disclosed |
| AI recognition (§12.3) | Systems interacting with people must be identifiable as AI |
| Documentation (§12.4) | Processing must be documented to meet GDPR Art. 30 and AI Act accountability requirements |
| Competency (§6) | Risk-appropriate AI training required; participation counts as working time |

**Risk-Appropriate Human Control (Annex 2.7)**

- **High-risk** → Human-in-the-Loop: mandatory approval before AI output takes effect (e.g., hiring, grading, legal decisions)
- **Medium-risk** → Human-on-the-Loop: ongoing monitoring with intervention rights
- **Low-risk** → Post-control: random or case-based review

### Other Applicable Guidelines

- **DFG**: Transparency and existing research integrity standards — [wissenschaftliche-integritaet.de](https://wissenschaftliche-integritaet.de/verwendung-generativer-modelle/)
- **ACL**: Transparency and accountability in NLP research — [Responsible NLP Research](https://aclrollingreview.org/responsibleNLPresearch/)
- **Wikipedia**: Verification-first; no generating articles from scratch — [guidance](https://en.wikipedia.org/wiki/Wikipedia:Writing_articles_with_large_language_models)

## Critical Perspective

Compliance checklists and tool policies are useful, but they are no substitute for developing genuine understanding of what these tools do and do not do well. Researchers are well-placed to engage critically — and there is a growing literature helping to do exactly that.

Several recurring concerns are worth keeping in mind:

- **Deskilling**: routine reliance on AI output without active engagement can gradually erode the researcher's own competency and judgment (Anthropic, 2024; Bouchard, 2025)
- **Hallucination and confabulation**: outputs can be fluent and confident while being factually wrong; detecting errors often requires the domain expertise the tool is being asked to substitute for
- **Systematic bias**: outputs reflect patterns in training data, which may encode historical biases — relevant wherever AI informs decisions about people
- **Security vulnerabilities**: AI-generated code can introduce subtle bugs or exploitable weaknesses that are easy to miss in review
- **Literacy paradox**: research suggests that lower AI literacy correlates with greater uncritical receptivity to AI output (Tully et al., 2025) — familiarity is a genuine protection

As Guest et al. (2025) argue, the risk is not technology per se but the normalization of uncritical adoption: *"Universities need to take their role seriously to safeguard higher education, critical thinking, expertise, academic freedom, and scientific integrity."*

For a broad critical perspective, see [Prof. Dr. Dagmar Monett's bibliography of 80+ critical AI books](https://monettdiaz.com/books-critical-ai.html).

## Practical Guidelines

### Tool Selection and Data Handling

A quick check before starting:

1. Is the tool on the [KI-Whitelist](https://itcc.uni-koeln.de/services/software/kuenstliche-intelligenz/ki-whitelist)? If not, the §10 exception applies only if no sensitive data will be entered — worth confirming before you start.
2. What is the risk level of the application? Define an appropriate level of human oversight (see Annex 2.7 table in the regulatory section above).
3. Is there a named person with final responsibility for this application? (§2.4b)

Data protection is the most common practical issue: avoid entering the following into public cloud AI services (§8):

- Personal data of any kind
- Confidential institutional information
- Trade secrets or proprietary content
- Unpublished research findings or data

If you are unsure whether something counts as sensitive, treat it as sensitive.

### Output Verification

Verifying AI output before use is both good research practice and a requirement under §9.1. In practice, this means:

- Checking factual correctness against authoritative sources — not other AI outputs
- Actively looking for hallucinations: incorrectly cited references, non-existent functions or libraries, fabricated statistics
- Considering whether the output reflects systematic bias that could affect people
- Asking whether the output actually addresses the question you asked
- Marking AI-generated passages clearly in the final product (§9.2)

How much scrutiny is appropriate scales with risk: a formatting suggestion needs less verification than production code, which needs less than AI-assisted decisions that affect people.

### Code Development

AI tools can meaningfully speed up routine coding tasks — boilerplate, refactoring, documentation, test generation. The key to using them well is active rather than passive engagement: treat generated code as a draft that needs reading, not a solution that needs running.

Practically:

- Read and understand generated code before using it — not just that it runs, but what it does and why
- Check for incorrect function calls, non-existent libraries, and introduced vulnerabilities
- Apply standard software engineering criteria (KISS, DRY, YAGNI, separation of concerns) to keep generated code maintainable
- Mark AI-generated sections in code comments

A useful heuristic: if you couldn't explain a piece of code to a colleague, it needs more review before it goes into the project. Over-reliance often shows up as accumulating complexity — code that grows harder to read, modify, or debug over time.

For a practical discussion of review strategies, including fast and slow review modes, see: [Code Review Strategies in AI-Assisted Programming](https://jobschepens.github.io/personal-page/clausemate-review-dense.html)

### Documentation

Keeping a brief record of AI use serves both research reproducibility and institutional compliance (§12.4). Useful things to record:

- Tools and model versions used
- Which outputs were accepted, rejected, or substantially modified
- How output was verified
- Risk classification and the person responsible
- Any GDPR-relevant data processing (required for GDPR Art. 30 records)

## Quick Checklist (UzK)

A practical reference for AI use at UzK — covers the main requirements from the KI-Richtlinie:

1. ☐ Tool on [KI-Whitelist](https://itcc.uni-koeln.de/services/software/kuenstliche-intelligenz/ki-whitelist) or §10 exception confirmed
2. ☐ Named person with final responsibility designated (§2.4b)
3. ☐ Risk level assessed; appropriate control model defined (Annex 2.7)
4. ☐ No sensitive data entered into public cloud services (§8)
5. ☐ Output verification process established (§9.1)
6. ☐ AI-generated content marking in place (§9.2)
7. ☐ AI system identifiable as AI to affected persons (§12.3)
8. ☐ Documentation meets GDPR Art. 30 and AI Act requirements (§12.4)
9. ☐ All eight Schutzziele addressed (§2)
10. ☐ Required competency training completed or planned (§6)

## Resources and References

### Policies and Regulations

- [University of Cologne KI-Richtlinie](https://am.uni-koeln.de/e45267/data/records54900/AM_2026-02_KI_RL_ger.pdf) (January 2026)
- [UzK KI-Whitelist](https://itcc.uni-koeln.de/services/software/kuenstliche-intelligenz/ki-whitelist)
- [EU AI Act Compliance Checker](https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/)
- [DFG Guidelines on Generative Models](https://wissenschaftliche-integritaet.de/verwendung-generativer-modelle/)
- [ACL Responsible NLP Research](https://aclrollingreview.org/responsibleNLPresearch/)
- [ACM Code of Ethics](https://www.acm.org/code-of-ethics)
- [UNESCO AI Ethics Recommendation](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)
- [IEEE Standards for AI](https://standards.ieee.org/initiatives/artificial-intelligence-systems/)

### Critical and Practical Resources

- [Open Source AI Contribution Policies](https://github.com/melissawm/open-source-ai-contribution-policies)
- [AI Ethics Guidelines Global Inventory](https://inventory.algorithmwatch.org/)
- [Prof. Dr. Dagmar Monett's Critical AI Bibliography](https://monettdiaz.com/books-critical-ai.html)
- [Simon Willison: The Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (on AI security risks)
- Schepens, J. (2025). [Code Review Strategies in AI-Assisted Programming](https://jobschepens.github.io/personal-page/clausemate-review-dense.html)

### Selected Literature

- Guest, O., et al. (2025). "Against Uncritical Adoption of 'AI' in Academia." [https://philpapers.org/rec/GUEATU](https://philpapers.org/rec/GUEATU)
- Van Rooij, I., & Guest, O. (2025). "The Myth of AI Acceleration."
- Anthropic (2024). "AI-Assisted Coding Effects." [https://www.anthropic.com/research/AI-assistance-coding-skills](https://www.anthropic.com/research/AI-assistance-coding-skills)
- Tully, S. M., Longoni, C., & Appel, G. (2025). Lower Artificial Intelligence Literacy Predicts Greater AI Receptivity. *Journal of Marketing*, 89(5), 1–20. [https://doi.org/10.1177/00222429251314491](https://doi.org/10.1177/00222429251314491)
- Veldhuis, A., Lo, P. Y., Kenny, S., & Antle, A. N. (2025). Critical Artificial Intelligence Literacy: A Scoping Review and Framework Synthesis. *International Journal of Child-Computer Interaction*, 43, 100708. [https://doi.org/10.1016/j.ijcci.2024.100708](https://doi.org/10.1016/j.ijcci.2024.100708)
- Bouchard, J. (2025). ChatGPT and the Separation between Knowledge and Knower. *Education and Information Technologies*, 30(8), 10091–110. [https://doi.org/10.1007/s10639-024-13249-y](https://doi.org/10.1007/s10639-024-13249-y)

