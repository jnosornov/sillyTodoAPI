var { mongoose } = require('./db/connection');
var { Subscription } = require('./models/subscription');

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