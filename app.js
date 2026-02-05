const express = require('express');
const movieRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const homePage = require('./routes/home');
const { customHeader, blocker, logger } = require('./middleware/custom-middleware');



const app = express();
const PORT = process.env.PORT || 8000;// Updated to use PORT from .env file

app.use(express.json());// Middleware to parse JSON bodies




// Custom Middleware functions
app.use(logger);
app.use(blocker);
app.use(customHeader);

// Routes
app.use('/movies', movieRouter);
app.use('/users', usersRouter);
app.use('/',homePage);






app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
    
});