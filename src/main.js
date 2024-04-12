import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/pixabay-api';
import { showErrorMessage, hiddenClass, hideElement, showElement, resetForm } from './js/render-functions';

const modalLightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('.js-search-form');
const ulEl = document.querySelector('.list-photo');
const btnLoadMore = document.querySelector('[data-action="load-more"]');
const loader = document.querySelector('.loader');


let page = 1;
let maxPage = 0;
let query = '';

document.addEventListener('DOMContentLoaded', () => {
  btnLoadMore.classList.add(hiddenClass);
});

searchForm.addEventListener('submit', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);

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

    showErrorMessage('Please search for something');
    return;
  }

  try {
    const { hits, totalHits } = await getPhotos(query);

    maxPage = Math.ceil(totalHits / 15);

    markupPhoto(hits, ulEl);
    
    if (hits.length > 0 && hits.length !== totalHits && page <= maxPage) {
      btnLoadMore.classList.remove(hiddenClass);
   } else if (!hits.length) {
      btnLoadMore.classList.add(hiddenClass);

      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
    } else {
      btnLoadMore.classList.add(hiddenClass);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add(hiddenClass);

    resetForm(form);
  }
}

async function handleLoadMore() {
  if (page >= maxPage) return;
  
  page += 1;
  loader.classList.remove(hiddenClass);
  btnLoadMore.classList.add(hiddenClass);

  const getHeightImgCard = document.querySelector('.gallery-item').getBoundingClientRect();

  try {
    const { hits } = await getPhotos(query, page);
    markupPhoto(hits, ulEl);
  } catch (error) {
    console.error(error);
  } finally {
    window.scrollBy({
      top: getHeightImgCard.height * 2,
      left: 0,
      behavior: 'smooth',
    });
    loader.classList.add(hiddenClass);
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
