const path = require('path');
const fs = require('fs');
const write = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

console.log('Welcome, enter your text');

process.stdin.on('data', (data) => {
  const userDate = data.toString().trim();
  if (userDate === 'exit') {
    write.end();
    process.exit();
  }
  write.write(userDate);
});

process.on('SIGINT', () => {
  write.end();
  process.exit();
});

process.on('SIGTERM', () => {
  write.end();
  process.exit();
});

process.on('exit', () => {
  console.log('Writing is done');
});