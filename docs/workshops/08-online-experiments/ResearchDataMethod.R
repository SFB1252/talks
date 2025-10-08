# Set working directory to source file location
library(tidyverse)
library(lme4)

# User-defined function to read in PCIbex Farm results files
read.pcibex <- function(filepath, auto.colnames=TRUE, fun.col=function(col,cols){cols[cols==col]<-paste(col,"Ibex",sep=".");return(cols)}) {
  n.cols <- max(count.fields(filepath,sep=",",quote=NULL),na.rm=TRUE)
  if (auto.colnames){
    cols <- c()
    con <- file(filepath, "r")
    while ( TRUE ) {
      line <- readLines(con, n = 1, warn=FALSE)
      if ( length(line) == 0) {
        break
      }
      m <- regmatches(line,regexec("^# (\\d+)\\. (.+)\\.$",line))[[1]]
      if (length(m) == 3) {
        index <- as.numeric(m[2])
        value <- m[3]
        if (is.function(fun.col)){
          cols <- fun.col(value,cols)
        }
        cols[index] <- value
        if (index == n.cols){
          break
        }
      }
    }
    close(con)
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=cols))
  }
  else{
    return(read.csv(filepath, comment.char="#", header=FALSE, col.names=seq(1:n.cols)))
  }
}

# Read in results file
results <- read.pcibex("results_prod.csv")

# HeLeX results
resultsAge <- results %>% 
  filter(PennElementName == "age") %>% 
  select(Results.reception.time, Value) %>% 
  rename(ID = Results.reception.time, age = Value) %>%
  mutate(age = as.numeric(age),  # in case age is character
         agegroup = if_else(age > 35, "older", "younger"))
write.csv(resultsAge, "resultsAge.csv")

resultsSpeechproblems <- results %>% filter(
  PennElementName == "speechproblems"
)%>% select(Results.reception.time,
            Value) 

resultsEducation <- results %>% filter(
  PennElementName == "education"
)


# Translation task results
resultsTranslation <- results %>% filter(Label == "Translation") %>% 
  filter(Parameter == "continuation") %>% 
  select(
    Results.reception.time,
    Value,
    Kelime
  ) %>% 
  rename(
    ID = Results.reception.time,
    answer = Value,
    target = Kelime
  ) 

write.csv(resultsTranslation, "resultsTranslation.csv")
# manual coding of answers and then import results again
resultsTranslationCoded  <- read.csv("resultsTranslationCoded.csv") %>% 
  drop_na(accuracy)

mean(resultsTranslationCoded$accuracy) # calculates mean for the whole group

resultsTranslationCoded %>% 
  group_by(ID) %>% 
  summarise(mean = mean(accuracy),
            sd = sd(accuracy))-> resultsTranslationParticipant

resultsTranslationCoded %>% 
  group_by(target) %>% 
  summarise(mean = mean(accuracy),
            sd = sd(accuracy))-> resultsTranslationItem

# Add age to results
resultsTranslationAge <- left_join(
  resultsTranslationCoded, resultsAge, by = "ID"
)

resultsTranslationAge$accuracy <- as.factor(resultsTranslationAge$accuracy)
resultsTranslationAge$ID <- as.factor(resultsTranslationAge$ID)
resultsTranslationAge$age <- as.numeric(resultsTranslationAge$age)

# run generalized linear mixed effects regression model
modelage <- glmer(accuracy ~ age + (1|ID), data = resultsTranslationAge, family = binomial())
summary(modelage)

# Stroop task results
resultsStroop <- results %>% filter(PennElementName == "cevap") %>% 
  filter(Label != "stroop_trial") %>% 
  select(
    Results.reception.time,
    Value,
    EventTime,
    DenemeNo,
    Kelime,
    Renk
  ) %>% 
  rename(
    ID = Results.reception.time,
    answer = Value,
    presented = DenemeNo,
    color = Kelime,
    accuracy = Renk
  )

resultsStroop$accuracy <- as.factor(resultsStroop$accuracy)
is.factor(resultsStroop$accuracy)

write.csv(resultsStroop, "resultsStroop.csv")

# add age to Stroop results
resultsStroopAge <- left_join(
  resultsStroop, resultsAge, by = "ID"
)

resultsStroopAge$ID <- as.factor(resultsStroopAge$ID)
resultsStroopAge$accuracy <- as.factor(resultsStroopAge$accuracy)
resultsStroopAge$agegroup <- as.factor(resultsStroopAge$agegroup)
resultsStroopAge$age <- as.numeric(resultsStroopAge$age)

resultsStroopAge %>% 
  mutate(accuracyNum = if_else(accuracy == "true", 1, 0)) %>% 
  group_by(agegroup) %>% 
  summarise(mean = mean(accuracyNum),
            sd = sd(accuracyNum))-> resultsStroopGroup
write.csv(resultsStroopGroup, "resultsStroopGroup.csv")


# run generalized linear mixed effects regression model
modelStroop <- glmer(accuracy ~ agegroup + (1|ID), data = resultsStroopAge, family = binomial())
summary(modelStroop)
