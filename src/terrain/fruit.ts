import { Entity } from "./entity";
import type { Terrain } from "./terrain";

export class Fruit extends Entity {
  constructor(terrain: Terrain) {
    super(terrain);
  }
}
