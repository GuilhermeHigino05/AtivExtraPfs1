const AtendimentoModel = require('../models/atendimentoModel');
const AtendimentoServicoModel = require('../models/atendimetoServicoModel');
const ServicoModel = require('../models/servicoModel');
const VeiculoModel = require('../models/veiculoModel');


class AtendimentoController {

    async registerView(req, res) {
        let veiculo = new VeiculoModel();
        let crr = await veiculo.listar();
        let servicosModel = new ServicoModel();
        let servico = await servicosModel.listar()
        res.render('atendimentos/cadastrar', { veiculos: crr , servico: servico});
    }
    async register(req, res){
        let {placa, marca, modelo,ano,km,servicoId, servicoVal} = req.body
        if(!placa){
            res.status(403).send({ok: false, msg:'Placa Incorreta'});
        }

        if(!marca){
            res.status(403).send({ok: false, msg: 'Marca incorreta'});
        }

        if(!modelo){
            res.status(403).send({ok: false, msg: 'Modelo Incorreto'});
        }

        if(!ano){
            res.status(403).send({ok: false, msg: 'Ano incorreto'});
        }
        if(!km){
            res.status(403).send({ok: false, msg: 'Kilometragem incorreto'});
        }

        let veiculoModel = new VeiculoModel(0,modelo,marca,ano,km,placa);
        let veiculo = await veiculoModel.buscarPelaPlaca(placa);

        let idVei = veiculo ? veiculo.veiId : false
        if(!veiculo){
            let resultCadVei = await veiculoModel.gravarVeiculo();
            if(!resultCadVei){
                return res.status(500).send({ok: false, msg: 'Erro interno ao cadastrar carro'});
            }else{
                idVei = resultCadVei;
            }
        }
        let valTotal = 0
        for(let i = 0; i < servicoVal.length; i++){
            valTotal += servicoVal[i]
        }
        let atendimentoModel = new AtendimentoModel(0,0,idVei, valTotal);
        let resultAtend = await atendimentoModel.Gravar();
        if(!resultAtend){
            return res.status(500).send({ok: false, msg: 'Erro interno ao cadastrar o atendimento'})
        }

        let atendimentoServModel = new AtendimentoServicoModel(0, resultAtend, 0, 0);
        let result = []
        for(let i = 0; i < servicoId.length; i++){
            atendimentoServModel.setServId = servicoId[i];
            atendimentoServModel.setServValor = servicoVal[i];
            result[i] = await atendimentoServModel.Gravar();
        }

        for(let i = 0; i<result.length ; i++){
            if(!result[i]){
                return res.status(500).send({ok: false, msg: 'Erro interno ao cadastrar atendimento '})
            }
        }

        return res.status(200).send({ok: true, msg: 'Atendimento cadastrado com sucesso'});
        


    }

    async buscaVeculos(req, res){
        let placa = req.query.busca;
        let veiculoModel = new VeiculoModel();
        let crr = await veiculoModel.buscarPelaPlaca(placa);
        res.send({veiculo: crr});
    }
}

module.exports = AtendimentoController;