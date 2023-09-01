import axios from 'axios';
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.headers.common['x-api-key'] =
  'live_MxGTqTUG4J50BWsqNahRlSykr46X0uHyUsHcfREX6O4lrpdXrRZmvbe4SjOrvMia';
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
      return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
  ref.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '.breed-select',
  });
}
async function fetchBreedRender() {
  ref.loader.classList.remove('unvisible');
  try {
    const breeds = await fetchBreeds();
    renderSelect(breeds);
  } catch (error) {
    console.log(error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    ref.loader.classList.add('unvisible');
  }
}
function renderDesc(breed) {
  const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
  const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
  <p class="cat-info-desc-temp"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
  ref.catPic.insertAdjacentHTML('beforeend', picture);
  ref.catDesc.insertAdjacentHTML('beforeend', descript);
}
async function onChangeSelect(e) {
  ref.error.classList.add('unvisible');
  ref.catPic.innerHTML = '';
  ref.catDesc.innerHTML = '';
  const breedId = e.target.value;
  console.log('breedId: ', breedId);
  ref.loader.classList.remove('unvisible');
  try {
    const breed = await fetchCatByBreed(breedId);
    renderDesc(breed);
  } catch (error) {
    console.log(error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    ref.loader.classList.add('unvisible');
  }
}
fetchBreedRender();
