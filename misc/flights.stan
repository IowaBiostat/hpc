data {
  int n;      // Sample size
  int J;      // Number of scenarios
  int K;      // Number of groups
  int sid[n]; // Scenario ID
  int gid[n]; // Group ID
  int y[n];   // Outcome
}

parameters {
  real mu;                        // Intercept
  real a[J];                      // Scenario effect
  real b[K];                      // Group effect
  real<lower=0,upper=5> sigma[2]; // SD for random effects
}

model {
  // Likelihood
  for (i in 1:n) {
    y[i] ~ bernoulli_logit(mu + a[sid[i]] + b[gid[i]]);
  }

  // Priors
  mu ~ normal(0, 100);
  for (j in 1:J) {
    a[j] ~ normal(0, sigma[1]);
  }
  for (k in 1:K) {
    b[k] ~ normal(0, sigma[2]);
  }
  for (i in 1:2) {
    sigma[i] ~ uniform(0, 5);
  }
}
