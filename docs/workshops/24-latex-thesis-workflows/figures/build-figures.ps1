# Build TikZ figures: compile .tex -> PDF + PNG and DVI -> SVG
# Run from: figures/
# Requirements:
#   - pdflatex + pdftoppm (PNG output)
#   - latex + dvisvgm (SVG output)

Set-Location $PSScriptRoot

$figures = @("tikz-shapes", "tikz-flowchart", "tikz-pgfplots", "tikz-tree", "tikz-glosses", "gb4e-glosses")

$hasPdfLatex = $null -ne (Get-Command pdflatex -ErrorAction SilentlyContinue)
$hasPdfToPpm = $null -ne (Get-Command pdftoppm -ErrorAction SilentlyContinue)
$hasLatex = $null -ne (Get-Command latex -ErrorAction SilentlyContinue)
$hasDviSvgm = $null -ne (Get-Command dvisvgm -ErrorAction SilentlyContinue)

if (-not $hasPdfLatex -or -not $hasPdfToPpm) {
    Write-Error "Missing required tools for PNG output (pdflatex and/or pdftoppm)."
    exit 1
}

if (-not $hasLatex -or -not $hasDviSvgm) {
    Write-Warning "latex and/or dvisvgm not found. SVG generation will be skipped."
}

foreach ($f in $figures) {
    Write-Host "Compiling $f.tex for PDF ..."
    pdflatex -interaction=nonstopmode "$f.tex"
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "pdflatex failed for $f - skipping this figure"
        continue
    }

    Write-Host "Converting $f.pdf to PNG ..."
    pdftoppm -r 150 -png "$f.pdf" $f
    $single = "${f}-1.png"
    if (Test-Path $single) {
        $target = "${f}.png"
        if (Test-Path $target) {
            Remove-Item $target -Force
        }
        Move-Item $single $target -Force
    }

    Write-Host "Done: ${f}.png"

    if ($hasLatex -and $hasDviSvgm) {
        Write-Host "Compiling $f.tex for DVI ..."
        latex -interaction=nonstopmode "$f.tex"
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "latex failed for $f - skipping SVG conversion"
            continue
        }

        Write-Host "Converting $f.dvi to SVG ..."
        dvisvgm "$f.dvi" -n -o "$f.svg"
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "dvisvgm failed for $f"
            continue
        }

        Write-Host "Done: ${f}.svg"
    }
}

# Clean up LaTeX auxiliary files
Remove-Item *.aux, *.log, *.fls, *.fdb_latexmk, *.dvi -ErrorAction SilentlyContinue
Write-Host "Build complete."
