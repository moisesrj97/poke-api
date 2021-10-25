import PokeApi from '../services/PokeApi.js';
import PokeDisplay from './PokeDisplay.js';
import { screen, waitFor } from '@testing-library/dom';
import Utilities from '../services/Utilities.js';

describe('Given the component SearchBar...', () => {
  describe('When component is instanciated with poke with prev evolution...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="poke-display"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(1);
      const pokeDisplay = new PokeDisplay('#poke-display', pokeInfo);

      expect(pokeDisplay).toBeTruthy();

      await waitFor(
        async () => {
          expect(
            await screen.findByText(Utilities.capitalize(pokeInfo.name)),
          ).toBeTruthy();
          expect(await screen.findByText(/size/i)).toBeTruthy();
          expect(await screen.findByText(/height/i)).toBeTruthy();
          expect(await screen.findByText(/weight/i)).toBeTruthy();
          expect(await screen.findByText(/abilities/i)).toBeTruthy();
          expect(await screen.findByText(/moves/i)).toBeTruthy();
          expect(await screen.findByText(/stats/i)).toBeTruthy();
          expect(await screen.findByText(/Post Evolution/i)).toBeTruthy();

          expect(
            await (
              await screen.findAllByRole('listitem')
            ).length,
          ).toBeGreaterThan(4);
        },
        { timeout: 5000 },
      );
    });
  });
  describe('When component is instanciated with prev and post evolution...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="poke-display"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(2);
      const pokeDisplay = new PokeDisplay('#poke-display', pokeInfo);

      expect(pokeDisplay).toBeTruthy();

      await waitFor(
        async () => {
          expect(
            await screen.findByText(Utilities.capitalize(pokeInfo.name)),
          ).toBeTruthy();
          expect(await screen.findByText(/size/i)).toBeTruthy();
          expect(await screen.findByText(/height/i)).toBeTruthy();
          expect(await screen.findByText(/weight/i)).toBeTruthy();
          expect(await screen.findByText(/abilities/i)).toBeTruthy();
          expect(await screen.findByText(/moves/i)).toBeTruthy();
          expect(await screen.findByText(/stats/i)).toBeTruthy();
          expect(await screen.findByText(/Next/i)).toBeTruthy();
          expect(await screen.findByText(/Post Evolution/i)).toBeTruthy();
          expect(await screen.findByText(/Previous Evolution/i)).toBeTruthy();
          expect(
            await (
              await screen.findAllByRole('listitem')
            ).length,
          ).toBeGreaterThan(4);
        },
        { timeout: 10000 },
      );
    });
  });
  describe('When component is instanciated with post evolution...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="poke-display"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(2);
      const pokeDisplay = new PokeDisplay('#poke-display', pokeInfo);

      expect(pokeDisplay).toBeTruthy();

      await waitFor(
        async () => {
          expect(
            await screen.findByText(Utilities.capitalize(pokeInfo.name)),
          ).toBeTruthy();
          expect(await screen.findByText(/size/i)).toBeTruthy();
          expect(await screen.findByText(/height/i)).toBeTruthy();
          expect(await screen.findByText(/weight/i)).toBeTruthy();
          expect(await screen.findByText(/abilities/i)).toBeTruthy();
          expect(await screen.findByText(/moves/i)).toBeTruthy();
          expect(await screen.findByText(/stats/i)).toBeTruthy();
          expect(await screen.findByText(/Post Evolution/i)).toBeTruthy();
          expect(
            await (
              await screen.findAllByRole('listitem')
            ).length,
          ).toBeGreaterThan(4);
        },
        { timeout: 10000 },
      );
    });
  });
  describe('When component is instanciated with varieties...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="poke-display"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(3);
      const pokeDisplay = new PokeDisplay('#poke-display', pokeInfo);

      expect(pokeDisplay).toBeTruthy();

      await waitFor(
        async () => {
          expect(
            await screen.findByText(Utilities.capitalize(pokeInfo.name)),
          ).toBeTruthy();
          expect(await screen.findByText(/size/i)).toBeTruthy();
          expect(await screen.findByText(/height/i)).toBeTruthy();
          expect(await screen.findByText(/weight/i)).toBeTruthy();
          expect(await screen.findByText(/abilities/i)).toBeTruthy();
          expect(await screen.findByText(/moves/i)).toBeTruthy();
          expect(await screen.findByText(/stats/i)).toBeTruthy();
          expect(
            await screen.findByText(/Diferent forms and varieties/i),
          ).toBeTruthy();
          expect(
            await (
              await screen.findAllByRole('listitem')
            ).length,
          ).toBeGreaterThan(4);
        },
        { timeout: 6000 },
      );
    });
  });
  describe('When component is instanciated with a varietie...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="poke-display"></div>';
      const pokeInfo = await PokeApi.getAllPokeInfo(10186);
      const pokeDisplay = new PokeDisplay('#poke-display', pokeInfo);

      expect(pokeDisplay).toBeTruthy();

      await waitFor(
        async () => {
          expect(
            await screen.findByText(Utilities.capitalize(pokeInfo.name)),
          ).toBeTruthy();
          expect(await screen.findByText(/size/i)).toBeTruthy();
          expect(await screen.findByText(/height/i)).toBeTruthy();
          expect(await screen.findByText(/weight/i)).toBeTruthy();
          expect(await screen.findByText(/abilities/i)).toBeTruthy();
          expect(await screen.findByText(/moves/i)).toBeTruthy();
          expect(await screen.findByText(/stats/i)).toBeTruthy();
          expect(
            await screen.findByText(/Diferent forms and varieties/i),
          ).toBeTruthy();
          expect(
            await (
              await screen.findAllByRole('listitem')
            ).length,
          ).toBeGreaterThan(4);
        },
        { timeout: 6000 },
      );
    });
  });
});
