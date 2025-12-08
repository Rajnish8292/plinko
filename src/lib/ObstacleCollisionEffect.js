class ObstacleCollisionEffect {
  constructor(x, y, rows) {
    this.x = x;
    this.y = y;
    this.obstacleRadius = 10 - ((rows - 8) / 8) * 5;
    this.radius = 0;
    this.opacity = 1;

    this.finalRadius = this.obstacleRadius + 10;
    console.log(this.finalRadius);
    this.finalOpacity = 0;
    this.isEnd = false;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.opacity < 0.008) {
      this.isEnd = true;
    }

    this.radius += (this.finalRadius - this.radius) * 0.15;
    this.opacity += (this.finalOpacity - this.opacity) * 0.25;
    this.opacity = Math.round(this.opacity * 1000) / 1000;
  }
}

export default ObstacleCollisionEffect;
