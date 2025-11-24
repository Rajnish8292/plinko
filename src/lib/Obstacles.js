export const obstaclesPosition = (rows, width, height) => {
  const obstacles = [];
  let radius = 10 - ((rows - 8) / 8) * 5;
  const minY = 50;
  const maxY = height * 0.8;
  let rowSpacing = (maxY - minY) / (rows - 1);

  if (width < 800) {
    radius = 10 - ((rows - 8) / 8) * 5 - 2;
  }

  for (let row = 0; row < rows; row++) {
    const y = minY + row * rowSpacing;
    const numObstacles = row + 3;
    const rowWidth = (numObstacles - 1) * (radius * 2 + rowSpacing);

    for (let col = 0; col < numObstacles; col++) {
      const x = width / 2 - rowWidth / 2 + col * (radius * 2 + rowSpacing);
      obstacles.push({
        x,
        y,
        radius,
      });
    }
  }
  return obstacles;
};

export const drawObstacle = (ctx, x, y, radius) => {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};
