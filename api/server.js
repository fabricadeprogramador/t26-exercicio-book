const express = require('express')
const bodyParser = require('body-parser')

const categoriaRoutes = require('./src/routes/categoria-routes')
const categoriaRoutesPub = require('./src/routes/categoria-routes-pub')
const fraseRoutes = require('./src/routes/frase-routes')
const fraseRoutesPub = require('./src/routes/frase-routes-pub')

const usuarioRoutes = require('./src/routes/usuario-routes')
const redeSocialRoutes = require('./src/routes/rede-social-routes')

//Controllers
const usuarioController = require('./src/controllers/usuario-controller')


const jwt = require("jsonwebtoken");
const chavePrivada = "banana nanica"


const cors = require("cors");
const app = express()
app.use(bodyParser.json())

//Ativando o CORS permissao de request
app.use(cors());

//Cadastrando sistema de rota
// app.use('/categoria', verificarToken, categoriaRoutes)
// app.use('/frase', verificarToken, fraseRoutes)
// app.use('/usuario', verificarToken, usuarioRoutes)

//Privadas
app.use('/categoria', verificarToken, categoriaRoutes)
app.use('/frase', verificarToken, fraseRoutes)
app.use('/usuario', verificarToken, usuarioRoutes)
app.use('/redesocial', verificarToken, redeSocialRoutes)

//# Publicas
app.use('/public/categoria', categoriaRoutesPub)
app.use('/public/frase', fraseRoutesPub)
//TODO: adicionar /public na frente  
app.put("/recuperarsenha", usuarioController.recuperarSenha)
app.put("/alterarsenha", usuarioController.alterarSenha)


//Configurando a porta
const port = 3000
app.listen(port, () => console.log(`Api rodando na porta ${port}!`))

//Conectando com Mongo

var mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://appfrases:12345@cluster0-v20sn.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conectado com sucesso no Mongo")
});

//Código do JWT

app.use("/gerar-token", async function (req, res) {

    let lista = await usuarioController.buscarUsuario(req.body.email, req.body.senha)
    console.log(lista.length)
    if (lista != null && lista.length > 0) {
        // JWT
        var token = jwt.sign(req.body, chavePrivada);


        res.send(token)
    } else {
        res.sendStatus(403)
        res.send("Usuário nao encontrado")
    }

})


function verificarToken(req, res, next) {

    //JWT
    //Leitura dos header para verificar ser tem o atributo authorization
    if (typeof req.headers.authorization !== "undefined") {

        //Dentro do atribuito authorization virá uma string como Bearer <Token>
        //fazemo split para obter apenas o token
        var token = req.headers.authorization.split(" ")[1]

        //Pedimos par ao JWT verificar se o token é valido
        var decoded = jwt.verify(token, chavePrivada);

        //Imprimios o usuário que foi utilizado na hora da geração do toke pela rota de cadastro
        console.log("usuario:" + decoded.usuario + " senha:" + decoded.senha);
        //res.sendStatus(403)
        console.log("Vericando token, está OK")
        next()
    } else {
        res.sendStatus(403)
    }
}




//HEROKU CONFIG
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000

app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))