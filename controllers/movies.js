const {movies} = require('../data/data')




const getMovies = ((req, res)=>{
    console.log("Route parameter:", req.params);// always sent as string
    const movieId = parseInt(req.params.id);//converting string to number
    const movie = movies.find((movie) => movie.id === movieId)// Finding movie by id
    if(!movie){
        return res.status(404).json({
            success:false,
            message: `movie with id ${movieId} not found`
        });
    }
    res.status(200).json({
        success: true,
        data: movie,
        message: `movie with id ${movieId} found successfully`
    });
})



module.exports = getMovies;