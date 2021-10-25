export default class FavouritesApi {
  static getFavs() {
    return JSON.parse(window.localStorage.getItem('fav-pokemons')) || [];
  }

  static createFav(id, nickname) {
    let favs = this.getFavs();
    if (favs.length > 0) {
      favs = [
        ...favs,
        { id, nickname, index: favs[favs.length - 1].index + 1 },
      ];
    } else {
      favs = [...favs, { id, nickname, index: 1 }];
    }

    window.localStorage.setItem('fav-pokemons', JSON.stringify(favs));
    return this.getFavs();
  }

  static updateFavNickName(index, newNickname) {
    let favs = this.getFavs();
    favs = favs.map((e) => {
      if (Number(e.index) === Number(index)) {
        return { ...e, nickname: newNickname };
      }
      return e;
    });
    window.localStorage.setItem('fav-pokemons', JSON.stringify(favs));
    return this.getFavs();
  }

  static deleteFav(index) {
    let favs = this.getFavs();
    favs = favs.filter((e) => Number(e.index) !== Number(index));
    window.localStorage.setItem('fav-pokemons', JSON.stringify(favs));
    return this.getFavs();
  }
}
