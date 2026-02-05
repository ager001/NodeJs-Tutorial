
const router = require('express').Router();
const getHomePage = require('../controllers/home');

router.get('/', getHomePage);

module.exports = router;

