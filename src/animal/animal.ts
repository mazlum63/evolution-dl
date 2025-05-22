import type { Coordinate } from "@models/coordinate.js";
import { Movement } from "./movement.js";
import { Sensor } from "./sensor.js";

export class Animal {
  width: number = 30;
  height: number = 30;
  speed: number = 0;
  angle: number = 0;
  x: number;
  y: number;
  sensor: Sensor;
  movement: Movement;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.sensor = new Sensor(this);

    this.movement = new Movement();
  }

  update(terrainBorders: Coordinate[][]) {
    this.#move();
    this.sensor.update(terrainBorders);
  }
  #move() {
    this.speed = 0;
    if (this.movement.forward) {
      this.speed = 2;
    }
    if (this.movement.reverse) {
      this.speed = -1;
    }

    const flip = this.speed == -1 ? -1 : 1;

    if (this.movement.left) {
      this.angle += 0.03 * flip;
    }
    if (this.movement.right) {
      this.angle -= 0.03 * flip;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-this.angle);

    context.beginPath();
    context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    context.fillStyle = "#000";
    context.fill();

    context.restore();
    this.sensor.draw(context);
  }
}
