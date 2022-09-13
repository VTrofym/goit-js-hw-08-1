// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery')
// console.log(galleryContainer)
const itemsMarkup = createGalleryItems(galleryItems)
// console.log(galleryItems)
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup)
// console.log(createGalleryItems(galleryItems))

// 3.
galleryContainer.addEventListener('click', onGalleryContainerClick)


// 1. создание разметки в JS
function createGalleryItems(galleryItems) {
  return galleryItems.map(item => {
    return `
  <div class="gallery__item">
    <a class="gallery__link" href="${item.preview}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>
`;
  }).join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault()
  if (evt.target.tagName !== 'IMG') {
    return
  }
const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
`)
  instance.show()
  // console.log(evt.target)
}