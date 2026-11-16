# Data Visualization with ggplot2 — Advanced Topics
# Workshop 30 · CRC 1252 Prominence in Language · 18 November 2026
# Companion script: every figure in slides-advanced.qmd can be rebuilt from here.
# Run from this directory: setwd("docs/workshops/30-data-visualization-ggplot2")

library(ggplot2)
library(dplyr)
library(tidyr)
library(patchwork)
library(scales)
library(viridis)
library(ggeffects)
library(marginaleffects)
library(systemfonts)

systemfonts::register_font(
  "Albert Sans",
  plain  = "../../stylesheets/fonts/AlbertSans-400.ttf",
  bold   = "../../stylesheets/fonts/AlbertSans-700.ttf",
  italic = "../../stylesheets/fonts/AlbertSans-400.ttf"
)

penguins  <- read.csv("data/penguins.csv")
gapminder <- read.csv("data/gapminder.csv")

# A single house style -------------------------------------------------------
uzk_blue      <- "#005176"
uzk_turquoise <- "#009dcc"
uzk_coral     <- "#ea564f"
uzk_muted     <- "#547685"

theme_set(
  theme_minimal(base_family = "Albert Sans", base_size = 15) +
    theme(
      panel.grid.minor = element_blank(),
      plot.title.position = "plot",
      plot.title = element_text(face = "bold", size = rel(1.05)),
      plot.subtitle = element_text(colour = uzk_muted),
      plot.caption = element_text(colour = uzk_muted, size = rel(0.75)),
      legend.position = "bottom"
    )
)

# 1. Scales: the bridge from data to pixels ----------------------------------
g2007 <- gapminder |> filter(year == 2007)
dollar_k <- function(x) paste0("$", format(x / 1000, trim = TRUE, scientific = FALSE), "k")

p_linear <- ggplot(g2007, aes(gdpPercap, lifeExp,
                              colour = continent, size = pop)) +
  geom_point(alpha = 0.7) +
  scale_size_area(max_size = 7, guide = "none") +
  scale_x_continuous(labels = dollar_k,
                     breaks = c(0, 20000, 40000, 60000, 80000)) +
  labs(title = "Linear x scale", x = "GDP per capita",
       y = "Life expectancy", colour = NULL) +
  theme(legend.position = "right")

p_log <- p_linear +
  scale_x_log10(labels = dollar_k,
                breaks = c(1000, 3000, 10000, 30000, 100000)) +
  labs(title = "Log10 x scale")

# 2. Limits are not zoom -----------------------------------------------------
p_base <- ggplot(penguins, aes(bill_length_mm, body_mass_g)) +
  geom_point(alpha = 0.35, colour = uzk_blue) +
  geom_smooth(method = "lm", formula = y ~ x, se = FALSE,
              colour = uzk_coral, linewidth = 0.9)

p_crop <- p_base +
  scale_x_continuous(limits = c(40, 50)) +
  labs(title = "scale_x_continuous(limits = ...)",
       subtitle = "rows outside the limits are dropped")

p_zoom <- p_base +
  coord_cartesian(xlim = c(40, 50)) +
  labs(title = "coord_cartesian(xlim = ...)",
       subtitle = "all data are kept; the view is zoomed")

# 3. Coordinates -------------------------------------------------------------
p_bar_pie <- penguins |> count(species) |>
  ggplot(aes(x = "", y = n, fill = species)) +
  geom_col(width = 1, colour = "white") +
  coord_polar(theta = "y") +
  labs(title = "Pie chart", x = NULL, y = NULL) +
  theme_void(base_family = "Albert Sans") +
  theme(legend.position = "bottom",
        plot.title = element_text(face = "bold", colour = uzk_blue))

p_bar_flat <- penguins |> count(species) |>
  ggplot(aes(n, species, fill = species)) +
  geom_col(show.legend = FALSE, width = 0.65) +
  labs(title = "Bar chart", x = NULL, y = NULL) +
  theme(legend.position = "none")

# 4. Guides and legends ------------------------------------------------------
counts <- penguins |> count(species)

p_leg <- ggplot(counts, aes(species, n, fill = species)) +
  geom_col(width = 0.65) +
  scale_fill_viridis_d(end = 0.85, name = NULL) +
  labs(title = "Legend", x = NULL, y = NULL) +
  theme(legend.position = "bottom")

