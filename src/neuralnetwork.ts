export class NeuralNetwork {
  levels: Level[] = [];
  constructor(neurons: number[]) {
    for (let i = 0; i < neurons.length - 1; i++) {
      this.levels.push(new Level(neurons[i], neurons[i + 1]));
    }
  }

  static feedForwards(inputs: number[], network: NeuralNetwork): boolean[] {
    let outputs = Level.feedForward(inputs, network.levels[0]);
    for (let i = 0; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs.map((o) => (o == 1 ? true : false));
  }
}

export class Level {
  inputs: number[] = [];
  weights: number[][] = [];
  biases: number[] = [];
  outputs: number[] = [];

  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array<number>(inputCount);
    this.outputs = new Array<number>(outputCount);
    this.biases = new Array<number>(outputCount);

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array<number>(outputCount);
    }
    Level.randomize(this);
  }

  static randomize(level: Level) {
        for (let i = 0; i < level.outputs.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
      for (let j = 0; j < level.inputs.length; j++) {
        level.weights[j][i] = Math.random() * 2 - 1;
      }
    }
  }

  static feedForward(inputs: number[], level: Level): number[] {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = inputs[i];
    }
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += inputs[j] * level.weights[j][i];
      }
      level.outputs[i] = sum > level.biases[i] ? 1 : 0;
    }

    return level.outputs;
  }
}