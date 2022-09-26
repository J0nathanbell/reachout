const {readFileSync, promises: fsPromises} = require('fs')

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).slice(0, -1);

  return arr;
}

console.log(typeof(syncReadFile('./example.txt')[0]));
