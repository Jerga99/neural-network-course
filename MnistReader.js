
const fs = require("fs");

function readIdxFile(filepath) {
  const data = fs.readFileSync(filepath);
  let offset = 0;
  const magicNumber = data.readUint32BE(offset);

  offset += 4;
  const numberOfItems = data.readUint32BE(offset);
  offset += 4;
  const rows = data.readUint32BE(offset);
  offset += 4;
  const cols = data.readUint32BE(offset);
}

readIdxFile("./datasets/mnist/train-images.idx3-ubyte");


// 0 0 0 4 0 0 0 4 0 100 255 27 0 255 255 27 0 0 255 27 0 0 255 0
// 0 100 255 27
// 0 255 255 27
// 0  0  255 27
// 0  0  255 0
