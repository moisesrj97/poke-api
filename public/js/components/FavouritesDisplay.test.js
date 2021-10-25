import { fireEvent, screen, waitFor } from '@testing-library/dom';
import FavouritesDisplay from './FavouritesDisplay.js';

describe('Given the component...', () => {
  describe('When component is instanciated...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-display"></div>';
      const favPokemonsMock = [
        { id: 1, index: 1, nickname: 'Pepe' },
        { id: 2, index: 2, nickname: 'Pepevolusión' },
      ];

      localStorage.setItem('fav-pokemons', JSON.stringify(favPokemonsMock));

      const favouritesDisplay = new FavouritesDisplay('#favourites-display');
      expect(favouritesDisplay).toBeTruthy();

      console.log(document.body.innerHTML);
      await waitFor(
        async () => expect(await screen.findAllByRole('link')).toHaveLength(2),
        { timeout: 5000 },
      );
    });
  });
  describe('When component is instanciated and name is changed...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-display"></div>';
      const favPokemonsMock = [
        { id: 1, index: 1, nickname: 'Pepe' },
        { id: 2, index: 2, nickname: 'Pepevolusión' },
      ];

      localStorage.setItem('fav-pokemons', JSON.stringify(favPokemonsMock));

      const favouritesDisplay = new FavouritesDisplay('#favourites-display');
      expect(favouritesDisplay).toBeTruthy();

      console.log(document.body.innerHTML);
      await waitFor(
        async () => {
          fireEvent.change(document.querySelector("input[data-index='1']"), {
            target: { value: 'Nuria' },
          });
          fireEvent.submit(document.querySelector("form[data-index='1']"));
          const localStorageData = JSON.parse(
            localStorage.getItem('fav-pokemons'),
          );

          expect(localStorageData[0].nickname).toBe('Nuria');
        },
        { timeout: 10000 },
      );
    });
  });
  describe('When component is instanciated and name is changed...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-display"></div>';
      const favPokemonsMock = [
        { id: 1, index: 1, nickname: 'Pepe' },
        { id: 2, index: 2, nickname: 'Pepevolusión' },
      ];

      localStorage.setItem('fav-pokemons', JSON.stringify(favPokemonsMock));

      const favouritesDisplay = new FavouritesDisplay('#favourites-display');
      expect(favouritesDisplay).toBeTruthy();

      await waitFor(
        async () => {
          fireEvent.click(document.querySelector("button[data-index='1']"));
        },
        { timeout: 5000 },
      );
      await waitFor(
        async () => {
          expect(await screen.findAllByRole('link')).toHaveLength(1);
        },
        { timeout: 5000 },
      );
    });
  });
});
