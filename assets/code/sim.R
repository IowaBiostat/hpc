N <- 10000
p <- numeric(N)
n <- 10
sd_ratio <- 3
for (i in 1:N) {
  x <- rnorm(n)
  y <- rnorm(n, sd = sd_ratio)
  p[i] <- t.test(x, y, var.equal = TRUE)$p.value
}
results <- data.frame(
  method = "Student",
  n = n,
  sd_ratio = sd_ratio,
  p = p
)
R.version.string

# Save results
args <- commandArgs(trailingOnly = TRUE)
outfile <- if (length(args) >= 1) {
  args[1]
} else {
  hash <- sample(c(letters, 0:9), 8, replace = TRUE) |>
    paste(collapse = "")
  paste0("sim-", hash, ".rds")
}
saveRDS(results, outfile)
