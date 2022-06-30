library(rstan)
rstan_options(auto_write = TRUE)
options(mc.cores = parallel::detectCores())

# Data
Data <- read.delim("https://iowabiostat.github.io/hpc/misc/flights.txt")
Data$Scenario <- factor(Data$Scenario)
Data$Group <- factor(Data$Group)
stanData <- list(sid = as.numeric(Data$Scenario),
                 gid = as.numeric(Data$Group),
                 J = length(levels(Data$Scenario)),
                 K = length(levels(Data$Group)),
                 y = Data$Recovered,
                 n = nrow(Data))

# fit
fit <- stan('flights.stan',
            data = stanData,
            iter = 12000,
            warmup = 2000,
            chains = 10)

# Posterior summaries
print(fit)
stan_plot(fit, 'a')  # Scenario effects
stan_plot(fit, 'b')  # Training group effects
