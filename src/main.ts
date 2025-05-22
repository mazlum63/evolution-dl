import "./style.css";
import { Animal } from "./animal/animal";
import { Terrain } from "./terrain/terrain.js";

const canvas = document.getElementById("simCanvas") as HTMLCanvasElement;
const context = canvas!.getContext("2d") as CanvasRenderingContext2D;

const terrain = new Terrain(canvas.width, canvas.height);

const animal = new Animal(100, 100);

animate();

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  animal.update(terrain.borders);

  terrain.draw(context);
  animal.draw(context);
  requestAnimationFrame(animate);
}
