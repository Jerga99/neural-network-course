
const fs = require("fs");
const seedrandom = require("seedrandom");
const seed = "perc-1";

seedrandom(seed, {global: true});

function normalizeData(data) {
  return data.map(input => input.map(pixel => pixel / 255.0));
}

function oneHotEncode(label) {
  return Array.from({length: 10}, (_, i) => i == label ? 1 : 0)
}

function shuffleArrays(array1, array2) {
  for (let i = array1.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array1[i], array1[j]] = [array1[j], array1[i]];
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
}

function loadData(trainBatches, testBatches) {
  const trainInputs = []; const testInputs = [];
  const trainLabels = []; const testLabels = [];

  for (let i = 0; i < trainBatches; i++) {
    const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/train-data-${i}.json`, "utf8"));
    trainInputs.push(...normalizeData(inputs));
    trainLabels.push(...labels);
  }

  for (let i = 0; i < testBatches; i++) {
    const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/test-data-${i}.json`, "utf8"));
    testInputs.push(...normalizeData(inputs));
    testLabels.push(...labels);
  }

  const {inputs, labels} =  JSON.parse(fs.readFileSync(`./datasets/mnist/misclassified-data-mlp.json`, "utf8"));

  trainInputs.push(...normalizeData(inputs.map(image => image.map(pixel => pixel > 20 ? pixel : 0))));
  trainLabels.push(...labels);

  shuffleArrays(trainInputs, trainLabels);

  return {
    trainInputs,
    trainLabels: trainLabels.map(label => oneHotEncode(label)),
    testInputs,
    testLabels: testLabels.map(label => oneHotEncode(label))
  }
}


const { trainInputs, trainLabels, testInputs, testLabels } = loadData(8, 2);


