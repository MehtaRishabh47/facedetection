const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'bc123b2286774f1dadd09bd902f4f797'
});
const handleApi = (req, res) => {
    app.models.predict(
        'c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to connect API'))
}



const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to connect'))
}
module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
}