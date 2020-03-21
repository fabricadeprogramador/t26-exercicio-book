var express = require('express')
var router = express.Router()

const FraseController = require('../controllers/frase-controller')

//Lista Todas de Frases
router.get("/", FraseController.listarTodos)


//Busca por Frase pelo ID
router.get("/categoria/:id", FraseController.buscarPorCategoriaId)


module.exports = router