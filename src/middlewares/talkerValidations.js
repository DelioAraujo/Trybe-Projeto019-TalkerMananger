// Middleware para verificar o token de autenticação
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    if (typeof token !== "string" || token.length !== 16) {
      return res.status(401).json({ message: "Token inválido" });
    }

    next();
  };

  // Middleware para validar o campo "name"
  const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
  };

  // Middleware para validar o campo "age"
  const validateAge = (req, res, next) => {
    const { age } = req.body;

    if (!age || age === "") {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (!Number.isInteger(age) || age < 18) {
      return res.status(400).json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }

    next();
  };

 // Middleware para validar o campo "talk"
const validateTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }

    const { watchedAt, rate } = talk;

    if (!watchedAt || watchedAt.trim() === "") {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    // Verificando o formato da data (dd/mm/aaaa)
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(watchedAt)) {
      return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
      }
      if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(400)
          .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
      }

    next();
  };

const talkerValidations = [
    validateToken,
    validateName,
    validateAge,
    validateTalk,
];

module.exports = talkerValidations;
