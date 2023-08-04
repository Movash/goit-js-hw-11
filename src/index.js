import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './pixabay-api';

const formSubmit = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');

formSubmit.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const searchText = evt.currentTarget[0].value;
  fetchPhotos(searchText)
    .then(data => {
      const searchResults = data.hits;
      console.log(searchResults);
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}


