const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('this is working.');
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})

/* 
/signin   -> POST = success or fail
/register --> POST = return new user object
/profile/:userid  -- GET = user
/image  --> PUT - update user profile, return uodated user object

*/