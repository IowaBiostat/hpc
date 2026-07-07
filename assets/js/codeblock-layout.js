document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('pre.file, pre.prompt').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (!code) return;

    var langClass = Array.prototype.find.call(code.classList, function (c) {
      return c.indexOf('language-') === 0;
    });
    var lang = langClass ? langClass.slice('language-'.length) : null;
    var isFile = pre.classList.contains('file');

    var wrapper = document.createElement('div');
    wrapper.className = 'd-flex flexrow mx-auto codeblock';

    var left = document.createElement('div');
    var right = document.createElement('div');
    if (isFile) {
      left.className = 'left-file';
      left.textContent = pre.dataset.name || '';
      right.className = 'right-file';
    } else {
      left.className = 'left-prompt';
      left.textContent = '$';
      right.className = 'right-prompt';
    }

    var newPre = document.createElement('pre');
    if (lang) newPre.dataset.lang = lang;
    newPre.textContent = code.textContent.trim();
    right.appendChild(newPre);

    wrapper.appendChild(left);
    wrapper.appendChild(right);
    pre.replaceWith(wrapper);
  });
});
