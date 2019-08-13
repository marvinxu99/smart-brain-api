
const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json('incorrect data');
  }

  db.select('email', 'hash').from('login').where({email})
    .then(data => {
      //console.log(data[0]);
      if (bcrypt.compareSync(password, data[0].hash)) {
        db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
              res.json(user[0]);
          })
      } else {
        res.status(400).json('error logging in');
      }
    })
    .catch(err => res.status(400).send('wrong credentials'))
};

module.exports = {
    handleSignIn: handleSignIn
};
