const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: 'http://127.0.0.1:git62032/',
        user: 'postgres',
        password: 'test',
        database: 'facedetection'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});


app.use(cors());
app.use(bodyparser.json());


app.get('/', (req, res) => {
    res.send('Working');
});
// ----------------------SIGNIN------------------------
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
// ---------------------------Register--------------------------
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) })
// --------------------------ID-------------------------------
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

// --------------------------------Entries-----------------------------
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApi(req, res) })


app.listen(process.env.PORT || 3002, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});


