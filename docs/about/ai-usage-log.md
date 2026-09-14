# AI Usage Log

This page records where and how AI tools were used in the development of this
website. It exists to make our AI use transparent and auditable, in line with
the [AI-Assisted Development Guidelines](ai-assisted-development.md) and the
University of Cologne KI-Richtlinie (§9.2 marking, §12.4 documentation).

## How to read this log

Each entry lists the page that was worked on, what the AI tool actually did,
what a human did afterwards, and who reviewed the result. Where the underlying
language model of a tool could not be confirmed, we say so instead of guessing.

## Log

### 9 September 2026 — Front page (`docs/index.md`)

- **Tool:** Cline (AI coding assistant running in VS Code). The assistant
  could not confirm which underlying language model it was running on, so no
  model name is given.
- **What the AI did:** The organizers supplied the mailing-list text and the
  Zoom meeting details as plain text. The assistant placed that text into two
  new sections on the front page ("Mailing List for Participants not in the
  SFB" and "Hybrid Participation - Join via Zoom"), added the headings,
  bullet lists, and links around that text, and formatted it as Markdown.
- **What a human did:** The organizers wrote the source text themselves,
  reviewed the finished sections, and corrected the wording of the
  mailing-list section before it was saved.
- **Verification:** Links were checked; the page was read in full before
  saving. The Zoom credentials and mailing-list URL were taken verbatim from
  the organizers' input.
- **Reviewed by:** JS.

## Earlier site development

This website was developed with the assistance of AI tools (including GitHub
Copilot and AI coding agents) before this log was introduced. That use is
described in general terms on the
[Contributing page](contributing.md). Older pages are not listed individually
here; new AI-assisted changes will be added to this log as they happen.

## For contributors

If you use AI tools when contributing, please add an entry to this log
describing what the tool did and how you verified the result. See the
[Contributing guide](contributing.md) for the expectations around AI
assistance.