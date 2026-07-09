document.addEventListener("DOMContentLoaded", function () {
  if (typeof hljs === "undefined") return;

  var bash = hljs.getLanguage("bash");
  if (bash) {
    bash.keywords.built_in.push(
      "Rscript",
      "apptainer",
      "ml",
      "module",
      "qdel",
      "qhost",
      "qlogin",
      "qsub",
      "qstat",
      "qrls",
      "rsync",
      "singularity",
      "scp",
      "ssh",
    );
    // Exclude words immediately after "." or "/" so path segments like
    // ".local" in "mkdir -p .local/lib/R" aren't mistaken for the "local" builtin.
    bash.keywords.$pattern = /\b(?<![./])[A-Za-z][A-Za-z0-9._-]*\b/;

    // "exec" is a stock shell builtin, but in this tutorial it only ever
    // appears as the "apptainer exec"/"singularity exec" subcommand, so drop
    // it to avoid highlighting it inconsistently with other subcommands.
    bash.keywords.built_in = bash.keywords.built_in.filter(function (w) {
      return w !== "exec";
    });
  }

  document
    .querySelectorAll("div.codeblock pre[data-lang]")
    .forEach(function (pre) {
      var lang = pre.dataset.lang;
      if (!lang || !hljs.getLanguage(lang)) return;

      var result = hljs.highlight(pre.textContent, {
        language: lang,
        ignoreIllegals: true,
      });
      pre.innerHTML = result.value;
      pre.classList.add("hljs");
    });
});
