# Data used in the workshop

All datasets are small, plain-text files used in the live coding examples. They are
read directly by `slides.qmd`, `slides-advanced.qmd`, `scripts/ggplot2-intro.R`,
and `scripts/ggplot2-advanced.R`.

| File | Source | License / terms |
|---|---|---|
| `prominence_trials.csv` | Simulated for this workshop by `scripts/make-prominence-data.R` | CC0 1.0 |
| `penguins.csv` | [palmerpenguins](https://allisonhorst.github.io/palmerpenguins/), raw data from the Palmer Station LTER (Horst, Hill & Gorman 2020) | CC0 1.0 |
| `gapminder.csv` | [Software Carpentry: R for Reproducible Scientific Analysis](https://swcarpentry.github.io/r-novice-gapminder/), derived from [Gapminder](https://www.gapminder.org/data/) | CC BY 4.0 (lesson data) |
| `SAFI_clean.csv` | [Data Carpentry: Social Sciences](https://datacarpentry.github.io/r-socialsci/), SAFI project | CC BY 4.0 (lesson data) |
| `datasaurus.tsv` | [datasauRus](https://github.com/lockedata/datasauRus), after Matejka & Fitzmaurice (2017) | CC0 1.0 |

## `prominence_trials.csv`

Used by `slides-sfb.qmd` for the coefficient plot. **The data are simulated**:
they are not measurements of any real speaker. The simulation is built so that
the effects have the signs and rough sizes reported in the prominence
literature, which makes the figure teach the right lesson without exposing
anyone's recordings.

| Column | Meaning |
|---|---|
| `speaker` | Speaker code, `S01`–`S24` |
| `sex` | `f` or `m`; male speakers have a lower F0 |
| `item` | German word, one to five syllables |
| `syllables` | Syllable count of the item |
| `log_freq` | Log corpus frequency of the item |
| `condition` | `plain`, `focus`, or `contrast` |
| `speech_rate` | Syllables per second in the carrier sentence |
| `f0_peak` | F0 peak of the target word, in Hz |
| `duration_ms` | Duration of the target word, in milliseconds |

Regenerate with:

```sh
Rscript scripts/make-prominence-data.R
```

The seed is fixed, so the file is reproducible. Replace it with your own
acoustic measurements and the plotting code in the deck is unchanged.

The CSV files were downloaded on 16 November 2026 from the URLs above and are
included unchanged so that the workshop can be rebuilt offline.

`diamonds`, `anscombe`, and `economics` are built into ggplot2 and are not
stored here.
