const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Test = require('./entity/Test');
const app = express();

mongoose.connect('mongodb+srv://esasova:uM6UV4M2xagDsTv@cluster0.dkfe1.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const test = new Test({
        ...req.body
    });
    test.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});
app.get('/api/stuff/:id', (req, res, next) => {
    Test.findOne({ _id: req.params.id })
        .then(tests => res.status(200).json(tests))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {
    Test.find()
        .then(tests => res.status(200).json(tests))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;
