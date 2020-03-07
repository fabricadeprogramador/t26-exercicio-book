const usuarioModel = require("../models/usuario-model");
const nodemailer = require("nodemailer");








class UsuarioController {
    static async recuperarSenha(req, res) {

        //2) Verifica no banco
        // let filtro = {
        //     email: req.email
        // };

        //let lista = await usuarioModel.find(filtro);

        //2) Gerar um Token

        //3) Gerar um Link com o token


        //4)Enviar o link no email
        enviarEmail().catch(console.error);
        res.send("OK")
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
async function enviarEmail() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "seuemail@hotmail.com", // generated ethereal user
            pass: "seusenha" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'fabrica.dev@hotmail.com', // sender address
        to: "virmerson@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}