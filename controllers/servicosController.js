const ServicoModel = require("../models/servicoModel");

class ServicoController {

    constructor() {

    }
    
    async listarView(req, res){
        var serv = new ServicoModel();
        var lista = await serv.listar();
        res.render('Servicos/listar', { lista: lista  });
    }


}
module.exports = ServicoController;