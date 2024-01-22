const fs = require('fs');
const path = require('path');
const pathFiles = path.join(__dirname, 'styles');
const copyFiles = path.join(__dirname, 'project-dist');

let addStream = fs.createWriteStream(copyFiles);
addStream.end();

const addreadFiles = () => {
  fs.readdir(pathFiles, (err, els) => {
    els.forEach((file) => {
      if (file.slice(-3) === 'css') {
        let addStyleFile = path.resolve(pathFiles, file);
        fs.readFile(addStyleFile, (err, data) => {
          fs.appendFile(copyFiles, data.toString(), (el) => el);
        });
      }
    });
  });
};

addreadFiles();