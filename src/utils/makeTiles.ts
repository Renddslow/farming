import { Tile } from '../types';

const tileDim = 64;

const tile = (y: number, x: number): Tile => ({
  dw: tileDim,
  dh: tileDim,
  sw: tileDim,
  sh: tileDim,
  sx: x * tileDim,
  sy: y * tileDim,
});

export const randomGrass = () => {
  const sets = [
    {
      name: 'std',
      coords: { x: 1, y: 1, },
      weight: 12,
    },
    {
      name: 'flowers',
      coords: { x: 7, y: 1 },
      weight: 2,
    },
    {
      name: 'flowers + grass',
      coords: { x: 6, y: 1 },
      weight: 4,
    },
    {
      name: 'grass',
      coords: { x: 0, y: 2 },
      weight: 6,
    },
  ];

  const weights = sets.map(({ weight }) => weight);
  const acc = [];
  let sum = 0;

  for (const w of weights) {
    sum += w;
    acc.push(sum);
  }

  const rand = Math.random() * sum;
  const t = sets[acc.filter((el) => el <= rand).length];
  return tile(t.coords.y, t.coords.x);
}

export default tile;
