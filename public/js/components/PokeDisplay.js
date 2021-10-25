import PokeApi from '../services/PokeApi.js';
import Utilities from '../services/Utilities.js';
import Component from './component.js';
import getColor, { colors } from '../../style/colors.js';

export default class PokeDisplay extends Component {
  constructor(selector, pokeInfo) {
    super(selector);
    this.pokeInfo = pokeInfo;
    this.render();
  }

  async render() {
    const getId = (str) => {
      return str
        .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
        .replace('https://pokeapi.co/api/v2/pokemon/', '')
        .replace('/', '');
    };

    const toList = (arr, className) => {
      let base = `<ul class="${className}">`;
      arr.forEach((e) => {
        base += `<li style="background-color:${
          className === 'types' ? colors[e] : ''
        }" class="${className}-element">${Utilities.capitalize(e)}</li>`;
      });
      base += '</ul>';
      return base;
    };

    let preEvolutionData;
    if (this.pokeInfo.evolutionPre?.url) {
      preEvolutionData = await PokeApi.getPokemonInfo(
        getId(this.pokeInfo.evolutionPre.url),
      );
    }

    let postEvolutionData;

    if (
      Array.isArray(this.pokeInfo.evolutionPost) &&
      this.pokeInfo.evolutionPost.length > 0
    ) {
      const postEvolutionDataPromises = this.pokeInfo.evolutionPost.map(
        async (e) => {
          return await PokeApi.getPokemonInfo(getId(e.species.url));
        },
      );

      postEvolutionData = await Promise.all(postEvolutionDataPromises);
    }

    let differentFormsData;
    if (
      Array.isArray(this.pokeInfo.varieties) &&
      this.pokeInfo.varieties.length > 1
    ) {
      const differentFormsDataPromises = this.pokeInfo.varieties.map(
        async (e) => {
          return await PokeApi.getPokemonInfo(getId(e.url));
        },
      );
      differentFormsData = await Promise.all(differentFormsDataPromises);
    }

    const types = toList(this.pokeInfo.types, 'types');
    const abilities = toList(this.pokeInfo.abilities);
    const moves = toList(this.pokeInfo.moves, 'moves-list');

    const randomDescription = this.pokeInfo.descriptions[
      Math.floor(Math.random() * this.pokeInfo.descriptions.length)
    ].replace('', '');

    let stats = '<ul class="stats-list">';
    for (let stat in this.pokeInfo.stats) {
      stats += `
      <li><p>${Utilities.capitalize(stat)}:</p> <meter min="0" max="100"
            low="25" high="75"
            optimum="100" value="${this.pokeInfo.stats[stat]}"></meter>
      </li>
      `;
    }
    stats += '</ul>';

    let evolutionPreSection = '';

    if (preEvolutionData !== undefined) {
      evolutionPreSection = `
    <section>
      <h2>Previous Evolution</h2>
      <a href="./details.html?id=${
        preEvolutionData.id
      }"><img title="${Utilities.capitalize(preEvolutionData.name)}" src="${
        preEvolutionData.sprites.front_default
      }" /></a>
    </section>`;
    }

    let evolutionPostSection = '';
    if (postEvolutionData !== undefined) {
      evolutionPostSection += '<section><h2>Post Evolution/s</h2>';
      postEvolutionData.forEach((e) => {
        evolutionPostSection += `<a href="./details.html?id=${e.id}"><img src="${e.sprites.front_default}" title="${e.name}"/></a>`;
      });
      evolutionPostSection += '</section>';
    }

    const differentFormsSection = '';
    if (differentFormsData !== undefined) {
      evolutionPostSection += '<section><h2>Diferent forms and varieties</h2>';
      differentFormsData.forEach((e) => {
        evolutionPostSection += `<a href="./details.html?id=${
          e.id
        }"><img src="${e.sprites.front_default}" title="${Utilities.capitalize(
          e.name,
        )}"/></a>`;
      });
      evolutionPostSection += '</section>';
    }

    this.template = `
    <section class="presentation__section">
    <div class="presentation" style="${getColor([
      this.pokeInfo.types[0],
      this.pokeInfo.types[1],
    ])}">
    <img class="presentation__image" src="${
      this.pokeInfo.sprites.front_default
    }" alt="pokemon img" />
    </div>
    <h2 class="poke-display__name">${Utilities.capitalize(
      this.pokeInfo.name,
    )} <span class="fav-button">⭐</span></h2>
      ${types}
      <blockquote class="poke-display__description">${randomDescription}</blockquote>
      <div class="poke-display__buttons">
      ${
        this.pokeInfo.id > 1
          ? `<a class="poke-display__button" href="./details.html?id=${
              this.pokeInfo.id - 1
            }">Previous</a>`
          : ''
      }
      ${
        this.pokeInfo.id < 1117
          ? `<a class="poke-display__button" href="./details.html?id=${
              this.pokeInfo.id + 1
            }">Next</a>`
          : ''
      }
      </div>
    </section>
    <div class="size-and-skills">
      <section class="size">
        <h2>Size</h2>
        <div>
          <p>Height: ${this.pokeInfo.height / 10} m</p>
          <p>Weight: ${this.pokeInfo.weight / 10} kg</p>
        </div>
      </section>
      <section class="skills">
        <h2>Abilities</h2>
        ${abilities}
      </section>
    </div>
    <section class="moves__container">
    <div class="moves"><h2>Moves</h2>
      <div "moves-list"> ${moves}</div>
    </div>
    </section>
    <section class="stats-container">
      <h2>Stats</h2>
      ${stats}
    </section>
    <div class="genealogy">
    ${evolutionPreSection}
    ${evolutionPostSection}
    ${differentFormsSection}
    <div>
    `;

    super.render();
    this.activateButton();
  }

  activateButton() {
    document.querySelector('.fav-button').addEventListener('click', () => {
      document
        .querySelector('.fav-modal')
        .classList.toggle('fav-modal--hidden');
    });
  }
}
