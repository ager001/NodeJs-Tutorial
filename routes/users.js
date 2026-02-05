
const router = require('express').Router();

const {getUsers, allUsers} = require('../controllers/users');

router.use('/users/:id', getUsers);
router.use('/users', allUsers);

module.exports = router;
