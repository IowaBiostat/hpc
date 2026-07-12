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
hash <- sample(c(letters, 0:9), 8, replace = TRUE) |>
  paste(collapse = "")
R.version.string
saveRDS(results, paste0("sim-", hash, ".rds"))
