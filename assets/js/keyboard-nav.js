document.addEventListener('keydown', function (e) {
  if (!e.ctrlKey) return;
  var nav = document.querySelector('nav[data-prev][data-next]');
  if (!nav) return;

  if (e.key === 'ArrowLeft') {
    window.location.href = nav.dataset.prev;
  } else if (e.key === 'ArrowRight') {
    window.location.href = nav.dataset.next;
  }
});
