const talkerRoutes = require('express').Router();
const readFile = require('../readFile');


const HTTP_OK_STATUS = 200;

// requisito 1
talkerRoutes.get('/', async (req, res) => {
    const file = await readFile();
    res.status(HTTP_OK_STATUS).json(file);
  });

  module.exports = talkerRoutes;