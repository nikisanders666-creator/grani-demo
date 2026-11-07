/* Фотоальбом «ГРАНИ»: простой полноэкранный просмотр без сторонних библиотек. */
(() => {
  const items = [...document.querySelectorAll('[data-gallery-item]')];
  const dialog = document.getElementById('gallery-lightbox');
  if (!dialog || !items.length) return;
  const image = dialog.querySelector('.gallery-lightbox-image');
  const counter = dialog.querySelector('.gallery-lightbox-counter');
  const close = dialog.querySelector('.gallery-close');
  let current = 0;
  const show = index => {
    current = (index + items.length) % items.length;
    const item = items[current];
    const thumbnail = item.querySelector('img');
    image.src = item.dataset.full;
    image.alt = thumbnail.alt;
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };
  items.forEach((item, index) => item.addEventListener('click', () => {
    show(index);
    dialog.showModal();
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); });
})();
