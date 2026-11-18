install.packages("plotly")
install.packages("esquisse")
esquisse:::esquisser()




library(ggplot2)

ggplot(gapminder.csv) +
 aes(x = year, y = pop, colour = country) +
 geom_point(shape = "square open") +
 geom_smooth(aes(color = country, x = year, y = pop), se = TRUE) +
 scale_color_viridis_d(option = "plasma", 
 direction = -1) +
 scale_color_hue(direction = 1) +
 theme_minimal() +
 theme(legend.position = "none")
library(ggplot2)

ggplot(gapminder.csv) +
 aes(x = lifeExp, y = gdpPercap, colour = pop, size = pop, group = country) +
 geom_point() +
 scale_color_gradient() +
 scale_y_continuous(trans = "log") +
 theme_minimal() +
 facet_wrap(vars(continent))

library("colorspace")
hcl_palettes(plot = TRUE)
q4 <- qualitative_hcl(4, palette = "Dark 3")
q4
colorspace::choose_palette()



remotes::install_github("wilkelab/cowplot")
install.packages("colorspace", repos = "http://R-Forge.R-project.org")
remotes::install_github("clauswilke/colorblindr")
library(ggplot2)
fig <- ggplot(iris, aes(Sepal.Length, fill = Species)) + geom_density(alpha = 0.7)
fig
library(colorblindr)
cvd_grid(fig)
view_cvd(p) # starts the interactive app
fig2 <- ggplot(iris, aes(Sepal.Length, fill = Species)) + 
  geom_density(alpha = 0.7) + scale_fill_OkabeIto()
fig2
