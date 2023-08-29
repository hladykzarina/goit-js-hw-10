import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_MxGTqTUG4J50BWsqNahRlSykr46X0uHyUsHcfREX6O4lrpdXrRZmvbe4SjOrvMia';

const API_KEY =
  'live_MxGTqTUG4J50BWsqNahRlSykr46X0uHyUsHcfREX6O4lrpdXrRZmvbe4SjOrvMia';
const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlCat = 'https://api.thecatapi.com/v1/images';

function fetchBreeds() {
  return fetch(`${urlBreeds}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${urlCat}/${breedId}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
