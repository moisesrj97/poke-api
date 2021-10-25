import BasicList from '../components/basicList.js';
import NavBar from '../components/NavBar.js';
import SearchBar from '../components/SearchBar.js';
import PokeApi from '../services/PokeApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  new NavBar('#navbar');
  const allPokeData = await PokeApi.getAllPokes();
  new SearchBar('#search-bar', allPokeData);
  new BasicList('#basic-list');
});
