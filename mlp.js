
const seedrandom = require("seedrandom");
const seed = "perc-1";

seedrandom(seed, {global: true});

function randomize() {
  return Math.random() * 0.3 - 0.1;
}

function mseLoss(outputs, targets) {
  return 0.5 * outputs.reduce((sum, output, i) => sum + (output - targets[i]) ** 2, 0);
}

class MLP {
  constructor(inputSize, hiddenSize, outputSize) {
    this.learningRate = 0.01;

    this.weightsInputHidden = Array.from({length: hiddenSize}, () =>
      Array.from({length: inputSize}, randomize)
    );

    this.biasesHidden = Array.from({length: hiddenSize}, randomize);

    this.weightsHiddenOutput =  Array.from({length: outputSize}, () =>
      Array.from({length: hiddenSize}, randomize)
    );

    this.biasesOutput = Array.from({length: outputSize}, randomize);

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
    return this.outputProbabilities;
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

const inputSize = 4;
const hiddenSize = 2;
const outputSize = 2;

const mlp = new MLP(inputSize, hiddenSize, outputSize);

const trainingData = [
  {inputs: [0.1, 0.2, 0.3, 0.4], targets: [1, 0]},
  {inputs: [0.5, 0.6, 0.7, 0.8], targets: [0, 1]},
  {inputs: [0.9, 0.1, 0.2, 0.3], targets: [1, 0]},
  {inputs: [0.4, 0.5, 0.6, 0.7], targets: [0, 1]},
];

const testingData = [
  {inputs: [0.2, 0.3, 0.4, 0.5], targets: [1, 0]},
  {inputs: [0.6, 0.7, 0.8, 0.9], targets: [0, 1]}
];

const EPOCHS = 100;

for (let epoch = 0; epoch < EPOCHS; epoch++) {
  let totalLoss = 0;
  for (let i = 0; i <  trainingData.length; i++) {
    mlp.train(trainingData[i].inputs, trainingData[i].targets);
    totalLoss += mseLoss(mlp.outputProbabilities, trainingData[i].targets);
  }

  if (epoch % 2 == 0) {
    console.log(`Epoch ${epoch}, Loss: ${totalLoss / trainingData.length}`);
  }
}

let correctPredictions = 0;

for (let i = 0; i < testingData.length; i++) {
  const targets = testingData[i].targets;
  const outputProbabilities = mlp.forward(testingData[i].inputs);

  const predicted = outputProbabilities.indexOf(Math.max(...outputProbabilities));

  const target = targets.indexOf(Math.max(...targets))

  if (predicted === target) {
    correctPredictions++;
  }
}

const accuracy = (correctPredictions / testingData.length) * 100;
console.log(`Accuracy: ${accuracy}%`);

