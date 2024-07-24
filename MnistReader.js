
const fs = require("fs");

function readIdxFile(filepath) {
  const data = fs.readFileSync(filepath);
  let offset = 0;
  const magicNumber = data.readUint32BE(offset);
  // 0 0 8 3
  // 8 -> uint8 -> 8 bits -> 1 byte -> 0 - 255
  // 3 -> 4 bytes(number of items) - 4 bytes(width - rows) - 4 bytes(height - cols)
  console.log(magicNumber);

}

readIdxFile("./datasets/mnist/train-images.idx3-ubyte");






// 11101010 - binary
// EA - hex
// 234 - decimal


// BE -> 0 0 8 3 , LE -> 3 8 0 0

// 00001000 -> 8
// 00000011 -> 3
// 0000100000000011
