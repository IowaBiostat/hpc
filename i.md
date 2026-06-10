---
prev: index
next: ii
---

# R CMD BATCH

Before we can submit jobs to the cluster, we first need to go over how to run jobs from the command line on our own local machine.  Let's say we have the following commands in a file called `sim.R`:

{% capture _code %}
N <- 10000
p <- numeric(N)
n <- 10
for (i in 1:N) {
  x <- rnorm(n)
  y <- rnorm(n, sd=3)
  p[i] <- t.test(x, y, var.equal=TRUE)$p.value
}
save(p, file="sim.RData")
{% endcapture %}
{% include file.html name="sim.R" code=_code %}

I.e., we generate data from two normal distributions, one of which has a
variance 9 times larger than the other, but then carry out a t-test in which we
assume equal variance.  This process is repeated 10,000 times.  Now, we can
submit this from the command line using

{% capture _code %}R CMD BATCH --no-save --no-restore sim.R .sim.Rout{% endcapture %}
{% include prompt.html code=_code %}

NOTE: All you really need is `R CMD BATCH sim.R`; the above options avoid generating or loading `.Rhistory` files and save the console text as a hidden file.
