import FavouriteModal from '../components/FavouriteModal.js';
import NavBar from '../components/NavBar.js';
import PokeDisplay from '../components/PokeDisplay.js';
import PokeApi from '../services/PokeApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  const querys = window.location.search;
  const queryList = new URLSearchParams(querys);
  const id = queryList.get('id');
  const pokeInfo = await PokeApi.getAllPokeInfo(id);
  new PokeDisplay('#poke-display', pokeInfo);
  new NavBar('#navbar');
  new FavouriteModal('#favourites-modal', pokeInfo.name, id);
});
