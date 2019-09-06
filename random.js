const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('some_file.txt'),
  crlfDelay: Infinity
});

const array = [];
rl.on('line', (line) => {
  array.push(line);
}).on('close', () => {
  console.log('Have a great day!');
  console.log(JSON.stringify({medicines: array}));
  process.exit(0);
});
