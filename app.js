const { parse } = require('dotenv');
const express = require('express');
const { movies, users } = require('./data/data');
const  getMovies = require('./controllers/movies');

require('dotenv').config();// Load environment variables from .env file


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

app.get('/', (req, res)=>{
    res.send("Midenga NodeJs Tutorial");
});

app.get("/movies", (req,res)=>{
// Movies array

res.json({success: true, data: movies,
    totalAmountOfMovies: movies.length
})
});


// Route to get a specific movie by ID
app.get('/movies/:id', getMovies );


app.get('/users/:id', (req, res) => {
    // 1. Extract the ID from the URL parameters
    const userId = parseInt(req.params.id); 

    // 2. Find the specific user in the array
    const user = users.find((u) => u.id === userId);

    // 3. Logic Gate: Handle the case where the user doesn't exist
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${userId} not found`
        });
    }

    // 4. Success Response: Send the user data back
    res.status(200).json({
        success: true,
        data: user,
        message: `User with id ${userId} found successfully`
    });
});




app.get('/get-movies', (req, res) => {
    const query = req.query;
    console.log("Request Query:", query);
    
    const title = query.title;

    // Optional: Logic to filter the list based on the title provided
    const filteredMovies = title 
        ? movies.filter(m => m.title.toLowerCase().includes(title.toLowerCase().replace(/"/g, '')))
        : movies;

    res.json({
        success: true,
        message: "This is the list of movies",
        data: filteredMovies // No brackets here if filteredMovies is already an array
    });
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