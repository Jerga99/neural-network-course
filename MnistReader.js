
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
  }
}

// readIdxFile("./datasets/mnist/train-images.idx3-ubyte");

const trainLabels = readIdxFile("./datasets/mnist/train-labels.idx1-ubyte");
console.log(trainLabels);
