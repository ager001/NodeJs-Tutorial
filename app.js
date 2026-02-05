const express = require('express');
const movieRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const homePage = require('./routes/home');
const filterMovies = require('./routes/movies')



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

// Routes
app.use(movieRouter);
app.use(usersRouter);
app.use(homePage);
app.use(filterMovies);





app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
    
});