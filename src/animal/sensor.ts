import type{ Coordinate } from "@models/coordinate.js";
import { getIntersection, lerp } from "../utils/utils.js";
import { Animal } from "./animal.js";
import type{ Reading } from "@models/reading.js";

export class Sensor {
  animal: Animal;
  rayCount: number = 10;
  rayLength: number = 200;
  raySpread: number = Math.PI / 2;
  rays: Coordinate[][] = [];
  readings: Array<Reading | null> = [];
  constructor(animal: Animal) {
    this.animal = animal;
  }

  update(terrainBorders: Coordinate[][]) {
    this.readings = [];
    this.#castRays();
    this.rays.forEach((r: Coordinate[]) => {
      this.readings.push(this.#getReadings(r, terrainBorders));
    });
  }

  #getReadings(
    ray: Coordinate[],
    terrainBorders: Coordinate[][]
  ): Reading | null {
    let intersections: Array<Reading | null> = [];
    terrainBorders.forEach((rb) => {
      const intersection: Reading | null = getIntersection(
        ray[0],
        ray[1],
        rb[0],
        rb[1]
      );
      if (intersection) {
        intersections.push(intersection);
      }
    });
    if (intersections.length == 0) {
      return null;
    } else {
      const offsets = intersections.map((i) => i!.offset);
      const minOffset = Math.min(...offsets);
      return intersections.find(
        (i) => i!.offset == minOffset
      ) as Reading | null;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let endPoint: Coordinate | Reading | null = this.rays[i][1];
      if (this.readings[i]) {
        endPoint = this.readings[i];
      }

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "yellow";
      context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      context.lineTo(endPoint!.x, endPoint!.y);
      context.stroke();

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      context.lineTo(endPoint!.x, endPoint!.y);
      context.stroke();
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) +
        this.animal.angle;

      const start = { x: this.animal.x, y: this.animal.y };
      const end = {
        x: this.animal.x - Math.sin(rayAngle) * this.rayLength,
        y: this.animal.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push([start, end]);
    }
  }
}
