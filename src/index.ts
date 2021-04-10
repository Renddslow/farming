import drawHero from './sprites/drawHero';
import tile, { randomGrass } from './utils/makeTiles';
import update from './controllers/updateHero';

import { Hero, Background, Tile } from './types';
import makeInitialMap from './sprites/initialMap';

(function () {
  // Setup canvas
  const canvas = document.createElement('canvas');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 576;
  ctx.imageSmoothingEnabled = false;

  const heroSheet = new Image(); // TODO: single sprite sheet
  const tileSheet = new Image();
  const gate = new Image();
  const roof = new Image();

  const hero: Hero = {
    speed: 256,
    x: 157,
    y: 216,
    direction: 'down',
    ready: false,
    sprite: {
      rendersOnSprite: 0,
      current: 0,
    },
  };

  const bg: Background = {
    ready: false,
    map: makeInitialMap(),
    gateReady: false,
    roofReady: false,
  };

  const boundingBoxes = [
    {
      x: 128,
      y: 152,
      w: 128,
      h: 50,
    }
  ];

  heroSheet.onload = () => {
    hero.ready = true;
  };

  tileSheet.onload = () => {
    bg.ready = true;
  };

  gate.onload = () => {
    bg.gateReady = true;
  };

  roof.onload = () => {
    bg.roofReady = true;
  };

  heroSheet.src = '/imgs/hero.png';
  tileSheet.src = '/imgs/tiles.png';
  gate.src = '/imgs/gate.png';
  roof.src = '/imgs/roof.png';

  const keyCodes: Set<string> = new Set();
  window.addEventListener('keydown', (e) => {
    keyCodes.add(e.code);
  });

  window.addEventListener('keyup', (e) => {
    keyCodes.delete(e.code);
  });

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bg.ready) {
      bg.map.forEach((row, y) => {
        row.forEach((tile, x) => {
          ctx.drawImage(
            tileSheet,
            tile.sx,
            tile.sy,
            tile.sw,
            tile.sh,
            x * 64,
            y * 64,
            tile.dw,
            tile.dh,
          );
        });
      });
    }

    if (hero.ready) {
      drawHero(ctx, heroSheet, hero);
    }

    // @ts-ignore
    if (window.bounding) {
      boundingBoxes.forEach((box, idx) => {
        ctx.save();
        ctx.strokeStyle = ['#0f0', 'cyan', 'magenta', 'yellow'][idx % 4];
        ctx.strokeRect(box.x, box.y, box.w, box.h);
        ctx.restore();
      });
    }

    if (bg.gateReady) {
      ctx.drawImage(gate, 329, 516);
    }

    if (bg.roofReady) {
      ctx.drawImage(roof, 124, 87);
    }
  };

  let then = Date.now();
  const main = (ts: number) => {
    const d = ts - then;
    update(hero, keyCodes, canvas, boundingBoxes, d / 1000);
    render();
    then = ts;
    requestAnimationFrame(main);
  };

  main(0);
})();
