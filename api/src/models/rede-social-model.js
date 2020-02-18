var mongoose = require('mongoose')
var redeSocialSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('RedeSocial', redeSocialSchema)