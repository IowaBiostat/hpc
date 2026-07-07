---
prev: i
next: 1
---

# Shell scripts (Linux/Mac-specific)

Now let us write a script that will run 10 such simulations in parallel. Create
a file called `batch-sim` with the following contents:

<!-- prettier-ignore-start -->
{% capture _code %}
#!/bin/bash
for ((i = 1; i <= 10; i++))
do
  Rscript sim.R &
done
wait
Rscript combine.R
{% endcapture %}
{% include file.html name="batch-sim" code=_code %}
<!-- prettier-ignore-end -->

This is a simple loop that calls `Rscript sim.R` ten times. One key remark is
the `&` at the end of the `Rscript` line: this tells the shell to start the job
in the background and immediately move to the next iteration of the loop, so all
ten simulations run simultaneously. The `wait` at the end holds the script open
until all background jobs have finished.

Before we can run the above command, we have to tell Linux that the file is an
executable script. This is accomplished with the `chmod` command:

{% capture _code %}chmod u+x batch-sim{% endcapture %}
{% include prompt.html code=_code %}

The `u+x` means that we want to give the user (that's us!) permission to
e**x**ecute the file.

We can now run (and combine) all 10 simulations with a single command:

{% capture _code %}./batch-sim{% endcapture %}
{% include prompt.html code=_code %}

The `./` in front of `batch-sim` tells the shell to look in the current directory for the command (otherwise the system only looks in the folders specified by the `$PATH` environment variable).

<div markdown="1" class="alert alert-danger" role="alert">
Keep in mind that Windows and Linux have different file endings; [see here for further details](2.html#transferring-files-windows).  If you create `batch-sim` on a Windows machine, make sure your editor saves it with Unix (LF) line endings, or you'll see errors like `bad interpreter: No such file or directory`.  The safest option is to create the file directly on Argon.
</div>
