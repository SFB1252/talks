# make-prominence-data.R
#
# Generates data/prominence_trials.csv, the dataset used for the coefficient
# plot in slides-sfb.qmd.
#
# The data are SIMULATED. They are not measurements of any real speaker. The
# simulation is built so that the effects have the signs and rough sizes
# reported in the prominence literature, which makes the figure teach the
# right lesson without exposing anyone's recordings. Swap in your own
# acoustic measurements and the plotting code is unchanged.
#
# Run from the workshop directory:
#   Rscript scripts/make-prominence-data.R

set.seed(1252)

n_speaker <- 24
conditions <- c("plain", "focus", "contrast")

# Items are German words spanning one to five syllables, so that the syllable
# coefficient has something to estimate.
items <- data.frame(
  item = c(
    "Haus", "Buch", "Tag", "Berg", "Katze", "Blume", "Fenster", "Garten",
    "Lampe", "Teller", "Wolke", "Straße", "Kirche", "Insel", "Brücke",
    "Bäcker", "Betonung", "Intonation", "Silbenbau", "Akzentuierung",
    "Artikulation", "Prominenz", "Satzmelodie", "Sprachwissenschaft"
  ),
  syllables = c(
    1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 4, 3, 5, 5, 3, 4, 5
  ),
  log_freq = c(
    5.9, 5.6, 6.1, 5.2, 4.8, 4.5, 4.6, 4.4, 4.1, 4.3, 4.0, 5.0,
    4.2, 4.1, 4.0, 3.8, 3.2, 2.9, 2.4, 2.1, 1.9, 2.6, 2.2, 1.8
  ),
  stringsAsFactors = FALSE
)

speakers <- data.frame(
  speaker = sprintf("S%02d", seq_len(n_speaker)),
  sex = rep(c("f", "m"), length.out = n_speaker),
  stringsAsFactors = FALSE
)

trials <- expand.grid(
  speaker = speakers$speaker,
  item = items$item,
  condition = conditions,
  stringsAsFactors = FALSE
)

trials <- merge(trials, speakers, by = "speaker")
trials <- merge(trials, items, by = "item")

# Random intercepts. Speakers vary a lot in F0; items vary less.
speaker_f0 <- setNames(rnorm(n_speaker, 0, 18), speakers$speaker)
item_f0 <- setNames(rnorm(nrow(items), 0, 6), items$item)
speaker_dur <- setNames(rnorm(n_speaker, 0, 40), speakers$speaker)
item_dur <- setNames(rnorm(nrow(items), 0, 30), items$item)

trials$speech_rate <- pmin(6.5, pmax(3.2, rnorm(nrow(trials), 4.8, 0.6)))

condition_f0 <- c(plain = 0, focus = 16, contrast = 24)
condition_dur <- c(plain = 0, focus = 40, contrast = 55)

trials$f0_peak <- with(trials,
  150 +
    speaker_f0[speaker] +
    item_f0[item] +
    ifelse(sex == "m", -38, 0) +
    condition_f0[condition] +
    -3 * syllables +
    -1.2 * log_freq +
    -5 * speech_rate +
    rnorm(nrow(trials), 0, 8)
)

trials$duration_ms <- with(trials,
  320 +
    speaker_dur[speaker] +
    item_dur[item] +
    65 * syllables +
    condition_dur[condition] +
    -45 * speech_rate +
    -8 * log_freq +
    rnorm(nrow(trials), 0, 35)
)

trials <- trials[order(trials$speaker, trials$item, trials$condition), ]

trials <- trials[, c(
  "speaker", "sex", "item", "syllables", "log_freq",
  "condition", "speech_rate", "f0_peak", "duration_ms"
)]

write.csv(trials, "data/prominence_trials.csv", row.names = FALSE)

cat("wrote data/prominence_trials.csv:", nrow(trials), "rows,",
    ncol(trials), "columns\n")
