const mongoose = require('mongoose');

// > Create a subscription model
var Character = mongoose.model('Character', {
    url: {
        type: String,
        required: true,
        trim: true
    },
    name: { 
        type: String, 
        required: true,
        minlength: 1,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    alive: { 
        type: Boolean,
        default: true
    }
});

module.exports = { Character };