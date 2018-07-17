// > library imports
const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

// > local imports
const { app } = require('./../server');
const { Character } = require('./../models/character');

// >> Add a dummy list of characters
const characters = [{
    _id: new ObjectId,
    url: "first character url",
    name: "first character name",
    age: 24
}, {
    _id: new ObjectId,
    url: "second character url",
    name: "second character name",
    age: 24
}];

beforeEach((done) => {
    Character.remove({}).then(() => {
        // >> use return to chain the callbacks
        return Character.insertMany(characters);
    }).then(() => done());
});

describe('POST /characters', () => {
    it('Should create a new character', (done) => {
        var url = "This is an url";
        var name = "This is a name";
        var age = 24;

        request(app)
            .post('/characters')
            .send({ url, name, age })
            .expect(200)
            .expect((res) => {
                expect(res.body.url).toBe(url);
                expect(res.body.name).toBe(name);
                expect(res.body.age).toBe(age);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                // > query to check if character got stored
                Character.find({ name }).then((docs) => {
                    expect(docs.length).toBe(1);
                    expect(docs[0].url).toBe(url);
                    expect(docs[0].name).toBe(name);
                    expect(docs[0].age).toBe(age);
                    done();
                }).catch((err) => done(err));

            });
    });

    it('Should not create a character with invalid data', (done) => {
        request(app)
            .post('/characters')
            .send({})
            .expect(400)
            // > create a custom query
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Character.find().then((characters) => {
                    expect(characters.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });

    });
});

describe('GET /characters', () => {
    it('Should get all characters', (done) => {
        request(app)
            .get('/characters')
            .expect(200)
            // > create a custom expect
            .expect((res) => {
                expect(res.body.characters.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /characters/:id', () => {
    it('Should return character document', (done) => {
        request(app)
            .get(`/characters/${characters[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.character.url).toBe(characters[0].url);
                expect(res.body.character.name).toBe(characters[0].name);
                expect(res.body.character.age).toBe(characters[0].age);
            })
            .end(done);
    });

    it('Should return a 404 if todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
            .get(`/characters/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 for invalid ids', (done) => {
        request(app)
            .get('/characters/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /characters/:id', () => {
    it('Should remove a character', (done) => {
        var hexId = characters[1]._id.toHexString();

        request(app)
            .delete(`/characters/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.character._id).toBe(hexId)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Character.findById(hexId).then((character) => {
                    expect(character).toBeFalsy();
                    done();
                }).catch((err) => done(err));
            });
    });

    it('Should return a 404 if todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
            .get(`/characters/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 for invalid ids', (done) => {
        request(app)
            .get('/characters/123')
            .expect(404)
            .end(done);
    });
});

