# Data Visualization with ggplot2
# Workshop 30 · CRC 1252 Prominence in Language · 18 November 2026
# Companion script: every figure in slides.qmd can be rebuilt from here.

library(ggplot2)
library(dplyr)
library(tidyr)
library(patchwork)
library(scales)
library(viridis)

penguins <- read.csv("data/penguins.csv")
gapminder <- read.csv("data/gapminder.csv")
safi <- read.csv("data/SAFI_clean.csv")
datasaurus <- read.delim("data/datasaurus.tsv")

# A single house style -------------------------------------------------------
uzk_blue <- "#005176"
uzk_turquoise <- "#009dcc"
uzk_coral <- "#ea564f"
uzk_muted <- "#547685"

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

# 1. Anscombe's quartet ------------------------------------------------------
anscombe_long <- anscombe |>
  pivot_longer(everything(), names_to = c(".value", "quartet"),
               names_pattern = "([xy])(\\d)") |>
  mutate(quartet = factor(quartet))

anscombe_stats <- anscombe_long |>
  group_by(quartet) |>
  summarise(
    r = if (sd(x) > 0) cor(x, y) else NA_real_,
    label = if (sd(x) > 0) {
      sprintf("Quartet %s  ·  r = %.2f", quartet[1], r)
    } else {
      sprintf("Quartet %s  ·  r undefined", quartet[1])
    },
    .groups = "drop"
  )

anscombe_long <- left_join(anscombe_long, anscombe_stats, by = "quartet")

p_anscombe <- ggplot(anscombe_long, aes(x, y)) +
  geom_point(colour = uzk_blue, size = 2) +
  geom_smooth(data = filter(anscombe_long, quartet != "2"),
              method = "lm", formula = y ~ x, se = FALSE,
              colour = uzk_coral, linewidth = 0.9) +
  facet_wrap(~label, nrow = 2) +
  labs(x = NULL, y = NULL, title = "Four datasets, one regression line") +
  theme(panel.grid.minor = element_blank())

# 2. Datasaurus Dozen --------------------------------------------------------
p_datasaurus <- datasaurus |>
  filter(dataset %in% c("dino", "star", "x_shape", "circle", "high_lines", "dots")) |>
  ggplot(aes(x, y)) +
  geom_point(size = 0.7, alpha = 0.6, colour = uzk_blue) +
  facet_wrap(~dataset, nrow = 2) +
  coord_fixed() +
  labs(x = NULL, y = NULL) +
  theme_void(base_family = "Albert Sans") +
  theme(strip.text = element_text(colour = uzk_blue, face = "bold"),
        panel.spacing = unit(0.4, "lines"))

# 3. First plot --------------------------------------------------------------
p_first <- ggplot(penguins, aes(x = flipper_length_mm, y = body_mass_g)) +
  geom_point(aes(colour = species), alpha = 0.75, size = 2.2) +
  scale_colour_viridis_d(end = 0.85, name = NULL) +
  labs(
    x = "Flipper length (mm)",
    y = "Body mass (g)",
    title = "Bigger flippers, heavier penguins",
    subtitle = "Palmer Archipelago, 2007–2009",
    caption = "Data: palmerpenguins"
  )

# 4. Mapping versus setting --------------------------------------------------
set_colour <- ggplot(penguins, aes(bill_length_mm, bill_depth_mm)) +
  geom_point(colour = uzk_blue, alpha = 0.7) +
  labs(title = 'Set: colour = "#005176"', x = NULL, y = NULL)

map_colour <- ggplot(penguins, aes(bill_length_mm, bill_depth_mm)) +
  geom_point(aes(colour = species), alpha = 0.8, size = 2) +
  labs(title = "Map: aes(colour = species)", x = NULL, y = NULL) +
  theme(legend.position = "none")

map_constant <- ggplot(penguins, aes(bill_length_mm, bill_depth_mm)) +
  geom_point(aes(colour = "black"), alpha = 0.8, size = 2) +
  labs(title = 'Mistake: aes(colour = "black")', x = NULL, y = NULL) +
  theme(legend.position = "none")

# 5. Grouping ----------------------------------------------------------------
europe <- gapminder |> filter(continent == "Europe")

p_ungrouped <- ggplot(europe, aes(year, lifeExp)) +
  geom_line(colour = uzk_coral, linewidth = 0.5) +
  labs(title = "No group aesthetic", x = NULL, y = "Life expectancy") +
  theme(legend.position = "none")

p_grouped <- ggplot(europe, aes(year, lifeExp, group = country)) +
  geom_line(colour = uzk_blue, linewidth = 0.4, alpha = 0.7) +
  labs(title = "group = country", x = NULL, y = NULL) +
  theme(legend.position = "none")

# 6. Geom family -------------------------------------------------------------
g_point <- ggplot(penguins, aes(flipper_length_mm, body_mass_g)) +
  geom_point(colour = uzk_blue, alpha = 0.5, size = 1.4) +
  labs(title = "Points: two numbers", x = NULL, y = NULL)

