import { Hero, Direction } from '../types';

const getDirectionMultiplier = (direction: Direction): number => {
  switch(direction) {
    case 'down': return 0;
    case 'up': return 1;
    case 'left': return 2;
    case 'right': return 3;
  }
}

const drawHero = (ctx: CanvasRenderingContext2D, sheet: HTMLImageElement, hero: Hero) => {
  const sx = hero.sprite.current * 65;
  const sy = getDirectionMultiplier(hero.direction) * 65;
  const spriteWidth = 64;
  const spriteHeight = 64;

  ctx.save();
  ctx.drawImage(sheet, sx, sy, spriteWidth, spriteHeight, hero.x, hero.y, spriteWidth, spriteHeight);
  // @ts-ignore
  if (window.bounding) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.strokeRect(hero.x, hero.y, spriteWidth, spriteHeight);
    ctx.strokeStyle = 'pink';
    ctx.strokeRect(hero.x + 16, hero.y + 5, 32, spriteHeight - 5);
    ctx.restore();
  }
  ctx.restore();
};

export default drawHero;
