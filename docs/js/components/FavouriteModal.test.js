import { fireEvent, screen, waitFor } from '@testing-library/dom';
import PokeApi from '../services/PokeApi.js';
import FavouriteModal from './FavouriteModal.js';

describe('Given the component...', () => {
  describe('When component is instanciated...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-modal"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(1);

      const favouriteModal = new FavouriteModal(
        '#favourites-modal',
        pokeInfo.name,
        1,
      );

      expect(favouriteModal).toBeTruthy();
      await waitFor(
        async () =>
          expect(await screen.findByText(/Add to favorites/)).toBeTruthy(),
        { timeout: 5000 },
      );
    });
  });
  describe('When component pokemon is added...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-modal"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(1);

      const favouriteModal = new FavouriteModal(
        '#favourites-modal',
        pokeInfo.name,
        1,
      );

      const input = screen.getByRole('textbox');

      fireEvent.input(input, {
        target: { value: 'pepe' },
      });

      fireEvent.click(screen.getByRole('button'));

      const localStorageResponse = JSON.parse(
        localStorage.getItem('fav-pokemons'),
      );

      expect(localStorageResponse[0]).toEqual({
        id: 1,
        nickname: 'pepe',
        index: 1,
      });
    });
  });
  describe('When component pokemon is added and another one exists...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-modal"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(1);

      const favouriteModal = new FavouriteModal(
        '#favourites-modal',
        pokeInfo.name,
        1,
      );

      const input = screen.getByRole('textbox');

      fireEvent.input(input, {
        target: { value: 'pepe' },
      });

      const favPokemonsMock = [
        { id: 1, index: 1, nickname: 'Pepe' },
        { id: 2, index: 2, nickname: 'Pepevolusión' },
      ];

      localStorage.setItem('fav-pokemons', JSON.stringify(favPokemonsMock));

      fireEvent.click(screen.getByRole('button'));

      const localStorageResponse = JSON.parse(
        localStorage.getItem('fav-pokemons'),
      );

      expect(localStorageResponse[0]).toEqual(
        { id: 1, index: 1, nickname: 'Pepe' },
        { id: 2, index: 2, nickname: 'Pepevolusión' },
        {
          id: 1,
          nickname: 'pepe',
          index: 3,
        },
      );
    });
  });
  describe('When component pokemon is added without nickname...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="favourites-modal"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(1);

      const favouriteModal = new FavouriteModal(
        '#favourites-modal',
        pokeInfo.name,
        1,
      );

      const input = screen.getByRole('textbox');

      fireEvent.input(input, {
        target: { value: '' },
      });
      localStorage.clear();

      fireEvent.click(screen.getByRole('button'));

      const localStorageResponse = JSON.parse(
        localStorage.getItem('fav-pokemons'),
      );

      expect(localStorageResponse[0]).toEqual({
        id: 1,
        nickname: pokeInfo.name,
        index: 1,
      });
    });
  });
});
