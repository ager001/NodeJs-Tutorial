require('dotenv').config(); // Load environment variables first
const express = require('express');
const connectDb = require('./db/connectDb'); // Ensure this path matches your file
const movieRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const homePage = require('./routes/home');
const { customHeader, blocker, logger } = require('./middleware/custom-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Global Middleware
app.use(express.json());
app.use(logger);
app.use(blocker);
app.use(customHeader);

// 2. Routes
app.use('/movies', movieRouter);
app.use('/users', usersRouter);
app.use('/', homePage);

// 3. Database Connection & Server Start Logic
const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("⏳ Connecting to MongoDB Atlas...");
    await connectDb(process.env.MONGODB_URI);
    console.log("✅ Database connection successful");

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the application:");
    console.error(error.message);

    if (error.message.includes("SSL") || error.message.includes("whitelist")) {
      console.log("👉 ACTION REQUIRED: Go to MongoDB Atlas > Network Access and add your current IP!");
    }

    process.exit(1); // Exit with failure
  }
};

startServer();