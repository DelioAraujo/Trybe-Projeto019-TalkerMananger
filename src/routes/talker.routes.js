const talkerRoutes = require("express").Router();
const fs = require('fs').promises;
const path = require('path');
const readFile = require("../readFile");
const talkerValidations = require('../middlewares/talkerValidations');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

const talkFile = path.resolve(__dirname, '../talker.json');

// requisito 1
talkerRoutes.get("/", async (req, res) => {
  const file = await readFile();
  res.status(HTTP_OK_STATUS).json(file);
});

// requisito 2
talkerRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const info = await readFile();
  const infoFiltered = info.find((person) => person.id === Number(id));
  if (infoFiltered) {
    return res.status(HTTP_OK_STATUS).json(infoFiltered);
  }
  return res
    .status(HTTP_NOT_FOUND)
    .json({ message: "Pessoa palestrante não encontrada" });
});

//requisito 5
talkerRoutes.post("/", talkerValidations, async (req, res) => {
  const {name, age, talk: { watchedAt, rate } } = req.body;

  const talkerList = await readFile();

  const newTalker = {
    id: talkerList.length + 1,
    name,
    age,
    talk: {
        watchedAt,
        rate,
    }
  }

  talkerList.push(newTalker);

  await fs.writeFile(talkFile, JSON.stringify(talkerList));

  res.status(HTTP_CREATED).json(newTalker);


});

module.exports = talkerRoutes;
