const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    constructor() {

    }

    logout(req, res){
        res.clearCookie("usuarioLogado");
        res.redirect("/login");
        res.end();
    } 

    loginView(req, res) {
        res.render('Login/index', { layout: 'Login/index' });
    }

    async autenticarUsuario(req, res) {
        if(req.body.inputEmail != "" 
        && req.body.inputPassword != ""){
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticarUsuario(req.body.inputEmail, req.body.inputPassword);
            if(usuario != null) {
                res.cookie("usuarioLogado", usuario.usuarioId);
                
            }
            else{
                res.render('Login/index', { msgErro: "Usuário ou senha inválidos", layout: 'Login/index' })
            }
            
        }
        else {
            res.render('Login/index', { msgErro: "Preencha os campos corretamente", layout: 'Login/index' })
        }
    }
}

module.exports = LoginController;