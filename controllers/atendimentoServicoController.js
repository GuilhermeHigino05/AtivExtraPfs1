const AtendimentoModel = require("../models/atendimentoModel");

class AtendimentoServicoController {

    async listarView(req, res) {
        res.render('atendimentos/listar');
    }

    async listar(req, res){
        let parametro = req.query.busca;
        let atendimentoModel = new AtendimentoModel;
        let list = await atendimentoModel.List(parametro);
        res.json(list);
    }
}

module.exports = AtendimentoServicoController
