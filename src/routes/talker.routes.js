const talkerRoutes = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const readFile = require('../readFile');
const talkerValidations = require('../middlewares/talkerValidations');
const tokenValidation = require('../middlewares/tokenValidation');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

const talkFile = path.resolve(__dirname, '../talker.json');

// requisito 1
talkerRoutes.get('/', async (req, res) => {
  const file = await readFile();
  res.status(HTTP_OK_STATUS).json(file);
});

// requisito 8
talkerRoutes.get('/search', tokenValidation, async (req, res) => {
  const talkerList = await readFile();

  const { q } = req.query;

  const filteredTalkers = talkerList.filter((talker) =>
    talker.name.toLowerCase().includes(q.toLowerCase()));

  if (q === undefined) {
    return res.status(HTTP_OK_STATUS).json(talkerList);
  }
  if (q === '') {
    return res.status(HTTP_OK_STATUS).json(talkerList);
  }
  return res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

// requisito 2
talkerRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const info = await readFile();
  const infoFiltered = info.find((person) => person.id === Number(id));
  if (infoFiltered) {
    return res.status(HTTP_OK_STATUS).json(infoFiltered);
  }
  return res
    .status(HTTP_NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

// requisito 5
talkerRoutes.post('/', talkerValidations, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkerList = await readFile();

  const newTalker = {
    id: talkerList.length + 1,
    name,
    age,
    talk: {
        watchedAt,
        rate,
    },
  };

  talkerList.push(newTalker);

  await fs.writeFile(talkFile, JSON.stringify(talkerList));

  res.status(HTTP_CREATED).json(newTalker);
});

// requisito 6
talkerRoutes.put('/:id', talkerValidations, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkerList = await readFile();
    const talkerIndex = talkerList.findIndex((person) => person.id === Number(id));
    if (talkerIndex === -1) {
        return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const updatedTalker = { id: Number(id),
        name,
        age,
        talk: {
            watchedAt,
            rate,
        },
    };
    talkerList[talkerIndex] = updatedTalker;
    await fs.writeFile(talkFile, JSON.stringify(talkerList));
    return res.status(HTTP_OK_STATUS).json(updatedTalker);
});

// requisito 7
talkerRoutes.delete('/:id', tokenValidation, async (req, res) => {
    // pego id na rota
    const { id } = req.params;
    // pego a lista completa no arquivo
    const talkerList = await readFile();
    // confiro qual o index do elemento correspondente ao id fornecido
    // faço verificação se existe realmente um elemento com o id fornecido e retorno um erro caso negativo
    const talkerIndex = talkerList.findIndex((person) => person.id === Number(id));
    if (talkerIndex === -1) {
        return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    // Remove o palestrante da talkerList usando o talkerIndex
    talkerList.splice(talkerIndex, 1);
    // reescrevo o arquivo com a lista atualizada após a substituição
    await fs.writeFile(talkFile, JSON.stringify(talkerList));
    // retorno status 200 e o elemento atualizado
    return res.status(HTTP_NO_CONTENT).send();
});

module.exports = talkerRoutes;
