
const {readIdxFile} = require("./MnistReader");
const fs = require("fs");

const BATCH_SIZE = 5000;
const MAX_BATCHES = 10;

function saveData(labels, inputs, path) {
  let batchTracker = 0;

  for (let i = 0; i < labels.length; i += BATCH_SIZE) {
    const labelsBatch = labels.slice(i, i + BATCH_SIZE);
    const inputsBatch = inputs.slice(i, i + BATCH_SIZE);
    saveBatch(i / BATCH_SIZE, labelsBatch, inputsBatch, path);
    batchTracker++;

    if (batchTracker === MAX_BATCHES) {
      break;
    }
  }
}

function saveBatch(batch, labels, inputs, path) {
  const data = {
    labels,
    inputs
  };

  try {
    fs.writeFileSync(`${path}-${batch}.json`, JSON.stringify(data, null, 0));
    console.log(`File ${path}-${batch}.json saved!`);
  } catch(e) {
    console.log(e.message);
  }
}

const PIXEL_KEEP_TRESHOLD = 20;

function saveTestingData() {
  const testImages = readIdxFile("./datasets/mnist/t10k-images.idx3-ubyte");
  const testLabels = readIdxFile("./datasets/mnist/t10k-labels.idx1-ubyte");

  const processedImages = testImages.data.map(image =>
    image.map(row =>
      row.map(pixel => pixel > PIXEL_KEEP_TRESHOLD ? pixel : 0)
    )
  );

  const binaryLabels = testLabels.data.map((label) => label === 0 ? 1 : 0);
  const flatImages = processedImages.map(image => image.flat());

  saveData(binaryLabels, flatImages, "./datasets/mnist/test-data");
  saveData(binaryLabels, processedImages, "./frontend/public/mnist/test-data");
}

function saveTrainingData() {
  const trainImages = readIdxFile("./datasets/mnist/train-images.idx3-ubyte");
  const trainLabels = readIdxFile("./datasets/mnist/train-labels.idx1-ubyte");

  const binaryLabels = trainLabels.data.map((label) => label === 0 ? 1 : 0);

  const flatImages = trainImages.data
    .map(image =>
      image.flat().map(pixel => pixel > PIXEL_KEEP_TRESHOLD ? pixel : 0)
    );

  saveData(binaryLabels, flatImages, "./datasets/mnist/train-data");
}

saveTestingData();
saveTrainingData();


console.log("Parsing End!");
