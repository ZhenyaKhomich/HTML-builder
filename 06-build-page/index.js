const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

async function createHtml() {
  const pathFileTemplate = path.join(__dirname, '/template.html');
  const templateHtml = await fs.promises.readFile(pathFileTemplate, 'utf-8');

  const regex = /\{\{([^}]+)\}\}/g;
  const matches = templateHtml.match(regex);

  let updatedHtml = templateHtml;

  if (matches) {
    for (let i = 0; i < matches.length; i += 1) {
      const fileName = matches[i].slice(2, - 2) + '.html';
      const pathFile = path.join(__dirname, 'components', fileName);

      const part = await fs.promises.readFile(pathFile, 'utf-8');
      updatedHtml = updatedHtml.replace(matches[i], part.trim());
    }
  }

  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), updatedHtml,
    (err) => {
      if (err) throw err;
    });
}

createHtml();

function completeCss() {
  const folderPath = (path.join(__dirname, 'styles'));
  const newFolderPath = (path.join(__dirname, 'project-dist'));

  const output = fs.createWriteStream(path.join(newFolderPath, 'style.css'));

  fs.promises.readdir(folderPath, { withFileTypes: true })
    .then(filenames => {
      for (let filename of filenames) {
        const type = path.extname(filename.name).slice(1);
        if (type === 'css' && !filename.isDirectory()) {
          let arr = [];
          const input = fs.createReadStream(path.join(folderPath, filename.name), 'utf-8');
          input.on('data', chank => arr.push(chank));
          input.on('end', () => output.write(arr.join('') + '\n'));
        }
      }
    });
}

completeCss();

function copyAssets() {
  let folderPath = (path.join(__dirname, 'assets'));
  let newFolderPath = (path.join(__dirname, 'project-dist', 'assets'));

  fs.rm(newFolderPath, { recursive: true }, () => {

    fs.promises.mkdir(newFolderPath, { recursive: true });

    fs.promises.readdir(folderPath, { withFileTypes: true })
      .then(foldernames => {

        for (let foldername of foldernames) {
          if (foldername.isDirectory()) {
            fs.promises.mkdir(path.join(newFolderPath, foldername.name), { recursive: true });

            const folderInternalPath = path.join(folderPath, foldername.name);
            const newFolderInternalPath = path.join(newFolderPath, foldername.name);

            fs.promises.readdir(path.join(folderInternalPath), { withFileTypes: true })
              .then(filenames => {
                for (let filename of filenames) {
                  const filePath = (path.join(folderInternalPath, filename.name));
                  const newFilePath = (path.join(newFolderInternalPath, filename.name));

                  fs.promises.copyFile(filePath, newFilePath);
                }
              });
          }
        }
      });
  })


}

copyAssets();