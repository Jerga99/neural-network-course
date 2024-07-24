
const fs = require("fs");

function readIdxFile(filepath) {
  const data = fs.readFileSync(filepath);
  console.log(data);
}

readIdxFile("./datasets/mnist/train-images.idx3-ubyte");


// 11101010 - binary
// EA - hex
// 234 - decimal
