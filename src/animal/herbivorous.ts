import type { Coordinate } from "@models/coordinate";
import { NeuralNetwork } from "../neuralnetwork";
import type { Fruit } from "../terrain/fruit";
import type { Terrain } from "../terrain/terrain";
import { Animal } from "./animal";
import { polysIntersect } from "../utils/utils";

export class Herbivorous extends Animal {
    constructor(terrain: Terrain) {
        super(terrain)
        this.brain = new NeuralNetwork(this.getHerbivorousNetwork());
    }

    override update(
        terrainBorders: Coordinate[],
        animals: Animal[],
        fruits: Fruit[]
    ) {
        if (this.brain) {
            let offsets = this.sensor.readings.map((r) =>
                r == null ? 0 : 1 - r.offset
            );
            let fruitsInfo = this.sensor.readings.map(r => (r != null && r.isFruit) ? 1 : 0);
            let energyInfo = [this.energy.normalizedEnergy, this.energy.normalizedStamina];
            const lastMovement: number[] = [
                this.brain.levels[1].outputs[0],
                this.brain.levels[1].outputs[2],
                this.brain.levels[1].outputs[3],
                this.brain.levels[1].outputs[4],
            ];
            const outputs = NeuralNetwork.feedForwards([...offsets, ...fruitsInfo, ...energyInfo, ...lastMovement], this.brain);
            this.movement.forward = outputs[0];
            this.movement.reverse = outputs[1];
            this.movement.left = outputs[2];
            this.movement.right = outputs[3];

            if (outputs[4]) {

                for (let i = 0; i < fruits.length; i++) {
                    if (polysIntersect(this.polygon, fruits[i].polygon)) {
                        this.energy.increaseEnery();
                        let filteredFruits = fruits.filter(f => f != fruits[i]);
                        fruits.length = 0;
                        fruits.push(...filteredFruits)
                    }
                }
            }
        }
        super.update(terrainBorders, animals, fruits, false)
    }

    private getHerbivorousNetwork(): number[] {
        const outputCount = 4 + 1; // movement + eat fruit
        // (rays and fruit info by rays) + energy and stamina + intersection with fruit
        const inputCount = (this.sensor.rayCount * 2) + this.energy.getEnergyInputCount() + outputCount;
        const hidden = [16, 16]; // hidden layers

        return [inputCount, ...hidden, outputCount]
    }
}