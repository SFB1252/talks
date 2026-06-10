# Build TikZ figures as SVG for crisp revealjs slides
# Run from anywhere; script works relative to its own folder.
# Requirements: latex, dvisvgm

Set-Location $PSScriptRoot

$figures = @("tikz-shapes", "tikz-flowchart", "tikz-pgfplots", "tikz-tree", "tikz-glosses")

foreach ($f in $figures) {
    Write-Host "Compiling $f.tex to DVI ..."
    latex -interaction=nonstopmode "$f.tex"
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "latex failed for $f"
        continue
    }

    Write-Host "Converting $f.dvi to SVG ..."
    dvisvgm "$f.dvi" -n -o "$f.svg"
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "dvisvgm failed for $f"
        continue
    }

    Write-Host "Done: $f.svg"
}

# Clean temporary files
Remove-Item *.aux, *.log, *.dvi -ErrorAction SilentlyContinue
Write-Host "SVG build complete."
