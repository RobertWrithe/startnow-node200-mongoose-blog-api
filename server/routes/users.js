const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(users => {
            (users ? res.status(200).json(users) : res.status(404).send())
        })
        .catch(err => {
            res.status(500).send('An internal server error has occured')
        });
});

router.post('/', (req, res) => {
    let newUser = new User(req.body);
    newUser
        .save()
        .then(users => {
            res.status(201).json(users);
        })
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(users => {
            res.status(204).json(users);
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(users => {
            res.status(200).json(users);
        });
});

module.exports = router;