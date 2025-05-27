import type { Coordinate } from "@models/coordinate.js";
import { Movement } from "./movement.js";
import { Sensor } from "./sensor.js";
import { polysIntersect } from "../utils/utils.js";
import { Terrain } from "../terrain/terrain.js";

export class Animal {
  width: number = 30;
  height: number = 30;
  speed: number = 0;
  angle: number = 0;
  x: number;
  y: number;

  terrain: Terrain;

  damaged: boolean = false;
  sensor: Sensor;
  movement: Movement;
  polygon: Coordinate[] = this.#createPolygon();
  constructor(x: number, y: number, terrain: Terrain) {
    this.x = x;
    this.y = y;
    this.sensor = new Sensor(this);

    this.movement = new Movement();
    this.terrain = terrain;
  }

  update(terrainBorders: Coordinate[][]) {
    this.#move();
    this.polygon = this.#createPolygon();
    this.damaged = this.#assessDamage(terrainBorders);
    this.sensor.update(terrainBorders);
  }
  #assessDamage(terrainBorders: Coordinate[][]) {
    for (let i = 0; i < terrainBorders.length; i++) {
      if (polysIntersect(this.polygon, terrainBorders[i])) {
        return true;
      }
    }
    return false;
  }
  #createPolygon(): Coordinate[] {
    const radiant = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    return [
      {
        x: this.x - Math.sin(this.angle - alpha) * radiant,
        y: this.y - Math.cos(this.angle - alpha) * radiant,
      },
      {
        x: this.x - Math.sin(this.angle + alpha) * radiant,
        y: this.y - Math.cos(this.angle + alpha) * radiant,
      },
      {
        x: this.x - Math.sin(Math.PI + this.angle - alpha) * radiant,
        y: this.y - Math.cos(Math.PI + this.angle - alpha) * radiant,
      },
      {
        x: this.x - Math.sin(Math.PI + this.angle + alpha) * radiant,
        y: this.y - Math.cos(Math.PI + this.angle + alpha) * radiant,
      },
    ];
  }
  #move() {
    this.speed = 0;
    if (this.movement?.forward) {
      this.speed = 2;
    }
    if (this.movement?.reverse) {
      this.speed = -1;
    }

    const flip = this.speed == -1 ? -1 : 1;

    if (this.movement?.left) {
      this.angle += 0.03 * flip;
    }
    if (this.movement?.right) {
      this.angle -= 0.03 * flip;
    }

    const newX = this.x - Math.sin(this.angle) * this.speed;
    const newY = this.y - Math.cos(this.angle) * this.speed;

    if (
      newX >= 0 + this.terrain.distance &&
      newX <= this.terrain.width - this.terrain.distance &&
      newY >= 0 + this.terrain.distance &&
      newY <= this.terrain.height - this.terrain.distance
    ) {
      this.x = newX;
      this.y = newY;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.sensor.draw(context);

    context.beginPath();
    if (this.damaged) {
      context.fillStyle = "#ccc";
      context.strokeStyle = "#ccc";
    } else {
      context.fillStyle = "#000";
      context.strokeStyle = "#000";
    }
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
