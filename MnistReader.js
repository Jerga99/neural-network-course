
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
    console.log("Label file!");
  } else {
    // image file

    const rows = data.readUint32BE(offset);
    offset += 4;
    const cols = data.readUint32BE(offset);
  }
}

readIdxFile("./datasets/mnist/train-images.idx3-ubyte");

// readIdxFile("./datasets/mnist/train-labels.idx1-ubyte");
