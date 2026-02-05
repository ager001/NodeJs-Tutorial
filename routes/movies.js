
const router = require('express').Router();
const {getMovies, allMovies, findMovies} = require('../controllers/movies')

router.get('/movies/:id', getMovies);
router.get('/movies', allMovies);
router.get('/get-movies', findMovies)

module.exports = router;