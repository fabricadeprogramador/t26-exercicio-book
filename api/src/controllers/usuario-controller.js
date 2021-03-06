const usuarioModel = require("../models/usuario-model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const chavePrivada = "banana nanica"



class UsuarioController {
    static async recuperarSenha(req, res) {
        // Monta o filtro
        let filtro = {
            email: req.body.email
        };
        //Buscar usuario no banco 
        let lista = await usuarioModel.find(filtro);


        if (lista.length > 0) {
            let usuarioEncontrado = lista[0];

            let dadosToken = {
                id: usuarioEncontrado._id
            }

            // Gerar um Token
            let token = jwt.sign(dadosToken, chavePrivada);
            //3) Gerar um Link com o token

            let link = "http://localhost:8080/#/recuperarsenha/" + token;
            //4)Enviar o link no email
            // enviarEmail(link, req.body.email).catch(console.error);
            res.send(link);


        } else {

            res.send("não encontrado")
        }

        // let dadosToken  = {
        //     email: 
        //     _id:
        // } 




    }

    static async listarTodos(req, res) {
        let lista = await usuarioModel.find({});
        res.send("E-mail enviado com sucesso");
    }
    static async buscarUsuario(email, senha) {
        let filtro = {
            email: email,
            senha: senha
        };

        let lista = await usuarioModel.find(filtro);
        return lista;
    }

    static async buscarPorId(req, res) {
        let usuario = await usuarioModel.findById({
            _id: req.params.id
        });
        res.json(usuario);
    }

    static cadastrar(req, res) {
        usuarioModel.create(req.body);
        //envia mensagem pro client
        res.send("Cadastrando com sucesso");
    }

    static async favoritar(req, res) {
        let usuario_id = req.body.usuario_id;
        let frase_id = req.body.frase_id;

        //Busco por id no banco
        let usuario = await usuarioModel.findById({
            _id: usuario_id
        });

        const favoritos = usuario.favoritos.concat(frase_id);

        await usuarioModel.updateOne({
            _id: usuario_id
        }, {
            favoritos
        });

        res.send("Favoritado com sucesso");
    }

    static async alterar(req, res) {
        //Leitura dos dados em Json
        let id = req.body.id;

        var cat = {
            descricao: req.body.descricao
        };

        await usuarioModel.findByIdAndUpdate({
                _id: id
            },
            cat
        );

        res.send("Alterado com sucesso ");
    }

    static async alterarSenha(req, res) {

        if (typeof req.headers.authorization !== "undefined") {
            //Ler o token
            var token = req.headers.authorization.split(" ")[1]

            //Valida o token
            var decoded = jwt.verify(token, chavePrivada);

            //Extrai o id do usário
            let id = decoded.id;

            //Cria objeto usuario com a nova senha
            var usuario = {
                senha: req.body.senha
            };

            //Altera no banco
            await usuarioModel.findByIdAndUpdate({
                    _id: id
                },
                usuario
            );

            //Resposta pro cliente
            res.send("Senha alterada com sucesso");

        } else {
            //res.send("Token inixistente")
            res.sendStatus(403);
        }
    }

    static async deletar(req, res) {
        const id = req.params.id;

        await usuarioModel.deleteOne({
            _id: id
        });

        res.send("Deletado com sucesso");
    }
}

module.exports = UsuarioController;

// async..await is not allowed in global scope, must use a wrapper
async function enviarEmail(link, emailUsuario) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "fabrica.dev@hotmail.com", // generated ethereal user
            pass: "Fabrica#2020" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "fabrica.dev@hotmail.com", // sender address
        to: emailUsuario, // list of receivers
        subject: "Recuperação de Senha ✔", // Subject line
        text: "Clique no link abaixo para recuperar sua senha:" + link, // plain text body
        html: "<b></b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}