import { drawObstacle } from "./Obstacles";
import { drawSink } from "./Sink";
import { getMirroredColors } from "./MirroredColor";
import { writeText } from "./Text";
import { colorArray } from "@/constants/gameConfig";
// import { BallManager } from "./BallManager";
export const draw = (
  ctx,
  width,
  height,
  obstacles,
  sinks,
  BallManager,
  multiplier,
  collisionCallback
) => {
  ctx.clearRect(0, 0, width, height);

  // draw all the obstacles
  obstacles.forEach((obstacle) => {
    drawObstacle(ctx, obstacle.x, obstacle.y, obstacle.radius);
  });

  // create mirror colors for sink
  const mirroredColors = getMirroredColors(colorArray, sinks.length);

  // draw sinks
  sinks.forEach((sink, index) => {
    drawSink(
      ctx,
      sink.x,
      sink.y,
      sink.width,
      sink.height,
      mirroredColors[index]
    );

    // write multipler of sinks
    writeText(
      ctx,
      `${multiplier[index]}x`,
      sink.x + sink.width / 2,
      sink.y + sink.height / 2,
      12,
      "black"
    );
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  });

  // draw and update balls
  BallManager.updateBalls(obstacles, sinks, collisionCallback);
  BallManager.drawBalls(ctx);
};
