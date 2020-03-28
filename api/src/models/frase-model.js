// Criando Schema
var mongoose = require('mongoose');
var fraseSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },

    descricaoPt: {
        type: String,
        required: true
    },

    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
});
//Criando o modelo 
module.exports = mongoose.model('Frase', fraseSchema);