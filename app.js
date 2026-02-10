require("dotenv").config();
const express = require("express");
const movieRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const homePage = require("./routes/home");
const {
  customHeader,
  blocker,
  logger,
} = require("./middleware/custom-middleware");
const mongoose = require("mongoose");
const connectDb = require("./db/connectDb");

const app = express();
const PORT = process.env.PORT || 8000; // Updated to use PORT from .env file

app.use(express.json()); // Middleware to parse JSON bodies

// Custom Middleware functions
app.use(logger);
app.use(blocker);
app.use(customHeader);

// Routes
app.use("/movies", movieRouter);
app.use("/users", usersRouter);
app.use("/", homePage);

app.listen(PORT, async () => {
  try {
    console.log("Connected to database");
    await connectDb(process.env.MONGODB_URI);
    console.log(`App is listening on port ${PORT}`);
  } catch (error) {
    console.log('An error occurred.');
    console.log(error.message);
    
    
  }
});
