var express = require('express')
var router = express.Router()

const RedeSocialController = require('../controllers/rede-social-controller')

router.post('/', RedeSocialController.cadastrar)

router.get('/', RedeSocialController.listarTodos)

module.exports = router