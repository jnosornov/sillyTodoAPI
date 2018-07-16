const mongoose = require('mongoose');

// > Create a subscription model
var Subscription = mongoose.model('Subscription', {
    name: { 
        type: String, 
        required: true,
        minlength: 1,
        trim: true
    },
    id: { 
        type: Number,
        required: true,
        min: 1
    },
    active: { 
        type: Boolean,
        default: false
    }
});

module.exports = { Subscription };