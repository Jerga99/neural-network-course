
const fs = require("fs");
const seedrandom = require("seedrandom");
const seed = "perc-1";

seedrandom(seed, {global: true});

class Perceptron {
  constructor(inputSize, learningRate = 0.1) {
    this.weights = Array(inputSize).fill(0).map(() => Math.random() * 0.2 - 0.1);
    this.bias = Math.random() * 0.2 - 0.1;
    this.learningRate = learningRate;
  }

  activationFunction(x) {
    return x >= 0 ? 1 : 0;
  }

  predict(inputs) {
    let sum = this.bias;
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j];
    }

    return this.activationFunction(sum);
  }

  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let inputs = trainData[i];
      const yp = this.predict(inputs);
      const yt = trainLabels[i];

      if (yt != yp) {
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yt - yp) * inputs[k];
        }

        this.bias += this.learningRate * (yt - yp);
      }
    }
  }

  calculateAccuracy(inputs, labels) {
    let correct = 0;
    for (let i = 0; i < inputs.length; i++) {
      const yp = this.predict(inputs[i]);

      if (yp === labels[i]) {
        correct++;
      }
    }

    return (correct / inputs.length) * 100;
  }

  saveModel(path) {
    console.log("Preparing export");
    const exportData = {
      weights: this.weights,
      bias: this.bias
    };

    const stringData = JSON.stringify(exportData, null, 2);

    try {
      fs.writeFileSync(path, stringData);
      console.log("File save to: " + path);
    } catch(e) {
      console.log("Save failed: " + e.message);
    }
  }
}

function shuffleArrays(array1, array2) {
  for (let i = array1.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array1[i], array1[j]] = [array1[j], array1[i]];
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
}

function findMisclassified(inputs, labels, perceptron) {
  const misclassified = [];
  for (let i = 0; i < inputs.length; i++) {
    const prediction = perceptron.predict(inputs[i]);
    if (prediction !== labels[i]) {
      misclassified.push({index: i, image: inputs[i], label: labels[i], prediction})
    }
  }

  return misclassified;
}

function displayMisclassified(misclassified) {
  console.log(`Number of misclassified data: ${misclassified.length}`)
  for (const item of misclassified) {
    console.log(`Index: ${item.index}, label: ${item.label}, prediction: ${item.prediction}`);
  }
}

function normalizeData(data) {
  return data.map(input => input.map(pixel => pixel / 255.0));
}

const EPOCHS = 91;
const TRAIN_BATCHES = 10;
const TEST_BATCHES = 2;
const INPUT_SIZE = 28 * 28;

const trainInputs = []; const testInputs = [];
const trainLabels = []; const testLabels = [];

for (let i = 0; i < TRAIN_BATCHES; i++) {
  const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/train-data-${i}.json`, "utf8"));
  trainInputs.push(...normalizeData(inputs));
  trainLabels.push(...labels);
}

for (let i = 0; i < TEST_BATCHES; i++) {
  const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/test-data-${i}.json`, "utf8"));
  testInputs.push(...normalizeData(inputs));
  testLabels.push(...labels);
}

const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/misclassified-data.json`, "utf8"));

trainInputs.push(...inputs.map(image => image.map(pixel => pixel > 20 ? pixel : 0)));
trainLabels.push(...labels);

const perceptron = new Perceptron(INPUT_SIZE, 0.01);

for (let epoch = 0; epoch < EPOCHS; epoch++) {
  shuffleArrays(trainInputs, trainLabels);
  perceptron.train(trainInputs, trainLabels);

  // const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels);
  const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels);

  console.log(`Epoch ${epoch + 1}`);
  // console.log(`Training accuracy: ${trainingAccuracy}%`);
  console.log(`Testing accuracy: ${testingAccuracy}%`);
  console.log('--------------------------------------')
}

const misclassified = findMisclassified(testInputs, testLabels, perceptron);
displayMisclassified(misclassified);

perceptron.saveModel("./frontend/public/mnist/binary-model.json")

// console.log(perceptron.weights);
// console.log(perceptron.bias);

// Overfitting Detection: High training accuracy with low testing accuracy indicates overfitting.
// The model performs well on training data but fails to generalize to new, unseen data.

// Underfitting Detection: Low training accuracy suggests underfitting, meaning the model is too simple to capture
// the patterns in the training data, which likely results in poor performance on both training and testing data.

