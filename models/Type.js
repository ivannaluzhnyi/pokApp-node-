const mongoose = require('mongoose');

const typeSchema = new  mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: 'red'
    }
});

typeSchema.virtual('pokemon', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});


const Type = mongoose.model('Type', typeSchema);

module.exports = Type;