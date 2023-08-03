
const fs = require('fs').promises;
const path = require('path');

const talkerInfo = path.resolve(__dirname, './talker.json');

async function readFile() {
  const json = await fs.readFile(talkerInfo);
  const data = JSON.parse(json);
  return data;
}

module.exports = readFile;