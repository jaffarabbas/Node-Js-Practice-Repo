const fs = require('fs');

function readNotes() {
    return fs.readFileSync('file.txt').toString();
}

module.exports = readNotes;