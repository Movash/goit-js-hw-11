// ----------------- Load more button -----------------------

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchPhotos } from './pixabay-api';

// const formSubmit = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');
// const loadMore = document.querySelector('.load-more');

// loadMore.classList.add('hidden');

// let page = 1;
// const perPage = 40;
// let searchText = '';

// formSubmit.addEventListener('submit', handlerSubmit);

// function handlerSubmit(evt) {
//   evt.preventDefault();
//   loadMore.classList.add('hidden');
//   gallery.innerHTML = '';
//   searchText = evt.currentTarget[0].value.trim().split(' ').join('+');

//     if (searchText === '') {
//       Notify.info('Write something, please!');
//       return;
//     }

//   fetchPhotos(searchText, page, perPage)
//     .then(data => {
//       const cards = data.hits;
//       if (data.totalHits === 0) {
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//       Notify.success(`Hooray! We found ${data.totalHits} images.`);
//       createMarkup(cards);
//       if (data.totalHits > perPage) {
//         loadMore.classList.remove('hidden');
//       }
//       lightbox.refresh();
//       smoothScroll();
//     })
//     .catch(() => {
//       Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
//     })
//     .finally(() => formSubmit.reset());
// }

// function createMarkup(arr) {
//   const markup = arr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
// <a class="gallery-link" href="${largeImageURL}">
//   <div class="photo-card">
//     <div class="img-wrapper">
//       <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px/>
//     </div>
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b> ${likes}
//       </p>
//       <p class="info-item">
//         <b>Views</b> ${views}
//       </p>
//       <p class="info-item">
//         <b>Comments</b> ${comments}
//       </p>
//       <p class="info-item">
//         <b>Downloads</b> ${downloads}
//       </p>
//     </div>
//   </div>
// </a>`
//     )
//     .join('');
// gallery.insertAdjacentHTML('beforeend', markup);
// }

// loadMore.addEventListener('click', handleClickLoadMore);

// function handleClickLoadMore() {
//   page += 1;
//   fetchPhotos(searchText, page, perPage)
//     .then(data => {
//       const numberOfPage = Math.ceil(data.totalHits / perPage);

//       if (page === numberOfPage) {
//         loadMore.classList.add('hidden');
//         Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         )};

//       const cards = data.hits;
//       createMarkup(cards);
//       lightbox.refresh();
//       smoothScroll();
//     })
//     .catch(() => {
//       Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
//     });
// }

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// function smoothScroll() {
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
// }


// ----------------- Infinite scroll -----------------------

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './pixabay-api';

const formSubmit = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const target = document.querySelector('.js-guard');

loadMore.classList.add('hidden');

let page = 1;
const perPage = 40;
let searchText = '';

formSubmit.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  searchText = evt.currentTarget[0].value.trim().split(' ').join('+');

  if (searchText === '') {
    Notify.info('Write something, please!');
    return;
  }

  fetchPhotos(searchText, page, perPage)
    .then(data => {
      const cards = data.hits;
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      createMarkup(cards);
      observer.observe(target);
      lightbox.refresh();
      smoothScroll();
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() => formSubmit.reset());
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<a class="gallery-link" href="${largeImageURL}">
  <div class="photo-card">
    <div>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px/>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
  </div>
</a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handlerLoad, options);

function handlerLoad(entries, observer) {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
  page += 1;
  fetchPhotos(searchText, page, perPage)
    .then(data => {
      const numberOfPage = Math.ceil(data.totalHits / perPage);

      if (page === numberOfPage) {
        observer.unobserve(target);
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        )};

      const cards = data.hits;
      createMarkup(cards);
      lightbox.refresh();
      smoothScroll();
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
    }
  })
}