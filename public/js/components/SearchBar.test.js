import { fireEvent, screen } from '@testing-library/dom';
import PokeApi from '../services/PokeApi.js';
import SearchBar from './SearchBar.js';

describe('Given the component SearchBar...', () => {
  describe('When component is instanciated...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="search-bar"></div>';
      const allPokeData = await PokeApi.getAllPokes();
      const searchBar = new SearchBar('#search-bar', allPokeData);
      expect(searchBar).toBeTruthy();
      expect(screen.getByRole('textbox')).toBeTruthy();
    });
  });
  describe('When term is written...', () => {
    test('Then it should render 6 divs', async () => {
      document.body.innerHTML = '<div id="search-bar"></div>';
      const allPokeData = await PokeApi.getAllPokes();
      const searchBar = new SearchBar('#search-bar', allPokeData);

      expect(searchBar).toBeTruthy();
      expect(screen).toBeTruthy();
      expect(screen.queryAllByRole('textbox')).toHaveLength(1);

      const input = screen.queryAllByRole('textbox')[0];
      expect(input).toBeTruthy();

      fireEvent.input(input, { target: { value: 'a' } });
      expect(input.value).toBe('a');

      expect(screen.queryAllByRole('link')).toHaveLength(6);
    });
  });
  describe('When term is written and deleted...', () => {
    test('Then it should render 0 divs', async () => {
      document.body.innerHTML = '<div id="search-bar"></div>';
      const allPokeData = await PokeApi.getAllPokes();
      const searchBar = new SearchBar('#search-bar', allPokeData);

      expect(searchBar).toBeTruthy();
      expect(screen).toBeTruthy();
      expect(screen.queryAllByRole('textbox')).toHaveLength(1);

      const input = screen.queryAllByRole('textbox')[0];
      expect(input).toBeTruthy();

      fireEvent.input(input, { target: { value: 'a' } });
      expect(input.value).toBe('a');
      fireEvent.input(input, { target: { value: '' } });

      expect(screen.queryAllByRole('link')).toHaveLength(0);
    });
  });
});
