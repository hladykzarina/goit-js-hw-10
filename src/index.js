import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_MxGTqTUG4J50BWsqNahRlSykr46X0uHyUsHcfREX6O4lrpdXrRZmvbe4SjOrvMia';
//import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const ref = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  catPic: document.querySelector('.cat-info-pict'),
  catDesc: document.querySelector('.cat-info-desc'),
};

ref.select.addEventListener('change', onChangeSelect);

function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<options value='${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
  ref.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

(function fetchBreedRender() {
  ref.loader.classList.remove('unvisible');
  fetchBreeds()
    .then(breeds => renderSelect(breeds))
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      ref.loader.classList.add('unvisible');
      ref.loader.classList.remove('unvisible');
    });
})();

function renderDesc(breed) {
  const picture = `img class="cat-picture" src="${breed.url}" alt="${breed.id}"`;
  const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
  <p class="cat-info-desc-temp"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
  ref.catPic.insertAdjacentHTML('beforeend', picture);
  ref.catDesc.insertAdjacentHTML('beforeend', descript);
}

function onChangeSelect(e) {
  ref.loader.classList.remove('unvisible');
  ref.catPic.innerHTML = '';
  ref.catDesc.innerHTML = '';
  const breedId = e.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderDesc(breed))
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => ref.loader.classList.add('unvisible'));
}
