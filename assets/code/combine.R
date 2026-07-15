args <- commandArgs(trailingOnly = TRUE)
if (length(args) >= 1) {
  outfile <- args[1]
  files <- args[-1]
} else {
  outfile <- "results.rds"
  files <- list.files(pattern = "^sim-.*\\.rds$")
}
results <- do.call(rbind, lapply(files, readRDS))
saveRDS(results, outfile)
if (length(args) == 0) invisible(file.remove(files))
