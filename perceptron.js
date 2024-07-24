



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

  train(trainData) {
    for (let i = 0; i < trainData.length; i++) {
      let sum = this.bias;
      let inputs = trainData[i];

      for (let j = 0; j < inputs.length; j++) {
        sum += inputs[j] * this.weights[j];
      }

      console.log(sum);
    }
  }

}

const perceptron = new Perceptron();
perceptron.train(trainInputs);
