# Self-Declared AI Assistance

Pages on this site can declare how much AI was involved in producing them. The
declaration is shown as a small badge under the page title and is also written
into the page as a machine-readable `<meta>` tag.

The marking requirement comes from the
[University of Cologne KI-Richtlinie §9.2](https://am.uni-koeln.de/e45267/data/records54900/AM_2026-02_KI_RL_ger.pdf)
("all AI-generated content must be labeled as such"). It also matches the
transparency direction of the EU AI Act and the disclosure expectations in the
[AI-Assisted Development Guidelines](ai-assisted-development.md).

## The four levels

| Badge | Level | Declaration | What it means |
| ----- | ----- | ----------- | ------------- |
| **AI assistance: none** | none | `ai-assistance: none` | No AI tools used in writing or editing. |
| **AI assistance: light** | light | `ai-assistance: light` | AI used for grammar, spelling, or sentence-level wording only; the author wrote the text. |
| **AI assistance: moderate** | moderate | `ai-assistance: moderate` | AI used to rewrite, summarise, or suggest changes to text written by the author. |
| **AI assistance: heavy** | heavy | `ai-assistance: heavy` | Text and structure primarily drafted by an AI tool from human-provided content, then reviewed and edited by a human. |

The scale is adapted from the HIFIS self-declaration
(["Self-Declared AI Usage on HIFIS.net"](https://www.hifis.net/news/2025/07/17/self-declared-ai-assistance/),
17 July 2025), which is published under
[CC BY 4.0](https://www.hifis.net/LICENSE/). The badge design here is our own,
in the University of Cologne colours.

## How to declare it

Add the level to the YAML front matter of the page:

```yaml
---
title: "My page"
ai-assistance: heavy
---
```

A small [MkDocs hook](https://www.mkdocs.org/user-guide/configuration/#hooks)
(`hooks/ai_assistance.py`) then renders the badge and adds:

```html
<meta name="ai-assistance" content="heavy">
```

For the standalone Quarto slide decks, the level is set in the deck's YAML
front matter and repeated in the footer and on the acknowledgements slide.

Levels are self-declared. They describe the *process*, as reported by the
author — a reader cannot verify them from the text, and no automated detector
can either.
