import Ball from "./Ball";
class ballManager {
  constructor(canvasWidth, canvasHeight, rows) {
    this.balls = [];
    this.rows = rows;
    this.radius = 10 - ((rows - 8) / 8) * 5;
    this.color = "red";
    this.record = {};
    this.successfulDrops = 0;
    this.unSuccessfulDrops = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  addBall({ xPos, yPos }) {
    let x = xPos ? xPos : this.canvasWidth / 2 + -40 + Math.random() * 80;
    let y = yPos ? yPos : 30;
    this.balls.push(new Ball(x, y, this.radius, this.color));
  }

  updateBalls(obstacles, sinks, collisionCallback) {
    this.balls.forEach((ball) => {
      ball.update(obstacles, sinks);
    });
    this.checkCollisionWithSinks(sinks, collisionCallback);
  }
  drawBalls(ctx) {
    this.balls.forEach((ball) => {
      ball.draw(ctx);
    });
  }

  setCanvasWidth(canvasWidth) {
    this.canvasWidth = canvasWidth;
  }
  setCanvasHeight(canvasHeight) {
    this.canvasHeight = canvasHeight;
  }

  setRows(rows) {
    this.rows = rows;
  }
  updateRadius() {
    this.radius = 10 - ((this.rows - 8) / 8) * 5;
  }

  // if ball collided with sink remove the ball from array
  checkCollisionWithSinks(sinks, callback) {
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      let collided = false;
      for (let j = 0; j < sinks.length; j++) {
        const sink = sinks[j];

        if (
          ball.x + ball.radius > sink.x &&
          ball.x - ball.radius < sink.x + sink.width &&
          ball.y + ball.radius > sink.y &&
          ball.y - ball.radius < sink.y + sink.height
        ) {
          collided = true;
          this.successfulDrops += 1;

          if (!this.record[j]) {
            this.record[j] = [
              {
                initialX: ball.initialX,
                initialY: ball.initialY,
                multiplier: sink.multipler,
              },
            ];
          } else {
            this.record[j].push({
              initialX: ball.initialX,
              initialY: ball.initialY,
              multiplier: sink.multipler,
            });
          }

          if (callback) callback({ multiplier: sink.multipler });

          this.balls.splice(i, 1);
        }

        if (collided) break;
      }
      // check if ball goes out of canvas from bottom
      if (ball.y - ball.radius > this.canvasHeight) {
        this.unSuccessfulDrops += 1;
        this.balls.splice(i, 1);
      }
    }
  }
}

export const BallManager = new ballManager(800, 600, 16);
