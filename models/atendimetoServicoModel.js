const Database = require("../utils/database");


class AtendimentoServicoModel {
    #id
    #ateId
    #servId
    #servValor

    get Id () { return this.#id } set Id (id) { this.#id = id }
    get AteId () { return this.#ateId } set AteId (ateid) { this.#ateId = ateid }
    get getServId () { return this.#servId } set setServId (servid) { this.#servId = servid }
    get getServValor () { return this.#servValor } set setServValor (servValor) { this.#servValor = servValor }

    constructor (id, ateId, servId, servValor){
        this.#id = id
        this.#ateId = ateId
        this.#servId = servId
        this.#servValor = servValor
    }

    async Gravar(){
        let sql = `insert into tb_atendimentoservicos(ate_id,serv_id,serv_valor) values (?, ?, ?)`
        let values = [this.#ateId,this.#servId, this.#servValor];
        let banco = new Database();
        let result = banco.ExecutaComandoLastInserted(sql,values);
        return result
    }
}

module.exports = AtendimentoServicoModel