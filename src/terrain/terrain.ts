import type{ Coordinate } from "@models/coordinate";

export class Terrain {
  distance: number = 300;
  width: number;
  height: number;
  borders: Coordinate[][];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    const topLeft = { x: this.distance, y: this.distance };
    const bottomLeft = { x: this.distance, y: this.height - this.distance };
    const topRight = { x: this.width - this.distance, y: this.distance };
    const bottomRight = {
      x: this.width - this.distance,
      y: this.height - this.distance,
    };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
      [topLeft, topRight],
      [bottomLeft, bottomRight],
    ];
  }
  draw(context: CanvasRenderingContext2D) {
    this.borders.forEach((border) => {
      this.drawLine(border[0], border[1], context);
    });
  }

  drawLine(A: Coordinate, B: Coordinate, context: CanvasRenderingContext2D) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.moveTo(A.x, A.y);
    context.lineTo(B.x, B.y);
    context.stroke();
  }
}
