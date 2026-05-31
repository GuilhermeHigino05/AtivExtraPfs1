const usuarioModel = require('../models/usuarioModel')

class AuthMiddleware {

    async validaUser(req, res, next){
        if(req.cookies && req.cookies.usuarioLogado){
            let id = req.cookies.usuarioLogado;
            let Usuario = new usuarioModel();
            let user = await Usuario.buscarUsuario(id);
            if(user){
                res.locals.usuarioNome = user.usuNome; 
                next();
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }
    }

    async validaUserAdmin(req,res,next){
        let id = req.cookies.usuarioLogado;
        let Usuario = new usuarioModel();
        let user = await Usuario.buscarUsuario(id);
        if(user.perfilId == 2){
            next();
        }else{
            res.redirect('/')
        }
    }
}

module.exports = AuthMiddleware