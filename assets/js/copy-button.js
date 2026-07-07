document.addEventListener('DOMContentLoaded', function () {
  var copyIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>';
  var checkIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  document.querySelectorAll('div.codeblock').forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.innerHTML = copyIcon;
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.title = 'Copy to clipboard';

    button.addEventListener('click', function () {
      navigator.clipboard.writeText(pre.textContent).then(function () {
        button.innerHTML = checkIcon;
        button.classList.add('copied');
        button.setAttribute('aria-label', 'Copied!');
        button.title = 'Copied!';
        setTimeout(function () {
          button.innerHTML = copyIcon;
          button.classList.remove('copied');
          button.setAttribute('aria-label', 'Copy code to clipboard');
          button.title = 'Copy to clipboard';
        }, 1500);
      });
    });

    block.appendChild(button);
  });
});
