import { Entity } from "./entity";
import type { Terrain } from "./terrain";

export class Fruit extends Entity {
  constructor(terrain: Terrain) {
    super(terrain);
  }

  public override update(): void {
    this.polygon = this.createPolygon();
  }
  public override draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.fillStyle = "#006400";
    context.strokeStyle = "#006400";
    for (let i = 0; i < this.polygon.length; i++) {
      context.rect(this.polygon[i].x - 2, this.polygon[i].y - 2, 4, 4);
      context.moveTo(this.polygon[i].x, this.polygon[i].y);
      context.lineTo(
        this.polygon[(i + 1) % this.polygon.length].x,
        this.polygon[(i + 1) % this.polygon.length].y
      );
    }
    context.stroke();
    context.fill();

  }
}
