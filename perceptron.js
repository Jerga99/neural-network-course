



const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1],
];

const testInputs = [
  [2, 6],
  [3, 7],
  [1, 3],
  [2, 2],
  [2, 5]
];

const trainLabels = [1, 1, 0, 0, 0];
const testLabels = [1, 1, 0, 0, 1];

class Perceptron {
  constructor(learningRate = 0.1) {
    this.weights = [0.1, -0.3];
    this.bias = 0.5;
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
}

const perceptron = new Perceptron();
const EPOCHS = 10;

for (let epoch = 0; epoch < EPOCHS; epoch++) {
  perceptron.train(trainInputs, trainLabels);
}

const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels);
const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels);

console.log(`Training accuracy: ${trainingAccuracy}%`);
console.log(`Testing accuracy: ${testingAccuracy}%`);


// Overfitting Detection: High training accuracy with low testing accuracy indicates overfitting.
// The model performs well on training data but fails to generalize to new, unseen data.

// Underfitting Detection: Low training accuracy suggests underfitting, meaning the model is too simple to capture
// the patterns in the training data, which likely results in poor performance on both training and testing data.

