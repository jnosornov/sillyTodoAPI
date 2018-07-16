// > library imports
const expect = require('expect');
const request = require('supertest');

// > local imports
const { app } = require('./../server');
const { Character } = require('./../models/character');

beforeEach((done) => {
    Character.remove({}).then(() => done());
});

describe('POST /characters', () => {
    it('Should create a new character', (done) => {
        var character = {
            url: "This is an url",
            name: "This is a name",
            age: 24
        };

        request(app)
            .post('/characters')
            .send(character)
            .expect(200)
            .expect((res) => {
                expect(res.body.url).toBe(character.url);
                expect(res.body.name).toBe(character.name);
                expect(res.body.age).toBe(character.age);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                // > query to check if character got stored
                Character.find().then((characters) => {
                    expect(characters.length).toBe(1);
                    expect(characters[0].url).toBe(character.url);
                    expect(characters[0].name).toBe(character.name);
                    expect(characters[0].age).toBe(character.age);
                    done();
                }).catch((err) => done(err));

            });
    });

    it('Should not create a character with invalid data', (done) => {
        request(app)
            .post('/characters')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Character.find().then((characters) => {
                    expect(characters.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });

    });
});