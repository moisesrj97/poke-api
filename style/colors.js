export const colors = {
  normal: '#d8d8c0',
  fighting: '#f08030',
  flying: '#c8c0f8',
  poison: '#c380d8',
  ground: '#f8f878',
  rock: '#e0c068',
  bug: '#d8e030',
  ghost: '#a890f0',
  steel: '#d3d3d3',
  fire: '#f8d030',
  water: '#67d2f1',
  grass: '#c0f860',
  electric: '#f8f878',
  psychic: '#f8c0b0',
  ice: '#d0f8e8',
  dragon: '#b8a0f8',
  dark: '#a8a878',
  fairy: '#f4bdc9',
};

const getColor = (arr) => {
  return `background: linear-gradient(155deg, ${colors[arr[0]]} 0%, ${
    colors[arr[1] || arr[0]]
  } 70%);
  background-size: cover`;
};

export default getColor;
