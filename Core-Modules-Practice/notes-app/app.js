const fs = require('fs');

fs.writeFileSync('file.txt','hello jaffar hii');
fs.appendFileSync('file.txt','sdkfjhkjdsf');

const file = fs.readFileSync('file.txt').toString();

console.log(file);