g_line <- ggplot(europe, aes(year, lifeExp, group = country)) +
  geom_line(colour = uzk_blue, alpha = 0.6, linewidth = 0.4) +
  scale_x_continuous(breaks = c(1950, 1970, 1990)) +
  labs(title = "Lines: change over time", x = NULL, y = NULL)

g_bar <- penguins |>
  count(species) |>
  ggplot(aes(species, n)) +
  geom_col(fill = uzk_turquoise) +
  theme(axis.text.x = element_text(angle = 20, hjust = 1)) +
  labs(title = "Bars: counts", x = NULL, y = NULL)

g_hist <- ggplot(penguins, aes(body_mass_g)) +
  geom_histogram(fill = uzk_blue, colour = "white", bins = 22) +
  labs(title = "Histogram: one distribution", x = NULL, y = NULL)

g_box <- ggplot(penguins, aes(species, body_mass_g, fill = species)) +
  geom_boxplot(show.legend = FALSE, alpha = 0.8, outlier.size = 0.6) +
  theme(axis.text.x = element_text(angle = 20, hjust = 1)) +
  labs(title = "Boxplot: quantiles", x = NULL, y = NULL)

g_dens <- ggplot(penguins, aes(body_mass_g, fill = species)) +
  geom_density(alpha = 0.45, colour = NA, show.legend = FALSE) +
  labs(title = "Density: shape", x = NULL, y = NULL)

# 7. Statistics --------------------------------------------------------------
p_stat <- ggplot(diamonds, aes(cut)) +
  geom_bar(fill = uzk_blue) +
  scale_x_discrete(labels = function(x) gsub(" ", "\n", x)) +
  labs(
    x = "Cut", y = "Count",
    title = "geom_bar() computes counts",
    subtitle = "stat_count(); no y variable was supplied"
  )

# 8. Positions ---------------------------------------------------------------
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

# 9. Scales ------------------------------------------------------------------
g2007 <- gapminder |> filter(year == 2007)
dollar_k <- function(x) paste0("$", format(x / 1000, trim = TRUE, scientific = FALSE), "k")

p_linear <- ggplot(g2007, aes(gdpPercap, lifeExp, colour = continent, size = pop)) +
  geom_point(alpha = 0.7) +
  scale_size_area(max_size = 7, guide = "none") +
  scale_x_continuous(labels = dollar_k,
                     breaks = c(0, 20000, 40000, 60000, 80000)) +
  labs(title = "Linear x scale", x = "GDP per capita", y = "Life expectancy",
       colour = NULL) +
  theme(legend.position = "right")

p_log <- p_linear +
  scale_x_log10(labels = dollar_k,
                breaks = c(1000, 3000, 10000, 30000, 100000)) +
  labs(title = "Log10 x scale")

# 10. Limits versus zoom -----------------------------------------------------
p_base <- ggplot(penguins, aes(bill_length_mm, body_mass_g)) +
  geom_point(alpha = 0.35, colour = uzk_blue) +
  geom_smooth(method = "lm", formula = y ~ x, se = FALSE,
              colour = uzk_coral, linewidth = 0.9)

p_crop <- p_base +
  scale_x_continuous(limits = c(40, 50)) +
  labs(title = "scale_x_continuous(limits = ...)",
       subtitle = "34 rows outside the limits are dropped")

p_zoom <- p_base +
  coord_cartesian(xlim = c(40, 50)) +
  labs(title = "coord_cartesian(xlim = ...)",
       subtitle = "all data are kept; the view is zoomed")

# 11. Coordinates ------------------------------------------------------------
p_bar_pie <- penguins |>
  count(species) |>
  ggplot(aes(x = "", y = n, fill = species)) +
  geom_col(width = 1, colour = "white") +
  coord_polar(theta = "y") +
  labs(title = "Pie: stacked bar in polar coordinates", x = NULL, y = NULL) +
  theme_void(base_family = "Albert Sans") +
  theme(legend.position = "bottom",
        plot.title = element_text(face = "bold", colour = uzk_blue))

p_bar_flat <- penguins |>
  count(species) |>
  ggplot(aes(n, species, fill = species)) +
  geom_col(show.legend = FALSE, width = 0.65) +
  labs(title = "Bar: position on a common scale", x = NULL, y = NULL) +
  theme(legend.position = "none")

# 12. Facets -----------------------------------------------------------------
p_facet <- gapminder |>
  ggplot(aes(year, lifeExp, group = country)) +
  geom_line(colour = uzk_blue, alpha = 0.35, linewidth = 0.35) +
  facet_wrap(~continent, nrow = 2) +
  labs(x = NULL, y = "Life expectancy", title = "Small multiples by continent") +
  theme(panel.grid.minor = element_blank())

# 13. Colour -----------------------------------------------------------------
p_col_default <- ggplot(penguins, aes(bill_length_mm, body_mass_g, colour = species)) +
  geom_point(alpha = 0.8, size = 1.8) +
  labs(title = "Default hue", x = NULL, y = NULL) +
  theme(legend.position = "none")

