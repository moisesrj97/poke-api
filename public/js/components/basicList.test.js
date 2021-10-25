import { findByText, fireEvent, screen, waitFor } from '@testing-library/dom';
import BasicList from './basicList';

describe('Given the component...', () => {
  describe('When component is instanciated...', () => {
    test('Then it should be rendered', async () => {
      document.body.innerHTML = '<div id="basic-list"></div>';
      const basicList = new BasicList('#basic-list');
      expect(basicList).toBeTruthy();
      await waitFor(
        async () => expect(await screen.findAllByRole('link')).toHaveLength(10),
        { timeout: 5000 },
      );
    });
  });
  describe('When component is instanciated and button is pressed', () => {
    test('Then it should be render 10 links', async () => {
      document.body.innerHTML = '<div id="basic-list"></div>';
      const basicList = new BasicList('#basic-list');
      expect(basicList).toBeTruthy();
      await waitFor(
        async () => fireEvent.click(await screen.findByText(/Next page/)),
        {
          timeout: 5000,
        },
      );
      await waitFor(
        async () => expect(await screen.findAllByRole('link')).toHaveLength(10),
        { timeout: 5000 },
      );
    });
  });
  describe('When component is instanciated and previous button is pressed', () => {
    test('Then it should be render 10 links', async () => {
      document.body.innerHTML = '<div id="basic-list"></div>';
      const basicList = new BasicList('#basic-list');
      expect(basicList).toBeTruthy();
      await waitFor(
        async () => fireEvent.click(await screen.findByText(/Previous page/)),
        {
          timeout: 5000,
        },
      );
      await waitFor(
        async () => expect(await screen.findAllByRole('link')).toHaveLength(10),
        { timeout: 5000 },
      );
    });
  });
});
