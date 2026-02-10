const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Movie title is required" ],
        maxLength: [200, "Title cannot exceed 200 characters"]

    },
    year:{
        type: Number,
        required: [true, "Movie year is required" ],
    },
    genre:{
        type: String,
        enum:{
            values:['Action', 'Comedy', 'Horror', 'Sci-Fi', 'Romance'],
            message: '{VALUE} is not a valid genre'
        },
    },
    rating:{
        type: Number,
        min: [1, 'Rating must be at least 1' ],
        max: [10, 'Rating cannot exceed 10']
    },
},{ timestamps: true},);

module.exports = mongoose.model('Movies', movieSchema);