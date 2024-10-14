const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); // Import your note routes

require('dotenv').config(); // Load environment variables from .env file
const DB_URL = process.env.DB_URL; // Use the DB_URL variable from .env
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Routes
app.use('/api', noteRoutes); // Prefix your routes with /api

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note Taking Application - Week 06 Exercise</h1>");
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081"); // Change this to match your listening port
});
