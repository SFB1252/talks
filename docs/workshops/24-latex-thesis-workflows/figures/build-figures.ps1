# Build TikZ figures: compile .tex → PDF, then convert PDF → PNG
# Run from: figures/
# Requirements: pdflatex (TeX Live), pdftoppm (part of poppler / TeX Live)

Set-Location $PSScriptRoot

$figures = @("tikz-shapes", "tikz-flowchart", "tikz-pgfplots", "tikz-tree")

foreach ($f in $figures) {
    Write-Host "Compiling $f.tex ..."
    pdflatex -interaction=nonstopmode "$f.tex"
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "pdflatex failed for $f — skipping PNG conversion"
        continue
    }

    Write-Host "Converting $f.pdf to PNG ..."
    pdftoppm -r 150 -png "$f.pdf" $f
    $single = "${f}-1.png"
    if (Test-Path $single) {
        Rename-Item $single "${f}.png" -Force
    }

    Write-Host "Done: ${f}.png"
}

# Clean up LaTeX auxiliary files
Remove-Item *.aux, *.log, *.fls, *.fdb_latexmk -ErrorAction SilentlyContinue
Write-Host "Build complete."
