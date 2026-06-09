#!/usr/bin/env bash
# Build TikZ figures: compile .tex → PDF, then convert PDF → PNG
# Run from: figures/
# Requirements: pdflatex (TeX Live), pdftoppm (poppler-utils)

set -euo pipefail
cd "$(dirname "$0")"

figures=(tikz-shapes tikz-flowchart tikz-pgfplots tikz-tree tikz-glosses)

for f in "${figures[@]}"; do
    echo "Compiling ${f}.tex ..."
    pdflatex -interaction=nonstopmode "${f}.tex"

    echo "Converting ${f}.pdf to PNG ..."
    pdftoppm -r 150 -png "${f}.pdf" "${f}"
    # pdftoppm appends -1.png for single-page files
    [[ -f "${f}-1.png" ]] && mv "${f}-1.png" "${f}.png"

    echo "Done: ${f}.png"
done

# Clean up LaTeX auxiliary files
rm -f ./*.aux ./*.log ./*.fls ./*.fdb_latexmk
echo "Build complete."
