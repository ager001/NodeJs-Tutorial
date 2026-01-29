const { parse } = require('dotenv');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;// Updated to use PORT from .env file

app.use(express.json());// Middleware to parse JSON bodies


app.get('/admin-dashboard', (req,res)=>{
    res.status(200).json({status: "OK",
    message: "Welcome to the admin panel"
    });
    
});

// Custom Middleware functions
app.use((req, res, next)=>{
    console.log('Logger...');
    console.log("This is the request method:", req.method);
    console.log("This is the request URL:",req.url);
    next();
    

});

app.use((req, res, next)=>{
    console.log('Adding custom Header...');
    res.setHeader('X-Powered-By', 'Midenga');
    
    next();
    

});

app.use((req, res, next)=>{
    if(req.url === '/admin'){
    console.log('Request is blocked.');
    return res.status(403).json({message: "Access to admin is forbidden"});
    }
    next();

});





let movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action"
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi"
  },
  {
    id: 4,
    title: "Parasite",
    year: 2019,
    genre: "Thriller"
  },
  {
    id: 5,
    title: "The Godfather",
    year: 1972,
    genre: "Crime"
  }
];

let users = [
    {
    id: 1,    
    name: "Midenga",
    email: "agermidenga@gmail.com"
    },
    {
        id: 2,
        name:"Bwai",
        email:"abrahambwai@gmail.com"
    },
    {
        id: 3,
        name:"Mao",
        email:"zerrubabelmao@gmail.com"
    },

];

app.get('/', (req, res)=>{
    res.send("Midenga NodeJs Tutorial");
});

app.get('/movies/:id', (req,res)=>{
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