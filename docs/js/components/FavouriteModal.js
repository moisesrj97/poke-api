import FavouritesApi from '../services/FavouritesApi.js';
import Component from './component.js';

export default class FavouriteModal extends Component {
  constructor(selector, name, id) {
    super(selector);
    this.name = name;
    this.id = id;
    this.render();
  }

  render() {
    this.template =
      '<div class="fav-modal fav-modal--hidden"><form class="fav-modal__form"><input class="fav-modal__input" type="text" placeholder="Some cool nickname?"><button class="fav-modal__button" type="submit">Add to favorites 🌟</button></form></div>';
    super.render();
    this.activateForm();
  }

  activateForm() {
    const form = document.querySelector('form');
    const input = document.querySelector("input[type='text']");
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const name = input.value || this.name;
      FavouritesApi.createFav(this.id, name);
      window.location.href = './favourites.html';
    });
  }
}
