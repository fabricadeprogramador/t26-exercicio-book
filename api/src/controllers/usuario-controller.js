const usuarioModel = require("../models/usuario-model");
const nodemailer = require("nodemailer");








class UsuarioController {
    static async recuperarSenha(req, res) {
        // let filtro = {
        //     email: req.email
        // };

        //let lista = await usuarioModel.find(filtro);

        //Gerar um Token

        //Gerar um Link com o token


        //Enviar o link no email
        enviarEmail();
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
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
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