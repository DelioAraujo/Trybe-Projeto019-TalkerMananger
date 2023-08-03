const talkerRoutes = require('express').Router();
const readFile = require('../readFile');


const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

// requisito 1
talkerRoutes.get('/', async (req, res) => {
    const file = await readFile();
    res.status(HTTP_OK_STATUS).json(file);
  });

// requisito 2
talkerRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const info = await readFile();
    const infoFiltered = info.find((person) => person.id === Number(id));
    if (infoFiltered) {
        return res.status (HTTP_OK_STATUS).json(infoFiltered)
    }
    return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
})

  module.exports = talkerRoutes;

