import { multipliers } from "@/constants/gameConfig";
export const sinksPosition = (rows, width, height) => {
  const sinks = [];
  const radius = 10 - ((rows - 8) / 8) * 5;
  const minY = 50;
  const maxY = height * 0.8;
  let rowSpacing = (maxY - minY) / (rows - 1);

  const numSinks = rows + 1;
  const sinkWidth = 74 - ((rows - 8) / 8) * 37;
  for (let i = 0; i < numSinks; i++) {
    const x =
      width / 2 + (i - numSinks / 2) * (rowSpacing + 2 * radius) + radius;
    const y = maxY + radius + 15;
    sinks.push({
      x,
      y,
      width: rowSpacing - radius + 10,
      height: 20,
      multipler: multipliers[rows][i],
      index: i,
    });
  }

  return sinks;
};

export const drawSink = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
