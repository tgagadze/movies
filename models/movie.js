const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    year: String,
    genres: Array,
    ratings: Array,
    actors: Array,
    durattion: String,
    releaseDate: String,
    storyline: String,
    imdbRating: Number,
    posterurl: String,
});

module.exports = mongoose.model('movie',MovieSchema);