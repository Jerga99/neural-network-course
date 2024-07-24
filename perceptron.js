



const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1],
];

const trainLabels = [1, 1, 0, 0, 0];

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

console.log(`Training accuracy: ${trainingAccuracy}%`);