p_col_viridis <- p_col_default +
  scale_colour_viridis_d(end = 0.85) +
  labs(title = "Viridis")

p_col_okabe <- p_col_default +
  scale_colour_manual(values = c("#E69F00", "#56B4E9", "#009E73")) +
  labs(title = "Okabe–Ito")

# 14. Dynamite versus raincloud ---------------------------------------------
mass_summary <- penguins |>
  filter(!is.na(body_mass_g)) |>
  group_by(species) |>
  summarise(mean = mean(body_mass_g), se = sd(body_mass_g) / sqrt(n()), .groups = "drop")

p_trunc_full <- ggplot(mass_summary, aes(species, mean, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  coord_cartesian(ylim = c(0, 5000)) +
  labs(title = "Zero baseline", subtitle = "differences look modest",
       x = NULL, y = "Mean body mass (g)") +
  theme(legend.position = "none")

p_trunc_zoom <- ggplot(mass_summary, aes(species, mean, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  coord_cartesian(ylim = c(3400, 4900)) +
  labs(title = "Truncated baseline", subtitle = "differences look dramatic",
       x = NULL, y = NULL) +
  theme(legend.position = "none")

p_dynamite <- ggplot(mass_summary, aes(species, mean, fill = species)) +
  geom_col(width = 0.65, show.legend = FALSE) +
  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.18) +
  labs(title = "Dynamite plot", subtitle = "mean ± 1 SE", x = NULL, y = "Body mass (g)") +
  theme(legend.position = "none")

p_raincloud <- penguins |>
  filter(!is.na(body_mass_g), !is.na(sex)) |>
  ggplot(aes(species, body_mass_g, fill = sex)) +
  geom_violin(width = 0.75, alpha = 0.55, colour = NA,
              position = position_dodge(width = 0.8)) +
  geom_boxplot(width = 0.12, outlier.shape = NA, alpha = 0.9,
               position = position_dodge(width = 0.8)) +
  geom_point(size = 0.45, alpha = 0.35,
             position = position_jitterdodge(jitter.width = 0.12,
                                             dodge.width = 0.8)) +
  labs(title = "Raincloud-style plot", subtitle = "all observations, split by sex",
       x = NULL, y = NULL, fill = NULL) +
  theme(legend.position = "bottom")

# 15. Overplotting -----------------------------------------------------------
set.seed(42)
diamonds_small <- diamonds[sample(nrow(diamonds), 12000), ]

p_over_plain <- ggplot(diamonds_small, aes(carat, price)) +
  geom_point(size = 0.6, colour = uzk_blue) +
  labs(title = "geom_point()", x = NULL, y = NULL)

p_over_alpha <- ggplot(diamonds_small, aes(carat, price)) +
  geom_point(size = 0.6, colour = uzk_blue, alpha = 0.05) +
  labs(title = "alpha = 0.05", x = NULL, y = NULL)

p_over_hex <- ggplot(diamonds_small, aes(carat, price)) +
  geom_hex(bins = 35) +
  scale_fill_viridis_c(guide = "none") +
  labs(title = "geom_hex()", x = NULL, y = NULL)

# 16. Distribution gallery ---------------------------------------------------
dist_a <- ggplot(penguins, aes(body_mass_g)) +
  geom_histogram(fill = uzk_blue, colour = "white", bins = 22) +
  labs(title = "Histogram", x = NULL, y = NULL)

dist_b <- ggplot(penguins, aes(body_mass_g, fill = species)) +
  geom_density(alpha = 0.4, colour = NA, show.legend = FALSE) +
  labs(title = "Density", x = NULL, y = NULL) +
  theme(legend.position = "none")

dist_c <- ggplot(penguins, aes(body_mass_g, colour = species)) +
  stat_ecdf(linewidth = 0.8) +
  labs(title = "ECDF", x = NULL, y = NULL)

dist_d <- ggplot(penguins, aes(species, body_mass_g, fill = species)) +
  geom_boxplot(show.legend = FALSE, alpha = 0.8, outlier.size = 0.5) +
  labs(title = "Boxplot", x = NULL, y = NULL)

dist_e <- ggplot(penguins, aes(species, body_mass_g, fill = species)) +
  geom_violin(show.legend = FALSE, alpha = 0.75, colour = NA) +
  labs(title = "Violin", x = NULL, y = NULL)

dist_f <- penguins |>
  filter(!is.na(sex)) |>
  ggplot(aes(species, body_mass_g, fill = species)) +
  geom_violin(width = 0.7, alpha = 0.45, colour = NA, show.legend = FALSE) +
  geom_boxplot(width = 0.12, outlier.shape = NA, alpha = 0.8, show.legend = FALSE) +
  geom_point(size = 0.4, alpha = 0.35, show.legend = FALSE,
             position = position_jitter(width = 0.12)) +
  labs(title = "Raincloud", x = NULL, y = NULL)
