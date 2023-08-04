const loginRoutes = require('express').Router();
const crypto = require('crypto');
const loginValidations = require('../middlewares/loginValidations');

const HTTP_OK_STATUS = 200;

// requisito 3
loginRoutes.post('/', loginValidations, (req, res) => {
  // Gera um token aleatório de 16 caracteres
  const token = crypto.randomBytes(8).toString('hex');

  // Retorna o token gerado no corpo da resposta
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRoutes;
