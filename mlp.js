


class MLP {
  constructor() {
    this.learningRate = 0.01;

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

    this.outputSums = [];
    this.outputProbabilities = [];
    this.hiddenSums = [];
    this.hiddenActivations = [];
  }

  reluActivation(z) {
    return Math.max(0, z);
  }

  reluDerivate(z) {
    return z > 0 ? 1 : 0;
  }

  softmax(outputs) {
    const maxOutput = Math.max(...outputs);
    const expValues = outputs.map(output => Math.exp(output - maxOutput));
    const sumExpValues = expValues.reduce((sum, val) => sum + val, 0);
    return expValues.map(val => val / sumExpValues);
  }

  forward(inputs) {
    this.hiddenSums = this.weightsInputHidden.map((weights, i) => {
      return weights.reduce((sum, weight, j) => sum + (weight * inputs[j]), this.biasesHidden[i]);
    });

    this.hiddenActivations = this.hiddenSums.map(z => this.reluActivation(z));

    this.outputSums = this.weightsHiddenOutput.map((weights, i) => {
      return weights.reduce((sum, weight, j) => sum + (weight * this.hiddenActivations[j]), this.biasesOutput[i])
    });

    this.outputProbabilities = this.softmax(this.outputSums);
  }

  backward(inputs, targets) {
    const outputDeltas = this.outputProbabilities.map((probability, i) => probability - targets[i]);

    const hiddenDeltas = this.hiddenSums.map((z, i) => {
      const error = outputDeltas.reduce((sum, delta, j) => sum + delta * this.weightsHiddenOutput[j][i], 0);
      return error * this.reluDerivate(z);
    });

    this.weightsHiddenOutput = this.weightsHiddenOutput.map((weights, i) => {
      return weights.map((weight, j) => weight - this.learningRate * outputDeltas[i] * this.hiddenActivations[j]);
    });

    this.biasesOutput = this.biasesOutput.map((bias, i) => {
      return bias - this.learningRate * outputDeltas[i];
    });

    this.weightsInputHidden = this.weightsInputHidden.map((weights, i) => {
      return weights.map((weight, j) => weight - this.learningRate * hiddenDeltas[i] * inputs[j]);
    });

    this.biasesHidden = this.biasesHidden.map((bias, i) => {
      return bias - this.learningRate * hiddenDeltas[i]
    });
  }

  train(inputs, targets) {
    this.forward(inputs);
    this.backward(inputs, targets);
  }
}

const mlp = new MLP();

const trainingData = [
  {inputs: [0.1, 0.2, 0.3, 0.4], targets: [1, 0]},
  {inputs: [0.5, 0.6, 0.7, 0.8], targets: [0, 1]},
  {inputs: [0.9, 0.1, 0.2, 0.3], targets: [1, 0]},
  {inputs: [0.4, 0.5, 0.6, 0.7], targets: [0, 1]},
];

const EPOCHS = 100;

for (let epoch = 0; epoch < EPOCHS; epoch++) {
  for (let i = 0; i <  trainingData.length; i++) {
    mlp.train(trainingData[i].inputs, trainingData[i].targets);
  }
}

console.log(mlp);