p_dir <- ggplot(counts, aes(species, n, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_text(aes(label = n), vjust = -0.4, size = 3.4) +
  scale_fill_viridis_d(end = 0.85, guide = "none") +
  scale_y_continuous(expand = expansion(mult = c(0, 0.14))) +
  labs(title = "Direct labels", x = NULL, y = NULL) +
  theme(legend.position = "none")

# 5. A plot is a specification -----------------------------------------------
# Building and rendering are separate steps. Inspect the object, then draw it.
p_spec <- ggplot(penguins, aes(flipper_length_mm, body_mass_g, colour = species)) +
  geom_point(alpha = 0.6, size = 1.6) +
  scale_colour_viridis_d(end = 0.85, name = NULL) +
  labs(title = "A plot is a list of layers",
       x = "Flipper length (mm)", y = "Body mass (g)")
# str(p_spec)  # uncomment to inspect the specification
# p_spec       # rendering happens here

# 6. Statistical transformations ---------------------------------------------
p_stat <- ggplot(diamonds, aes(cut)) +
  geom_bar(fill = uzk_blue) +
  scale_x_discrete(labels = function(x) gsub(" ", "\n", x)) +
  labs(
    x = "Cut", y = "Count",
    title = "geom_bar() computes counts",
    subtitle = "stat_count(); no y variable was supplied"
  )

# Proportions, computed by the stat rather than pre-summarised.
p_prop <- ggplot(diamonds, aes(cut)) +
  geom_bar(aes(y = after_stat(prop), group = 1), fill = uzk_turquoise) +
  scale_x_discrete(labels = function(x) gsub(" ", "\n", x)) +
  labs(x = "Cut", y = "Proportion",
       title = "after_stat(prop)", subtitle = "group = 1 for the whole sample")

# 7. Position adjustments ----------------------------------------------------
pos_data <- penguins |> filter(!is.na(sex))

p_identity <- ggplot(pos_data, aes(species, fill = sex)) +
  geom_bar(position = "identity", alpha = 0.55) +
  labs(title = "identity (overlap)", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_dodge <- ggplot(pos_data, aes(species, fill = sex)) +
  geom_bar(position = "dodge") +
  labs(title = "dodge (side by side)", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_stack <- ggplot(pos_data, aes(species, fill = sex)) +
  geom_bar(position = "stack") +
  labs(title = "stack (parts of total)", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_fill <- ggplot(pos_data, aes(species, fill = sex)) +
  geom_bar(position = "fill") +
  labs(title = "fill (proportions)", x = NULL, y = NULL) +
  theme(legend.position = "none")

# 8. What error bars actually mean -------------------------------------------
mass_summary <- penguins |>
  filter(!is.na(body_mass_g)) |>
  group_by(species) |>
  summarise(
    mean = mean(body_mass_g),
    se   = sd(body_mass_g) / sqrt(n()),
    sd   = sd(body_mass_g),
    n    = n(),
    .groups = "drop"
  )

p_se <- ggplot(mass_summary, aes(species, mean, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.18) +
  labs(title = "Mean ± 1 SE", subtitle = "uncertainty of the mean",
       x = NULL, y = "Body mass (g)") +
  theme(legend.position = "none")

p_sd <- ggplot(mass_summary, aes(species, mean, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_errorbar(aes(ymin = mean - sd, ymax = mean + sd), width = 0.18) +
  labs(title = "Mean ± 1 SD", subtitle = "spread of the observations",
       x = NULL, y = NULL) +
  theme(legend.position = "none")

# 9. Model-based visualization -----------------------------------------------
fit <- lm(body_mass_g ~ flipper_length_mm * species, data = penguins)

p_model <- plot_predictions(
  fit,
  condition = c("flipper_length_mm", "species"),
  points = 0.35
) +
  labs(title = "Conditional predictions with 95% confidence bands",
       x = "Flipper length (mm)", y = "Body mass (g)",
       colour = NULL, fill = NULL) +
  theme(legend.position = "bottom")

# 10. Uncertainty from a model ----------------------------------------------
# A confidence interval is for the mean; a prediction interval is for a new
# observation. They answer different questions and must be labelled.
p_ci <- ggplot(
  ggeffects::ggpredict(fit, terms = c("flipper_length_mm", "species")),
  aes(x, predicted, colour = group, fill = group)
) +
  geom_ribbon(aes(ymin = conf.low, ymax = conf.high), alpha = 0.18, colour = NA) +
  geom_line(linewidth = 0.9) +
  labs(title = "Confidence interval", subtitle = "uncertainty of the expected mean",
       x = "Flipper length (mm)", y = "Body mass (g)",
       colour = NULL, fill = NULL) +
  theme(legend.position = "bottom")

# A prediction interval is wider: it covers where a new observation may fall.
pred_grid <- expand.grid(
  flipper_length_mm = seq(180, 230, by = 2),
  species = unique(penguins$species)
)
pred_pi <- cbind(
  pred_grid,
  as.data.frame(predict(fit, newdata = pred_grid, interval = "prediction"))
)

p_pi <- ggplot(pred_pi, aes(flipper_length_mm, fit, colour = species, fill = species)) +
  geom_ribbon(aes(ymin = lwr, ymax = upr), alpha = 0.15, colour = NA) +
  geom_line(linewidth = 0.9) +
  labs(title = "Prediction interval", subtitle = "where a new observation may fall",
       x = "Flipper length (mm)", y = "Body mass (g)",
       colour = NULL, fill = NULL) +
  theme(legend.position = "bottom")

# 11. Marginal effects and interactions --------------------------------------
p_slopes <- plot_slopes(
  fit,
  variables = "flipper_length_mm",
  condition = "species"
) +
  labs(title = "Slope of body mass on flipper length",
       x = "Species", y = "Slope (g per mm)",
       colour = NULL, fill = NULL) +
  theme(legend.position = "none")

p_comparisons <- plot_comparisons(
  fit,
  variables = list(flipper_length_mm = c(190, 210)),
  by = "species"
) +
  labs(title = "Difference between 190 and 210 mm",
       x = "Species", y = "Difference in body mass (g)",
       colour = NULL, fill = NULL) +
  theme(legend.position = "none")

# 12. Themes change the non-data ink ----------------------------------------
p_theme <- ggplot(penguins, aes(bill_length_mm, body_mass_g, colour = species)) +
  geom_point(alpha = 0.7, size = 1.8) +
  labs(title = "Same data, four themes", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_th_min     <- p_theme + theme_minimal(base_family = "Albert Sans", base_size = 13)
p_th_bw      <- p_theme + theme_bw(base_family = "Albert Sans", base_size = 13)
p_th_classic <- p_theme + theme_classic(base_family = "Albert Sans", base_size = 13)
p_th_dark    <- p_theme + theme_dark(base_family = "Albert Sans", base_size = 13)

# 13. Composition: multiple panels, one figure ------------------------------
p_comp_a <- ggplot(penguins, aes(body_mass_g, fill = species)) +
  geom_density(alpha = 0.4, colour = NA, show.legend = FALSE) +
  labs(title = "Distribution", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_comp_b <- ggplot(penguins, aes(species, body_mass_g, fill = species)) +
  geom_boxplot(show.legend = FALSE, alpha = 0.8) +
  labs(title = "Quantiles", x = NULL, y = NULL)

p_comp_c <- ggplot(penguins, aes(flipper_length_mm, body_mass_g, colour = species)) +
  geom_point(alpha = 0.7, size = 1.5) +
  labs(title = "Relationship", x = NULL, y = NULL)

p_comp_d <- penguins |>
  count(island, species) |>
  ggplot(aes(island, n, fill = species)) +
  geom_col(position = "fill") +
  labs(title = "Composition", x = NULL, y = NULL)

p_composition <- (p_comp_a | p_comp_b) / (p_comp_c | p_comp_d) +
  plot_annotation(tag_levels = "A") &
  theme(legend.position = "bottom")

# 14. Export without losing the plot ----------------------------------------
# Write at the final physical size and inspect the text at 100%.
# ggsave("figure.png", p_composition,
#        width = 16, height = 10, units = "cm", dpi = 300, bg = "white")
# ggsave("figure.pdf", p_composition,
#        width = 16, height = 10, units = "cm")  # vector for journals

# 15. Accessibility and integrity checklist ---------------------------------
# - Is colour the only encoding? Add shape, linetype, or direct labels.
# - Does the palette survive deuteranopia? Try viridis or Okabe–Ito.
# - Are the axis labels and tick labels readable at final size?
# - Does the caption name the interval (CI or PI), the scale, and the data?
# - Would the figure still work in greyscale?
