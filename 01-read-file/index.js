const path = require('path');
const fs = require('fs');
const pathThisFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathThisFile);

readStream.on('data',(chunk) => console.log(chunk.toString()));