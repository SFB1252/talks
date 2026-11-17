"""Render self-declared AI-assistance badges.

Pages declare the level in their YAML front matter:

    ---
    ai-assistance: heavy
    ---

The hook then

1. inserts a visible badge below the page title, and
2. adds a machine-readable ``<meta name="ai-assistance" ...>`` tag.

The four-level scale follows the HIFIS self-declaration (CC BY 4.0) and the
marking obligation in the University of Cologne KI-Richtlinie (§9.2).
"""

from __future__ import annotations

import html
import posixpath
import re

LEVELS = {
    "none": {
        "label": "none",
        "summary": "No AI tools were used in writing or editing this page.",
    },
    "light": {
        "label": "light",
        "summary": (
            "AI was used for grammar, spelling, or sentence-level wording only. "
            "The author wrote the text."
        ),
    },
    "moderate": {
        "label": "moderate",
        "summary": (
            "AI was used to rewrite, summarise, or suggest changes to text written "
            "by the author."
        ),
    },
    "heavy": {
        "label": "heavy",
        "summary": (
            "The text and structure were primarily drafted by an AI tool from "
            "human-provided content, then reviewed and edited by a human."
        ),
    },
}

TARGET = "about/ai-assistance-levels/"


def _normalise(value):
    if value is None:
        return None
    key = str(value).strip().lower()
    return key if key in LEVELS else None


def _relative_url(page) -> str:
    """Return a relative link from *page* to the explanation page."""
    url = page.file.url or ""
    base = url.rstrip("/")
    if base.endswith(".html"):
        base = posixpath.dirname(base)
    base = base or "."
    rel = posixpath.relpath(TARGET.rstrip("/"), start=base)
    return rel + "/"


def _badge(level: str, page) -> str:
    meta = LEVELS[level]
    label = html.escape(meta["label"])
    summary = html.escape(meta["summary"])
    href = html.escape(_relative_url(page))
    return (
        f'<div class="ai-assistance ai-assistance--{level}" role="note" '
        f'data-ai-assistance="{level}" '
        f'aria-label="AI assistance: {label}. {summary}">'
        f'<span class="ai-assistance__mark" aria-hidden="true">AI</span>'
        f'<span class="ai-assistance__label">AI assistance: '
        f"<strong>{label}</strong></span>"
        f'<a class="ai-assistance__more" href="{href}">What this means</a>'
        f"</div>"
    )


def on_page_content(html_content, page, config, files):
    level = _normalise(page.meta.get("ai-assistance"))
    if level is None:
        return html_content

    badge = _badge(level, page)
    match = re.search(r"</h1\s*>", html_content, flags=re.IGNORECASE)
    if match:
        return html_content[: match.end()] + "\n" + badge + html_content[match.end() :]
    return badge + "\n" + html_content


def on_post_page(output, page, config):
    level = _normalise(page.meta.get("ai-assistance"))
    if level is None:
        return output

    tag = f'<meta name="ai-assistance" content="{level}">'
    return output.replace("</head>", f"    {tag}\n  </head>", 1)
