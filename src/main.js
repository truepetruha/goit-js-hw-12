import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const modalLightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.js-search-form');
const ulEl = document.querySelector('.list-photo');
const btnLoadMore = document.querySelector('[data-action="load-more"]');
const loader = document.querySelector('.loader');
const loaderLoadMore = document.querySelector('.loader-load-more');

const hiddenClass = 'is-hidden';

let page = 1;

let maxPage = 0;

let query = '';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41849458-2d98265cf06659a45ba73a30c';

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  ulEl.innerHTML = '';

  loader.classList.remove(hiddenClass);

  page = 1;

  const form = event.currentTarget;
  query = form.elements.query.value.trim();

  if (!query) {
    loader.classList.add(hiddenClass);
    btnLoadMore.classList.add(hiddenClass);

    iziToast.show({
      title: 'Error',
      titleSize: '30',
      messageSize: '25',
      color: 'yellow',
      message: 'Please search for something',
    });
    return;
  }

  try {
    const { hits, totalHits } = await getPhotos(query);

    maxPage = Math.ceil(totalHits / 40);

    markupPhoto(hits, ulEl);
    if (hits.length > 0 && hits.length !== totalHits) {
      btnLoadMore.classList.remove(hiddenClass);
      btnLoadMore.addEventListener('click', handleLoadMore);
    } else if (!hits.length) {
      btnLoadMore.classList.add(hiddenClass);

      iziToast.error({
        title: 'Error',
        titleSize: '30',
        messageSize: '25',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      btnLoadMore.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add(hiddenClass);

    form.reset();
  }
}

async function getPhotos(value, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      params: {
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page,
      },
    });
    return response.data;
  } catch {
    iziToast.error({
      title: 'Error',
      titleSize: '30',
      messageSize: '25',
      message: 'Sorry! Try later! Server not working',
    });
    console.error(error.message);
  }
}

// ------------------------------------------------------------КНОПКА LOAD MORE-------------------------------------------------------------

async function handleLoadMore() {
  page += 1;
  loaderLoadMore.classList.remove(hiddenClass);
  btnLoadMore.classList.add(hiddenClass);

  const getHeightImgCard = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  try {
    const { hits } = await getPhotos(query, page);
    markupPhoto(hits, ulEl);
  } catch (error) {
    console.log(error);
  } finally {
    window.scrollBy({
      top: getHeightImgCard.height * 2,
      left: 0,
      behavior: 'smooth',
    });
    loaderLoadMore.classList.add(hiddenClass);
    btnLoadMore.classList.remove(hiddenClass);
    if (page === maxPage) {
      btnLoadMore.classList.add(hiddenClass);
      btnLoadMore.removeEventListener('click', handleLoadMore);
      iziToast.show({
        title: 'Hey',
        titleSize: '30',
        messageSize: '25',
        color: 'blue',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
}

// ------------------------------------------------------------РОЗМІТКА--------------------------------------------------------------------

function markupPhoto(hits) {
  const markup = hits
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
  ulEl.insertAdjacentHTML('beforeend', markup);
  modalLightboxGallery.refresh();
}