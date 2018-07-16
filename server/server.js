// > library imports
var express = require('express');
var bodyParser = require('body-parser');

// > local imports
var { mongoose } = require('./db/connection');
var { Subscription } = require('./models/subscription');

var app = express();

// > middleware to use body parser
app.use(bodyParser.json());

// > Create a resource POST /subscribers
app.post('/subscribers', (req, res) => {
    var subscriber = new Subscription({
        name: req.body.name,
        id: req.body.id
    });

    // > Send back subscriber info if not error encountered
    subscriber.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        // > Set an http status when an error occur
        res.status(400).send(err);
    });
});

// > Get reources GET /subscribers

// > Get a resource GET /subscribers/:id

// > Delete a resource DELETE /subscribers/:id

// > Update a resource PATH /subscribers/:id


app.listen(3000, () => {
    console.log('Started on port 3000');
});