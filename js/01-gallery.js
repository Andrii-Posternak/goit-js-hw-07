import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryListRef = document.querySelector('.gallery');

function createGalleryListMarkup(array) {
  return array
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>`,
    )
    .join('');
}

const galleryListMarkup = createGalleryListMarkup(galleryItems);
addGalleryListMarkup(galleryListMarkup);

function addGalleryListMarkup(markup) {
  galleryListRef.innerHTML = markup;
}

galleryListRef.addEventListener('click', onModalOpen);

function onModalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const imageOriginalUrl = event.target.dataset.source;
  const imageOriginalAlt = event.target.alt;
  const instance = basicLightbox.create(
    `<img src="${imageOriginalUrl}" alt="${imageOriginalAlt}">`,
  );
  instance.show();

  window.addEventListener('keydown', onEscapeClickModalClose);

  function onEscapeClickModalClose(event) {
    console.log(event.code);
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onEscapeClickModalClose);
    }
  }
}
