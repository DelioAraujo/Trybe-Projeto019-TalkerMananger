const router = require('express').Router();
const talkerRoutes = require('./talker.routes');

router.use('/talker', talkerRoutes);

module.exports = router;