import "./style.css";
import { Animal } from "./animal/animal";
import { Terrain } from "./terrain/terrain.js";
import { Fruit } from "./terrain/fruit.js";

const canvas = document.getElementById("simCanvas") as HTMLCanvasElement;
const context = canvas!.getContext("2d") as CanvasRenderingContext2D;

const terrain = new Terrain(canvas.width, canvas.height);
let animals: Animal[] = [];
const animal = new Animal(500, 500, terrain, true);
const animal2 = new Animal(500, 500, terrain);
animals.push(animal);
animals.push(animal2);

const fruits: Fruit[] = [];
for (let i = 0; i < 10; i++) {
  const newFruit = new Fruit(terrain);
  fruits.push(newFruit);
}
animate();

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  terrain.draw(context);

  animals = animals.filter(a => a.energy.canSurvive())
  animals.forEach((a) => {
    a.update(terrain.borders, animals, fruits);
    a.draw(context);
  });
  fruits.forEach((f) => {
    f.update(terrain.borders, animals, []);
    f.draw(context);
  });
  requestAnimationFrame(animate);
}
