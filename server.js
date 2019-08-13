const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1postgresql-colorful-76029',
      user : 'winter',
      password : 'winter',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
//  db.select('*').from('users').then(users => res.send(users));
  res.send('it is working!');
});

app.get('/profile/:id', (req, res) => { profile.handleProgileGet(req, res, db) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.put('/image', (req, res) => { image.handleImagePut(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

//app.listen(3001, ()=>{
app.listen(process.env.PORT || 3001, ()=>{
  console.log(`app is running on port ${process.env.PORT}`);
});