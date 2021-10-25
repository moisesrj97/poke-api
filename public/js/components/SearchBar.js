/* eslint-disable class-methods-use-this */
import Utilities from '../services/Utilities.js';
import Component from './component.js';

export default class SearchBar extends Component {
  constructor(selector, allPokeData) {
    super(selector);
    this.allPokeData = allPokeData;
    this.render();
  }

  async render() {
    this.template =
      '<form><input class="search-bar__form"type="text" placeholder="Search by name..."></form><ul class="search-results" id="search-results"></ul>';
    super.render();
    await this.activateForm();
  }

  async activateForm() {
    const searchInput = document.querySelector("input[type='text']");

    searchInput.addEventListener('input', (evt) => {
      const matchingNames = this.allPokeData.filter((e) => {
        if (evt.target.value === '') {
          document.querySelector('ul').innerHTML = '';
        } else if (e.name.includes(evt.target.value)) {
          return e;
        }
      });
      let innerList = '';
      const matchingNameSmall = matchingNames.slice(0, 6);
      matchingNameSmall.forEach((e) => {
        innerList += `<li><a href="./details.html?id=${
          e.id
        }">${Utilities.capitalize(e.name)}<a></li>`;
      });

      document.querySelector('#search-results').innerHTML = innerList;
    });
  }
}
