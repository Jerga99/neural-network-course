
const fs = require("fs");

function readIdxFile(filepath) {
  const data = fs.readFileSync(filepath);
  let offset = 0;
  const magicNumber = data.readUint32BE(offset);
  offset += 4;
  const numberOfItems = data.readUint32BE(offset);
  offset += 4;

  // label file
  if (magicNumber === 2049) {
    const labels = [];

    for (let i = 0; i < numberOfItems; i++) {
      labels.push(data.readUint8(offset));
      offset += 1;
    }

    return {type: "labels", data: labels};
  } else {
    // image file
    const rows = data.readUint32BE(offset);
    offset += 4;
    const cols = data.readUint32BE(offset);
    offset += 4;

    const images = [];

    for (let i = 0; i < numberOfItems; i++) {
      const image = [];

      for (let r = 0; r < rows; r++) {
        const row = [];

        for (let c = 0; c < cols; c++) {
          row.push(data.readUint8(offset));
          offset += 1;
        }
        image.push(row);
      }
      images.push(image);
    }

    return {type: "images", data: images};
  }
}

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

const testImages = readIdxFile("./datasets/mnist/t10k-images.idx3-ubyte");
const testLabels = readIdxFile("./datasets/mnist/t10k-labels.idx1-ubyte");

saveData(testLabels.data, testImages.data, "./datasets/mnist/test-data");
saveData(testLabels.data, testImages.data, "./frontend/public/mnist/test-data");

console.log("Parsing End!");
