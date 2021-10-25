export default class Component {
  constructor(selector) {
    this.selector = selector;
    this.template = '';
  }

  render() {
    const container = document.querySelector(this.selector);
    container.innerHTML = this.template;
  }
}
