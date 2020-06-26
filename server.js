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
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'facedetection'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});
// const database = {
//     user: [
//         {
//             id: '123',
//             name: 'rishabh',
//             email: 'rishabh.mehta@gmail.com',
//             password: 'messi',
//             entries: 3,
//             joindate: new Date()
//         },
//         {
//             id: '124',
//             name: 'Messi',
//             email: 'messi@gmail.com',
//             password: 'goat',
//             entries: 0,
//             joindate: new Date()
//         }
//     ]
// }
app.use(cors());
app.use(bodyparser.json());


app.get('/', (req, res) => {
    // res.send(database.user);
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


app.listen('3002');


