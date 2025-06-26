import "./style.css";
import { Animal } from "./animal/animal";
import { Terrain } from "./terrain/terrain.js";
import { Fruit } from "./terrain/fruit.js";
import { Herbivorous } from "./animal/herbivorous.js";

const canvas = document.getElementById("simCanvas") as HTMLCanvasElement;
const context = canvas!.getContext("2d") as CanvasRenderingContext2D;

const terrain = new Terrain(canvas.width, canvas.height);
let herbivorouses: Herbivorous[] = [];
const animal = new Animal(terrain, true);

for (let i = 0; i < 100; i++) {
  const herbivorous = new Herbivorous(terrain);
  herbivorouses.push(herbivorous);
}

const fruits: Fruit[] = [];
for (let i = 0; i < 100; i++) {
  const newFruit = new Fruit(terrain);
  fruits.push(newFruit);
}
animate();

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  terrain.draw(context);

  var survidedAnimals = herbivorouses.filter(a => a.energy.canSurvive())
  herbivorouses.length = 0;
  herbivorouses.push(...survidedAnimals)
  herbivorouses.forEach((a) => {
    a.update(terrain.borders, herbivorouses, fruits);
    a.draw(context);
  });

  /* animal.update(terrain.borders, herbivorouses, fruits)
  animal.draw(context) */
  fruits.forEach((f) => {
    f.update();
    f.draw(context);
  });
  requestAnimationFrame(animate);
}
