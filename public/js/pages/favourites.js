import FavouritesDisplay from '../components/FavouritesDisplay.js';
import NavBar from '../components/NavBar.js';

document.addEventListener('DOMContentLoaded', () => {
  new NavBar('#navbar');
  new FavouritesDisplay('#favourites-display');
});
