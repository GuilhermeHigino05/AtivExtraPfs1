const Database = require("../utils/database");

class AtendimentoModel {
    #id
    #data
    #veiId
    #valTotal

    get id () {return this.#id} set id ( id ) { this.#id = id }
    get data () {return this.#data} set data (data) {this.#data = data}
    get veiId () {return this.#veiId} set veiId (veiId) {this.#veiId = veiId} 
    get valTotal () {return this.#valTotal} set valTotal (valTotal) {this.#valTotal = valTotal}
    constructor(id, data, veiId, valTotal){
        this.#id = id
        this.#data = data
        this.#veiId = veiId
        this.#valTotal = valTotal
    }

    async Gravar(){
        let sql = 'insert into tb_atendimento (ate_data, vei_id, ate_valortotal) values (?,?,?)'
        const timestamp = Date.now();
        const dataAtual = new Date(timestamp);

        const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short' // ou 'full', 'long', 'medium'
        });
        let values = [formatoBrasil.format(dataAtual), this.#veiId, this.#valTotal]
        let banco = new Database();
        let result = banco.ExecutaComandoLastInserted(sql, values);
        return result;
    }
}


module.exports = AtendimentoModel