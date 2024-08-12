
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
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

function createModel(inputSize, hiddenSize, outputSize, learningRate) {
  // sequential model is a linear stack of layers, meaning the output of one layer is the input
  // to the next one. This is suitable for feedforward/forward propagation neural networks
  const model = tf.sequential();

  // dense: fully connected layer
  model.add(tf.layers.dense({
    // number of input neurons
    inputShape: [inputSize],
    // units: number of neurons in hidden layer
    units: hiddenSize,
    // activation function
    activation: "relu"
  }));

  model.add(tf.layers.dense({
    units: outputSize,
    activation: "softmax",
  }));

  model.compile({
    // we are using in our mlp gradient descent algorithm -> Stochastic Gradient Descent
    optimizer: tf.train.adam(learningRate),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  return model;
}


const { trainInputs, trainLabels, testInputs, testLabels } = loadData(8, 2);

// 0d -> 42 -> scalar
// 1d -> [1,2,3,4] -> array
// 2d -> [[1,2], [3,4]] -> matrix
// 3d -> [[[1,2], [3,4]], [[7,8], [4,5]]] -> array of matrices

const trainInputsTensor = tf.tensor2d(trainInputs);
const trainLabelsTensor = tf.tensor2d(trainLabels);
const testInputsTensor = tf.tensor2d(testInputs);
const testLabelsTensor = tf.tensor2d(testLabels);

const EPOCHS = 40;
const inputSize = trainInputs[0].length;
const hiddenSize = 64;
const outputSize = 10;
const learningRate = 0.008;

// create TF model
const model = createModel(inputSize, hiddenSize, outputSize, learningRate);

async function trainModel() {
  await model.fit(trainInputsTensor, trainLabelsTensor, {
    epochs: EPOCHS,
    validationData: [testInputsTensor, testLabelsTensor]
  });

  const results = model.evaluate(testInputsTensor, testLabelsTensor);
  const testAccuracy = results[1].dataSync()[0] * 100;
  console.log(`Test accuracy: ${testAccuracy.toFixed(2)}%`)

  const savePath = 'file://./frontend/public/mnist/mlp-mnist-model-tf';
  await model.save(savePath);
  console.log(`Model saved to: ${savePath}`);
}

trainModel();

