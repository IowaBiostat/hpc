---
prev: index
next: ii
---

# Rscript

Before we can submit jobs to the cluster, we first need to go over how to run
jobs from the command line on our own local machine. Let's say we have the
following commands in a file called `sim.R`:

```r
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
hash <- paste(
  sample(c(letters, 0:9), 8, replace = TRUE),
  collapse = ""
)
saveRDS(results, paste0("sim-", hash, ".rds"))
```
{: .file data-name="sim.R"}

I.e., we generate data from two normal distributions, one of which has a
variance 9 times larger than the other, but then carry out a t-test in which we
assume equal variance. This process is repeated 10,000 times. The last two
expressions generate a random 8-character hash (e.g., `a3f9bx2k`) and save the
results to a file with that hash in its name (e.g., `sim-a3f9bx2k.rds`). This
ensures that multiple runs don't overwrite each other.

We can run this from the command line using

```bash
Rscript sim.R
```
{: .prompt}

Running it multiple times produces multiple files like `sim-a3f9bx2k.rds`,
`sim-7hq2mn4p.rds`, and so on.

To combine them (this will delete the old `sim-*.rds` files in the process and
create a new `results.rds` file that contains the combined results):

```r
files <- list.files(pattern="^sim-.*\\.rds$")
results <- do.call(rbind, lapply(files, readRDS))
invisible(file.remove(files))
saveRDS(results, "results.rds")
```
{: .file data-name="combine.R"}
