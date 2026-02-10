
const router = require('express').Router();
const createMovie = require('../controllers/movies')

// router.get('/movies/:id', getMovies);
// router.get('/movies', allMovies);
router.get('/create-movies', createMovie)

module.exports = router;