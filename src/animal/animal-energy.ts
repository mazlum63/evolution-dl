export class Energy {
    energyUseageIdle = 0.2 / 60;
    energyUseageMoving = 1 / 60;
    energy = 10;
    maxEnergy = 100;
    durability = 10;
    energyPerEat = 30;

    canSurvive(): boolean {
        return this.energy > 0 && this.durability > 0
    }

    decreaseEnergyIdle() {
        if (this.energy > 0) {
            this.energy -= this.energyUseageIdle;
        }
        if (this.energy <= 0 && this.durability > 0) {
            this.durability -= this.energyUseageIdle;
        }
    }

    decreaseEnergyMoving() {
        this.energy -= this.energyUseageMoving;
    }
}