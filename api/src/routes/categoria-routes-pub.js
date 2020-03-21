var express = require('express')
var router = express.Router()

const CategoriaController = require('../controllers/categoria-controller')

//Lista Todas de Categorias
router.get("/", CategoriaController.listarTodos)


module.exports = router