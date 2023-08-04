// requisito 4

// Middleware para validar o campo email
function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // Verifica se o email é válido (pode usar uma expressão regular mais robusta para uma validação mais completa)
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  // Passa para o próximo middleware se tudo estiver correto
  next();
}

// Middleware para validar o campo password
function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  // Verifica se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  // Passa para o próximo middleware se tudo estiver correto
  next();
}

const loginValidations = [
    validateEmail,
    validatePassword,
];

module.exports = loginValidations;
