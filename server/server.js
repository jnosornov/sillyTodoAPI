const mongoose = require('mongoose');

// > Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ServiceTodo', { useNewUrlParser: true });

// > Create a subscription model

var Subscription = mongoose.model('Subscription', {
    name: { type: String },
    id: { type: Number },
    active: { type: Boolean }
});

// > Create a subscription instance

var newSubscription =  new Subscription({
    name: 'Quentin Coldwater',
    id: 123,
    active: true
});

newSubscription.save().then((doc) => {
    console.log('Saved subscription: ', JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save subscription', err);
});