const router = require('express').Router();

const { signup, login, logout } = require('../controllers/auth.controllers');
const { authenticated } = require('../middlewares/auth.middlewares');

router.post('/signup', signup);
router.post('/login', login);

router.get('/logout', authenticated, logout);

module.exports = router;
