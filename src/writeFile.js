const fs = require('fs').promises;
const path = require('path');

const file = path.resolve(__dirname, './talker.json');

async function writeFile() {
  const json = await fs.writeFile(file);
  const data = JSON.parse(json);
  return data;
}

module.exports = writeFile;