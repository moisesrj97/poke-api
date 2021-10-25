import getColor from '../../style/colors.js';
import PokeApi from '../services/PokeApi.js';
import Component from './component.js';

export default class BasicList extends Component {
  constructor(selector) {
    super(selector);
    this.currentNum = Math.floor(Math.random() * (898 - 0 + 1) + 0);
    this.render();
  }

  async render() {
    this.template = '';
    const apiReponse = await PokeApi.getTen(this.currentNum);

    apiReponse.forEach((e) => {
      this.template += `<a style="${getColor([
        e.types[0].type.name,
        e.types[1]?.type.name,
      ])}" class="basic-list__element" href="./details.html?id=${e.id}" alt="${
        e.name
      }"><img alt="${e.name}" src="${e.sprites.front_default}"/></a>`;
    });
    this.template +=
      '<div class="basic-list__button-pad"><button class="basic-list__button" id="button-prev">Previous page</button><button class="basic-list__button" id="button-next">Next page</button></div>';
    super.render();
    this.activateButtons();
  }

  activateButtons() {
    document.querySelector('#button-prev').addEventListener('click', () => {
      if (this.currentNum >= 10) {
        this.currentNum -= 10;
        this.render();
      }
    });
    document.querySelector('#button-next').addEventListener('click', () => {
      if (this.currentNum < 898) {
        this.currentNum += 10;
        this.render();
      }
    });
  }
}
