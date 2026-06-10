#!/usr/bin/env bash
# Build TikZ figures: compile .tex -> PDF + PNG and DVI -> SVG
# Run from: figures/
# Requirements:
#   - pdflatex + pdftoppm (PNG output)
#   - latex + dvisvgm (SVG output)

set -uo pipefail
cd "$(dirname "$0")"

figures=(tikz-shapes tikz-flowchart tikz-pgfplots tikz-tree tikz-glosses)

if ! command -v pdflatex >/dev/null 2>&1 || ! command -v pdftoppm >/dev/null 2>&1; then
    echo "Missing required tools for PNG output (pdflatex and/or pdftoppm)." >&2
    exit 1
fi

has_svg_tools=true
if ! command -v latex >/dev/null 2>&1 || ! command -v dvisvgm >/dev/null 2>&1; then
    has_svg_tools=false
    echo "Warning: latex and/or dvisvgm not found. SVG generation will be skipped." >&2
fi

for f in "${figures[@]}"; do
    echo "Compiling ${f}.tex for PDF ..."
    if ! pdflatex -interaction=nonstopmode "${f}.tex"; then
        echo "Warning: pdflatex failed for ${f}, skipping this figure." >&2
        continue
    fi

    echo "Converting ${f}.pdf to PNG ..."
    if ! pdftoppm -r 150 -png "${f}.pdf" "${f}"; then
        echo "Warning: pdftoppm failed for ${f}, skipping this figure." >&2
        continue
    fi
    # pdftoppm appends -1.png for single-page files
    [[ -f "${f}-1.png" ]] && mv "${f}-1.png" "${f}.png"

    echo "Done: ${f}.png"

    if [[ "${has_svg_tools}" == true ]]; then
        echo "Compiling ${f}.tex for DVI ..."
        if ! latex -interaction=nonstopmode "${f}.tex"; then
            echo "Warning: latex failed for ${f}, skipping SVG conversion." >&2
            continue
        fi

        echo "Converting ${f}.dvi to SVG ..."
        if ! dvisvgm "${f}.dvi" -n -o "${f}.svg"; then
            echo "Warning: dvisvgm failed for ${f}." >&2
            continue
        fi

        echo "Done: ${f}.svg"
    fi
done

# Clean up LaTeX auxiliary files
rm -f ./*.aux ./*.log ./*.fls ./*.fdb_latexmk ./*.dvi
echo "Build complete."
