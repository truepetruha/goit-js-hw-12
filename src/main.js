import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const modalLightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.js-search-form');
const ulEl = document.querySelector('.list-photo');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSearch);
loader.style.display = 'none';

function handleSearch(event) {
  event.preventDefault();

  loader.style.display = 'inline-block';

  ulEl.innerHTML = '';
  const form = event.currentTarget;
  const query = form.elements.query.value.trim();

  if (query === '') {
    iziToast.show({
      title: 'Error',
      color: 'yellow',
      message: 'Please search for something',
    });
    loader.style.display = 'none';
    return;
  }

  searchPhoto(query)
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });

        return;
      }
      ulEl.innerHTML = markupPhoto(data.hits);
      modalLightboxGallery.refresh();
    })
    .catch(onFetchError)
    .finally(() => {
      form.reset();
      loader.style.display = 'none';
    });
  // проблема була в тому що я вставив loader.style.display = 'none' не у файналі, тобто промахнувся і вставив його за дужку, воно було під ним і мабуть тому воно не показувало)
}
function searchPhoto(value) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '41849458-2d98265cf06659a45ba73a30c';
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const url = `${BASE_URL}/?${urlParams}`;
  return fetch(url).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function markupPhoto(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              width="360"
            />
          </a>
          <ul class="img-list">
  <li class="img-info">
   <p class="img-text">Likes: <br><span>${likes}</span></p>
   <p class="img-text">Views: <br><span>${views}</span></p>
   <p class="img-text">Comment: <br><span>${comments}</span></p>
   <p class="img-text">Downloads: <br><span>${downloads}</span></p>
   </li>
   </ul>
        </li>`
    )
    .join('');
}

function onFetchError(error) {
  console.error(error);
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}