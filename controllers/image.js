const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
    apiKey: 'ef9bdfe3d37f4c5aa76d547bd31b21c5'
   });
   
const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.urlInput)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id })    // where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImagePut,
    handleApiCall
};