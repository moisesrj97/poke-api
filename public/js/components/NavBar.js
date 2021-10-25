import Component from './component.js';

export default class NavBar extends Component {
  constructor(selector) {
    super(selector);
    this.render();
  }

  render() {
    this.template =
      "<a href='./index.html'><img class='navbar__logo' src='./images/logo.png'/></a><nav class='navbar__nav'><ul class='navbar__nav-list'><li class='navbar__nav-element'><a href='./favourites.html'>Favorites</a></li></ul></nav>";
    super.render();
  }
}
