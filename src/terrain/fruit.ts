export class Fruit {
  x: number;
  y: number;
  size: number;
  constructor() {
    this.x = Math.random() * 1920;
    this.y = Math.random() * 1080;
    this.size = 10;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.x, this.y, this.size, this.size);
    context.fillStyle = "#5be36a";
    context.fill();
  }
}
