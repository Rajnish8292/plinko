class ObstacleCollisionEffectManager {
  constructor() {
    this.ripple_effects = [];
  }

  addCollisionEffect(effect) {
    const exists = this.ripple_effects.some((elem) => {
      const effectX = Math.round(effect.x);
      const effectY = Math.round(effect.y);
      const elemX = Math.round(elem.x);
      const elemY = Math.round(elem.y);

      return effectX === elemX && effectY === elemY;
    });

    if (!exists) {
      this.ripple_effects.push(effect);
    }
  }

  updateEffects() {
    this.disposeEffect();
    this.ripple_effects.forEach((effect) => {
      effect.update();
    });
  }

  drawEffects(ctx) {
    this.ripple_effects.forEach((effect) => {
      effect.draw(ctx);
    });
  }

  disposeEffect() {
    this.ripple_effects = this.ripple_effects.filter((effect) => !effect.isEnd);
  }
}

const obstalceCollisionEffectManager = new ObstacleCollisionEffectManager();
export default obstalceCollisionEffectManager;
