const fs = require('fs');
const path = require('path');
const { readdir } = require('node:fs/promises');
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(
  pathFolder,
  {
    withFileTypes: true,
  },
  (el, files) => {
    if (el) return console.error(el);
    files.forEach((file) => {
      path.join(__dirname, 'secret-folder', `${file.name}`);
      if (file.isFile()) {
        const filePath = path.join(__dirname, 'secret-folder', `${file.name}`);
        newFileStats(filePath, file);
      }
    });
  },
);

function newFileStats(filePath, file) {
  fs.stat(filePath, (el, stats) => {
    if (el) return console.error(el.message);
    let examp = file.name.split('.');
    console.log(
      `${examp[0]} - ${examp[1]} - ${(stats.size / 1024).toFixed(3)}kb.`,
    );
  });
}
