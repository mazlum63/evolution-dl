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
  polygon: Coordinate[] = [];
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

  #createPolygon() {
    var newPoint1: Coordinate = { x: -this.width / 2, y: -this.height / 2 };
    var newPoint2: Coordinate = { x: this.width / 2, y: -this.height / 2 };
    var newPoint3: Coordinate = { x: this.width / 2, y: this.height / 2 };
    var newPoint4: Coordinate = { x: -this.width / 2, y: this.height / 2 };

    this.polygon.push(newPoint1);
    this.polygon.push(newPoint2);
    this.polygon.push(newPoint3);
    this.polygon.push(newPoint4);
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
    this.sensor.draw(context);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-this.angle);

    this.#createPolygon();
    context.beginPath();
    context.moveTo(this.polygon[0].x, this.polygon[0].y);
    context.lineTo(this.polygon[1].x, this.polygon[1].y);
    context.lineTo(this.polygon[2].x, this.polygon[2].y);
    context.lineTo(this.polygon[3].x, this.polygon[3].y);

    context.fillStyle = "#000";
    context.fill();
    context.restore();
  }
}
