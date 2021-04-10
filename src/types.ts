export type Direction = 'up' | 'down' | 'left' | 'right';

export type Hero = {
  speed: number;
  x: number;
  y: number;
  ready: boolean;
  sprite: {
    current: number;
    rendersOnSprite: number;
  };
  direction: Direction;
};


export type Tile = {
  sx: number,
  sy: number;
  sw: number;
  sh: number;
  dw: number;
  dh: number;
};

export type Background = {
  ready: boolean;
  map: Tile[][];
  gateReady: boolean;
};
