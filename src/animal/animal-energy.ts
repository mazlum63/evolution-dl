export class Energy {
    private energyUseageIdle = 0.2 / 60;
    private energyUseageMoving = 1 / 60;
    private energy = 10;
    private maxEnergy = 100;
    private stamina = 10;
    private energyPerEat = 30;
    normalizedEnergy = this.energy / this.maxEnergy;
    normalizedstamina = this.stamina / this.maxEnergy;
    private staminaPercentage = 0.7;

    canSurvive(): boolean {
        return this.energy > 0 || this.stamina > 0
    }

    decreaseEnergyIdle() {
        if (this.energy == 0 && this.stamina == 0) {
            return;
        }
        this.handleMinMaxValue();
        if (this.energy > 0) {
            this.energy -= this.energyUseageIdle;
        }
        if (this.energy <= 0 && this.stamina > 0) {
            this.stamina -= this.energyUseageIdle;
        }
    }

    decreaseEnergyMoving() {
        if (this.energy == 0 && this.stamina == 0) {
            return;
        }
        this.handleMinMaxValue();
        if (this.energy > 0) {
            this.energy -= this.energyUseageMoving;
        }
        if (this.energy <= 0 && this.stamina > 0) {
            this.stamina -= this.energyUseageMoving;
        }
    }

    increaseEnery() {
        if (this.energy == this.maxEnergy && this.stamina == this.maxEnergy) {
            return;
        }
        this.handleMinMaxValue();
        if (this.energy < this.maxEnergy) {
            this.energy += this.energyPerEat;
        }
        if (this.energy == this.maxEnergy && this.stamina < this.maxEnergy) {
            this.stamina += this.energyPerEat * this.staminaPercentage;
        }
    }

    private handleMinMaxValue() {
        if (this.energy < 0) {
            this.energy = 0;
        }
        if (this.stamina < 0) {
            this.stamina = 0;
        }

        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
        if (this.stamina > this.maxEnergy) {
            this.stamina = this.maxEnergy;
        }
    }
}