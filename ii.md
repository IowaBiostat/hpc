---
prev: i
next: iii
---

# Passing arguments to R via the command line

We have seen how to run a "static" program -- i.e., one that runs the same way each time.  In the [earlier example](i.html), the code will generate different p-values each time (because it will be run with a different random seed each time), but we can't run multiple versions simultaneously (well, we can, but we would overwrite `sim.RData` each time).

To fix this problem, we need to be able to pass an argument from the command line to R.  This is accomplished via the `--args` option, as in a command like:

{% capture _code %}R CMD BATCH --no-save --no-restore "--args 3" sim.R .sim.Rout{% endcapture %}
{% include prompt.html code=_code %}

From within `R`, the argument (3) is accessible via the `commandArgs()` function.  So, let us rewrite `sim.R` as follows:

{% capture _code %}
N <- 10000
p <- numeric(N)
n <- 10
for (i in 1:N) {
  x <- rnorm(n)
  y <- rnorm(n, sd=3)
  p[i] <- t.test(x, y, var.equal=TRUE)$p.value
}
id <- commandArgs(TRUE)
filename <- paste("sim", id[1], ".RData", sep="")
save(p, file=filename)
{% endcapture %}
{% include file.html name="sim.R" code=_code %}

Here, the `TRUE` option means that we only want the stuff in the `--args` section and we don't care about the `--no-save` and `--no-restore` options.  Now, we can run

{% capture _code %}R CMD BATCH --no-save --no-restore "--args 1" sim.R .sim.Rout{% endcapture %}
{% include prompt.html code=_code %}

which runs our simulation and saves the resulting p-values in a file called `sim1.RData`; likewise,

{% capture _code %}R CMD BATCH --no-save --no-restore "--args 2" sim.R .sim.Rout{% endcapture %}
{% include prompt.html code=_code %}

runs another simulation and saves those results as `sim2.RData`, and so on.

The result of `commandArgs` is a character vector, so if you want to use it for numeric purposes, you have to convert it with `id <- as.numeric(commandArgs(TRUE))`.  Then you could use it to, say, set the simulation seed with `set.seed(id)` or change the simulation settings with `y <- rnorm(n, sd=id)`.
