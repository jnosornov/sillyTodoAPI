// > library imports
var express = require('express');
var bodyParser = require('body-parser');

// > local imports
var { mongoose } = require('./db/connection');
var { Character } = require('./models/character');

var app = express();

// > middleware to use body parser
app.use(bodyParser.json());

// > Create a resource POST /subscribers
app.post('/characters', (req, res) => {
    var character = new Character({
        url: req.body.url,
        name: req.body.name,
        age: req.body.age
    });

    // > Send back subscriber info if not error encountered
    character.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        // > Set an http status when an error occur
        res.status(400).send(err);
    });
});

// > Get reources GET /subscribers
app.get('/characters', (req, res) => {
    // > fetch characters from database
    Character.find({}).then((characters) => {
        res.send({ characters });
    }, (err) => {
        res.status(400).send(err);
    });
});

// > Get a resource GET /subscribers/:id

// > Delete a resource DELETE /subscribers/:id

// > Update a resource PATH /subscribers/:id


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };