const router = require('express').Router();
const talkerRoutes = require('./talker.routes');
const loginRoutes = require('./login.routes');

router.use('/talker', talkerRoutes);
router.use('/login', loginRoutes);

module.exports = router;