



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

  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let sum = this.bias;
      let inputs = trainData[i];

      for (let j = 0; j < inputs.length; j++) {
        sum += inputs[j] * this.weights[j];
      }

      console.log(sum);
      const yp = this.activationFunction(sum);
      const yt = trainLabels[i];

      if (yt != yp) {
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yt - yp) * inputs[k];
        }

        this.bias += this.learningRate * (yt - yp);
      }
    }
  }
}

const perceptron = new Perceptron();
perceptron.train(trainInputs, trainLabels);

console.log(perceptron);
