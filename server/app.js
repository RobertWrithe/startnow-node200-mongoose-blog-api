require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let connectLink = process.env.ENV === 'production' ? process.env.MLAB_CONNECT : 'mongodb://localhost/my-blog';

mongoose.connect(connectLink, { useNewUrlParser: true });

mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;