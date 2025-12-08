export const writeText = (ctx, text, x, y, fontSize, color) => {
  ctx.font = `${fontSize}px Arial`;

  // Stroke (black outline)
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3.5;
  ctx.strokeText(text, x, y);

  // Fill (white inside)
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
};
