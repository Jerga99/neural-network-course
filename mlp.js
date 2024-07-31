


class MLP {
  constructor() {
    this.weightsInputHidden = [
      [0.5, 0.5, 0.5, 0.5], // Weights for hidden neuron 1
      [-0.5, -0.5, -0.5, -0.5] // Weights for hidden neuron 2
    ];

    this.biasesHidden = [0.1, -0.1];

    this.weightsHiddenOutput = [
      [1.0, -1.0], // Weights for output neuron 1
      [-1.0, 1.0]  // Weights for output neuron 2
    ];

    this.biasesOutput = [0.1, 0.1];
  }

  reluActivation(z) {
    return Math.max(0, z);
  }

  forward(inputs) {
    const hiddenSums = this.weightsInputHidden.map((weights, i) => {
      return weights.reduce((sum, weight, j) => sum + (weight * inputs[j]), this.biasesHidden[i]);
    });

    const hiddenActivations = hiddenSums.map(z => this.reluActivation(z));
    console.log(hiddenActivations);
  }
}

const mlp = new MLP();
const image = [0.1, 0.2, 0.3, 0.4];

mlp.forward(image);
