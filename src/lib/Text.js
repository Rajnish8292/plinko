export const writeText = (ctx, text, x, y, fontSize, color) => {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(text, x, y);
};
