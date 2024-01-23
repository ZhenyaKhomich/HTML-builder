const fs = require('fs/promises');
const path = require('path');
const pathFiles = path.join(__dirname, 'files');
const copyFiles = path.join(__dirname, 'files-copy');

async function copy() {
  try {
    await fs.mkdir(copyFiles, { recursive: true });

    const files = await fs.readdir(pathFiles);

    for (const file of files) {
      const pathFile = path.join(pathFiles, file);
      const newFile = path.join(copyFiles, file);
      await fs.copyFile(pathFile, newFile);
    }

    console.log('Directory copied successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

copy();