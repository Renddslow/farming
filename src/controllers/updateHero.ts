import {Hero} from '../types';

type Collision = {
  x: number;
  y: number;
  w: number;
  h: number;
};

const update = (hero: Hero, keyCodes: Set<string>, canvas: HTMLCanvasElement, collisions: Collision[], mod: number = 1) => {
  const stagedState: Partial<Hero> = {};

  // Basic hero movement
  if (keyCodes.has('ArrowUp') || keyCodes.has('KeyW')) {
    stagedState.y = hero.y - (hero.speed * mod);
    stagedState.direction = 'up';
  }

  if (keyCodes.has('ArrowDown') || keyCodes.has('KeyS')) {
    stagedState.y = hero.y + (hero.speed * mod);
    stagedState.direction = 'down';
  }

  if (keyCodes.has('ArrowLeft') || keyCodes.has('KeyA')) {
    stagedState.x = hero.x - (hero.speed * mod);
    stagedState.direction = 'left';
  }

  if (keyCodes.has('ArrowRight') || keyCodes.has('KeyD')) {
    stagedState.x = hero.x + (hero.speed * mod);
    stagedState.direction = 'right';
  }

  // Boundary collision
  if (stagedState.x <= 8) {
    stagedState.x = 8;
  }

  if (stagedState.y < 0) {
    stagedState.y = 0;
  }

  if (stagedState.y + 64 >= canvas.height - 46) {
    stagedState.y = canvas.height - (65 + 46);
  }

  if (stagedState.x + 64 > canvas.width - 6) {
    stagedState.x = canvas.width - (64 + 6);
  }

  const collisionBox = {
    x: (stagedState.x || hero.x) + 16,
    y: (stagedState.y || hero.y) + 5,
    w: 32,
    h: 59,
  };

  collisions.forEach((col) => {
    const x1 = Math.max(collisionBox.x, col.x);
    const x2 = Math.min(collisionBox.x + collisionBox.w, col.x + col.w);

    const y1 = Math.max(collisionBox.y, col.y);
    const y2 = Math.min(collisionBox.y + collisionBox.h, col.y + col.h);

    if (x1 < x2 && y1 < y2) {
      if (col.x + col.w === x2) {
        const boxEdge = col.x + col.w;
        stagedState.x = boxEdge - 16;
      } else if (col.x === x1) {
        const boxEdge = col.x;
        stagedState.x = boxEdge - (collisionBox.w + 16);
      } else if (col.y === y1) {
        const boxEdge = col.y;
        stagedState.y = boxEdge - (collisionBox.h + 5);
      } else if (col.y + col.h === y2) {
        const boxEdge = col.y + col.h;
        stagedState.y = boxEdge - 5;
      }
    }
  });

  if (Object.keys(stagedState).length) {
    Object.keys(stagedState).forEach((k) => {
      hero[k] = stagedState[k];
    });
    hero.sprite.rendersOnSprite++;
  }

  if (hero.sprite.rendersOnSprite === 4) {
    hero.sprite.current = (hero.sprite.current + 1) % 3;
    hero.sprite.rendersOnSprite = 0;
  }

  // Idle
  if (keyCodes.size === 0) {
    hero.sprite.current = 0;
    hero.sprite.rendersOnSprite = 0;
  }
};

export default update;
