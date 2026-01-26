const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;// Updated to use PORT from .env file

app.use(express.json());// Middleware to parse JSON bodies

let movies = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi"
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action"
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi"
  },
  {
    title: "Parasite",
    year: 2019,
    genre: "Thriller"
  },
  {
    title: "The Godfather",
    year: 1972,
    genre: "Crime"
  }
];


app.get('/', (req, res)=>{
    res.send("Midenga NodeJs Tutorial");
});

app.get("/movies", (req,res)=>{
// Movies array

res.json({success: true, data: movies,
    totalAmountOfMovies: movies.length
})
});

app.get('/status', (req, res)=>{
    res.status(200).json({status: "OK"});
});

app.post('/movies', (req,res)=>{
    const data = req.body;
    console.log('This is what the client sends', data);
    if(!data.title || !data.year){
       return res.status(400).json({
            success:false,
            message: "Movie title and Movie year is required"
        });
    }

    movies.push(data);
    res.status(201).json({success: true, message:`The movie with title: ${data.title}has been added successfully.`});
    
});



app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
    
});