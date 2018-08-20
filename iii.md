---
prev: ii
next: 1
---

# Shell scripts (Linux/Mac-specific)

Finally, let us write a script that will enable us to run 10 such simulations and save them in ten different files.  Create a file called `batch-sim` with the following contents:

{% include pre-file.html file="batch-sim" %}
#!/bin/bash
for ((i = 1; i <= 10; i++))
do
  R CMD BATCH --no-save --no-restore "--args $i" sim.R .sim.Rout &
done
{% include post-file.html %}

This is pretty straightforward: a simple loop with calls to R at each iteration.  One key remark, however, is the existence of the `&` in the code.  This tells Linux to move on to the next line of code without waiting for the command to finish running.  Obviously, this is not always a good idea -- in particular, if the next line of code depends on a result that the current line is calculating.  However, in this example, it's fine -- all the simulations can run at once.

Before we can run the above command, however, we have to tell Linux that the file is an executable script.  This is accomplished with the `chmod` command, which modifies file permissions:

{% include pre-prompt.html %}
chmod u+x batch-sim
{% include post-prompt.html %}

The `u+x` remark means that we want to give the user (that's us!) permission to run (i.e., e**x**ecute) the file.

We can now run all 10 simulations with a single command:

{% include pre-prompt.html %}
./batch-sim
{% include post-prompt.html %}

This will create files `sim1.RData` through `sim10.RData`; we can then combine these results to obtain 100,000 replications of our simulation.  The same idea extends to, say, analyzing several data sets `data1.RData` through `data200.RData`, where the `id` variable may be referred to at several points in the code.  FYI: the `./` in front of batch-sim tells the machine to look in the current directory for the executable command (otherwise the system only looks in the folders specified by the `$PATH` environment variable).

I should note that it is possible to write and run shell scripts ("batch files") in Windows, although that isn't going to help you with the cluster -- the UI HPC cluster runs Linux.
