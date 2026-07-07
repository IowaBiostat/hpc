document.addEventListener('DOMContentLoaded', function () {
  if (typeof hljs === 'undefined') return;

  document.querySelectorAll('div.codeblock pre[data-lang]').forEach(function (pre) {
    var lang = pre.dataset.lang;
    if (!lang || !hljs.getLanguage(lang)) return;

    var result = hljs.highlight(pre.textContent, { language: lang, ignoreIllegals: true });
    pre.innerHTML = result.value;
    pre.classList.add('hljs');
  });
});
