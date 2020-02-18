const model = require('../models/rede-social-model')
class RedeSocialController {

    static cadastrar(req, res) {
        // {descricao:'youtube' , link:'youtube.com/frasepp'}
        model.create(req.body)
        res.send('Cadastrado com Sucesso!')

    }

    static async listarTodos(req, res) {
        let lista = await model.find({})
        res.json(lista)
    }

}

module.exports = RedeSocialController