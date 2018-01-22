const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type'
        }
    ]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;