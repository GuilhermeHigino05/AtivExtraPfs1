const VeiculoModel = require("../models/veiculoModel");


class VeiculoController {

    constructor() {

    }
    
    async listarView(req, res){
        var vei = new VeiculoModel()
        var lista = await vei.listar();
        res.render('Veiculos/listar', { lista: lista  });
    }

    async cadastrarView(req, res){
        res.render('Veiculos/cadastrar');
    }


    async gravarVeiculo(req, res) {

        let ok = false;
        let msg = "";
        if(req.body != null) {


            if(req.body.modelo != null && req.body.marca != null && req.body.ano != null && req.body.kilometragem != null && req.body.placa != null) {
                let veiculo = new VeiculoModel();
                if(await veiculo.buscarPelaPlaca(req.body.placa) == null) {

                    veiculo = new VeiculoModel(0, req.body.modelo, req.body.marca, req.body.ano, req.body.kilometragem, req.body.placa);
                    ok = veiculo.gravarVeiculo();

                    msg = ok ? "Veículo cadastrado com sucesso!" : "Erro ao inserir veículo no banco de dados!"
                }
                else{
                    msg = "Veículo já cadastrado!"
                }
            }
            else{
                msg = "Preencha todos campos corretamente!"
            }
        }

        res.send({ ok: ok, msg: msg})
    }

}
module.exports = VeiculoController;