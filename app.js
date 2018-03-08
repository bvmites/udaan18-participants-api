const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const users = require('./api/users');
const participants = require('./api/participants');

const authenticate = require('./middleware/authenticate');

dotenv.config();

(async () => {

    const client = await MongoClient.connect(process.env.DB);
    const db = client.db('udaan18');
    const userDb = client.db('users');
    console.log('Connected to database');
    app.use('/users', users(userDb));
    app.use('/', authenticate, participants(db));

})();

module.exports = app;
