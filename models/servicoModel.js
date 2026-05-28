const Database = require('../utils/database');

const conexao = new Database();

class ServicoModel {

    #servId;
    #servDesc;
    #servValor;

    get servId(){
        return this.#servId;
    }

    set servId(servId) {
        this.#servId = servId;
    }

    get servDesc(){
        return this.#servDesc;
    }

    set servDesc(servDesc) {
        this.#servDesc = servDesc;
    } 
    
    get servValor(){
        return this.#servValor;
    }

    set servValor(servValor) {
        this.#servValor = servValor;
    } 
    
    constructor(servId, servDesc, servValor){
        this.#servId = servId;
        this.#servDesc = servDesc;
        this.#servValor = servValor;
    }

    async listar() {
        let sql = "select * from tb_servicos";
        let listaRetorno = [];
        let rows = await conexao.ExecutaComando(sql);

        for(var i= 0; i < rows.length; i++){
            let row = rows[i];
            listaRetorno.push(new ServicoModel(row["serv_id"], row["serv_descricao"], row["serv_valor"]));
        }

        return listaRetorno;
    }

}

module.exports = ServicoModel;