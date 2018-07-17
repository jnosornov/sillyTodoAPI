// > library imports
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');

// > local imports
var { mongoose } = require('./db/connection');
var { Character } = require('./models/character');

var app = express();

// > middleware to use body parser
app.use(bodyParser.json());

// > Create a resource POST /characters
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

// > Get reources GET /characters
app.get('/characters', (req, res) => {
    // > fetch characters from database
    Character.find().then((characters) => {
        res.send({ characters });
    }, (err) => {
        res.status(400).send(err);
    });
});

// > Get a resource GET /characters/:id
app.get('/characters/:id', (req, res) => {
    var id = req.params.id;
    // > check if the resource id is valid
    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Character.findById(id).then((character) => {
        // > check if document exist
        if(!character) {
            return res.status(404).send();
        }
        res.send({ character });
    }).catch((err) => {
        res.status(400).send();
    });
});

// > Delete a resource DELETE /subscribers/:id

// > Update a resource PATH /subscribers/:id


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };