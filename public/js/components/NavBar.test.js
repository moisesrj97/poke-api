import { screen } from '@testing-library/dom';
import Navbar from './NavBar';

describe('Given the component...', () => {
  describe('When component is instanciated...', () => {
    test('Then it should be rendered', () => {
      document.body.innerHTML = '<div id="navbar"></div>';
      const navbar = new Navbar('#navbar');
      expect(navbar).toBeTruthy();
      expect(screen.getByText(/Favorites/i));
      expect(screen.queryAllByRole('link')).toHaveLength(2);
    });
  });
});
