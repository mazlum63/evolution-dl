import type { Coordinate } from "@models/coordinate.js";
import { Movement } from "./movement.js";
import { Sensor } from "./sensor.js";
import { Terrain } from "../terrain/terrain.js";
import { Entity } from "../terrain/entity.js";
import type { Fruit } from "../terrain/fruit.js";
import { NeuralNetwork } from "../neuralnetwork.js";
import { Energy } from "./animal-energy.js";

export class Animal extends Entity {
  protected speed: number = 0;
  protected sensor: Sensor;
  protected movement: Movement;
  protected brain?: NeuralNetwork | null = null;
  public energy: Energy = new Energy();
  constructor(terrain: Terrain, isUser: boolean = false, x: number = 500, y: number = 500) {
    super(terrain, x, y, 30, 30, 0);
    this.sensor = new Sensor(this);
    if (!isUser) {
      this.brain = new NeuralNetwork([this.sensor.rayCount, 16, 16, 4]);
    }
    this.movement = new Movement(isUser);
    this.terrain = terrain;

  }

  override update(
    terrainBorders: Coordinate[],
    animals: Animal[],
    fruits: Fruit[],
    useBrain: boolean = true
  ) {
    this.move();
    this.sensor.update(terrainBorders, animals, fruits);


    if (this.brain && useBrain) {
      let offsets = this.sensor.readings.map((r) =>
        r == null ? 0 : 1 - r.offset
      );
      const outputs = NeuralNetwork.feedForwards(offsets, this.brain);
      this.movement.forward = outputs[0];
      this.movement.reverse = outputs[1];
      this.movement.left = outputs[2];
      this.movement.right = outputs[3];
    }
    super.update(terrainBorders, animals, fruits);
    if (this.brain) {
      this.energy.decreaseEnergyIdle();
    }
  }

  protected move() {
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

    if ((this.movement.forward || this.movement.reverse || this.movement.left || this.movement.right) && this.brain) {
      this.energy.decreaseEnergyMoving();
    }
  }

  override draw(context: CanvasRenderingContext2D) {
    this.sensor.draw(context);
    super.draw(context);
  }
}
