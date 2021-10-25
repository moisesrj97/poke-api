import getColor from '../../style/colors.js';
import FavouritesApi from '../services/FavouritesApi.js';
import PokeApi from '../services/PokeApi.js';
import Component from './component.js';

export default class FavouritesDisplay extends Component {
  constructor(selector) {
    super(selector);
    this.render();
  }

  async render() {
    const favs = FavouritesApi.getFavs();
    const favsPromises = favs.map(async (e) => {
      const response = await PokeApi.getPokemonInfo(e.id);
      return { ...response, nickname: e.nickname, favIndex: e.index };
    });

    const favsData = await Promise.all(favsPromises);

    this.template = '';
    favsData.forEach((e) => {
      this.template += `
      <div class="favourites-display__element" style="${getColor([
        e.types[0].type.name,
        e.types[1]?.type.name,
      ])}"><div class="favourites-display__element-controls"><form data-index="${
        e.favIndex
      }"><input class="favourites-display__element-input" data-index="${
        e.favIndex
      }"type="text" value="${
        e.nickname
      }"/></form><button class="favourites-display__element-delete" data-index="${
        e.favIndex
      }">❌</button></div><a href="./details.html?id=${e.id}"><img  src="${
        e.sprites.front_default
      }"/></a></div>`;
    });
    super.render();
    this.activateButtons();
    this.activateForm();
  }

  activateButtons() {
    document.querySelectorAll('button').forEach((e) => {
      e.addEventListener('click', (evt) => {
        FavouritesApi.deleteFav(evt.target.dataset.index);
        this.render();
      });
    });
  }

  activateForm() {
    document.querySelectorAll('form').forEach((e) => {
      e.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const input = document.querySelector(
          `input[data-index='${evt.target.dataset.index}']`,
        );
        FavouritesApi.updateFavNickName(input.dataset.index, input.value);
        this.render();
      });
    });
  }
}
