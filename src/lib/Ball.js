class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update(obstacles, sinks) {
    const gravity = 0.3;
    const horizontalFriction = 0.4;
    const verticalFriction = 0.8;
    this.vy = this.vy + gravity;
    this.x += this.vx;
    this.y += this.vy;

    obstacles.forEach((obstacle) => {
      const dx = this.x - obstacle.x;
      const dy = this.y - obstacle.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.radius + obstacle.radius) {
        const angle = Math.atan2(dy, dx);
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * horizontalFriction;
        this.vy = Math.sin(angle) * speed * verticalFriction;
        const overlap = this.radius + obstacle.radius - dist;
        this.x += Math.cos(angle) * overlap;
        this.y += Math.sin(angle) * overlap;
      }
    });

    sinks.forEach((sink) => {
      if (
        this.x + this.radius > sink.x &&
        this.x - this.radius < sink.x + sink.width &&
        this.y + this.radius > sink.y &&
        this.y - this.radius < sink.y + sink.height
      ) {
        this.vx = 0;
        this.vy = 0;
        this.y = sink.y - this.radius;
      }
    });
  }
}

export default Ball;
